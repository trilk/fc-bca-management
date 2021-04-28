import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, faChessQueen, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faProjectDiagram, faChartPie, faAsterisk, faArchive, faMapMarkedAlt, faPhoneAlt, faPhoneSquareAlt, faMobileAlt, } from '@fortawesome/free-solid-svg-icons'
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

const CreateSegments = ({ onOpen, show, onClose }) => {

    return (
        <>
            {/* modal create segment */}
            <CModal
                show={show}
                size="lg"
                onClose={onClose}
            >
                <CModalHeader className="px-xxl-4 px-xl-4 px-lg-4 px-md-4" closeButton onClick={onOpen}>
                    <CModalTitle>Create Segment</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        {/* header */}
                        <CCol xl={12} className="d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-column segment-header pb-2 p-0 p-xl-3 p-lg-3">
                            <CCol className="pb-3" xxl={6} xl={6} lg={6} md={6}>
                                <CLabel><FontAwesomeIcon icon={faTag} className="mr-3" /><strong>Segmnet Name</strong></CLabel>
                                <CInput id="name" placeholder="Enter your name" required />
                            </CCol>
                            <CCol>
                                <div className="float-xxl-right float-xl-right float-lg-right float-left">
                                <h6 className="d-flex justify-content-xl-end text-muted">Total Users</h6>
                                    <h3 className="d-flex justify-content-xl-end">Pending</h3>
                                </div>
                            </CCol>
                        </CCol>
                        {/* Filter inside */}
                        <CCol className="pt-3 p-0 p-xl-3 p-lg-3" xl={12}>
                            {/* Gender */}
                            <CCol className="py-2">
                                <CLabel><FontAwesomeIcon icon={faUserCircle} className="mr-3" /><span>Age</span></CLabel>
                                <CCol className="border rounded bg-light d-flex flex-xl-row flex-column p-0 py-2">
                                    <CCol xl={3} className="d-flex align-items-center">
                                        <span className="ml-3 text-muted">Filter by range Age</span>
                                    </CCol>
                                    <CCol className="d-flex flex-row flex-wrap">
                                        <div className="p-2">
                                            <CFormGroup variant="custom-radio" inline >
                                                <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                <CLabel variant="custom-checkbox" htmlFor="inline-radio1">18-24</CLabel>
                                            </CFormGroup>
                                        </div>
                                        <div className="p-2">
                                            <CFormGroup variant="custom-radio" inline >
                                                <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                <CLabel variant="custom-checkbox" htmlFor="inline-radio1">25-34</CLabel>
                                            </CFormGroup>
                                        </div>
                                        <div className="p-2">
                                            <CFormGroup variant="custom-radio" inline >
                                                <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                <CLabel variant="custom-checkbox" htmlFor="inline-radio1">35-44</CLabel>
                                            </CFormGroup>
                                        </div>
                                        <div className="p-2">
                                            <CFormGroup variant="custom-radio" inline >
                                                <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                <CLabel variant="custom-checkbox" htmlFor="inline-radio1">45-54</CLabel>
                                            </CFormGroup>
                                        </div>
                                        <div className="p-2">
                                            <CFormGroup variant="custom-radio" inline >
                                                <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                <CLabel variant="custom-checkbox" htmlFor="inline-radio1">65+</CLabel>
                                            </CFormGroup>
                                        </div>
                                    </CCol>
                                </CCol>
                            </CCol>
                            {/* Gender */}
                            <CCol className="py-3">
                                <CLabel><FontAwesomeIcon icon={faVenusMars} className="mr-3" /><span>Gender</span></CLabel>
                                <CCol className="border rounded bg-light d-flex flex-xl-row flex-column p-0 py-3">
                                    <CCol xl={3}>
                                        <span className="ml-3 text-muted">Filter by Gender</span>
                                    </CCol>
                                    <CCol className="d-flex flex-row flex-wrap">
                                        <div className="p-2">
                                            <CFormGroup variant="custom-radio" inline >
                                                <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Male</CLabel>
                                            </CFormGroup>
                                        </div>
                                        <div className="p-2">
                                            <CFormGroup variant="custom-radio" inline >
                                                <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Female</CLabel>
                                            </CFormGroup>
                                        </div>
                                        <div className="p-2">
                                            <CFormGroup variant="custom-radio" inline >
                                                <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Orther</CLabel>
                                            </CFormGroup>
                                        </div>
                                    </CCol>
                                </CCol>
                            </CCol>
                            {/* Channel Type */}
                            <CCol className="p-0 d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-row flex-column" xxl={12}>
                                <CCol className="py-3" xl={6}>
                                    <CLabel><FontAwesomeIcon icon={faMobileAlt} className="mr-3" /><span>Channels Type</span></CLabel>
                                    <CCol className="border rounded bg-light d-flex flex-column p-0 py-3">
                                        <CCol xl={12}>
                                            <span className="ml-3 text-muted">Filter by Channels Type</span>
                                        </CCol>
                                        <CCol className="d-flex flex-column pl-4 py-2">
                                            <div className="p-2">
                                                <CFormGroup variant="custom-radio">
                                                    <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Zalo</CLabel>
                                                </CFormGroup>
                                            </div>
                                            <div className="p-2">
                                                <CFormGroup variant="custom-radio" inline >
                                                    <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Viber</CLabel>
                                                </CFormGroup>
                                            </div>
                                            <div className="p-2">
                                                <CFormGroup variant="custom-radio" inline >
                                                    <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Telegram</CLabel>
                                                </CFormGroup>
                                            </div>
                                        </CCol>
                                    </CCol>
                                </CCol>
                                <CCol className="py-3" xl={6}>
                                    <CLabel><FontAwesomeIcon icon={faMapMarkedAlt} className="mr-3" /><span>Area</span></CLabel>
                                    <CCol className="p-0">
                                        <CSelect custom name="select" id="select">
                                            <option value="0">Please select</option>
                                            <option value="1">Option #1</option>
                                            <option value="2">Option #2</option>
                                            <option value="3">Option #3</option>
                                        </CSelect>
                                    </CCol>
                                </CCol>
                            </CCol>
                        </CCol>



                    </CRow>
                </CModalBody>
                <CModalFooter className="d-flex justify-content-center">
                    <CButton color="ghost" onClick={onClose} className="mr-2">Cancel</CButton>
                    <CButton color="primary" onClick={onOpen}>Create Segmnet</CButton>{' '}
                </CModalFooter>
            </CModal>
        </>
    )
}
export default CreateSegments