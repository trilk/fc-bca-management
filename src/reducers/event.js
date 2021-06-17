import { SHOW_MODAL, EVENT_TEAMS, SHOW_ADMIN_MODAL } from "../actions/types";

const initialState = {
    showModal: false,
    showAdminModal: false,
    teams: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SHOW_MODAL:
            return { ...state, showModal: payload };
        case SHOW_ADMIN_MODAL:
            return { ...state, showAdminModal: payload };
        case EVENT_TEAMS:
            return { ...state, teams: payload };
        default:
            return state;
    }
}
