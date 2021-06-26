import _, { isEqual } from 'lodash'
import * as moment from 'moment'
import * as firebase from 'src/firebase'
import { COLLECTION, GAME_STATUS, GROUP } from 'src/utils/_constants'
import { calculatePoint, euroHandicap } from 'src/utils/_common'

class AdminService {

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
    finalBettingRound = async (eventId, round) => {
        if (round === 0) {
            return { status: 'ERR', message: 'Loi roi!' }
        }

        const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
        const betResult = await firebase.db.collection(ubCollection)
            .where('round', '==', round).get();

        let users = {}
        let sumAll = {
            corrected: 0,
            wrong: 0,
            total: 0
        }

        //console.log({ [`R${round}`]: sumAll, users: users });

        const evtSummaryRef = firebase.db.collection(COLLECTION.EVENT_SUMMARY).doc(eventId);

        return firebase.db.runTransaction((transaction) => {
            return transaction.get(evtSummaryRef).then(async (evtSmr) => {
                if (!evtSmr.exists) {
                    throw "Document does not exist!";
                }

                await betResult.docs.map((user) => {

                    const userData = user.data();
                    const userId = user.id.slice(3)
                    users[userId] = {
                        ...evtSmr.data().users[userId],
                        ['R' + round]: {
                            corrected: userData.betSum.corrected,
                            wrong: userData.betSum.wrong,
                            total: userData.betSum.total,
                        }
                    }
                    sumAll.corrected += userData.betSum.corrected
                    sumAll.wrong += userData.betSum.wrong
                    sumAll.total += userData.betSum.total

                    return true
                })

                const rounds = {
                    ...evtSmr.data().rounds,
                    [`R${round}`]: sumAll
                }

                transaction.update(evtSummaryRef, { rounds: rounds, users: users });
                return true;
            });
        }).then(() => {
            return { status: 'OK', message: 'Thanh Cong' }
        }).catch((error) => {
            console.log("Transaction failed: ", error);
            return { status: 'ERR', message: 'Lỗi cập nhật summary!' }
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

                transaction.update(gameRef, { goals: goals, status: GAME_STATUS.FINISHED, updatedAt: new Date() });
                return { eventId: eventId, round: game.data().round, gameId: game.id, result: result, total: game.data().seq };
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
        let startIdx = 0
        switch (data.round) {
            case 1:
                startIdx = -1
                break;
            case 2:
                startIdx = 12
                break;
            case 3:
                startIdx = 24
                break;
            case 4:
                startIdx = 36
                break;
            case 5:
                startIdx = 44
                break;
            default:
                break;
        }
        const ubCollection = _.toLower(data.eventId) + COLLECTION.USER_BET;
        const ubRef = await firebase.db.collection(ubCollection).where('round', '==', data.round).get();

        const usersResult = await Promise.all(
            ubRef.docs.map(async (ub) => {
                let betValues = !_.isEmpty(ub.data().matches[data.gameId]) ? ub.data().matches[data.gameId] :
                    {
                        bet: 0,
                        result: -1,
                    };

                if (betValues.bet !== 0) {
                    betValues.result = betValues.bet === data.result ? 1 : 0;
                    if (data.round > 3) {
                        betValues['point'] = calculatePoint(betValues.bet, data.result, data.round, betValues.usedStar || false)
                    }
                }

                let corrected = 0, wrong = 0, point = 0;
                _.forIn(ub.data().matches, function (value, key) {
                    if (key !== data.gameId) {
                        corrected += (value.result === 1) ? 1 : 0
                        wrong += (value.result === 0) ? 1 : 0
                        point += value.point || 0
                    }
                });
                let betSum = ub.data().betSum;
                betSum.corrected = (betValues.result === 1) ? corrected + 1 : corrected;
                betSum.wrong = (betValues.result === 0) ? wrong + 1 : wrong;
                betSum.total = data.total - startIdx;
                if (data.round > 3) {
                    betSum['point'] = point + betValues['point']
                }

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
export default new AdminService();