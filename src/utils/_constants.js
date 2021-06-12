export const COLLECTION = {
    USER: 'users',
    EVENT: 'events',
    BET: 'bets',
    FUND: 'funds',
    FUND_TRACK: 'fund_trackings',
    MATCH: 'matches',
    PAYMENT: 'user_payments',
    GAME: '_games',
    TEAM: '_teams',
    USER_BET: '_bettings',
    EVENT_SUMMARY: 'event_summary'
}

export const GROUP = {
    ALL: "_",
    BCA: 'BCA',
    CCG: 'CCG',
    IVC: 'IVC',
    EMPTY: '',
    DEFAULT: 'BCA'
}
export const USER_ROLE = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
}
export const USER_STATUS = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    IDLE: 'IDLE'
};

export const TEAM_STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    ON_GOING: 'ON_GOING',
    CLOSED: 'CLOSED',
    CANCELLED: 'CANCELLED'
}

export const TEAM_TYPE = {
    SPORT: "SPORT",
    GAME: "GAME"
}

export const GAME_STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    BETTING: 'BETTING',
    FINISHED: 'FINISHED',
    DONE: 'DONE'
}
export const BET_CODE = {
    EU_90: 'EU_90P',
    EU_120: 'EU_120P'
}
export const BET_RESULT = {
    MISSED: 0,
    WRONG: -1,
    CORRECTED: 1
}

export const FUNDING = {
    OPEN: 'OPEN',
    ACCEPTED: 'ACCEPTED'
}

export const GENDER = {
    M: 'gender.male',
    F: 'gender.female',
    O: 'gender.other'
};

export const MODAL_RESPONSE_TYPE = {
    BETTING: 'BETTING',
    CHANGE_STATUS: 'CHANGE_STATUS',
    SET_RESULT: 'SET_RESULT',
}

export const MESSAGES = {
    UNKNOW_ERROR: 'msg_unknow_error'
}

export const CHANNEL_TYPES = {
    VIBER: 'Viber',
    ZALO: 'Zalo'
}

export const DATETIME_FORMAT = {
    VI_DATE: 'DD/MM/YYYY',
    EN_DATE: 'MM/DD/YYYY',
    TIME_12: 'hh:mm A',
    TIME_24: 'HH:mm',
    VI_DATETIME_12: 'hh:mm A DD/MM/YYYY',
    EN_DATETIME_12: 'MM/DD/YYYY hh:mm A',
    VI_DATETIME_24: 'HH:mm DD/MM/YYYY',
    EN_DATETIME_24: 'MM/DD/YYYY HH:mm',
}

export const SELECT_STYLES = {
    searchBox: {
        padding: "3px"
    },
    inputField: {
        margin: "2px"
    },
    groupHeading: {
        "font-weight": "bold"
    },
    option: {
        'padding-top': '4px',
        'padding-bottom': '4px'
    },
}