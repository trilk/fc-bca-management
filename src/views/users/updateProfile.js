import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import femaleimg from './avatar/female.jpg'
import maleimg from './avatar/male.jpg'
import avatarBlank from './avatar/blank.png'
import './users.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, faPlusCircle, faEllipsisV, faEye, faPen, faSortDown, faChessQueen, faUser, faMapMarkerAlt, faAt, faArrowUp, faArrowDown, faUserShield, faInfo, faQuestionCircle, faCheckCircle, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import {
    CBadge,
    CButton,
    CCol,
    CDataTable,
    CSelect,
    CFormGroup,
    CTabs,
    CLabel,
    CNav,
    CNavItem,
    CTabContent,
    CNavLink,
    CTabPane,
    CCard,
    CLink,
    CCardHeader,
    CCardBody,
    CProgress,
    CPopover,
    CDropdownItem,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CInput,
    CImg,
    CRow,
    CListGroup,
    CListGroupItem,
    CPagination,
    CTooltip,
    CCardFooter
} from '@coreui/react'

const UpdateProfile = () => {

    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/users?page=${newPage}`)
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    const [activeTab, setActiveTab] = useState(1)

    return (
        <>
            <CRow>
                {/* bigen edit profile */}
                <CCol lg="12">
                    <CCard>
                        <CCardHeader className="py-3">
                            <CCol className="d-flex align-items-center p-0">
                                <span className="float-left" style={{ fontSize: 20, fontWeight: 700 }}>Profile Details</span>
                                {/* <CButton color="primary" className="ml-auto">Edit Profile</CButton> */}
                            </CCol>
                        </CCardHeader>
                        <CCardBody>
                            <CCol className="p-0">
                                {/* Avatar */}
                                <CRow className="pb-3 p-0">
                                    <CCol col="3" xs="12" sm="2" lg="3" className="py-2">
                                        <span style={{ fontWeight: 600, fontSize: 15 }}>Avatar</span>
                                    </CCol>
                                    <CCol col="6" className="p-1">
                                        <div className="image-input image-input-outline image-input-empty" data-kt-image-input="true">
                                            <div className="image-input-wrapper w-125px h-125px">
                                            </div>
                                            <CTooltip content={`Change Avatar`} placement="top">
                                                <CLabel className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow" data-kt-image-input-action="change">
                                                    <FontAwesomeIcon icon={faPen} style={{ height: 10, width: 10 }} className="light-color" />
                                                </CLabel>
                                            </CTooltip>
                                        </div>
                                        <div>
                                            <span className="text-muted small">Allowed file types: png, jpg, jpeg. 125px X 125px </span>
                                        </div>
                                    </CCol>
                                </CRow>
                                {/* Name */}
                                <CCol className="pb-1 p-0 d-flex flex-lg-row flex-column">
                                    <CCol col="3" xs="12" sm="2" lg="3" className="p-0 d-flex align-items-center">
                                        <span style={{ fontWeight: 600, fontSize: 13 }}>Full Name <span className="danger-color">*</span>
                                        </span>
                                    </CCol>
                                    <CCol className="px-0 d-flex flex-lg-row flex-column p-0">
                                        <CCol className="p-0 py-2 me-6 mr-3">
                                            <CInput htmlFor="First-name" placeholder="First Name" />
                                        </CCol>
                                        <CCol className="p-0 py-2">
                                            <CInput htmlFor="Last-name" placeholder="Last Name" />
                                        </CCol>
                                    </CCol>
                                </CCol>
                                {/* Contact Phone */}
                                <CCol className="pb-2 d-flex flex-lg-row flex-column align-items-center p-0">
                                    <CCol col="3" xs="12" sm="2" lg="3" className="p-0"><span style={{ fontWeight: 600, fontSize: 13 }}>Email</span></CCol>
                                    <CCol col="6" className="p-0 py-2">
                                        <CInput htmlFor="Phone" placeholder="Email Addess" />
                                    </CCol>
                                </CCol>
                                {/* Gender */}
                                <CCol className="pb-2 d-flex flex-lg-row flex-column align-items-center p-0">
                                    <CCol col="3" xs="12" sm="2" lg="3" className="p-0">
                                        <span style={{ fontWeight: 600, fontSize: 14 }}>Gender</span></CCol>
                                    <CCol col="6" className="py-2 p-0">
                                        <CSelect custom name="select" id="select">
                                            <option value="0">select..</option>
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                            <option value="3">Other</option>
                                        </CSelect>
                                    </CCol>
                                </CCol>
                                {/* Address */}
                                <CCol className="pb-2 d-flex flex-lg-row flex-column p-0 align-items-center">
                                    <CCol col="3" xs="12" sm="2" lg="3" className="p-0">
                                        <span style={{ fontWeight: 600, fontSize: 14 }}>Country</span></CCol>
                                    <CCol col="6" className="py-2 p-0">
                                        <CSelect custom name="select" id="select">
                                            <option value="0">select..</option>
                                            <option value="1">Vietnam</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </CSelect>
                                    </CCol>
                                </CCol>
                                <CCol className="pb-1 p-0 d-flex flex-lg-row flex-column">
                                    <CCol col="3" xs="12" sm="2" lg="3" className="p-0 pt-4">
                                        <span style={{ fontWeight: 600, fontSize: 14 }}>Address</span>
                                    </CCol>
                                    <CCol col="6" className="d-flex flex-lg-row flex-column p-0">
                                        <CCol className="p-0 mr-3 py-2">
                                            <CSelect custom name="select" id="select">
                                                <option value="0">select..</option>
                                                <option value="1">Vietnam</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </CSelect>
                                            <small className="text-muted"><strong>Select</strong> the Provincial/City</small>
                                        </CCol>
                                        <CCol className="p-0 mr-3 py-2">
                                            <CSelect custom name="select" id="select">
                                                <option value="0">select..</option>
                                                <option value="1">Vietnam</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </CSelect>
                                            <small className="text-muted"><strong>Select</strong> District/</small>
                                        </CCol>
                                        <CCol className="p-0 py-2">
                                            <CSelect custom name="select" id="select">
                                                <option value="0">select..</option>
                                                <option value="1">Vietnam</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </CSelect>
                                            <small className="text-muted"><strong>Select</strong> Ward</small>
                                        </CCol>
                                    </CCol>
                                </CCol>
                                {/* street */}
                                <CCol className="pb-1 p-0 d-flex flex-lg-row flex-column">
                                    <CCol col="3" xs="12" sm="2" lg="3" className="p-0 d-flex align-items-center">
                                        <span style={{ fontWeight: 600, fontSize: 14 }}>Street</span>
                                    </CCol>
                                    <CCol col="6" className="p-0 py-2">
                                        <CInput htmlFor="Phone" placeholder="" />
                                    </CCol>
                                </CCol>
                            </CCol>
                        </CCardBody>
                        <CCardFooter>
                            <div className="float-right">
                                <CButton color="ghost" className="mr-2">Discard</CButton>
                                <CButton color="primary">Save Changes</CButton>
                            </div>
                        </CCardFooter>
                    </CCard>
                </CCol>
                {/* Update Profile */}
            </CRow>
        </>
    )
}

export default UpdateProfile
