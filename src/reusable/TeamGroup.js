
import './team-group.scss'
import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
    CFade,
    CCard,
    CCardHeader,
    CCollapse,
    CCardBody,
    CDataTable, CLink, CCol, CButton, CRow
} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import GameService from 'src/services/game.service'

const TeamGroup = props => {
    const dispatch = useDispatch()
    const event = useSelector(state => state.auth.event);
    const [collapsed, setCollapsed] = useState(!props.isMobile)
    const [teams, setTeams] = useState([]);
    const [isAdmin, setAdminState] = useState(false);
    const tbName = props.table;

    const fields = [
        { key: 'flagCode', label: '', _classes: 'align-middle' },
        { key: 'name', label: 'TEAM', _classes: 'align-middle' },
        { key: 'win', label: 'W', _classes: 'align-middle' },
        { key: 'draw', label: 'D', _classes: 'align-middle' },
        { key: 'lost', label: 'L', _classes: 'align-middle' },
        { key: 'gD', label: 'GF-GA', _classes: 'align-middle' },
        { key: 'point', label: 'PTS', _classes: 'align-middle text-center font-weight-bold' },
    ]

    const updateStandingTable = (table) => {
        GameService.updateStandingTable(event.id, table).then((response) => {
            setTeams(response)
        })
    }

    useEffect(() => {
        if (props.teams) {
            setTeams(props.teams)
        }
        setAdminState(props.admin)

    }, [props.teams, props.admin])

    return (
        <CFade>
            <CCard className="team-group mb-3">
                <CCardHeader>
                    {`Bảng ${tbName}`}
                    <div className="card-header-actions">
                        {isAdmin &&
                            <CLink className="card-header-action" onClick={() => updateStandingTable(tbName)}>
                                <CIcon size="xl" color="red" name='cil-sync' title="Cập nhật bảng xếp hạng" />
                            </CLink>}
                        <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                            <CIcon size="xl" color="black" name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                        </CLink>
                    </div>
                </CCardHeader>
                <CCollapse show={collapsed}>
                    <CCardBody>
                        <CDataTable addTableClasses="standing"
                            noItemsView={{ noItems: 'Loading teams', icon: '' }}
                            items={teams}
                            fields={fields}
                            scopedSlots={{
                                'flagCode':
                                    (item) => (
                                        <td className="text-center">
                                            <CIcon width="32" name={item.flagCode}></CIcon>
                                        </td>
                                    ),
                                'gD':
                                    (item) => (
                                        <td className="align-middle text-center">
                                            {item.gF}-{item.gA}
                                        </td>
                                    )
                            }}
                        />
                    </CCardBody>
                </CCollapse>
            </CCard>
        </CFade>
    )
}

export default React.memo(TeamGroup)

