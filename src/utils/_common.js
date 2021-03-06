import moment from "moment";
import _, { result } from "lodash";
import { DATETIME_FORMAT, BET_CODE, GAME_STATUS } from "./_constants";

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
};

export const distanceTime = (dest) => {
  const now = moment();
  const target = moment(dest);
  const distance = target.diff(now, "seconds");
  if (distance <= 0) {
    return null;
  }

  var days = Math.floor(distance / (60 * 60 * 24));
  var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
  var minutes = Math.floor((distance % (60 * 60)) / 60);
  var seconds = Math.floor(distance % 60);

  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};
export const setFullName = (first, last, lang = "vi") => {
  if (lang === "en") {
    return [first, last].filter(Boolean).join(" ");
  }

  return [last, first].filter(Boolean).join(" ");
};

export const setAddress = (address) => {
  return address
    ? [address.street, address.province, address.country]
        .filter(Boolean)
        .join(", ")
    : "";
};

export const setLocation = (address) => {
  return address
    ? [address.province, address.country].filter(Boolean).join(", ")
    : "";
};

export const setChannelName = (channelIds, channels) => {};

export const formatDateTime = (datetime, lang, formatStr = "") => {
  if (!moment(datetime).isValid()) return "";

  if (formatStr === "") {
    formatStr =
      lang === "vi"
        ? DATETIME_FORMAT.VI_DATETIME_24
        : DATETIME_FORMAT.EN_DATETIME_24;
  }

  return moment(datetime).local().format(formatStr);
};

export const formatDate = (date, lang, formatStr = "") => {
  if (!moment(date).isValid()) return "";

  if (formatStr === "") {
    formatStr =
      lang === "vi" ? DATETIME_FORMAT.VI_DATE : DATETIME_FORMAT.EN_DATE;
  }

  return moment(date).local().format(formatStr);
};

export const getUserRole = (roles) => {
  const isAdmin = _.some(roles, (rl) => {
    return rl.name === "admin";
  });

  if (isAdmin) {
    return "admin";
  }

  const isMod = _.some(roles, (rl) => {
    return rl.name === "moderator";
  });

  if (isMod) {
    return "moderator";
  }

  return "user";
};

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
};

export const calculatePoint = (
  bet,
  result,
  round,
  usedStar,
  overResult,
  overBet
) => {
  if (bet === 0) return 0;
  if (round <= 3) {
    return bet === result ? 1 : 0;
  }

  let point = 0;
  if (round === 4) {
    if (bet === result) {
      point = bet > 2 ? 1.5 : 1;
      point = usedStar ? point * 2 : point;
    } else if (bet + 2 === result || bet === result + 2) {
      point = usedStar ? 0 : 0.5;
    } else {
      if (bet > 2 && usedStar) {
        point = -1.5;
      }
      if (bet <= 2 && usedStar) {
        point = -1;
      }
    }
  }

  if (round === 5) {
    if (bet === result) {
      point = bet > 2 ? 3 : 2;
      point = usedStar ? point * 2 : point;
    } else if (bet + 2 === result || bet === result + 2) {
      point = usedStar ? 0 : 1;
    } else {
      if (bet > 2 && usedStar) {
        point = -3;
      }
      if (bet <= 2 && usedStar) {
        point = -2;
      }
    }
  }

  if (overResult !== undefined) {
    point += overResult === overBet ? 1 : 0;
  }

  return point;
};

export const userSelectMessage = (
  round,
  myBet,
  firstName,
  secondName,
  userName
) => {
  switch (myBet.value) {
    case 1:
      if (round > 3 && myBet.extraTime) {
        return `<b><a href="#">${userName}</a></b> ?????t ni???m tin v??o <b><a href="#">${firstName}</a></b> nh??ng v???t v?? ???? th??m gi???.`;
      } else {
        return `<b><a href="#">${userName}</a></b> ch???n <b><a href="#">${firstName}</a></b> x???c lu??n trong 90p.`;
      }
    case 2:
      if (round > 3 && myBet.extraTime) {
        return `<b><a href="#">${userName}</a></b> ngh?? <b><a href="#">${secondName}</a></b> s??? th???ng, nh??ng c??ng tr???y da sau 120p m???i xong.`;
      } else {
        return `<b><a href="#">${userName}</a></b> y??u <b><a href="#">${secondName}</a></b> tin 90p l?? x??? ?????p.`;
      }
    case 3:
      return `<b><a href="#">${userName}</a></b> ???? ch???n theo em <b><a href="#">H??a Minzy</a></b> th???t r???i!!!`;
    case 4:
      return `Loi du lieu. Lien he TriLK gap.`;
    default:
      return "XXXX";
  }
};

export const getBetStatus = (match, myBet, betResult, userName) => {
  if (!userName) {
    userName = "Ng?????i V?? Danh";
  }
  // myBet.bet = Math.floor(Math.random() * 4)
  let result = {
    canEdit: false,
    color: "secondary",
    iconName: "",
    message: "",
    starMsg: "",
  };
  if (match.status === GAME_STATUS.NOT_STARTED) {
    return {
      ...result,
      iconName: "cil-calendar-check",
      message: `V??o ????y l??m g?? v???y <b><a href="#">${userName}</a></b>? Tr???n ?????u ???? d??? ???????c ????u.`,
    };
  }

  if (match.status === GAME_STATUS.BETTING) {
    const gameTime = moment(match.startTime);
    const betTime = moment().add(-5, "minutes");

    var canEdit = betTime.isBefore(gameTime);
    var remainTime = gameTime.diff(betTime, "minutes");
    if (canEdit) {
      if (myBet.value === 0) {
        return {
          canEdit: canEdit,
          color: "warning",
          iconName: "cil-bolt",
          message: `NHANH L??N <b><a href="#">${userName}</a></b>! C??n ${remainTime} ph??t th??i. Ch???n theo ph??a tr??n ????.`,
          starMsg: "B???n c?? 1 c?? h???i ????? x2 s??? ??i???m tr???n n??y n???u tr??? l???i ????ng!",
        };
      } else {
        return {
          canEdit: canEdit,
          color: "info",
          iconName: "cil-blind",
          message: userSelectMessage(
            match.round,
            myBet,
            match.firstTeam.name,
            match.secondTeam.name,
            userName
          ),
          starMsg: myBet.usedStar
            ? "B???n ???? ch???n ng??i sao hi v???ng cho tr???n ?????y n??y!"
            : 'B???n c?? 1 c?? h???i ????? <b><a href="#">x2</a></b> s??? ??i???m tr???n n??y n???u tr??? l???i ????ng!',
        };
      }
    }
  }

  if (myBet.value === 0) {
    //Finish or overtime
    myBet.showStar = false;
    return {
      canEdit: false,
      color: "dark",
      iconName: "cil-alarm",
      message: `TH??I T??O EM. L??m g?? m?? kh??ng d??? <b><a href="#">${userName}</a></b> ng?????i ??i?`,
    };
  } else {
    if (match.status === GAME_STATUS.BETTING) {
      return {
        canEdit: false,
        color: "info",
        iconName: "cil-blind",
        message:
          userSelectMessage(
            match.round,
            myBet,
            match.firstTeam.name,
            match.secondTeam.name,
            userName
          ) + " Ch??? m?? xem!",
        starMsg: myBet.usedStar
          ? "B???n ???? ch???n ng??i sao hi v???ng cho tr???n ?????y n??y!"
          : "",
      };
    } else {
      if (betResult === 1) {
        return {
          canEdit: false,
          color: "success",
          iconName: "cil-mood-very-good",
          message: `CH??C M???NG! Sao ??o??n tr??ng hay v???y <b><a href="#">${userName}</a></b>, mai ch??? b??i v???i nha`,
          starMsg: myBet.usedStar ? "Ng??i sao hi v???ng th???t ????ng l??c!" : "",
        };
      } else {
        return {
          canEdit: false,
          color: "danger",
          iconName: "cil-thumb-down",
          message: `R???t ti???c! D??? v???y m?? ??o??n c??ng sai n???a <b><a href="#">${userName}</a></b>`,
          starMsg: myBet.usedStar
            ? "Ng??i sao hi v???ng ???? khi???n b???n m???t ??i???m!"
            : "",
        };
      }
    }
  }
};

export const getMatchStatusForAdmin = (match) => {
  if (match.status === GAME_STATUS.NOT_STARTED) {
    return {
      canEdit: false,
      canChangeStatus: true,
      color: "secondary",
      iconName: "cil-calendar-check",
      message: `<b><a href="#">TR???N ?????U CH??A B???T ?????U.</a></b> Thay ?????i tr???ng th??i ????? ng????i ch??i d??? ??o??n.`,
    };
  }
  if (match.status === GAME_STATUS.FINISHED) {
    return {
      canEdit: false,
      canChangeStatus: false,
      color: "dark",
      iconName: "cil-mood-very-good",
      message: `<b><a href="#">TR???N ?????U ???? K???T TH??C.</a></b>`,
    };
  }

  const now = moment();
  const endTime = moment(match.startTime).add(110, "minutes");

  var canEdit = endTime.isBefore(now);

  if (canEdit) {
    return {
      canEdit: true,
      canChangeStatus: false,
      color: "success",
      iconName: "cil-pencil",
      message: `<b><a href="#">TR???N ?????U K???T TH??C R???I.</a></b> C???p nh???t t??? s??? ngay.`,
    };
  } else {
    return {
      canEdit: false,
      canChangeStatus: false,
      color: "warning",
      iconName: "cil-lock-locked",
      message: `<b><a href="#">TR???N ?????U CH??A K???T TH??C.</a></b> Kh??ng th??? thay ?????i t??? s???.`,
    };
  }
};

export const getWinnerBettingStatus = (selectedTeam, userName) => {
  const deadline = moment("2021-06-17 15:00");
  const now = moment();
  const diff = deadline.diff(now, "minutes");

  if (!selectedTeam) {
    if (diff <= 0) {
      return {
        canEdit: false,
        color: "dark",
        icon: "cil-thumb-down",
        message: `<b><a href="#">${userName}</a></b> ???? QU??N kh??ng ch???n ?????i V?? ?????CH.`,
      };
    } else {
      return {
        canEdit: true,
        color: "info",
        icon: "cil-bolt",
        message: `D??? ??o??n ngay ??i <b><a href="#">${userName}</a></b>. Ch??? c??n <b>${diff}</b> ph??t ????? ch???n. H???n ch??t: <b><a href="#">${formatDateTime(
          deadline,
          "vi"
        )}</a></b>`,
      };
    }
  } else {
    if (diff <= 0) {
      return {
        canEdit: false,
        color: "",
        icon: "",
        message: "",
      };
    } else {
      return {
        canEdit: true,
        color: "",
        icon: "",
        message: "",
      };
    }
  }
};

export const getPoint = (tblTeams, game, isFirstTeam) => {
  let team = isFirstTeam
    ? {
        id: game.firstTeam,
        goals: {
          for: game.goals.first90,
          against: game.goals.second90,
          diff: game.goals.first90 - game.goals.second90,
        },
      }
    : {
        id: game.secondTeam,
        goals: {
          for: game.goals.second90,
          against: game.goals.first90,
          diff: game.goals.second90 - game.goals.first90,
        },
      };

  team["played"] = {
    win: team.goals.diff > 0 ? 1 : 0,
    draw: team.goals.diff === 0 ? 1 : 0,
    lost: team.goals.diff < 0 ? 1 : 0,
  };

  let refTeam = _.find(tblTeams, ["id", team.id]);
  if (_.isEmpty(refTeam)) {
    team["point"] = team.played.win * 3 + team.played.draw;
    tblTeams.push(team);
  } else {
    refTeam.goals = {
      for: refTeam.goals.for + team.goals.for,
      against: refTeam.goals.against + team.goals.against,
      diff: refTeam.goals.diff + team.goals.diff,
    };

    refTeam.played = {
      win: refTeam.played.win + team.played.win,
      draw: refTeam.played.draw + team.played.draw,
      lost: refTeam.played.lost + team.played.lost,
    };
    refTeam["point"] = refTeam.played.win * 3 + refTeam.played.draw;
  }

  return tblTeams;
};

export const setEventProgress = (seq, round) => {
  let prg = {
    R1: Math.round((13 / 51) * 100),
    R2: Math.round((12 / 51) * 100),
    R3: Math.round((12 / 51) * 100),
    R4: Math.round((8 / 51) * 100),
    R5: Math.round((7 / 51) * 100),
  };

  switch (round) {
    case 1:
      prg.R1 = Math.round((seq / 51) * 100);
      break;
    case 2:
      prg.R2 = Math.round(((seq - 12) / 51) * 100);
      prg.R3 = 0;
      prg.R4 = 0;
      prg.R5 = 0;
      break;
    case 3:
      prg.R3 = Math.round(((seq - 24) / 51) * 100);
      prg.R4 = 0;
      prg.R5 = 0;
      break;
    case 4:
      prg.R4 = Math.round(((seq - 36) / 51) * 100);
      prg.R5 = 0;
      break;
    case 5:
      prg.R4 = Math.round(((seq - 44) / 51) * 100);
      break;

    default:
      break;
  }
  return prg;
};
