import _, { isEqual } from 'lodash'
import * as moment from 'moment'
import * as firebase from 'src/firebase'
import { COLLECTION, GAME_STATUS, GROUP } from 'src/utils/_constants'
import { euroHandicap } from 'src/utils/_common'

class BettingService {

    startBettingRound = async (eventId, round) => {
        const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
        const evtUsersRef = await firebase.db.collection(`${COLLECTION.EVENT}/${eventId}/${COLLECTION.USER}/`)
            .where('active', '==', true).get();

        const evtUsers = await Promise.all(
            evtUsersRef.docs.map(async (evtUser) => {
                const user = await firebase.db.collection(COLLECTION.USER).doc(evtUser.id).get();
                return { id: evtUser.id, group: user.data().group }
            })
        )

        // Get a new write batch
        var batch = firebase.db.batch();

        _.each(evtUsers, async (user) => {
            var ubRef = firebase.db.collection(ubCollection).doc(`R${round}_${user.id}`);

            var data = {
                userId: user.id,
                group: user.group,
                round: round,
                betSum: {
                    corrected: 0,
                    wrong: 0,
                    total: 0
                },
                matches: {}
            }
            batch.set(ubRef, data);

        })

        // Commit the batch
        return batch.commit().then(() => {
            return { status: 'OK', message: `Tao xong vong du doan cho ${evtUsers.length} nguoi choi!` }
        });
    }
    //Get user's bet result by tournament Id 
    getUserBettingResults = async (group, eventId, round) => {
        const ratioPoint = {
            r1: 1,
            r2: 1,
            r3: 1,
            r4: 1.5,
            r5: 2
        }
        const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
        let betResultRef = null;

        if (group !== GROUP.ALL) {
            betResultRef = firebase.db.collection(ubCollection).where('group', 'in', [GROUP.ALL, group]);
        } else {
            betResultRef = firebase.db.collection(ubCollection);
        }
        if (round !== 0) {
            betResultRef = betResultRef.where('round', '==', round)
        }
        const betResult = await betResultRef.get();

        const betData = [];
        await betResult.docs.map((user) => {
            const userData = user.data();

            const betSum = {
                ...userData.betSum,
                missed: userData.betSum.total - (userData.betSum.corrected + userData.betSum.wrong),
                percent: userData.betSum.total !== 0 ? parseFloat((userData.betSum.corrected / userData.betSum.total).toFixed(2)) : 0,
                point: userData.betSum.corrected * ratioPoint[`r${userData.round}`]
            }

            let userRound = _.find(betData, ['id', userData.userId]);
            if (_.isEmpty(userRound)) {
                betData.push({
                    id: userData.userId,
                    rounds: [betSum],
                    [`round${userData.round}`]: {},
                    result: {}
                })
            } else {
                userRound.rounds.push(betSum)
            }
            return null
        })

        const tableResult = await Promise.all(
            betData.map(async (ub) => {
                let result = {};
                const user = await firebase.db.collection(COLLECTION.USER).doc(ub.id).get();
                ub['name'] = user.data().name
                ub['avatar'] = user.data().photoUrl

                await _.each(ub.rounds, (r, index) => {
                    result.corrected = (result.corrected || 0) + r.corrected;
                    result.wrong = (result.wrong || 0) + r.wrong;
                    result.missed = (result.missed || 0) + r.missed;
                    result.total = (result.total || 0) + r.total;
                    result.point = (result.point || 0) + r.point;
                    ub[`round${(index + 1)}`] = r;
                });

                result['percent'] = result.total !== 0 ? parseFloat((result.corrected / result.total).toFixed(2)) : 0;
                ub.result = result;

                return _.omit(ub, ['rounds'])
            })
        )


        return _.orderBy(tableResult, ['result.point', 'result.corrected', 'name'], ['desc', 'desc', 'asc']);
    }

    //Get bet statistic by gameId.
    getBetStatisticByGame = async (group, eventId, round, gameId, userId) => {
        let statistic = {
            firstWin: 0,
            secondWin: 0,
            firstWinExtra: 0,
            secondWinExtra: 0,
            notBet: 0
        }
        let myBet = {}

        const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
        let ubRef = null

        if (group !== GROUP.ALL) {
            ubRef = await firebase.db.collection(ubCollection)
                .where('group', 'in', [GROUP.ALL, group])
                .where('round', '==', round)
                .get();
        } else {
            ubRef = await firebase.db.collection(ubCollection)
                .where('round', '==', round)
                .get();
        }



        await ubRef.docs.map((ub) => {
            const bGame = ub.data().matches[gameId];
            if (_.isEmpty(bGame) || bGame.bet === 0) {
                statistic.notBet += 1;
            } else {
                statistic.firstWin += (bGame.bet === 1) ? 1 : 0
                statistic.secondWin += (bGame.bet === 2) ? 1 : 0
                statistic.firstWinExtra += (bGame.bet === 3) ? 1 : 0
                statistic.secondWinExtra += (bGame.bet === 4) ? 1 : 0
            }

            if (userId === ub.data().userId) {
                myBet = _.isEmpty(bGame) ? {
                    'bet': 0,
                    'betTime': null,
                    'result': -1
                } : bGame
            }

            return null
        })

        if (round <= 3) {
            statistic = { draw: statistic.firstWinExtra, ..._.omit(statistic, ['firstWinExtra', 'secondWinExtra']) }
        }

        return { myBet: myBet, statistic: statistic }
    }

    //Get an user's bet by game ids
    getUserBetByGameIds = async (betData, gameIds) => {
        const userRef = await firebase.db.collection(COLLECTION.USER).doc(betData.userId).get();
        const userBet = { id: betData.userId, name: userRef.data().name, avatar: userRef.data().photoUrl }

        await gameIds.map((gameId) => {
            console.log(betData);
            userBet[gameId] = !_.isEmpty(betData.matches[gameId]) ?
                betData.matches[gameId] :
                {
                    'bet': 0,
                    'betTime': null,
                    'result': -1
                };
            return null
        })

        return userBet
    }

    //Get all user's bet by game Id
    getCurrentBettingGames = async (group, eventId, currentRound, userId, gameIds) => {
        const gameCollection = _.toLower(eventId) + COLLECTION.GAME;
        const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
        const gamesRef = await firebase.db.collection(gameCollection);
        let query = null;
        let emptyGameIds = false;

        if (_.isEmpty(gameIds)) {
            emptyGameIds = true;
            gameIds = [];
            query = gamesRef.where('status', 'in', [GAME_STATUS.FINISHED, GAME_STATUS.BETTING]).orderBy('seq', 'asc')
        } else {
            query = gamesRef.where(firebase.firestore.FieldPath.documentId(), 'in', gameIds).orderBy('seq', 'asc')
        }

        const todayGames = await query.get();
        const games = await todayGames.docs.map(game => {
            const startTime = moment(game.data().startTime);
            const betTime = moment().add(-5, 'minutes')

            const canBet = betTime.isBefore(startTime);
            if (emptyGameIds) {
                gameIds.push(game.id);
            }
            return { id: game.id, canBet: canBet, ...game.data() }
        })

        let usersBet = [];
        if (!_.isEmpty(userId)) {
            const docId = `R${currentRound}_${userId}`
            const ubRef = await firebase.db.collection(ubCollection).doc(docId).get();
            const userBet = await this.getUserBetByGameIds(ubRef.data(), gameIds)
            usersBet.push(userBet)
        } else {
            const all_user = null
            if (group !== GROUP.ALL) {
                all_user = await firebase.db.collection(ubCollection)
                    .where('group', 'in', [GROUP.ALL, group])
                    .where('round', '==', currentRound).get();
            } else {
                all_user = await firebase.db.collection(ubCollection)
                    .where('round', '==', currentRound).get();
            }


            usersBet = await Promise.all(
                all_user.docs.map(async (ub) => {
                    return await this.getUserBetByGameIds(ub.data(), gameIds)
                })
            )
        }

        return { games: games, users: usersBet }
    }

    //Get all game already bet by user Id
    getGamesBetByUser = async (eventId, currentRound, userId) => {
        let userBetResult = {};
        const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
        const gameCollection = _.toLower(eventId) + COLLECTION.GAME;

        await Promise.all(
            _.map(Array(currentRound), async (__, i) => {
                const round = i + 1;
                const docId = `R${round}_${userId}`
                const ubRef = await firebase.db.collection(ubCollection).doc(docId).get();

                if (_.isEmpty(userBetResult)) {
                    userBetResult = {
                        betSum: ubRef.data().betSum,
                        matches: []
                    }
                } else {
                    userBetResult.betSum.corrected += ubRef.data().betSum.corrected
                    userBetResult.betSum.wrong += ubRef.data().betSum.wrong
                    userBetResult.betSum.total += ubRef.data().betSum.total
                }

                _.forIn(ubRef.data().matches, async (value, key) => {
                    const gameRef = await firebase.db.collection(gameCollection).doc(key).get();

                    userBetResult.matches.push({
                        id: key,
                        seq: gameRef.data().seq,
                        firstTeam: gameRef.data().firstTeam,
                        secondTeam: gameRef.data().secondTeam,
                        goals: gameRef.data().goals,
                        ...value
                    });
                });
                return round;
            })
        )
        if (!_.isEmpty(userBetResult)) {
            const userRef = await firebase.db.collection(COLLECTION.USER).doc(userId).get();
            userBetResult['name'] = userRef.data().name
            userBetResult['slogan'] = userRef.data().slogan

            userBetResult.matches = _.sortBy(userBetResult.matches, ['seq']);
        }

        return userBetResult;
    }

    //User set a bet to multiple games
    userBetGames = async (eventId, userId, round, betList) => {
        const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
        const gameCollection = _.toLower(eventId) + COLLECTION.GAME;
        let fails = [];
        const betData = {};

        try {
            const betRef = firebase.db.collection(ubCollection).doc(`R${round}_${userId}`)
            await Promise.all(
                betList.map(async (data) => {
                    //_.each(betList, async (data) => {
                    const gameRef = await firebase.db.collection(gameCollection).doc(data.gameId).get();

                    if (gameRef.exists) {
                        const startTime = moment(gameRef.data().startTime);
                        const betTime = moment().add(-5, 'minutes')

                        if (betTime.isBefore(startTime)) {
                            const mBet = {
                                bet: data.betValue,
                                betTime: new Date(),
                                result: -1
                            }
                            Object.assign(betData, { [`matches.${data.gameId}`]: mBet });

                        } else {
                            fails.push(gameRef.id);
                        }
                    }
                })
            )

            //Update bet info to firebase
            await betRef.update(betData);
            return fails.length == 0 ?
                { status: 'OK', message: 'Dự đoán kết quả trận đấu thành công.' } :
                { status: 'ERR', message: 'Đã hết thời gian dự đoán kết quả trận đấu.' }
        } catch (error) {
            return { status: 'ERR', message: 'Dự đoán kết quả không thành công, vui lòng kiểm tra lại' }
        }

    }

    userBetWinnerTeam = (eventId, userId, teamId) => {
        const eventRef = firebase.db.collection(COLLECTION.EVENT_SUMMARY).doc(eventId);

        return firebase.db.runTransaction((transaction) => {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(eventRef).then((evt) => {
                if (!evt.exists) {
                    throw "Document does not exist!";
                }

                let userResult = evt[userId];
                if (userResult) {
                    userResult = { ...userResult, betTeam: teamId }
                } else {
                    userResult = {
                        "betTeam": teamId,
                        "corrected": 0,
                        "wrong": 0,
                        "missed": 0,
                        "percent": 0
                    }
                }

                transaction.update(eventRef, { [`users.${userId}`]: userResult });
                return {};
            });
        }).then(() => {
            //Update result to user bet collection
            return { status: 'OK', message: 'Dự đoán đội vô địch thành công!' }
        }).catch((error) => {
            console.log("Transaction failed: ", error);
            return { status: 'ERR', message: 'Lỗi Dự đoán đội vô địch!' }
        });
    }

    //Update data base on game finished
    updateGameResult = async (eventId, gameId, goals) => {
        const gameCollection = _.toLower(eventId) + COLLECTION.GAME;
        const gameRef = firebase.db.collection(gameCollection).doc(gameId);

        return firebase.db.runTransaction((transaction) => {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(gameRef).then((game) => {
                if (!game.exists) {
                    throw "Document does not exist!";
                }

                const result = euroHandicap(goals, game.data().betId);
                goals['result'] = result;

                transaction.update(gameRef, { goals: goals, status: GAME_STATUS.FINISHED });
                return { eventId: eventId, round: game.data().round, gameId: game.id, result: result };
            });
        }).then((data) => {
            //Update result to user bet collection
            return this.setUserBetResult(data);
        }).catch((error) => {
            console.log("Transaction failed: ", error);
            return { status: 'ERR', message: 'Lỗi cập nhật tỉ số trận đấu!' }
        });
    }

    //Private func: Update bet data to DB
    setUserBetResult = async (data) => {
        const ubCollection = _.toLower(data.eventId) + COLLECTION.USER_BET;
        const ubRef = await firebase.db.collection(ubCollection).where('round', '==', data.round).get();

        const usersResult = await Promise.all(
            ubRef.docs.map(async (ub) => {
                let betValues = !_.isEmpty(ub.data().matches[data.gameId]) ? ub.data().matches[data.gameId] :
                    {
                        bet: 0,
                        betTime: null,
                        result: -1,
                    };

                betValues.result = betValues.bet === data.result ? 1 : 0;

                let corrected = 0, wrong = 0;
                _.forIn(ub.data().matches, function (value, key) {
                    if (key !== data.gameId) {
                        corrected += (value.result === 1) ? 1 : 0
                        wrong += (value.result === 0) ? 1 : 0
                    }
                });
                let betSum = ub.data().betSum;
                betSum.corrected = (betValues.result === 1) ? corrected + 1 : corrected;
                betSum.wrong = (betValues.result === 0) ? wrong + 1 : wrong;
                betSum.total = betSum.corrected + betSum.wrong + (betValues.result === -1 ? 1 : 0)

                return {
                    id: ub.id,
                    betSum: betSum,
                    [`matches.${data.gameId}`]: betValues
                }
            })
        )

        // Get a new write batch
        var batch = firebase.db.batch();

        _.each(usersResult, async (user) => {
            var ubRef = firebase.db.collection(ubCollection).doc(user.id);
            batch.update(ubRef, _.omit(user, ['id']));
        })

        // Commit the batch
        return batch.commit().then(() => {
            return { status: 'OK', message: 'Tỉ số trận đấu đã được cập nhật thành công.' }
        }).catch((err) => {
            console.error(err);
            return { status: 'ERR', message: 'Lỗi cập nhật tỉ số trận đấu!' }
        });
    }

}

export default new BettingService();

