import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, faChessQueen, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faProjectDiagram, faChartPie, faAsterisk, faArchive, faMobileAlt, faMapMarkedAlt, } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
// import Avatar from 'react-avatar';
import './segments.scss'
import {
    CBadge,
    CButton,
    CImg,
    CCol,
    CDataTable,
    CLabel,
    CTooltip,
    CModal,
    CModalHeader,
    CSelect,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CInputCheckbox,
    CCallout,
    CCard,
    CCardBody,
    CPopover,
    CDropdownItem,
    CFormGroup,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CInputRadio,
    CInput,
    CRow,
    CDropdownDivider,
    CLink,
} from '@coreui/react'
import segmentData from './segmentData'
import CreateSegments from './CreateSegment'

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Pause': return 'light'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        case 'Default': return 'primary'
        default: return 'primary'
    }
}

const getDefaultSegments = defaultSegment => {
    switch (defaultSegment) {
        case 'Default': return 'primary'
        case 'noDefault': return false
    }
}
const Segments = () => {

    const [large, setLarge] = useState(false)

    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardBody>
                            <CCol className="d-flex flex-lg-row flex-md-row flex-sm-row flex-column pb-4 p-0">
                                <div className="d-flex flex-row pb-3">
                                    <div className="filter">
                                        <div className="line-active"></div>
                                        <CButton variant="ghost">All</CButton>
                                    </div>
                                    <div className="filter">
                                        {/* <div className="line-active"></div> */}
                                        <CButton variant="ghost">Active</CButton>
                                    </div>
                                    <div className="filter">
                                        {/* <div className="line-active"></div> */}
                                        <CButton variant="ghost">Paused</CButton>
                                    </div>
                                </div>
                                <div className="p-0 ml-lg-auto ml-md-auto ml-sm-auto">
                                    <CButton color="primary" size="lg" onClick={() => setLarge(!large)}><FontAwesomeIcon icon={faPlusCircle} className="mr-2" /><span>Create segment</span></CButton>
                                </div>
                            </CCol>
                            <CDataTable
                                items={segmentData}
                                fields={[
                                    { key: 'segments', label: 'segments', _style: { width: '35%' } },
                                    { key: 'status', label: 'status', _style: { width: '5%' } },
                                    { key: 'users', label: 'Users in segment', _style: { width: '10%' } },
                                    { key: 'createby', label: 'create by', _style: { width: '10%' } },
                                    { key: 'action', label: 'action', _style: { width: '1%' } },
                                ]}
                                itemsPerPage={5}
                                // hover
                                striped
                                pagination
                                scopedSlots={{
                                    // name
                                    'segments':
                                        (item) => (
                                            <td>
                                                <CCol className="p-0 pl-2">
                                                    <div className="d-flex flex-row align-items-center">
                                                        <div className="p-0">
                                                            <h5 className="mb-1 pr-2 text-dark" style={{ fontWeight: 700 }}>{item.segments}</h5>
                                                        </div>
                                                        <div>
                                                            <CTooltip
                                                                content={`Default segment is used as first or default option when sending messages`}
                                                            >
                                                                <CBadge className="mr-1 badge-status" block color="primary">{item.type}</CBadge>
                                                            </CTooltip>
                                                        </div>
                                                    </div>
                                                    <div className="pt-1 light-color">
                                                        <span>Create Date: {item.createDate}</span>
                                                    </div>
                                                    <div className=" pl-0 pt-2 d-flex flex-column bd-highlight">
                                                        {item.filter.includes("ageRange") && <strong className="segment-lb pb-1 light-color"><FontAwesomeIcon icon={faUserCircle} className="mr-2" />Age Range 30 - 35 years old</strong>}
                                                        {item.filter.includes("channelsType") && <strong className="segment-lb pb-1 light-color"><FontAwesomeIcon icon={faVenusMars} className="mr-2" />Gender is Male</strong>}
                                                        {item.filter.includes("gender") && <strong className="segment-lb pb-1 light-color"><FontAwesomeIcon icon={faMobileAlt} className="mr-2" />Channel Type is Zalo</strong>}
                                                        {item.filter.includes("Area") && <strong className="segment-lb pb-1 light-color"><FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" />Channel Type is Zalo</strong>}
                                                    </div>
                                                </CCol>
                                            </td>
                                        ),
                                    //create by
                                    'createby':
                                        (item) => (
                                            <td>
                                                <span>{item.createby}</span>
                                            </td>
                                        ),
                                    //status
                                    'status':
                                        (item) => (
                                            <td>
                                                <CCol className="p-0 pl-1">
                                                    <CBadge className="badge-status" color={getBadge(item.status)}>
                                                        {item.status}
                                                    </CBadge>
                                                </CCol>
                                            </td>
                                        ),
                                    //button action
                                    'action':
                                        (item) => (
                                            <td>
                                                <CDropdown className="m-1 d-flex justify-content-center">
                                                    <CDropdownToggle color="ghost">
                                                        <FontAwesomeIcon icon={faEllipsisV} style={{ width: 12, height: 12, }} />
                                                    </CDropdownToggle>
                                                    <CDropdownMenu className="">
                                                        <CDropdownItem>
                                                            <CLink to="/contacts"><FontAwesomeIcon icon={faEye} className="mr-2" />View users</CLink>
                                                        </CDropdownItem>
                                                        <CDropdownItem><FontAwesomeIcon icon={faPen} className="mr-2" />Edit</CDropdownItem>
                                                        <CDropdownItem><FontAwesomeIcon icon={faPause} className="mr-2" />Pause</CDropdownItem>
                                                        <CDropdownItem><FontAwesomeIcon icon={faAsterisk} className="mr-2" />Set default</CDropdownItem>
                                                        <CDropdownItem><FontAwesomeIcon icon={faClone} className="mr-2" />Duplicate</CDropdownItem>
                                                        <CDropdownDivider />
                                                        <CDropdownItem className="danger-color"><FontAwesomeIcon icon={faTrash} className="mr-2" />Delete</CDropdownItem>
                                                    </CDropdownMenu>
                                                </CDropdown>
                                                {' '}
                                            </td>
                                        )
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            {/* modal create segment */}
            <CreateSegments show={large} onClose={() => setLarge(false)} onOpen={() => { setLarge(true) }} />

        </>
    )
}

export default Segments

