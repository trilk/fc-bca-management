import moment from "moment";
import _, { result } from "lodash";
import { DATETIME_FORMAT } from "./_constants";

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
    if (code === '') {
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
        return `<b><a href="#">${userName}</a></b> đặt niềm tin vào <b><a href="#">${firstName}</a></b> nhưng vật vã đá thêm giờ.`;
      } else {
        return `<b><a href="#">${userName}</a></b> chọn <b><a href="#">${firstName}</a></b> xực luôn trong 90p.`;
      }
    case 2:
      if (round > 3 && myBet.extraTime) {
        return `<b><a href="#">${userName}</a></b> nghĩ <b><a href="#">${secondName}</a></b> sẽ thắng, nhưng cũng trầy da sau 120p mới xong.`;
      } else {
        return `<b><a href="#">${userName}</a></b> yêu <b><a href="#">${secondName}</a></b> tin 90p là xử đẹp.`;
      }
    case 3:
      return `<b><a href="#">${userName}</a></b> đã chọn theo em <b><a href="#">Hòa Minzy</a></b> thật rồi!!!`;
    case 4:
      return `Loi du lieu. Lien he TriLK gap.`;
    default:
      return "XXXX";
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
        message: `<b><a href="#">${userName}</a></b> đã QUÊN không chọn đội VÔ ĐỊCH.`,
      };
    } else {
      return {
        canEdit: true,
        color: "info",
        icon: "cil-bolt",
        message: `Dự đoán ngay đi <b><a href="#">${userName}</a></b>. Chỉ còn <b>${diff}</b> phút để chọn. Hạn chót: <b><a href="#">${formatDateTime(
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
