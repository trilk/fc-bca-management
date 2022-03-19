import "./team-selection.scss";
import React, { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import {
  CModalHeader,
  CModal,
  CModalBody,
  CModalFooter,
  CButton,
  CRow,
  CCol,
  CInput,
  CAlert,
} from "@coreui/react";
import _ from "lodash";
import { MODAL_RESPONSE_TYPE, GAME_STATUS } from "src/utils/_constants";
import { useSelector, useDispatch } from "react-redux";
import { showTeamSelection } from "src/actions/event";
import * as fbDb from "src/services/index";
import { getWinnerBettingStatus } from "src/utils/_common";
import { EVENT_TEAMS, FAVOR_TEAM } from "src/actions/types";

const ModalTeamSelection = (props) => {
  const dispatch = useDispatch();
  const sysUser = useSelector((state) => state.auth.user);
  const eventId = useSelector((state) => state.auth.event.id);
  // const evtTeams = useSelector(state => state.event.teams);
  const showModal = useSelector((state) => state.event.showModal);
  const [show, setShowModal] = useState(false);
  const [evtTeams, setEventTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [myBet, setMyBet] = useState(null);

  const onSelectTeam = (team) => {
    setSelectedTeam(team);
  };
  const onSubmit = (confirmed) => {
    if (confirmed) {
      fbDb.BettingService.userBetWinnerTeam(
        eventId,
        sysUser.id,
        selectedTeam.id
      ).then((response) => {
        if (response.status === "OK") {
          dispatch({
            type: FAVOR_TEAM,
            payload: selectedTeam.id,
          });
        }
      });
    }
    dispatch(showTeamSelection(false));
  };

  useEffect(() => {
    if (_.isEmpty(evtTeams)) {
      let storedTeams = localStorage.getItem("eventTeams")
        ? JSON.parse(localStorage.getItem("eventTeams"))
        : [];
      setEventTeams(storedTeams);

      dispatch({
        type: EVENT_TEAMS,
        payload: storedTeams,
      });
    }
    if (!_.isEmpty(evtTeams)) {
      // dispatch({
      //     type: EVENT_TEAMS,
      //     payload: storedTeams
      // })
      //     fbDb.EventService.getTeamsByEvent(eventId).then((response) => {
      //         console.warn('Get teams')
      //         setEventTeams(response);
      //         dispatch({
      //             type: EVENT_TEAMS,
      //             payload: response
      //         })
      //     })
      // } else {
      var favTeam = _.isEmpty(sysUser.favTeam)
        ? null
        : _.find(evtTeams, ["id", sysUser.favTeam]);
      setSelectedTeam(favTeam);
      setMyBet(getWinnerBettingStatus(favTeam, sysUser.name));
    }
    setShowModal(showModal);
  }, [showModal]);

  if (evtTeams.length == 0) {
    return <div></div>;
  }

  let columns = [];
  if (show && myBet && myBet.canEdit) {
    evtTeams.forEach((item, idx) => {
      // push column
      columns.push(
        <div
          className="team-cotainer col-6 col-md-3 py-2 px-3"
          key={idx}
          onClick={() => onSelectTeam(item)}
        >
          <div
            className={`team-info ${
              selectedTeam && item.id === selectedTeam.id ? "selected" : ""
            }`}
          >
            <CIcon width="40" name={item.flagCode}></CIcon>
            <span>{item.name}</span>
          </div>
        </div>
      );

      // force wrap to next row every 4 columns
      if ((idx + 1) % 4 === 0) {
        columns.push(<div className="w-100" key={"_" + idx}></div>);
      }
    });
  }
  // setColumns(cols)

  return (
    <>
      <CModal
        className=""
        show={show}
        onClose={() => onSubmit(false)}
        size="lg"
        color="info"
        scrollable={true}
        className="ts-modal"
      >
        <CModalHeader closeButton>
          <CIcon name="cil-soccer" size="xl" className="mr-2"></CIcon>
          ĐỘI BÓNG TÔI YÊU
        </CModalHeader>
        <CModalBody>
          {myBet && (
            <div>
              {selectedTeam && (
                <div className="d-flex justify-content-center">
                  <div className="fav-team d-flex align-items-center px-4">
                    <CIcon
                      width="48"
                      name={selectedTeam.flagCode}
                      className="mr-3"
                    ></CIcon>
                    <span>{selectedTeam.name} VÔ ĐỊCH</span>
                  </div>
                </div>
              )}
              {!(selectedTeam && myBet.canEdit) && (
                <CAlert color={myBet.color} className="">
                  <CIcon
                    name={myBet.icon}
                    size="xl"
                    className="mr-2 mb-1"
                  ></CIcon>
                  <span
                    dangerouslySetInnerHTML={{ __html: myBet.message }}
                  ></span>
                </CAlert>
              )}
            </div>
          )}
          <div className="row pl-4 pr-2">{columns}</div>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center">
          {myBet && myBet.canEdit && (
            <CButton
              color="primary"
              onClick={() => onSubmit(true)}
              disabled={!selectedTeam}
            >
              <CIcon className="mr-2" name="cil-check" />
              {"Chốt Kèo"}
            </CButton>
          )}
          <CButton color="secondary" onClick={() => onSubmit(false)}>
            <CIcon className="mr-2" name="cil-x" />
            Bỏ Qua
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default React.memo(ModalTeamSelection);
