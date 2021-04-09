import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, faIndent, faMailBulk, faAt, faMapMarkedAlt, faAddressBook, faAddressCard, faGlobeAsia, faCalendarCheck, faIdCard, faMapMarkerAlt, faHistory, faEnvelopeOpenText, faPoll, faChartPie, faCheckCircle, faCalendarPlus, faDotCircle, faWindowClose, faChargingStation, } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import femaleimg from '/Users/hauxuan/Desktop/pvoil-ott-platform-client/src/views/users/avatar/female.jpg'
import './contacts.scss'
import {
    CBadge,
    CButton,
    CInvalidFeedback,
    CValidFeedback,
    CImg,
    CForm,
    CCol,
    CDataTable,
    CPagination,
    CLabel,
    CTooltip,
    CModal,
    CModalHeader,
    CSelect,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CLink,
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
} from '@coreui/react'
import { faAccessibleIcon, faTelegram, faViber } from '@fortawesome/free-brands-svg-icons'

const placements = [
    'top'
]
const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}
const ContactDetails = () => {
    const [modal, setModal] = useState(true)
    const [large, setLarge] = useState(false)
    const [small, setSmall] = useState(false)
    const [primary, setPrimary] = useState(false)
    const [success, setSuccess] = useState(false)
    const [warning, setWarning] = useState(false)
    const [danger, setDanger] = useState(false)
    const [info, setInfo] = useState(false)
    return (
        <>
            <CCol lg="12" className="p-0">

                <CCard>
                    <CCardBody>
                        <table className="table">
                            <tbody>
                                <CCol col="12" className="d-flex flex-row bd-highlight p-0 pb-4 d-flex align-items-center">
                                    <div>
                                        {/* avatar */}
                                        <img src={femaleimg} className="c-avatar-img-bg " alt="admin@bootstrapmaster.com" name="avatar-male-default" />
                                    </div>
                                    <div className="pl-4">
                                        <div className="d-flex align-items-center">
                                            <h4>Nguyễn Văn Nam</h4>
                                            {placements.map(placement => {
                                                return (
                                                    <CTooltip
                                                        content={`Subcribed`}
                                                        placement={placement}
                                                    >
                                                        <FontAwesomeIcon icon={faCheckCircle} className="mb-2 ml-2 primary-color" />
                                                    </CTooltip>
                                                )
                                            })}
                                        </div>
                                        <small className="pt-0 light-color"><strong>Online 10 minutes ago</strong></small>
                                    </div>
                                    <div className="ml-auto">
                                        <CButton color="primary" onClick={() => setLarge(!large)}><FontAwesomeIcon icon={faPen} className="mr-2" />Update Info</CButton>
                                    </div>
                                </CCol>

                                <CRow>
                                    <CCol col="6" lg="6" className="pb-4">
                                        <CCol className="p-0 pl-0">
                                            <FontAwesomeIcon icon={faUserCircle} style={{ height: 16, width: 16 }} className="mr-3 primary-color" />
                                            <CLabel htmlFor="name" className="form-control-label mb-0">
                                                <h5 htmlFor="role">Basic Info</h5>
                                            </CLabel>
                                        </CCol>
                                        <CCol col="6" className="body-data mt-3 pt-4 p-3 pl-4">
                                            <CRow className="pb-2">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="pb-2 d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faAt} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">Email</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub pb-2">
                                                    laxuanhau1995@gmail.com
                                                </CCol>
                                            </CRow>
                                            <CRow className="pb-2">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="pb-2 d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faUser} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">Name</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub">Nguyễn Văn Nam</CCol>
                                            </CRow>
                                            <CRow className="pb-3">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faDotCircle} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">Status</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub mt-2"><CBadge className="badge-status" color="success">
                                                    Active
                                                </CBadge></CCol>
                                            </CRow>
                                            {/* channels */}
                                            <CRow className="pb-3">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faUser} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">Channels</span>
                                                </CCol>
                                                <CCol className="mt-2 d-flex flex-row bd-highlight">
                                                    {/* channels icon */}
                                                    {/* viber icon */}
                                                    {placements.map(
                                                        placement => {
                                                            return (
                                                                <CTooltip
                                                                    content={`Viber`}
                                                                    placement={placement}
                                                                >
                                                                    <FontAwesomeIcon icon={faViber} className="channel-icon mr-2" style={{ color: '#665CAC' }} />
                                                                </CTooltip>
                                                            )
                                                        })}
                                                    {/* zalo icon */}
                                                    {placements.map(placement => {
                                                        return (
                                                            <CTooltip
                                                                content={`Zalo`}
                                                                placement={placement}
                                                            >
                                                                <CIcon name="zaloIcon" className="channel-icon mr-2" />
                                                            </CTooltip>
                                                        )
                                                    })}
                                                    {/* telegram icon */}
                                                    {placements.map(placement => {
                                                        return (
                                                            <CTooltip
                                                                content={`Telegram`}
                                                                placement={placement}
                                                            >
                                                                <FontAwesomeIcon icon={faTelegram} className="channel-icon mr-2" style={{ color: '#0088cc' }} />
                                                            </CTooltip>
                                                        )
                                                    })}
                                                </CCol>
                                            </CRow>


                                            <CRow className="pb-2">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="pb-2 d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faUserCircle} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">Avatar</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub light-color">No data</CCol>
                                            </CRow>
                                            <CRow className="pb-2">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="pb-2 d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faVenusMars} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">Gender</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub">Male</CCol>
                                            </CRow>
                                            <CRow className="pb-2">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="pb-2 d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faUser} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">Age</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub">35 Years old</CCol>
                                            </CRow>
                                            <CRow className="pb-2">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="pb-2 d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">Address</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub light-color">No data</CCol>
                                            </CRow>
                                            <CRow className="pb-2">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="pb-2 d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faGlobeAsia} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">Country</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub">Viet Nam</CCol>
                                            </CRow>
                                            <CRow className="pb-2">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="pb-2 d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faCalendarPlus} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">CreateDate</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub">10:00, 20/10/2021</CCol>
                                            </CRow>
                                            <CRow className="pb-2">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="pb-2 d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faCalendarCheck} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">LastUpdate</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub">12:00, 20/10/2021</CCol>
                                            </CRow>
                                            <CRow className="pb-2">
                                                <CCol col="3" xs="12" sm="3" md="3" lg="4" className="pb-2 d-flex flex-row bd-highlight d-flex align-items-center">
                                                    <FontAwesomeIcon icon={faIdCard} className="mr-3 primary-color" />
                                                    <span className="text-sub light-color">UserID</span>
                                                </CCol>
                                                <CCol col="6" className="text-sub">
                                                    40a4314f-4355-4281-81a6-da0e6d884cca</CCol>
                                            </CRow>
                                        </CCol>

                                    </CCol>
                                    {/* right */}
                                    <CCol col="6" lg="6">
                                        {/* segments */}
                                        <CCol className="p-0 pb-0 pl-0">
                                            <FontAwesomeIcon icon={faChartPie} style={{ height: 16, width: 16 }} className="mr-3 primary-color" />
                                            <CLabel htmlFor="name" className="form-control-label mb-0">
                                                <h5 htmlFor="role">Segments of user</h5>
                                            </CLabel>
                                        </CCol>
                                            <CCol col="12" className="body-data  mt-3 pt-4 p-3 pl-4">
                                                <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-2">
                                                    <span className="tags-text pr-2 ml-2" maxLength={20} > User details such as first name, last name, email address, phone number and password  </span>
                                                    <FontAwesomeIcon icon={faTimes} style={{ height: 16, width: 16 }} className="mr-2" />
                                                </div>
                                                <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-2">
                                                    <span className="tags-text pr-2 ml-2"> Segment Name 2 dài hơn chút xíu</span>
                                                    <FontAwesomeIcon icon={faTimes} style={{ height: 16, width: 16 }} className="mr-2" />
                                                </div>
                                                <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-2">
                                                    <span className="tags-text pr-2 ml-2"> Segment Name 3</span>
                                                    <FontAwesomeIcon icon={faTimes} style={{ height: 16, width: 16 }} className="mr-2" />
                                                </div>
                                            </CCol>
                                        {/* last message sent */}
                                        <CCol className="p-0 pb-0 pl-0 pt-4">
                                            <FontAwesomeIcon icon={faHistory} style={{ height: 16, width: 16 }} className="mr-3 primary-color" />
                                            <CLabel htmlFor="name" className="form-control-label mb-0">
                                                <h5 htmlFor="role">Last message sent</h5>
                                            </CLabel>
                                        </CCol>
                                        <CCol col="6" className="body-data mt-3 p-3 pl-4">
                                            <CCol col="12" className="d-flex flex-row bd-highlight p-2">
                                                <div className="c-avatar">
                                                    {/* avatar */}
                                                    <img src={femaleimg} className="c-avatar-img" alt="admin@bootstrapmaster.com" height="72" width="72" name="avatar-male-default" />
                                                </div>
                                                <div className="pl-4">
                                                    <h6><strong>Nguyễn Văn Nam</strong></h6>
                                                    <span className="light-color">Conent message holoa holoa tesolf team</span>
                                                </div>
                                                <div className="ml-auto light-color">
                                                    <span><strong>10 minutes agos</strong></span>
                                                </div>
                                            </CCol>
                                        </CCol>
                                        <CCol className="p-0 pb-0 pl-0 pt-4">
                                            <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ height: 16, width: 16 }} className="mr-3 primary-color" />
                                            <CLabel htmlFor="name" className="form-control-label mb-0">
                                                <h5 htmlFor="role">Message Statistics</h5>
                                            </CLabel>
                                        </CCol>
                                        <CCol col="12" className="body-data d-flex flex-row bd-highlight pl-0 py-4 mt-3">
                                            <CCol className="box-statistics border-right d-flex flex-column">
                                                <CLabel className="d-flex justify-content-center light-color"><strong>Messages sent</strong></CLabel>
                                                <h5 className="d-flex justify-content-center"><strong>100.000</strong></h5>
                                            </CCol>
                                            <CCol className="box-statistics border-right d-flex flex-column">
                                                <CLabel className="d-flex justify-content-center light-color"><strong>Pending</strong></CLabel>
                                                <h5 className="d-flex justify-content-center"><strong>100</strong></h5>
                                            </CCol>
                                            <CCol className="box-statistics d-flex flex-column">
                                                <CLabel className="d-flex justify-content-center light-color"><strong>Failed</strong></CLabel>
                                                <h5 className="d-flex justify-content-center"><strong>0</strong></h5>
                                            </CCol>
                                        </CCol>

                                    </CCol>
                                </CRow>
                            </tbody>
                        </table>
                    </CCardBody>
                </CCard>

                <CModal
                    show={large}
                    onClose={() => setLarge(!large)}
                    size="lg"
                >
                    <CModalHeader closeButton>
                        <CModalTitle>Edit Contact 'Hola'</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CCol className="py-2 p-0"><h5><strong>Basic info</strong></h5></CCol>
                        <CRow>
                            <CCol>
                                <CForm className="was-validated">
                                    <CFormGroup>
                                        <CLabel htmlFor="inputWarning2i">Enter First Name</CLabel>
                                        <CInput className="form-control-warning" id="inputWarning2i" required />
                                        <CInvalidFeedback className="help-block">
                                            Please provide a valid information
                                        </CInvalidFeedback>
                                        <CValidFeedback className="help-block">Lastname is required</CValidFeedback>
                                    </CFormGroup>
                                </CForm>
                            </CCol>
                            <CCol>
                                <CForm className="was-validated">
                                    <CFormGroup>
                                        <CLabel htmlFor="inputSuccess2i">Enter Last Name</CLabel>
                                        <CInput className="form-control-success" id="inputSuccess2i" />
                                        <CValidFeedback>Non-required</CValidFeedback>
                                    </CFormGroup>
                                </CForm>
                            </CCol>
                            <CCol>
                                <CForm className="was-validated">
                                    <CFormGroup>
                                        <CLabel htmlFor="inputWarning2i">Enter Email</CLabel>
                                        <CInput className="form-control-warning" id="inputWarning2i" required />
                                        <CInvalidFeedback className="help-block">
                                            Please provide a valid information
                                        </CInvalidFeedback>
                                        <CValidFeedback className="help-block">Email is required</CValidFeedback>
                                    </CFormGroup>
                                </CForm>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CLabel htmlFor="inputWarning2i">Gender</CLabel>
                                <CSelect custom name="select" id="select">
                                    <option value="0">select..</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                    <option value="3">Other</option>
                                </CSelect>
                            </CCol>
                            <CCol>
                                <CFormGroup>
                                    <CLabel htmlFor="phone-number">Date of Birth</CLabel>
                                    <CInput id="" type="date" placeholder="Name" required />
                                </CFormGroup>

                            </CCol>
                            <CCol>
                                <CLabel htmlFor="inputWarning2i">Country</CLabel>
                                <CSelect custom name="select" id="select">
                                    <option value="0">select..</option>
                                    <option value="1">1</option>
                                    <option value="2">1</option>
                                    <option value="3">1</option>
                                </CSelect>
                            </CCol>
                        </CRow>
                        <CCol className="py-2 p-0"><h5><strong>Address</strong></h5></CCol>
                        <CRow>
                            <CCol>
                                <CLabel htmlFor="inputWarning2i">City</CLabel>
                                <CSelect custom name="select" id="select">
                                    <option value="0">select..</option>
                                    <option value="1">1</option>
                                    <option value="2">1</option>
                                    <option value="3">1</option>
                                </CSelect>
                            </CCol>
                            <CCol>
                                <CLabel htmlFor="inputWarning2i">District</CLabel>
                                <CSelect custom name="select" id="select">
                                    <option value="0">select..</option>
                                    <option value="1">1</option>
                                    <option value="2">1</option>
                                    <option value="3">1</option>
                                </CSelect>
                            </CCol>
                            <CCol>
                                <CLabel htmlFor="inputWarning2i">Ward</CLabel>
                                <CSelect custom name="select" id="select">
                                    <option value="0">select..</option>
                                    <option value="1">1</option>
                                    <option value="2">1</option>
                                    <option value="3">1</option>
                                </CSelect>
                            </CCol>

                        </CRow>
                        <CRow>
                            <CCol col="4" lg="4" className="pt-4">
                                <CForm className="was-validated">
                                    <CFormGroup>
                                        <CLabel htmlFor="inputWarning2i">Enter IP Address</CLabel>
                                        <CInput className="form-control-warning" id="inputWarning2i" required />
                                        <CInvalidFeedback className="help-block">
                                            Please provide a valid information
                                        </CInvalidFeedback>
                                        <CValidFeedback className="help-block">Email is required</CValidFeedback>
                                    </CFormGroup>
                                </CForm>
                            </CCol>
                        </CRow>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="light" onClick={() => setLarge(!large)}>Cancel</CButton>
                        <CButton color="primary" onClick={() => setLarge(!large)}>Save</CButton>{' '}
                    </CModalFooter>
                </CModal>
            </CCol>

        </>
    )
}

export default ContactDetails
