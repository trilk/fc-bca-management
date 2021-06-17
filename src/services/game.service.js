import _ from 'lodash'
import * as moment from 'moment'
import * as firebase from 'src/firebase'
import { GAME_STATUS, COLLECTION } from 'src/utils/_constants'
import { getPoint } from 'src/utils/_common'

class GameService {
    getStandingTables = async (eventId) => {
        const teamCollection = _.toLower(eventId) + COLLECTION.TEAM;
        const teamsRef = await firebase.db.collection(teamCollection)
            .where('table', '!=', '')
            .orderBy('table', 'asc').get();
        let tables = {}

        await Promise.all(
            teamsRef.docs.map(async (team) => {
                var tbName = team.data().table
                if (_.isEmpty(tables[tbName])) {
                    tables[tbName] = []
                }

                tables[tbName].push({
                    id: team.id,
                    name: team.data().name,
                    flagCode: team.data().flagCode,
                    ...team.data().played,
                    gF: team.data().goals.for,
                    gA: team.data().goals.against,
                    gD: team.data().goals.diff,
                    point: team.data().point
                })
            })
        )

        _.forIn(tables, (value, key) => {
            tables[key] = _.orderBy(value, ['point', 'gD', 'gF', 'name'], ['desc', 'desc', 'desc', 'asc']);
        })

        return tables;
    }

    getAllGames = async (eventId) => {
        const teamCollection = _.toLower(eventId) + COLLECTION.TEAM;
        const gameCollection = _.toLower(eventId) + COLLECTION.GAME;
        // const eventRef = await firebase.db.collection(COLLECTION.EVENT).doc(eventId).get();
        const gamesRef = await firebase.db.collection(gameCollection)
            .orderBy('seq', "asc").get();
        const teamsRef = await firebase.db.collection(teamCollection).orderBy('table', 'asc').get();

        const teams = await teamsRef.docs.map(team => {
            return { id: team.id, flagCode: team.data().flagCode, name: team.data().name }
        })
        let rounds = {
            grp: [],
            ro16: [],
            qf: [],
            sf: [],
            final: []
        }
        await gamesRef.docs.map((game, index) => {
            var firstTeam = _.find(teams, ['id', game.data().firstTeam]);
            var secondTeam = _.find(teams, ['id', game.data().secondTeam]);
            var match = { id: game.id, firstTeam, secondTeam, ..._.omit(game.data(), ['table', 'firstTeam', 'secondTeam']) };
            if (match.seq <= 36) {
                match['match'] = game.data().table
                rounds.grp.push(match)
            } else if (match.seq <= 44) {
                match['match'] = `R${match.seq - 36}`
                rounds.ro16.push(match)
            } else if (match.seq <= 48) {
                match['match'] = `Q${match.seq - 44}`
                rounds.qf.push(match)
            } else if (match.seq <= 50) {
                match['match'] = `SF${match.seq - 48}`
                rounds.sf.push(match)
            } else {
                match['match'] = 'F'
                rounds.final.push(match)
            }
            return ''
        })

        return rounds
    }

    getGamesByRound = async (eventId, round) => {
        const gameCollection = _.toLower(eventId) + COLLECTION.GAME;
        const gamesRef = firebase.db.collection(gameCollection)
        let query = null;

        if (_.isEmpty(round)) {
            query = await gamesRef.orderBy('seq', "asc").get();
        } else {
            query = await gamesRef.where('round', '==', round).orderBy('seq', "asc").get();
        }
        return await query.docs.map((game) => {
            return { id: game.id, ...game.data() };
        })
    }

    getGamesByStatus = async (eventId, statuses) => {
        const gameCollection = _.toLower(eventId) + COLLECTION.GAME;
        const gamesRef = firebase.db.collection(gameCollection)
        let query = null;

        if (_.isEmpty(statuses)) {
            query = await gamesRef.orderBy('seq', "asc").get();
        } else {
            query = await gamesRef.where('status', 'in', statuses).orderBy('seq', "asc").get();
        }
        return await query.docs.map((game) => {
            return { id: game.id, ...game.data() };
        })
    }

    getUserBetByGame = async (eventId, userId, gameId, round) => {
        if (userId === '') return null;
        const ubCollection = _.toLower(eventId) + COLLECTION.USER_BET;

        const user_bet = await firebase.db.collection(ubCollection).doc(`R${round}_${userId}`).get();
        if (user_bet.exists) {

            let info = !_.isEmpty(user_bet.data().matches[gameId]) ?
                user_bet.data().matches[gameId] :
                {
                    'bet': 0,
                    'result': -1
                };

            return info;
        }

        return null;

    }

    getGamesToBet = async (eventId, userId) => {
        const gameCollection = _.toLower(eventId) + COLLECTION.GAME;
        const gamesRef = await firebase.db.collection(gameCollection)
            .where('status', 'in', [GAME_STATUS.FINISHED, GAME_STATUS.BETTING])
            .orderBy('seq', "asc").get();

        return await Promise.all(
            gamesRef.docs.map(async (game) => {
                const myBet = await this.getUserBetByGame(eventId, userId, game.id, game.data().round);

                const startTime = moment(game.data().startTime);
                const betTime = moment().add(-5, 'minutes')

                const canBet = betTime.isBefore(startTime);
                return { ...game.data(), id: game.id, canBet: canBet, myBet: myBet }
            })
        )
    }

    updateStatusOfGames = async (eventId, games) => {
        const gameCollection = _.toLower(eventId) + COLLECTION.GAME;
        // Get a new write batch
        var batch = firebase.db.batch();

        _.each(games, async (game) => {
            var gameRef = firebase.db.collection(gameCollection).doc(game.id);
            batch.update(gameRef, { status: game.status, updatedAt: new Date() });
        })

        // Commit the batch
        return batch.commit().then(() => {
            return { status: 'OK', message: 'Trận đấu đã được cập nhật thành công.' }
        }).catch((err) => {
            console.error(err);
            return { status: 'ERR', message: 'Lỗi cập nhật status cho trận đấu!' }
        });

    }

    updateStandingTable = async (eventId, table) => {
        const teamCollection = _.toLower(eventId) + COLLECTION.TEAM;
        const gameCollection = _.toLower(eventId) + COLLECTION.GAME;

        const gamesRef = await firebase.db.collection(gameCollection)
            .where('table', '==', table)
            .where('status', '==', GAME_STATUS.FINISHED).get();

        let playedTeams = []
        await gamesRef.docs.map(game => {
            playedTeams = getPoint(playedTeams, game.data(), true)
            playedTeams = getPoint(playedTeams, game.data(), false)
            return null
        })

        var batch = firebase.db.batch();

        _.each(playedTeams, async (team) => {
            var teamRef = firebase.db.collection(teamCollection).doc(team.id);
            batch.update(teamRef, team);
        })

        // Commit the batch
        return batch.commit().then((response) => {
            return this.getStandingTable(eventId, table)
        });
    }

    getStandingTable = async (eventId, table) => {
        const teamCollection = _.toLower(eventId) + COLLECTION.TEAM;
        const teamsRef = await firebase.db.collection(teamCollection).where('table', '==', table).get();

        const teams = await Promise.all(
            teamsRef.docs.map(async (team) => {
                return {
                    id: team.id,
                    name: team.data().name,
                    flagCode: team.data().flagCode,
                    ...team.data().played,
                    gF: team.data().goals.for,
                    gA: team.data().goals.against,
                    gD: team.data().goals.diff,
                    point: team.data().point
                }
            })
        )

        const results = _.orderBy(teams, ['point', 'gD', 'gF', 'name'], ['desc', 'desc', 'desc', 'asc']);
        return _.map(results, (t, index) => {
            return { position: index + 1, ...t }
        })
    }

}

export default new GameService();