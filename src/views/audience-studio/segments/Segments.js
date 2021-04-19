import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, faChessQueen, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faProjectDiagram, faChartPie, faAsterisk, } from '@fortawesome/free-solid-svg-icons'
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
const placements = [
    'top'
]

const Segments = () => {

    const [large, setLarge] = useState(false)

    return (
        <>
            <CRow>
                <CCol>
                    {/* <CCol lg="12" className="p-0  pb-3 d-flex bd-highlight ">
                        <div className="p-0 d-flex align-items-end">
                            <h4><FontAwesomeIcon icon={faChartPie} className="mr-3" />Segments</h4>
                        </div>
                    </CCol> */}
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
                                hover
                                striped
                                pagination
                                scopedSlots={{
                                    // name
                                    'segments':
                                        (item) => (
                                            <td>
                                                <CCol className="p-0">
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
                                                        {item.filter.includes("ageRange") && <strong className="segment-lb pb-1 light-color"><FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />Age Range 30 - 35 years old</strong>}
                                                        {item.filter.includes("channelsType") && <strong className="segment-lb pb-1 light-color"><FontAwesomeIcon icon={faUserTag} className="mr-2" />Gender is Male</strong>}
                                                        {item.filter.includes("gender") && <strong className="segment-lb pb-1 light-color"><FontAwesomeIcon icon={faDatabase} className="mr-2" />Channel Type is Zalo</strong>}
                                                    </div>
                                                </CCol>
                                            </td>
                                        ),
                                    //create by
                                    'createby':
                                        (item) => (
                                            <td>
                                                {/* <CCol className="pl-4">
                                                    <div className="c-avatar d-flex justify-content-center">
                                                        <CImg
                                                            src={'avatars/6.jpg'}
                                                            className="c-avatar-img"
                                                            alt="admin@bootstrapmaster.com"
                                                        />
                                                    </div>
                                                </CCol> */}
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
            <CModal
                show={large}
                onClose={() => setLarge(!large)}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Create Segment</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        {/* header */}
                        <CCol col="12" lg="12" className="d-flex flex-row bd-highlight segment-header">
                            <CCol lg="0" className="pl-2 mr-2">
                                <FontAwesomeIcon icon={faTag} />
                            </CCol>
                            <CCol className="p-0 pl-2 pr-2">
                                <CFormGroup>
                                    <CLabel htmlFor="name" className="form-control-label">Segmnet Name <span style={{ color: '#cd384a' }}>*</span></CLabel>
                                    <CInput id="name" placeholder="Enter your name" required />
                                </CFormGroup>
                            </CCol>
                            <CCol className="pr-0">
                                {/* <CCol className="p-0"> */}
                                <h6 className="d-flex justify-content-end light-color"><strong>Total users</strong></h6>
                                <h3 className="d-flex justify-content-end">Pending</h3>
                                {/* </CCol> */}
                            </CCol>
                        </CCol>
                        {/* Filter */}
                        <CCol col="12">
                            <CCol className="p-2 pt-4">
                                <CCol className="pl-0 d-flex flex-row bd-highlight d-flex align-items-center">
                                    <FontAwesomeIcon icon={faFilter} className="mr-2 mb-2 mr-3" />
                                    <h4>Filter</h4>
                                </CCol>
                                <hr />
                            </CCol>
                        </CCol>
                        {/* channel type */}
                        <CCol lg="12" className="d-flex flex-row bd-highlight">
                            <CCol lg="0" className="pl-2 mr-2">
                                <FontAwesomeIcon icon={faDatabase} />
                            </CCol>
                            <CCol className="pl-0">
                                <CCol className="pl-2" >
                                    <CLabel htmlFor="name" className="form-control-label">Channel type</CLabel>
                                </CCol>
                                <CCol className="pl-2 pb-3">
                                    <CFormGroup variant="custom-checkbox" inline className="pr-2 pt-1">
                                        <CInputCheckbox custom id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">Zalo</CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="custom-checkbox" inline>
                                        <CInputCheckbox custom id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">Viber</CLabel>
                                    </CFormGroup>
                                </CCol>
                                <hr />
                            </CCol>
                        </CCol>
                        {/* filter age */}
                        <CCol col="12" lg="12" className="d-flex flex-row bd-highlight">
                            <CCol lg="0" className="pl-2 mr-2">
                                <FontAwesomeIcon icon={faExchangeAlt} />
                            </CCol>
                            <CCol className="pl-0">
                                <CCol className="pl-2">
                                    <CLabel htmlFor="name" className="form-control-label">Age Range</CLabel>
                                </CCol>
                                <CCol className="pr-0 pb-1">
                                    <CFormGroup row >
                                        <CCol className="p-0 pl-2 pr-2">
                                            <CLabel htmlFor="district" className="form-control-label item-label light-color">Age from</CLabel>
                                            <CSelect custom name="select" id="select">
                                                <option value="0">select..</option>
                                                <option value="1">Option #1</option>
                                                <option value="2">Option #2</option>
                                                <option value="3">Option #3</option>
                                            </CSelect>
                                        </CCol>
                                        <CCol>
                                            <CLabel htmlFor="ward" className="form-control-label item-label light-color">To</CLabel>
                                            <CSelect custom name="select" id="select">
                                                <option value="0">select..</option>
                                                <option value="1">Option #1</option>
                                                <option value="2">Option #2</option>
                                                <option value="3">Option #3</option>
                                            </CSelect>
                                        </CCol>
                                    </CFormGroup>
                                </CCol>
                                <hr />
                            </CCol>
                        </CCol>
                        {/* filter gender */}
                        <CCol col="12" lg="12" className="d-flex flex-row bd-highlight">
                            <CCol lg="0" className="pl-2 mr-2">
                                <FontAwesomeIcon icon={faUserTag} />
                            </CCol>
                            <CCol className="pl-0">
                                <CCol className="pl-2">
                                    <CLabel htmlFor="name" className="form-control-label">Gender</CLabel>
                                </CCol>
                                <CCol className="pt-1 pr-0 pb-1">
                                    <CFormGroup variant="custom-checkbox" inline className="pr-2 pt-1">
                                        <CInputCheckbox custom id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">Male</CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="custom-checkbox" inline>
                                        <CInputCheckbox custom id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                                        <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">Female</CLabel>
                                    </CFormGroup>
                                </CCol>
                            </CCol>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="outline" onClick={() => setLarge(!large)}>Cancel</CButton>
                    <CButton color="primary" onClick={() => setLarge(!large)}>Create Segmnet</CButton>{' '}
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Segments

