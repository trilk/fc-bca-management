import React, { useState, useEffect } from 'react'
import {
    CToaster,
    CToast,
    CToastBody,
    CToastHeader,
    CCol,
    CRow,
    CLink,
    CModal, CProgress, CProgressBar, CCard, CCardBody, CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { TeamGroup, MatchGroup } from 'src/reusable/index'
import ModalMatchInfo from 'src/reusable/ModalMatchInfo'
import * as fbDb from 'src/services/index'
import { isEmpty, find, maxBy } from 'lodash'
import { useMediaQuery } from 'react-responsive'
import { MODAL_RESPONSE_TYPE } from 'src/utils/_constants'
import { setEventProgress } from 'src/utils/_common'
import { EVENT_TEAMS, SET_LOGO, SET_STAR } from 'src/actions/types'
import { _ } from 'core-js'
import EventSummary from '../events/EventSummary'

const Home = () => {
    const largeScreen = useMediaQuery({
        query: '(min-device-width: 600px)'
    });
    const dispatch = useDispatch()
    const sysUser = useSelector(state => state.auth.user);
    const event = useSelector(state => state.auth.event);
    const [tableData, setTableData] = useState({});
    const [gameData, setGameData] = useState({});
    const [isAdmin, setAdminState] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState({})
    const [modalColor, setModalColor] = useState('')
    const [progress, setProgress] = useState(0)
    const [toast, setToast] = useState({
        key: 0,
        show: false,
        title: 'Toast title',
        message: 'Thiss is toast message'
    })

    const onShowMatchModal = (data) => {
        setModalData(data)
        setModalColor(data.myBet.color)
        setShowModal(true);
    }

    const setStoredTeams = (teams) => {
        const evtTeams = []
        let storedTeams = localStorage.getItem('eventTeams') ? JSON.parse(localStorage.getItem('eventTeams')) : []
        if (storedTeams.length === 0) {
            teams.forEach(team => {
                if (team.id !== 'TBD') {
                    evtTeams.push({
                        id: team.id,
                        name: team.name,
                        flagCode: team.flagCode
                    })
                }
            });

            localStorage.setItem('eventTeams', JSON.stringify(evtTeams))

            dispatch({
                type: EVENT_TEAMS,
                payload: evtTeams
            })
        }
    }

    const getEventGames = (teams) => {
        let storedGames = localStorage.getItem('eventGames') ? JSON.parse(localStorage.getItem('eventGames')) : []
        let gameTimestamp = localStorage.getItem('gameTimestamp') || null
        if (_.isEmpty(storedGames)) {
            gameTimestamp = null;
        }

        fbDb.GameService.getEventGames(event.id, gameTimestamp).then((response) => {
            //setGameData(response)
            response.forEach((game) => {
                let storedGame = find(storedGames, ['id', game.id])
                if (storedGame) {
                    Object.assign(storedGame, game)
                } else {
                    storedGames.push(game)
                }
            })
            localStorage.setItem('eventGames', JSON.stringify(storedGames));
            localStorage.setItem('gameTimestamp', new Date());

            const fItem = maxBy(storedGames, (g) => {
                return g.status === 'FINISHED' && g.seq
            })
            setProgress(Math.round(fItem.seq / 51 * 100))

            fbDb.GameService.splitToGroup(storedGames, teams).then(response => {
                setGameData(response)
            })
        })

    }

    const onNotify = (response) => {
        var color = response.status === 'OK' ? 'toast-success' : 'toast-danger'
        setToast({
            key: toast.key + 1,
            show: true,
            color: color,
            title: 'Thông báo',
            message: response.message
        })
    }

    const onModalSubmit = (modalRes) => {
        if (!isEmpty(modalRes)) {
            switch (modalRes.type) {
                case MODAL_RESPONSE_TYPE.BETTING:
                    fbDb.BettingService.userBetGames(event.id, sysUser.id, event.round, [modalRes.data]).then(response => {
                        onNotify(response)
                        // if (modalRes.data.changedStar || false) {
                        //     dispatch({
                        //         type: SET_STAR,
                        //         payload: !sysUser.usedStar
                        //     })
                        // }
                    });

                    break;
                case MODAL_RESPONSE_TYPE.CHANGE_STATUS:
                    fbDb.GameService.updateStatusOfGames(event.id, modalRes.data).then(response => {
                        onNotify(response)
                    });
                    break;
                case MODAL_RESPONSE_TYPE.SET_RESULT:
                    fbDb.AdminService.updateGameResult(event.id, modalRes.gameId, modalRes.goals).then(response => {
                        onNotify(response)
                    });
                    break;

                default:
                    break;
            }
        }
        setShowModal(false);
    }

    useEffect(() => {
        if (sysUser && sysUser.isAdmin) {
            setAdminState(true);
        }
        else {
            setAdminState(false);
        }
        if (isEmpty(tableData)) {
            fbDb.EventService.getAllTeams(event.id).then(teamsRes => {
                setStoredTeams(teamsRes)
                getEventGames(teamsRes)

                fbDb.GameService.getStandingAllTables(teamsRes).then((groupRes) => {
                    setTableData(groupRes)
                })

                // fbDb.GameService.getAllGames(event.id, teamsRes).then((response) => {
                //     setGameData(response)
                // })
            })
        }

        dispatch({
            type: SET_LOGO,
            payload: {
                icon: 'euro2021',
                img: ''
            }
        })

    }, [sysUser]);

    return (
        <>
            <CRow >
                {/* <div className="headline w-100">
                    <div className="ribbon ribbon-top-left"><span>Euro 2021</span></div>
                    <div className="banner">ĐI TÌM THÁNH DỰ</div>
                </div> */}
                <CCol>
                    {progress !== 0 &&
                        <CProgress size="lg" style={{ height: '1.5rem', fontSize: '0.8rem' }}>
                            <CProgressBar striped color="success" value={progress}>
                                Loading {progress}%
                            </CProgressBar>
                        </CProgress>}
                </CCol>
            </CRow>
            <CRow className={'mt-2'}>

                {event.round < 4 &&
                    <CCol md="5" className={largeScreen ? 'pr-2' : ''}>
                        {
                            Object.keys(tableData).map((key, index) =>
                                <TeamGroup key={key + index} teams={tableData[key]} table={key} admin={isAdmin} isMobile={!largeScreen} />
                            )
                        }
                    </CCol>}
                {event.round > 3 &&
                    <CCol md="5" className={largeScreen ? 'pr-2' : ''}>
                        <CCard className="team-group">
                            <CCardHeader>{'Top 10 thánh dự'}
                                <div className="card-header-actions">

                                    <CLink className="" to={`/events/${event.id}`}>
                                        <small>{'Chi tiết'}</small><CIcon className="ml-2" size="lg" color="black" name={'cil-diamond'} />
                                    </CLink>
                                </div>
                            </CCardHeader>
                            <CCardBody>
                                <EventSummary eventId={event.id} />
                            </CCardBody>
                        </CCard>
                        <div></div>
                        {/* <EventSummary /> */}
                    </CCol>}
                <CCol xl="7" className={largeScreen ? 'pl-2' : ''}>
                    {
                        Object.keys(gameData).map((key, index) =>
                            <MatchGroup key={key + index} items={gameData[key]} name={key} admin={isAdmin} onRowClick={onShowMatchModal} />
                        )
                    }
                </CCol>
            </CRow>
            <CRow>
                <CModal
                    show={showModal}
                    onClose={() => setShowModal(!showModal)}
                    size="lg"
                    color={modalColor}
                    className="mi-modal">
                    <ModalMatchInfo data={modalData} onModalResponse={onModalSubmit}></ModalMatchInfo>
                </CModal>
                <CToaster position={'top-right'} >
                    <CToast
                        key={toast.key}
                        show={toast.show}
                        autohide={3000}
                        fade={true} className={toast.color}>
                        <CToastHeader closeButton={true}>
                            {toast.title}
                        </CToastHeader>
                        <CToastBody>
                            {toast.message}
                        </CToastBody>
                    </CToast>
                </CToaster>
            </CRow>

        </>
    )
}

export default Home
