import _, { isEqual } from "lodash";
import * as moment from "moment";
import * as firebase from "src/firebase";
import { COLLECTION, GAME_STATUS, GROUP } from "src/utils/_constants";
import { euroHandicap } from "src/utils/_common";

class BettingService {
  //Get user's bet result by tournament Id
  getUserBettingRound = async (group, eventId, round) => {
    const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
    let betResultRef = null;

    if (group !== GROUP.ALL) {
      betResultRef = firebase.db
        .collection(ubCollection)
        .where("group", "in", [GROUP.ALL, group]);
    } else {
      betResultRef = firebase.db.collection(ubCollection);
    }
    if (round !== 0) {
      betResultRef = betResultRef.where("round", "==", round);
    }
    const betResult = await betResultRef.get();

    const betData = [];
    return await betResult.docs.map((user) => {
      const userData = user.data();

      let userRound = _.find(betData, ["id", userData.userId]);
      if (_.isEmpty(userRound)) {
        userRound = {
          id: userData.userId,
          [`R${userData.round}`]: userData.betSum,
          // result: {}
        };
        betData.push(userRound);
      } else {
        userRound[`R${userData.round}`] = userData.betSum;
      }
      return userRound;
    });

    // return _.orderBy(tableResult, ['result.point', 'result.corrected', 'name'], ['desc', 'desc', 'asc']);
  };

  calculatePointTable = async (
    userPts,
    evtSummary,
    evtTeams,
    storedUsers,
    myId
  ) => {
    const usersResult = await storedUsers.map((user) => {
      const rUser = _.find(userPts, ["id", user.id]);
      const evtUser = { ...rUser, ...evtSummary.users[user.id] };

      let betResult = {
        corrected: 0,
        wrong: 0,
        total: 0,
        point: 0,
      };
      Object.keys(evtUser).forEach((key) => {
        if (key !== "id" && key !== "betTeam") {
          evtUser[key]["missed"] =
            evtUser[key].total - (evtUser[key].corrected + evtUser[key].wrong);
          evtUser[key]["percent"] =
            evtUser[key].total !== 0
              ? (evtUser[key].corrected / evtUser[key].total).toFixed(2)
              : 0;
          evtUser[key]["point"] = evtUser[key].point || evtUser[key].corrected;

          betResult.corrected += evtUser[key].corrected;
          betResult.wrong += evtUser[key].wrong;
          betResult.total += evtUser[key].total;
          betResult.point += evtUser[key].point;
        }
      });

      betResult["missed"] =
        betResult.total - (betResult.corrected + betResult.wrong);
      betResult["percent"] =
        betResult.total !== 0
          ? (betResult.corrected / betResult.total).toFixed(2)
          : 0;

      const favTeam = _.find(evtTeams, ["id", evtUser.betTeam]);
      // const stUser = _.find(storedUsers, ["id", user.id]);
      let _class = {};
      if (user.id === myId) {
        _class = {
          _classes: "my-position",
        };
      }
      return {
        ...user,
        ...evtUser,
        favTeam: favTeam,
        result: betResult,
        ..._class,
      };
    });

    return usersResult;
  };

  //Get bet statistic by gameId.
  getBetStatisticByGame = async (group, eventId, round, gameId, userId) => {
    let statistic = {
      firstWin: 0,
      secondWin: 0,
      firstWinExtra: 0,
      secondWinExtra: 0,
      notBet: 0,
    };
    let myBet = {},
      usedStar = false;

    const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
    let ubRef = null;

    if (group !== GROUP.ALL) {
      ubRef = await firebase.db
        .collection(ubCollection)
        .where("group", "in", [GROUP.ALL, group])
        .where("round", "==", round)
        .get();
    } else {
      ubRef = await firebase.db
        .collection(ubCollection)
        .where("round", "==", round)
        .get();
    }

    await ubRef.docs.map((ub) => {
      const bGame = ub.data().matches[gameId];
      if (_.isEmpty(bGame) || bGame.bet === 0) {
        statistic.notBet += 1;
      } else {
        statistic.firstWin += bGame.bet === 1 ? 1 : 0;
        statistic.secondWin += bGame.bet === 2 ? 1 : 0;
        statistic.firstWinExtra += bGame.bet === 3 ? 1 : 0;
        statistic.secondWinExtra += bGame.bet === 4 ? 1 : 0;
      }

      if (userId === ub.data().userId) {
        usedStar = ub.data().usedStar || false;
        myBet = _.isEmpty(bGame)
          ? {
              bet: 0,
              result: -1,
            }
          : bGame;
      }

      return null;
    });

    if (round <= 3) {
      statistic = {
        draw: statistic.firstWinExtra,
        ..._.omit(statistic, ["firstWinExtra", "secondWinExtra"]),
      };
    }

    return { myBet: myBet, statistic: statistic, usedStar: usedStar };
  };

  //Get an user's bet by game ids
  getUserBetByGameIds = async (betData, gameIds) => {
    // const userRef = await firebase.db.collection(COLLECTION.USER).doc(betData.userId).get();
    // const initName = userRef.data().name.split(" ").map((n) => n[0]).join(".");
    const userBet = { id: betData.userId };

    await gameIds.map((gameId) => {
      // console.log(betData);
      userBet[gameId] = !_.isEmpty(betData.matches[gameId])
        ? betData.matches[gameId]
        : {
            bet: 0,
            result: -1,
          };
      return null;
    });

    return userBet;
  };

  //Get all user's bet by game Id
  getCurrentBettingGames = async (
    group,
    eventId,
    currentRound,
    userId,
    gameIds
  ) => {
    const gameCollection = _.toLower(eventId) + COLLECTION.GAME;
    const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
    const gamesRef = await firebase.db.collection(gameCollection);
    let query = null;
    let emptyGameIds = false;

    if (_.isEmpty(gameIds)) {
      emptyGameIds = true;
      gameIds = [];
      query = gamesRef
        .where("status", "==", GAME_STATUS.BETTING)
        .orderBy("seq", "asc");
    } else {
      query = gamesRef
        .where(firebase.firestore.FieldPath.documentId(), "in", gameIds)
        .orderBy("seq", "asc");
    }

    const todayGames = await query.get();
    if (todayGames.docs.length === 0) {
      return null;
    }
    const games = await todayGames.docs.map((game) => {
      const startTime = moment(game.data().startTime);
      const betTime = moment().add(-5, "minutes");

      const canBet = betTime.isBefore(startTime);
      if (emptyGameIds) {
        gameIds.push(game.id);
      }
      return { id: game.id, canBet: canBet, ...game.data() };
    });

    let usersBet = [];
    if (!_.isEmpty(userId)) {
      const docId = `R${currentRound}_${userId}`;
      const ubRef = await firebase.db.collection(ubCollection).doc(docId).get();
      const userBet = await this.getUserBetByGameIds(ubRef.data(), gameIds);
      usersBet.push(userBet);
    } else {
      let all_user = null;
      if (group !== GROUP.ALL) {
        all_user = await firebase.db
          .collection(ubCollection)
          .where("group", "in", [GROUP.ALL, group])
          .where("round", "==", currentRound)
          .orderBy("betSum.corrected", "desc")
          .get();
      } else {
        all_user = await firebase.db
          .collection(ubCollection)
          .where("round", "==", currentRound)
          .orderBy("betSum.corrected", "desc")
          .get();
      }

      usersBet = await Promise.all(
        all_user.docs.map(async (ub) => {
          return await this.getUserBetByGameIds(ub.data(), gameIds);
        })
      );
    }

    return { games: games, users: _.orderBy(usersBet, [], []) };
  };

  //Get all game already bet by user Id
  getGamesBetByUser = async (eventId, currentRound, userId) => {
    // const ratioPoint = {
    //   r1: 1,
    //   r2: 1,
    //   r3: 1,
    //   r4: 1.5,
    //   r5: 2,
    // };
    let userBetResult = {};
    const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
    const gameCollection = _.toLower(eventId) + COLLECTION.GAME;

    await Promise.all(
      _.map(Array(currentRound), async (__, i) => {
        const roundNo = i + 1;
        const docId = `R${roundNo}_${userId}`;
        const ubRef = await firebase.db
          .collection(ubCollection)
          .doc(docId)
          .get();
        const betSum = {
          ...ubRef.data().betSum,
          missed:
            ubRef.data().betSum.total -
            (ubRef.data().betSum.corrected + ubRef.data().betSum.wrong),
          point: ubRef.data().betSum.point || ubRef.data().betSum.corrected,
        };

        if (_.isEmpty(userBetResult)) {
          userBetResult = {
            betSum: _.cloneDeep(betSum),
            rounds: [],
          };
        } else {
          userBetResult.betSum.corrected += betSum.corrected;
          userBetResult.betSum.wrong += betSum.wrong;
          userBetResult.betSum.total += betSum.total;
          userBetResult.betSum.point += betSum.point;
        }

        let roundObj = {
          round: roundNo,
          betSum: _.cloneDeep(betSum),
          matches: [],
        };

        let matches = [];
        await Promise.all(
          Object.keys(ubRef.data().matches).map(async (key, index) => {
            const gameRef = await firebase.db
              .collection(gameCollection)
              .doc(key)
              .get();
            const matchBet = ubRef.data().matches[key];

            if (gameRef.data().status !== GAME_STATUS.BETTING) {
              matches.push({
                id: key,
                seq: gameRef.data().seq,
                firstTeam: gameRef.data().firstTeam,
                secondTeam: gameRef.data().secondTeam,
                goals: gameRef.data().goals,
                bet: matchBet.bet,
                usedStar: matchBet.usedStar || false,
                isOver: matchBet.isOver,
                result: matchBet.result,
                point:
                  matchBet.point ||
                  (matchBet.result !== -1 ? matchBet.result : ""),
              });
            }
          })
        );

        roundObj.matches = _.sortBy(matches, ["seq"]);
        userBetResult.rounds.push(roundObj);
        return roundNo;
      })
    );
    if (!_.isEmpty(userBetResult)) {
      const userRef = await firebase.db
        .collection(COLLECTION.USER)
        .doc(userId)
        .get();
      userBetResult["name"] = userRef.data().name;
      userBetResult["slogan"] = userRef.data().slogan;
      userBetResult["avatar"] = userRef.data().photoUrl;
      userBetResult.betSum["missed"] =
        userBetResult.betSum.total -
        (userBetResult.betSum.corrected + userBetResult.betSum.wrong);

      userBetResult.rounds = _.sortBy(userBetResult.rounds, ["round"], ["asc"]);
    }

    return userBetResult;
  };

  //User set a bet to multiple games
  userBetGames = async (eventId, userId, round, betList) => {
    const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;
    const gameCollection = _.toLower(eventId) + COLLECTION.GAME;
    let fails = [];
    let betData = {};
    let usedStar = false,
      changedStar = false;

    try {
      const betRef = firebase.db
        .collection(ubCollection)
        .doc(`R${round}_${userId}`);
      await Promise.all(
        betList.map(async (data) => {
          //_.each(betList, async (data) => {
          const gameRef = await firebase.db
            .collection(gameCollection)
            .doc(data.gameId)
            .get();

          if (gameRef.exists) {
            const startTime = moment(gameRef.data().startTime);
            const betTime = moment().add(-5, "minutes");

            if (betTime.isBefore(startTime)) {
              let mBet = {
                bet: data.betValue,
                result: -1,
              };
              if (data.usedStar || false) {
                mBet["usedStar"] = true;
                usedStar = true;
              }
              if (data.isOver !== undefined) {
                mBet["isOver"] = data.isOver;
              }
              if (!changedStar) {
                changedStar = data.changedStar || false;
              }

              betData = changedStar
                ? Object.assign(betData, {
                    [`matches.${data.gameId}`]: mBet,
                    usedStar: usedStar,
                  })
                : Object.assign(betData, { [`matches.${data.gameId}`]: mBet });
            } else {
              fails.push(gameRef.id);
            }
          }
        })
      );

      //Update bet info to firebase
      await betRef.update(betData);

      if (fails.length === 0) {
        return {
          status: "OK",
          message: "Dự đoán kết quả trận đấu thành công.",
        };
      }
      return {
        status: "ERR",
        message: "Đã hết thời gian dự đoán kết quả trận đấu.",
      };
    } catch (error) {
      return {
        status: "ERR",
        message: "Dự đoán kết quả không thành công, vui lòng kiểm tra lại",
      };
    }
  };

  userBetWinnerTeam = (eventId, userId, teamId) => {
    const eventRef = firebase.db
      .collection(COLLECTION.EVENT_SUMMARY)
      .doc(eventId);

    return firebase.db
      .runTransaction((transaction) => {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(eventRef).then((evt) => {
          if (!evt.exists) {
            throw "Document does not exist!";
          }

          let userResult = evt.data().users[userId];
          if (userResult) {
            userResult = { ...userResult, betTeam: teamId };
          } else {
            userResult = {
              betTeam: teamId,
              corrected: 0,
              wrong: 0,
              missed: 0,
              percent: 0,
            };
          }

          transaction.update(eventRef, { [`users.${userId}`]: userResult });
          return {};
        });
      })
      .then(() => {
        //Update result to user bet collection
        return { status: "OK", message: "Dự đoán đội vô địch thành công!" };
      })
      .catch((error) => {
        console.log("Transaction failed: ", error);
        return { status: "ERR", message: "Lỗi Dự đoán đội vô địch!" };
      });
  };

  userUsedStar = (eventId, userId, usedStar) => {
    const eventRef = firebase.db
      .collection(COLLECTION.EVENT_SUMMARY)
      .doc(eventId);

    return firebase.db
      .runTransaction((transaction) => {
        return transaction.get(eventRef).then((evt) => {
          if (!evt.exists) {
            throw "Document does not exist!";
          }

          let userResult = evt.data().users[userId];
          if (userResult) {
            userResult = { ...userResult, usedStar: usedStar };
          }

          transaction.update(eventRef, { [`users.${userId}`]: userResult });
          return {};
        });
      })
      .then(() => {
        //Update result to user bet collection
        return {
          status: "OK",
          message: `Dự đoán kết quả trận đấu ${
            usedStar ? "với" : "hủy"
          } ngôi sao hi vọng thành công!`,
        };
      })
      .catch((error) => {
        console.log("Transaction failed: ", error);
        return { status: "ERR", message: "Có lỗi gì đó!" };
      });
  };
}

export default new BettingService();
