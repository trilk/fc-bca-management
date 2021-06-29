
import './team-group.scss'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import {
    CFade,
    CCard,
    CCardHeader,
    CCollapse,
    CCardBody,
    CDataTable, CLink, CSpinner,
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter
} from '@coreui/react'
import moment from 'moment'
import * as fbDb from 'src/services/index'
import { GAME_STATUS, GROUP } from 'src/utils/_constants'
import { getBetStatus, getMatchStatusForAdmin } from 'src/utils/_common'
import { round } from 'lodash'

const MatchGroup = props => {
    const sysUser = useSelector(state => state.auth.user);
    const event = useSelector(state => state.auth.event);
    const [collapsed, setCollapsed] = useState(true)
    const [games, setGames] = useState([]);
    const [name, setName] = useState('');
    const [isAdmin, setAdminState] = useState(false);
    // const [modalData, setModalData] = useState({})
    const grpName = {
        grp: 'Vòng bảng',
        ro16: 'Vòng 1/8',
        qf: 'Tứ kết',
        sf: 'Bán kết',
        final: 'Chung kết'
    }

    const fields = [
        { key: 'startTime', label: '', _classes: 'align-middle', _style: { width: '130px' } },
        { key: 'firstTeam', label: '', _classes: 'align-middle', _style: { width: '195px' } },
        { key: 'score', label: '', _classes: 'align-middle text-center', _style: { width: '50px' } },
        { key: 'secondTeam', label: '', _classes: 'align-middle', _style: { width: '195px' } },
        { key: 'match', label: '', _classes: 'align-middle' },

    ]

    const onClickMatchItem = (item) => {
        // item.startTime = '2021-06-24 15:00'
        // item.status = GAME_STATUS.BETTING
        fbDb.BettingService.getBetStatisticByGame(sysUser.group || GROUP.DEFAULT, event.id, item.round, item.id, sysUser.id).then(response => {
            let bet = {}
            if (item.round <= 3) {
                bet = {
                    value: sysUser.isAdmin ? item.goals.result : response.myBet.bet,
                    extraTime: false
                }
            } else {
                const tempValue = sysUser.isAdmin ? item.goals.result : response.myBet.bet || 0

                bet = {
                    value: tempValue > 2 ? tempValue - 2 : tempValue,
                    extraTime: sysUser.isAdmin ? tempValue > 2 : tempValue > 2,
                    usedStar: response.myBet.usedStar || false
                }

            }

            const betStatus = sysUser.isAdmin ? getMatchStatusForAdmin(item) :
                getBetStatus(item, bet, response.myBet.result, sysUser.name)

            props.onRowClick({
                match: item,
                stat: response.statistic,
                usedStar: response.usedStar,
                myBet: {
                    ...betStatus,
                    bet,
                    first90: item.goals.first90,
                    second90: item.goals.second90,
                    extraTime: item.goals.extraTime || false
                }
            })
        })
    }


    useEffect(() => {
        if (props.items) {
            const items = props.items.map((item) => {
                return { ...item, _classes: item.status.toLowerCase() }
            })
            setGames(items)
            setName(props.name)
        }
        setAdminState(props.admin)
    }, [props.items, props.admin])

    if (name === 'grp' && event.round > 3) {
        return <></>
    }

    return (
        <>
            <CFade>
                <CCard className="team-group none-table-header">
                    <CCardHeader>
                        {grpName[name]}
                        <div className="card-header-actions">
                            <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                                <CIcon size="lg" name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                            </CLink>
                        </div>
                    </CCardHeader>
                    <CCollapse show={collapsed}>
                        <CCardBody>
                            <CDataTable
                                header={true}
                                clickableRows={true}
                                items={games}
                                fields={fields}
                                onRowClick={
                                    (item) => onClickMatchItem(item)}
                                scopedSlots={{
                                    'startTime':
                                        (item) => (
                                            <td className="align-middle position-relative">
                                                {moment(item.startTime).format('HH:mm DD/MM')}
                                                {/* {item.status === GAME_STATUS.BETTING && <CSpinner className="position-absolute" color="info" variant="grow" />} */}
                                            </td>
                                        ),
                                    'firstTeam':
                                        (item) => (
                                            <td className="align-middle text-right">
                                                {item.firstTeam.name}<CIcon className="ml-2" width="36" name={item.firstTeam ? item.firstTeam.flagCode : ''}></CIcon>
                                            </td>
                                        ),
                                    'score':
                                        (item) => (
                                            <td className="align-middle text-center">
                                                <span className="score-text">{`${item.goals.first90}:${item.goals.second90}`}</span>
                                            </td>
                                        ),
                                    'secondTeam':
                                        (item) => (
                                            <td className="align-middle text-left">
                                                <CIcon width="36" name={item.secondTeam.flagCode} className="mr-2"></CIcon> {item.secondTeam.name}
                                            </td>
                                        ),
                                    'match':
                                        (item) => (
                                            <td className="align-middle text-right">
                                                <span className="small avatar avatar-blue avatar-sm">{item.match}</span>
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCollapse>
                </CCard>
            </CFade>
        </>
    )
}

export default React.memo(MatchGroup)

