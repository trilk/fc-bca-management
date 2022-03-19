/* eslint-disable react-hooks/exhaustive-deps */
import "./event.scss";
import React, { useState, useEffect } from "react";
import { CDataTable, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import * as fbDb from "src/services/index";
import { isEmpty } from "lodash";
import { useMediaQuery } from "react-responsive";
import { SET_LOGO } from "src/actions/types";

const TodayBetting = (props) => {
  const largeScreen = useMediaQuery({
    query: "(min-device-width: 600px)",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const sysUser = useSelector((state) => state.auth.user);
  const event = useSelector((state) => state.auth.event);
  const evtTeams = useSelector((state) => state.event.teams);
  const storedUsers = useSelector((state) => state.auth.users);
  const [userData, setUserData] = useState([]);
  const [fields, setFields] = useState([]);
  const [scopedSlots, setScopedSlots] = useState({});

  const getFlagCode = (firstTeam, secondTeam, bet) => {
    if (event.round > 3 && bet > 2) {
      bet = bet - 2;
    }
    if (bet === 3) return "flag-tie";

    if (bet === 1) {
      return _.find(evtTeams, ["id", firstTeam]).flagCode;
    } else {
      return _.find(evtTeams, ["id", secondTeam]).flagCode;
    }
  };
  const onClickUserItem = (user) => {
    history.push(`/event-user/${user.id}`);
  };

  useEffect(async () => {
    dispatch({
      type: SET_LOGO,
      payload: {
        icon: "logo",
        img: "",
      },
    });

    if (
      userData.length === 0 &&
      evtTeams.length > 0 &&
      storedUsers.length > 0
    ) {
      await fbDb.BettingService.getCurrentBettingGames(
        sysUser.group,
        event.id,
        event.round,
        "",
        []
      ).then(async (response) => {
        if (response !== null) {
          setUserData(response.users);
          let tmpFields = [
              { key: "name", label: "Tên", _classes: "pl-3 align-middle" },
            ],
            tmpSlots = {
              name: (item) => (
                <td className="align-items-center d-flex pl-3">
                  <CIcon
                    className="c-avatar mr-2"
                    width="36"
                    src={item.avatar}
                  ></CIcon>
                  <span className="d-none d-sm-block">{item.name}</span>
                  <span className="d-block d-sm-none">{item.initName}</span>
                </td>
              ),
            };

          await response.games.forEach((game, idx) => {
            // const key = "match0" + (idx + 1);
            const field = {
              key: game.id,
              label: largeScreen
                ? game.firstTeam + " - " + game.secondTeam
                : game.firstTeam.slice(0, 3) +
                  " " +
                  game.secondTeam.slice(0, 3),
              _classes: "text-center",
            };

            tmpFields.push(field);
            tmpSlots[game.id] = (item) => (
              <td
                className={`text-center align-middle ${
                  item[game.id].bet === 3 ? "draw" : ""
                }`}
              >
                {item[game.id].bet !== 0 && (
                  <CIcon
                    width="32"
                    name={getFlagCode(
                      game.firstTeam,
                      game.secondTeam,
                      item[game.id].bet
                    )}
                  />
                )}
                <span className="position-relative">
                  {(item[game.id].usedStar || false) && (
                    <CIcon
                      name="flag-star"
                      className="text-warning position-absolute"
                    />
                  )}
                </span>
                <span className="position-relative">
                  {item[game.id].isOver !== undefined && (
                    <CIcon
                      style={{ bottom: "-10px" }}
                      name={
                        item[game.id].isOver === true
                          ? "cil-arrow-circle-top"
                          : "cil-arrow-circle-bottom"
                      }
                      className="flag-over position-absolute"
                    />
                  )}
                </span>
              </td>
            );
          });
          const bettingUsers = await response.users.map((user) => {
            const userInfo = _.find(storedUsers, ["id", user.id]);
            return { ...user, ...userInfo };
          });
          setFields(tmpFields);
          setScopedSlots(tmpSlots);
          setUserData(bettingUsers);
        }
      });
    }
  }, [evtTeams]);

  if (isEmpty(userData)) {
    return <div></div>;
  }

  return (
    <>
      <CRow className="event-data-header px-3 mb-1">
        <CCol className={`title pl-0 ${largeScreen ? "" : "mobile"}`}>
          <CIcon name="cil-zoom-in" className="mr-2 mb-1" size="xl"></CIcon>
          <span>SOI KÈO CỦA BẠN</span>
        </CCol>
      </CRow>
      <CRow className="event-data">
        <CCol>
          <CDataTable
            header={true}
            clickableRows={true}
            items={userData}
            fields={fields}
            onRowClick={(item) => onClickUserItem(item)}
            scopedSlots={scopedSlots}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default TodayBetting;
