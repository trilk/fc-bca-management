import moment from 'moment'
import _, { result } from 'lodash'
import { DATETIME_FORMAT, BET_CODE, GAME_STATUS } from './_constants'

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

export const distanceTime = (dest) => {
    const now = moment()
    const target = moment(dest)
    const distance = target.diff(now, 'seconds')
    if (distance <= 0) {
        return null;
    }

    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)));

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
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
    if (goals.first90 === goals.second90) {
        return 3;
    } else {
        if (code === BET_CODE.EU_90) {
            return goals.first90 > goals.second90 ? 1 : 2;
        } else {
            if (!goals.extraTime) {
                return goals.first90 > goals.second90 ? 1 : 2;
            } else {
                return goals.first90 > goals.second90 ? 3 : 4;
            }
        }
    }
}

export const userSelectMessage = (round, myBet, firstName, secondName, userName) => {
    switch (myBet.value) {
        case 1:
            if (round > 3 && myBet.extraTime) {
                return `<b><a href="#">${userName}</a></b> đặt niềm tin vào <b><a href="#">${firstName}</a></b> nhưng vật vã đá thêm giờ.`
            } else {
                return `<b><a href="#">${userName}</a></b> chọn <b><a href="#">${firstName}</a></b> xực luôn trong 90p.`
            }
        case 2:
            if (round > 3 && myBet.extraTime) {
                return `<b><a href="#">${userName}</a></b> nghĩ <b><a href="#">${secondName}</a></b> sẽ thắng, nhưng cũng trầy da sau 120p mới xong.`
            } else {
                return `<b><a href="#">${userName}</a></b> yêu <b><a href="#">${secondName}</a></b> tin 90p là xử đẹp.`
            }
        case 3:
            return `<b><a href="#">${userName}</a></b> đã chọn theo em <b><a href="#">Hòa Minzy</a></b> thật rồi!!!`
        case 4:
            return `Loi du lieu. Lien he TriLK gap.`
        default:
            return 'XXXX';
    }
}

export const getBetStatus = (match, myBet, betResult, userName) => {
    if (!userName) {
        userName = 'Người Vô Danh';
    }
    // myBet.bet = Math.floor(Math.random() * 4)
    let result = {
        canEdit: false,
        color: 'secondary',
        iconName: '',
        message: ''
    }
    if (match.status === GAME_STATUS.NOT_STARTED) {
        return { ...result, iconName: 'cil-calendar-check', message: `Vào đây làm gì vậy <b><a href="#">${userName}</a></b>? Trận đấu đã dự được đâu.` }
    }

    if (match.status === GAME_STATUS.BETTING) {
        const gameTime = moment(match.startTime);
        const betTime = moment().add(-5, 'minutes')

        var canEdit = betTime.isBefore(gameTime);
        var remainTime = gameTime.diff(betTime, 'minutes')
        if (canEdit) {
            if (myBet.value === 0) {
                return {
                    canEdit: canEdit,
                    color: 'warning',
                    iconName: 'cil-bolt',
                    message: `NHANH LÊN <b><a href="#">${userName}</a></b>! Còn ${remainTime} phút thôi. Chọn theo phía trên đó.`
                }
            } else {
                return {
                    canEdit: canEdit,
                    color: 'info',
                    iconName: 'cil-blind',
                    message: userSelectMessage(match.round, myBet, match.firstTeam.name, match.secondTeam.name, userName)
                }
            }
        }

    }

    if (myBet.value === 0) { //Finish or overtime
        return {
            canEdit: false,
            color: 'dark',
            iconName: 'cil-alarm',
            message: `THÔI TÈO EM. Làm gì mà không dự <b><a href="#">${userName}</a></b> người ơi?`
        }
    } else {
        if (match.status === GAME_STATUS.BETTING) {
            return {
                canEdit: false,
                color: 'info',
                iconName: 'cil-blind',
                message: userSelectMessage(match.round, myBet, match.firstTeam.name, match.secondTeam.name, userName) + ' Chờ mà xem!'
            }
        } else {
            if (betResult === 1) {
                return {
                    canEdit: false,
                    color: 'success',
                    iconName: 'cil-mood-very-good',
                    message: `CHÚC MỪNG! Sao đoán trúng hay vậy <b><a href="#">${userName}</a></b>, mai chỉ bài với nha`
                }
            } else {
                return {
                    canEdit: false,
                    color: 'danger',
                    iconName: 'cil-thumb-down',
                    message: `Rất tiếc! Dễ vậy mà đoán cũng sai nữa <b><a href="#">${userName}</a></b>`
                }
            }
        }
    }
}

export const getMatchStatusForAdmin = (match) => {
    if (match.status === GAME_STATUS.NOT_STARTED) {
        return {
            canEdit: false,
            canChangeStatus: true,
            color: 'secondary',
            iconName: 'cil-calendar-check',
            message: `<b><a href="#">TRẬN ĐẤU CHƯA BẮT ĐẦU.</a></b> Thay đổi trạng thái để ngươi chơi dự đoán.`
        }
    }
    if (match.status === GAME_STATUS.FINISHED) {
        return {
            canEdit: false,
            canChangeStatus: false,
            color: 'dark',
            iconName: 'cil-mood-very-good',
            message: `<b><a href="#">TRẬN ĐẤU ĐÃ KẾT THÚC.</a></b>`
        }
    }

    const now = moment();
    const endTime = moment(match.startTime).add(110, 'minutes')

    var canEdit = endTime.isBefore(now);

    if (canEdit) {
        return {
            canEdit: true,
            canChangeStatus: false,
            color: 'success',
            iconName: 'cil-pencil',
            message: `<b><a href="#">TRẬN ĐẤU KẾT THÚC RỒI.</a></b> Cập nhật tỉ số ngay.`
        }
    } else {
        return {
            canEdit: false,
            canChangeStatus: false,
            color: 'warning',
            iconName: 'cil-lock-locked',
            message: `<b><a href="#">TRẬN ĐẤU CHƯA KẾT THÚC.</a></b> Không thể thay đổi tỉ số.`
        }
    }
}

export const getWinnerBettingStatus = (selectedTeam, userName) => {
    const deadline = moment('2021-06-20 15:00')
    const now = moment()
    const diff = deadline.diff(now, 'minutes')

    if (!selectedTeam) {
        if (diff <= 0) {
            return {
                canEdit: false,
                color: 'dark',
                icon: 'cil-thumb-down',
                message: `<b><a href="#">${userName}</a></b> đã QUÊN không chọn đội VÔ ĐỊCH.`
            }
        } else {
            return {
                canEdit: true,
                color: 'info',
                icon: 'cil-bolt',
                message: `Dự đoán ngay đi <b><a href="#">${userName}</a></b>. Chỉ còn <b>${diff}</b> phút để chọn. Hạn chót: <b><a href="#">${formatDateTime(deadline, 'vi')}</a></b>`
            }
        }
    } else {
        if (diff <= 0) {
            return {
                canEdit: false,
                color: '',
                icon: '',
                message: ''
            }
        } else {
            return {
                canEdit: true,
                color: '',
                icon: '',
                message: ''
            }
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