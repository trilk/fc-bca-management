
import './team-group.scss'
import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
    CModalHeader, CAlert, CModalBody, CModalFooter, CButton, CRow, CCol, CInput, CSwitch
} from '@coreui/react'
import _ from 'lodash'
import { userSelectMessage } from 'src/utils/_common'
import { MODAL_RESPONSE_TYPE, GAME_STATUS } from 'src/utils/_constants'
import { useSelector } from 'react-redux'

const ModalMatchInfo = props => {
    const sysUser = useSelector(state => state.auth.user);
    const match = props.data.match || null
    const statistic = props.data.stat || null
    const [myBet, setMyBet] = useState({ bet: { value: 0, first90: 0, second90: 0, canEdit: false } })
    const [changedScore, setChangedScore] = useState(false)

    const setUserSelection = (value) => {
        const newBet = { value: value, extraTime: myBet.bet.extraTime }

        if (!sysUser.isAdmin && myBet.canEdit) {
            var msg = userSelectMessage(match.round, newBet, match.firstTeam.name, match.secondTeam.name, sysUser.name) + ' CHỐT KÈO THÔI!!!'
            setMyBet({
                ...myBet,
                message: msg,
                bet: newBet,
                iconName: 'cil-blind',
                color: 'info'
            })
        }
    }

    const setExtraTimeSelection = () => {
        const newBet = { value: myBet.bet.value, extraTime: !myBet.bet.extraTime }

        if (myBet.canEdit) {
            if (sysUser.isAdmin) {
                setMyBet({
                    ...myBet,
                    bet: newBet,
                })
            } else {
                var msg = userSelectMessage(match.round, newBet, match.firstTeam.name, match.secondTeam.name, sysUser.name) + ' CHỐT KÈO THÔI!!!'
                setMyBet({
                    ...myBet,
                    message: msg,
                    bet: newBet,
                    iconName: 'cil-blind',
                    color: 'info'
                })
            }

        }
    }

    const onScoreChange = (e) => {
        setMyBet({ ...myBet, [e.target.name]: e.target.value })
        console.log(myBet)
    }
    const onSubmit = (isSubmit) => {
        if (isSubmit) {
            if (sysUser.isAdmin) {
                if (myBet.canEdit) {
                    const goals = {
                        first90: parseInt(myBet.first90) || 0,
                        extraTime: myBet.bet.extraTime,
                        second90: parseInt(myBet.second90) || 0,
                    }

                    //Update game result
                    props.onModalResponse({
                        type: MODAL_RESPONSE_TYPE.SET_RESULT,
                        gameId: match.id,
                        goals: goals
                    })
                } else {
                    props.onModalResponse({
                        type: MODAL_RESPONSE_TYPE.CHANGE_STATUS,
                        data: [{ id: match.id, status: GAME_STATUS.BETTING }]
                    })
                }
            } else {
                let betValue = myBet.bet.value;

                //If knowout round, return value 1,2,3,4
                if (match.round > 3) {
                    if (myBet.bet.extraTime) {
                        betValue += 2;
                    }
                }

                //User bet a game
                props.onModalResponse({
                    type: MODAL_RESPONSE_TYPE.BETTING,
                    data: [{ gameId: match.id, betValue: betValue }]
                })
            }
        } else {
            props.onModalResponse(null)
        }
    }

    useEffect(() => {
        if (props.data.match) {
            setMyBet(_.cloneDeep(props.data.myBet))
            setChangedScore(sysUser.isAdmin && myBet.canEdit)
        }
    }, [props.data])

    if (!match) {
        return <div></div>
    }

    return (
        <>
            <CModalHeader className="mi-header pr-0">
                <CRow className="w-100 ">
                    <CCol className="text-center">
                        <span>{match.firstTeam.name}</span>
                    </CCol>
                    <CCol className="text-center col-md-2 p-0">
                        <div className="goal-input form-row justify-content-center pt-2">
                            <div className="col-auto">
                                <CInput disabled={!changedScore} className="form-control p-0" name="first90" value={myBet.first90}
                                    onChange={(value) => onScoreChange(value)} autoComplete="off" />
                            </div>
                            <div className="col-auto">
                                <CInput disabled={!changedScore} className="form-control p-0" name="second90" value={myBet.second90}
                                    onChange={(value) => onScoreChange(value)} autoComplete="off" />
                            </div>
                        </div>

                    </CCol >
                    <CCol className="text-center">
                        <span> {match.secondTeam.name}</span>
                    </CCol>
                </CRow>
            </CModalHeader>
            <CModalBody>
                <fieldset>
                    <legend>Dự của tao</legend>
                    <div className={`d-flex justify-content-around`}>
                        <div onClick={() => setUserSelection(1)}
                            className={`mi-team ${myBet.bet.value === 1 ? 'selected' : ''}`}
                            title={`Theo ${match.firstTeam.name}`}>
                            <CIcon name={match.firstTeam.flagCode} width={100}></CIcon>
                        </div>

                        {match.round <= 3 &&
                            <div onClick={() => setUserSelection(3)}
                                className={`mi-team middle ${myBet.bet.value === 3 ? 'selected' : ''}`}
                                title="Chọn Hòa Minzy">
                                <CIcon name="flag-tie" width={60}></CIcon>
                            </div>}
                        {match.round > 3 &&

                            <div onClick={() => setExtraTimeSelection()}
                                className={`mi-aet d-flex align-items-center ${myBet.bet.extraTime ? 'checked' : ''}`}
                                title="Dau them gio">
                                <CIcon color={'primary'} name={myBet.bet.extraTime ? 'cil-check-circle' : 'cil-circle'} size="3xl" />
                            </div>

                        }
                        <div onClick={() => setUserSelection(2)}
                            className={`mi-team ${myBet.bet.value === 2 ? 'selected' : ''}`}
                            title={`Theo ${match.secondTeam.name}`}>
                            <CIcon name={match.secondTeam.flagCode} width={100}></CIcon>
                        </div>
                    </div>
                </fieldset>
                <div className="mi-stat-container d-flex justify-content-around">
                    <CCol className="mi-stat justify-content-center col d-flex align-items-end"><div className="text-center">{statistic.firstWin}<p>Bình chọn</p></div></CCol>
                    <CCol className="mi-stat text-center middle">
                        {match.round <= 3 && <>{statistic.draw}<p>Bình chọn</p></>}
                        {match.round > 3 &&
                            <>
                                <CRow className="justify-content-center m-0 p-0"><small>Thêm giờ</small></CRow>
                                <CRow>
                                    <CCol>{statistic.firstWinExtra}<p><small>Bình chọn</small></p></CCol>
                                    <CCol>{statistic.secondWinExtra}<p><small>Bình chọn</small></p></CCol>
                                </CRow>
                            </>
                        }

                    </CCol>
                    <CCol className="mi-stat justify-content-center col d-flex align-items-end"><div className="text-center">{statistic.secondWin}<p>Bình chọn</p></div></CCol>

                </div>
                <div>
                    <CAlert color={myBet.color} className="">
                        <CIcon name={myBet.iconName} size="xl" className="mr-2 mb-1"></CIcon>
                        <span dangerouslySetInnerHTML={{ __html: myBet.message }}></span>
                    </CAlert>
                </div>
            </CModalBody>
            <CModalFooter>
                {sysUser.isAdmin && myBet.canChangeStatus &&
                    <CButton color="success" onClick={() => onSubmit(true)}><CIcon className="mr-2" name="cil-check" />
                Dự ngay thôi
                </CButton>
                }
                {myBet.canEdit && <CButton color="primary" onClick={() => onSubmit(true)}><CIcon className="mr-2" name="cil-check" />
                    {sysUser.isAdmin ? 'Cập Nhật' : 'Chốt Kèo'}
                </CButton>}
                <CButton color="secondary" onClick={() => onSubmit(false)}><CIcon className="mr-2" name="cil-x" />Bỏ Qua</CButton>
            </CModalFooter>
        </>
    )
}

export default React.memo(ModalMatchInfo)

