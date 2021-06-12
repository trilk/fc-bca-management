import * as fbDb from 'src/services/index'
import { SHOW_MODAL } from './types';
import _ from 'lodash'

export const showTeamSelection = (isShow) => (dispatch) => {
    dispatch({
        type: SHOW_MODAL,
        payload: isShow,
    });
}

export const startRound = (event) => (dispatch) => {
    fbDb.BettingService.startBettingRound(event.id, event.round).then(response => {
        console.log(response)
    })
}

export const updateStandingTable = (eventId, table) => {
    fbDb.GameService.updateStandingTable(eventId, table).then((response) => {
        return response;
    })
}