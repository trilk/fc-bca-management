import { SHOW_MODAL, EVENT_TEAMS } from "../actions/types";

const initialState = {
    showModal: false,
    teams: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SHOW_MODAL:
            return { ...state, showModal: payload };
        case EVENT_TEAMS:
            return { ...state, teams: payload };
        default:
            return state;
    }
}
