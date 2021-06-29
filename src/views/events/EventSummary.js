import './event.scss'
import React, { useState, useEffect } from 'react'
import {
    CDataTable,
    CTabs,
    CNav,
    CNavItem,
    CCol,
    CRow,
    CNavLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as fbDb from 'src/services/index'
import { isEmpty, take, toUpper, orderBy, indexOf } from 'lodash'
import { useMediaQuery } from 'react-responsive'
import { SET_LOGO } from 'src/actions/types'

const EventSummary = (props) => {
    const largeScreen = useMediaQuery({
        query: '(min-device-width: 600px)'
    });
    const eventId = toUpper(props.eventId || props.match.params.id)
    const dispatch = useDispatch()
    const history = useHistory()
    const sysUser = useSelector(state => state.auth.user);
    const event = useSelector(state => state.auth.event);
    const evtTeams = useSelector(state => state.event.teams);
    const storedUsers = useSelector(state => state.auth.users);
    const [userPoints, setUserPoints] = useState([]);
    const [selectRound, setSelectRound] = useState(-1);
    const [outTeams, setOutTeams] = useState([]);
    const panelDisplay = !isEmpty(props.eventId)

    const fields = [
        { key: 'pos', label: '#', _classes: 'text-center' },
        { key: 'name', label: 'Tên', _classes: 'align-middle' },
        { key: 'winner', label: largeScreen ? 'Vô địch' : 'VĐ', _classes: `text-center ${panelDisplay ? 'd-none' : ''}` },
        { key: 'corrected', label: largeScreen && !panelDisplay ? 'Đúng' : 'Đ.', _classes: 'align-middle text-center' },
        { key: 'wrong', label: largeScreen && !panelDisplay ? 'Sai' : 'S.', _classes: 'text-center' },
        { key: 'missed', label: largeScreen && !panelDisplay ? 'Bỏ qua' : 'BQ', _classes: `text-center d-none ${panelDisplay ? '' : ' d-sm-table-cell'}` },
        { key: 'percent', label: '%', _classes: `text-center` },
        { key: 'point', label: largeScreen && !panelDisplay ? 'Điểm' : 'Pt', _classes: 'text-center' },
    ]

    const isOutTeam = (team) => {
        return indexOf(outTeams, team.id) > -1 ? 'out' : ''
    }
    const onClickUserItem = (user) => {
        history.push(`/event-user/${user.id}`)
    }

    const onSelectRound = (rNo, data) => {
        const usPts = data || userPoints
        setSelectRound(rNo)
        const field = rNo === 0 ? 'result' : 'R' + rNo
        const tmpTable = orderBy(usPts, [`${field}.point`, `${field}.corrected`, 'name'], ['desc', 'desc', 'asc'])
        setUserPoints(panelDisplay ? take(tmpTable, 10) : tmpTable)
    }

    useEffect(async () => {
        if (isEmpty(userPoints) && evtTeams.length > 0 && storedUsers.length > 0) {
            if (!panelDisplay) {
                dispatch({
                    type: SET_LOGO,
                    payload: {
                        icon: 'logo',
                        img: ''
                    }
                })
            }

            let userPts = await fbDb.BettingService.getUserBettingRound(sysUser.group, eventId, event.round)
            const eventSummary = await fbDb.EventService.getEventSummary(eventId)
            // console.log(userPts)
            setOutTeams(eventSummary.outTeams)

            // console.log(userPts)
            fbDb.BettingService.calculatePointTable(userPts, eventSummary, evtTeams, storedUsers, sysUser.id).then(response => {
                // setUserPoints(response)
                onSelectRound(event.round, response)
            })

        }
    }, [evtTeams, selectRound]);

    if (isEmpty(userPoints)) {
        return <div></div>
    }

    return (
        <>
            {!panelDisplay &&
                <div className="user-point-header">
                    <CRow>
                        <CCol md="3">
                            <span className="title"><CIcon name="cil-diamond" size="xl" className="mr-1 mb-1"></CIcon> BẢNG XẾP HẠNG</span>
                        </CCol>
                        <CCol>
                            <CNav className="justify-content-end">
                                <CNavLink active={selectRound === 1} onClick={() => onSelectRound(1)}>{largeScreen ? 'Vòng 1' : 'V1'}</CNavLink>
                                {event.round >= 2 && <CNavLink active={selectRound === 2} onClick={() => onSelectRound(2)}>{largeScreen ? 'Vòng 2' : 'V2'}</CNavLink>}
                                {event.round >= 3 && <CNavLink active={selectRound === 3} onClick={() => onSelectRound(3)}>{largeScreen ? 'Vòng 3' : 'V3'}</CNavLink>}
                                {event.round >= 4 && <CNavLink active={selectRound === 4} onClick={() => onSelectRound(4)}>{largeScreen ? 'Vòng 4' : 'V4'}</CNavLink>}
                                {event.round == 5 && <CNavLink active={selectRound === 5} onClick={() => onSelectRound(5)}>{largeScreen ? 'Vòng 5' : 'V5'}</CNavLink>}
                                {event.round >= 2 && <CNavLink active={selectRound === 0} onClick={() => onSelectRound(0)}>Tất cả</CNavLink>}
                            </CNav>
                        </CCol>
                    </CRow>
                </div>}
            <CRow className={`${panelDisplay ? 'panel' : 'event-data'}`}>
                <CCol>
                    <CDataTable
                        header={true}
                        clickableRows={true}
                        items={userPoints}
                        fields={fields}
                        onRowClick={
                            (item) => onClickUserItem(item)}
                        scopedSlots={{
                            'pos':
                                (item, index) => (
                                    <td className="text-center align-middle">
                                        {index + 1}
                                    </td>
                                ),
                            'name':
                                (item) => (
                                    <td className="align-items-center d-flex">
                                        <CIcon className="c-avatar mr-2" width="36" src={item.avatar}></CIcon>
                                        <span className="d-none d-sm-block">{item.name}</span>
                                        <span className="d-block d-sm-none">{item.initName}</span>
                                    </td>
                                ),
                            'winner':
                                (item) => (
                                    <td className={`text-center ${panelDisplay ? 'd-none' : ''} ${isOutTeam(item.favTeam)}`}>
                                        <CIcon className="" width="36" name={item.favTeam.flagCode || 'flag-tbd'}></CIcon>
                                    </td>
                                ),
                            'corrected':
                                (item) => (
                                    <td className={`text-center align-middle`}>
                                        {selectRound === 0 ? item.result.corrected : item[`R${selectRound}`].corrected}
                                    </td>
                                ),
                            'wrong':
                                (item) => (
                                    <td className="text-center align-middle">
                                        {selectRound === 0 ? item.result.wrong : item[`R${selectRound}`].wrong}
                                    </td>
                                ),

                            'missed':
                                (item) => (
                                    <td className={`text-center align-middle d-none ${panelDisplay ? '' : 'd-sm-table-cell'}`}>
                                        {selectRound === 0 ? item.result.missed : item[`R${selectRound}`].missed}
                                    </td>
                                ),
                            'percent':
                                (item) => (
                                    <td className={`text-center align-middle`}>
                                        {Math.round((selectRound === 0 ? item.result.percent : item[`R${selectRound}`].percent) * 100)}%
                                    </td>
                                ),
                            'point':
                                (item) => (
                                    <td className="text-center align-middle">
                                        {selectRound === 0 ? item.result.point : item[`R${selectRound}`].point}
                                    </td>
                                ),
                        }}
                    />
                </CCol>
            </CRow>

        </>
    )
}

export default EventSummary
