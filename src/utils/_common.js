import moment from 'moment'
import _ from 'lodash'
import { DATETIME_FORMAT, BET_CODE } from './_constants'

export const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}

export const setFullName = (first, last, lang = 'vi') => {
    if (lang === 'en') {
        return [first, last].filter(Boolean).join(' ');
    }

    return [last, first].filter(Boolean).join(' ');
}

export const setAddress = (address) => {
    return address ? [address.street, address.province, address.country].filter(Boolean).join(', ') : '';
}

export const setLocation = (address) => {
    return address ? [address.province, address.country].filter(Boolean).join(', ') : '';
}

export const setChannelName = (channelIds, channels) => {

}

export const formatDateTime = (datetime, lang, formatStr = '') => {
    if (!moment(datetime).isValid()) return '';

    if (formatStr === '') {
        formatStr = (lang === 'vi') ? DATETIME_FORMAT.VI_DATETIME_24 : DATETIME_FORMAT.EN_DATETIME_24;
    }

    return moment(datetime).local().format(formatStr);
}

export const formatDate = (date, lang, formatStr = '') => {
    if (!moment(date).isValid()) return '';

    if (formatStr === '') {
        formatStr = (lang === 'vi') ? DATETIME_FORMAT.VI_DATE : DATETIME_FORMAT.EN_DATE;
    }

    return moment(date).local().format(formatStr);
}

export const getUserRole = (roles) => {
    const isAdmin = _.some(roles, (rl) => {
        return rl.name === 'admin';
    });

    if (isAdmin) {
        return 'admin';
    }

    const isMod = _.some(roles, (rl) => {
        return rl.name === 'moderator';
    });

    if (isMod) {
        return 'moderator';
    }

    return 'user';
}

export const euroHandicap = (goals, code) => {
    if (goals.first90 !== goals.second90) {
        return goals.first90 > goals.second90 ? 1 : 2;
    } else {
        if (code === BET_CODE.EU_90) {
            return 3;
        } else {
            return goals.first120 > goals.second120 ? 3 : 4;
        }
    }
}

export const getPoint = (tblTeams, game, isFirstTeam) => {
    let team = isFirstTeam ? {
        id: game.firstTeam,
        goals: {
            for: game.goals.first90,
            against: game.goals.second90,
            diff: game.goals.first90 - game.goals.second90
        }
    } : {
        id: game.secondTeam,
        goals: {
            for: game.goals.second90,
            against: game.goals.first90,
            diff: game.goals.second90 - game.goals.first90
        }
    }

    team['played'] = {
        win: team.goals.diff > 0 ? 1 : 0,
        draw: team.goals.diff === 0 ? 1 : 0,
        lost: team.goals.diff < 0 ? 1 : 0
    }

    let refTeam = _.find(tblTeams, ['id', team.id]);
    if (_.isEmpty(refTeam)) {
        team['point'] = team.played.win * 3 + team.played.draw
        tblTeams.push(team);
    } else {
        refTeam.goals = {
            for: refTeam.goals.for + team.goals.for,
            against: refTeam.goals.against + team.goals.against,
            diff: refTeam.goals.diff + team.goals.diff
        }

        refTeam.played = {
            win: refTeam.played.win + team.played.win,
            draw: refTeam.played.draw + team.played.draw,
            lost: refTeam.played.lost + team.played.lost
        }
        refTeam['point'] = refTeam.played.win * 3 + refTeam.played.draw
    }

    return tblTeams;
}