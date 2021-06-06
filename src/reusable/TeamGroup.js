
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

const TeamGroup = props => {
    const [collapsed, setCollapsed] = useState(true)
    const [teams, setTeams] = useState([]);
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
    useEffect(() => {
        if (props.teams) {
            setTeams(props.teams)
        }

    }, [props.teams])

    return (
        <CFade>
            <CCard className="team-group">
                <CCardHeader>
                    {`Bảng ${tbName}`}
                    <div className="card-header-actions">
                        <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                            <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                        </CLink>
                    </div>
                </CCardHeader>
                <CCollapse show={collapsed}>
                    <CCardBody>
                        <CDataTable
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

