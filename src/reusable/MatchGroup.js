
import './team-group.scss'
import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
    CFade,
    CCard,
    CCardHeader,
    CCollapse,
    CCardBody,
    CDataTable, CLink, CButton
} from '@coreui/react'
import moment from 'moment'

const MatchGroup = props => {
    const [collapsed, setCollapsed] = useState(true)
    const [games, setGames] = useState([]);
    const [name, setName] = useState('');
    const grpName = {
        grp: 'Vòng bảng',
        ro16: 'Vòng 1/8',
        qf: 'Tứ kết',
        sf: 'Bán kết',
        final: 'Chung kết'
    }

    const fields = [
        { key: 'startTime', label: '', _classes: 'align-middle', _style: { width: '150px' } },
        { key: 'firstTeam', label: '', _classes: 'align-middle', _style: { width: '195px' } },
        { key: 'score', label: '', _classes: 'align-middle text-center', _style: { width: '50px' } },
        { key: 'secondTeam', label: '', _classes: 'align-middle', _style: { width: '195px' } },
        { key: 'match', label: '', _classes: 'align-middle' },

    ]
    useEffect(() => {
        if (props.items) {
            setGames(props.items)
            setName(props.name)
        }
    }, [props.items])

    return (

        <CFade>
            <CCard className="team-group none-table-header">
                <CCardHeader>
                    {grpName[name]}
                    <div className="card-header-actions">
                        <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                            <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                        </CLink>
                    </div>
                </CCardHeader>
                <CCollapse show={collapsed}>
                    <CCardBody>
                        <CDataTable
                            header={true}
                            items={games}
                            fields={fields}
                            scopedSlots={{
                                'startTime':
                                    (item) => (
                                        <td className="align-middle">
                                            {moment(item.startTime).format('HH:mm DD/MM')}
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

    )
}

export default React.memo(MatchGroup)

