import * as fbDb from 'src/services/index'
import { SHOW_MODAL, SHOW_ADMIN_MODAL } from './types';
import _ from 'lodash'

export const showTeamSelection = (isShow) => (dispatch) => {
    dispatch({
        type: SHOW_MODAL,
        payload: isShow,
    });
}

export const showAdminModal = (isShow) => (dispatch) => {
    dispatch({
        type: SHOW_ADMIN_MODAL,
        payload: isShow,
    });
}

export const calculateUserPointByRound = (eventId, round) => (dispatch) => {
    fbDb.AdminService.finalBettingRound(eventId, round).then(response => {
        console.log(response)
    })
}

export const startRound = (eventId, round) => (dispatch) => {
    fbDb.AdminService.startBettingRound(eventId, round).then(response => {
        console.log(response)
    })
}

export const updateStandingTable = (eventId, table) => {
    fbDb.GameService.updateStandingTable(eventId, table).then((response) => {
        return response;
    })
}