import { toLower } from 'lodash'
import * as firebase from 'src/firebase'
import { COLLECTION } from 'src/utils/_constants'

class EventService {

    getTeamsByGroup = async (group, role, userId) => {
        if (role === 'admin') {
            group = '';
        }
        const dbRef = firebase.db.collection(COLLECTION.EVENT);
        let query = null;

        if (group !== '') {
            query = dbRef.where('group', 'in', [group, '']).orderBy('startDate', "desc");
        } else {
            query = dbRef.orderBy('startDate', "desc");
        }
        const teams = await query.get();

        return await Promise.all(
            teams.docs.map(async (doc) => {
                const user_team = await firebase.db.doc(`${COLLECTION.EVENT}/${doc.id}/users/${userId}`).get();
                let info = user_team ? user_team.data() : {
                    id: doc.id,
                    active: false,
                    date: '',
                    type: ""
                };

                return Object.assign({ id: doc.id }, info, doc.data());
            })
        );

    }

    getUsersByEvent = async (eventId, group) => {
        const dbRef = await firebase.db.collection(COLLECTION.EVENT).doc(eventId).get();

        const event = dbRef.data();
        if (event) {
            const users_team = await firebase.db.collection(`${COLLECTION.EVENT}/${eventId}/users/`).get();
            const users = await Promise.all(
                users_team.docs.map(async (doc) => {
                    const user = await firebase.db.doc(`users/${doc.id}`).get();
                    return Object.assign({ id: doc.id }, user.data(), doc.data());
                }))
            return Object.assign({}, { users: users }, event);
        } else {
            return null;
        }
    }

    getTeamsByEvent = async (eventId) => {
        const teamCollection = toLower(eventId) + COLLECTION.TEAM
        const teamsRef = await firebase.db.collection(teamCollection)
            .where('table', '!=', '').orderBy('table', 'asc').get();

        return await Promise.all(
            teamsRef.docs.map((team) => {
                return { id: team.id, name: team.data().name, flagCode: team.data().flagCode }
            })
        )
    }

    getAllTeams = async (eventId) => {
        const teamCollection = toLower(eventId) + COLLECTION.TEAM
        const teamsRef = await firebase.db.collection(teamCollection)
            .orderBy('table', 'asc').get();

        return await Promise.all(
            teamsRef.docs.map((team) => {
                return { id: team.id, ...team.data() }
            })
        )
    }

    getEventSummary = async (eventId) => {
        const sumRef = await firebase.db.collection(COLLECTION.EVENT_SUMMARY).doc(eventId).get()

        if (sumRef.exists) {
            return sumRef.data()
        }

        return null;
    }

}

export default new EventService();