import moment from 'moment'
import _ from 'lodash'
import { DATETIME_FORMAT } from './_constants'

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