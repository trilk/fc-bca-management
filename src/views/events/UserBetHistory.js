import './event.scss'
import React, { useState, useEffect } from 'react'
import {
    CDataTable,
    CCol,
    CRow,
    CCard,
    CCardBody,
    CCardHeader,
    CCollapse,
} from '@coreui/react'
import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import * as fbDb from 'src/services/index'
import { isEmpty } from 'lodash'
import { useMediaQuery } from 'react-responsive'
import { SET_LOGO } from 'src/actions/types'

const UserBetHistory = (props) => {
    const largeScreen = useMediaQuery({
        query: '(min-device-width: 600px)'
    });
    const userId = props.match.params.id
    const dispatch = useDispatch()
    const event = useSelector(state => state.auth.event);
    const evtTeams = useSelector(state => state.event.teams);
    const [userData, setUserData] = useState({});
    const [selectedRound, setSelectRound] = useState(event.round);
    const [evtSummary, setEventSummary] = useState({});

    const fields = [
        { key: 'seq', label: '', _classes: 'text-center align-middle' },
        { key: 'name', label: 'Trận', _classes: 'align-middle' },
        { key: 'bet', label: largeScreen ? 'Chọn' : 'C', _classes: 'text-center' },
        { key: 'result', label: largeScreen ? 'Kết Quả' : 'KQ', _classes: 'align-middle text-center' },
        { key: 'point', label: largeScreen ? 'Điểm' : 'Pts', _classes: 'text-center' },
    ]

    const getFlagCode = (firstTeam, secondTeam, bet) => {
        if (bet === 3) return 'flag-tie';

        if (bet === 1) {
            return _.find(evtTeams, ['id', firstTeam]).flagCode
        } else {
            return _.find(evtTeams, ['id', secondTeam]).flagCode
        }
    }

    useEffect(async () => {

        if (_.isEmpty(userData) && evtTeams.length > 0) {
            const eventSummary = await fbDb.EventService.getEventSummary(event.id)
            setEventSummary({
                gameBet: eventSummary.gameBet,
                winnerBet: eventSummary.winnerBet,
                winnerTeam: '',
                userFavorTeam: eventSummary.users[userId] ? eventSummary.users[userId].betTeam : ''
            })
            let userGames = await fbDb.BettingService.getGamesBetByUser(event.id, event.round, userId).then(async (response) => {
                console.log(response)
                setUserData(response)

                dispatch({
                    type: SET_LOGO,
                    payload: {
                        icon: '',
                        img: response.avatar
                    }
                })

            })

        }
    }, [evtTeams]);

    if (isEmpty(userData)) {
        return <div></div>
    }

    return (
        <>

            <CRow className="event-data">
                <CCol md="4" className="pr-2">
                    <CCard className="mb-3">
                        <CCardHeader>{isEmpty(evtSummary.userFavorTeam) ? 'Chưa chọn đội lên ngôi' : 'Chọn ' + evtSummary.userFavorTeam + ' vô địch!'}</CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol className="text-center">
                                    <CIcon name="euro2021" width="100"></CIcon>

                                </CCol>
                                <CCol className="justify-content-center d-flex">
                                    <CIcon name={isEmpty(evtSummary.userFavorTeam) ? 'flagTbd' : getFlagCode(evtSummary.userFavorTeam, '', 1)} width="100"></CIcon>

                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                    <CCard>
                        <CCardHeader>Tỉ lệ dự đoán</CCardHeader>
                        <CCardBody className="py-2 px-0">
                            <CChartPie
                                datasets={[
                                    {
                                        backgroundColor: [
                                            '#2eb85c',
                                            '#e55353',
                                            '#ced2d8',
                                        ],
                                        data: [userData.betSum.corrected, userData.betSum.wrong, userData.betSum.missed]
                                    }
                                ]}
                                labels={['Đúng', 'Sai', 'Quên']}
                                options={{
                                    tooltips: {
                                        enabled: true
                                    },
                                    legend: {
                                        position: "right",
                                        align: "middle"
                                    }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xl="8" className="pl-2">
                    <CCard className="user-stat mb-3">
                        <CCardBody>
                            <CRow>
                                <CCol md="4" className="name d-flex align-items-center"><span>{userData.name}</span></CCol>
                                <CCol className="d-flex align-items-center justify-content-center"><div className="text-center">
                                    <span className="text-success">{userData.betSum.corrected}</span><p>Đúng</p></div></CCol>
                                <CCol className="d-flex align-items-center justify-content-center"><div className="text-center">
                                    <span className="text-danger">{userData.betSum.wrong}</span><p>Sai</p></div></CCol>
                                <CCol className="d-flex align-items-center justify-content-center"><div className="text-center">
                                    <span className="text-secondary">{userData.betSum.missed}</span><p>Quên</p></div></CCol>
                                <CCol className="d-flex align-items-center justify-content-center"><div className="text-center">
                                    <span className="text-success">{userData.betSum.point}</span><p>Điểm</p></div></CCol>
                                <CCol className="d-flex align-items-center justify-content-center"><div className="text-center">
                                    <span>0</span><p>Công nợ</p></div></CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>

                    {
                        userData.rounds.map((round, idx) =>
                            <CCard className="bet-round" key={idx}>
                                <CCardHeader onClick={() => setSelectRound(idx + 1)}
                                    className={idx < userData.rounds.length - 1 ? 'finished' : ''} title={`Xem lại lựa chọn vòng ${idx + 1}`}>
                                    <CRow>
                                        <CCol md="4">Vòng {idx + 1}</CCol>
                                        <CCol className="d-flex align-items-center justify-content-center"><div className="text-center">
                                            <span className="text-success">{round.betSum.corrected}</span></div></CCol>
                                        <CCol className="d-flex align-items-center justify-content-center"><div className="text-center">
                                            <span className="text-danger">{round.betSum.wrong}</span></div></CCol>
                                        <CCol className="d-flex align-items-center justify-content-center"><div className="text-center">
                                            <span className="text-secondary">{round.betSum.missed}</span></div></CCol>
                                        <CCol className="d-flex align-items-center justify-content-center"><div className="text-center">
                                            <span className="text-success">{round.betSum.point}</span></div></CCol>
                                        <CCol className="d-flex align-items-center justify-content-center"><div className="text-center">
                                            <span>0</span></div></CCol>
                                    </CRow>
                                </CCardHeader>
                                <CCollapse show={selectedRound === (idx + 1)}>
                                    <CCardBody className="p-0">
                                        <CDataTable
                                            header={true}
                                            items={round.matches}
                                            fields={fields}
                                            scopedSlots={{
                                                'name':
                                                    (item) => (
                                                        <td className="align-middle">
                                                            <span>{item.firstTeam} {item.goals.first90 + ':' + item.goals.second90} {item.secondTeam}</span>
                                                        </td>
                                                    ),
                                                'bet':
                                                    (item) => (
                                                        <td className={`align-middle text-center ${item.bet == 3 && 'text-secondary'}`}>
                                                            {item.bet !== 0 && <CIcon width="32" name={getFlagCode(item.firstTeam, item.secondTeam, item.bet)} />}
                                                        </td>
                                                    ),
                                                'result':
                                                    (item) => (
                                                        <td className="text-center align-middle">
                                                            {item.result !== -1 && <CIcon className={item.result === 1 ? "text-success" : 'text-danger'} name={item.result === 1 ? 'cil-check-circle' : 'cil-x-circle'} size="xl" />}
                                                        </td>
                                                    ),
                                                'point':
                                                    (item) => (
                                                        <td className="text-center align-middle">
                                                            {item.result !== -1 ? item.result : ''}
                                                        </td>
                                                    ),

                                            }}
                                        />
                                    </CCardBody>
                                </CCollapse>
                            </CCard>
                        )
                    }

                </CCol>
            </CRow>

        </>
    )
}

export default UserBetHistory
