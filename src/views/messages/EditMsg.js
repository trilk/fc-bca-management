import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, faIndent, faMailBulk, faAt, faMapMarkedAlt, faAddressBook, faAddressCard, faGlobeAsia, faCalendarCheck, faIdCard, faMapMarkerAlt, faHistory, faEnvelopeOpenText, faPoll, faChartPie, faCheckCircle, faCalendarPlus, faDotCircle, faWindowClose, faChargingStation, faPaperPlane, } from '@fortawesome/free-solid-svg-icons'
import {
    CBadge,
    CButton,
    CImg,
    CCol,
    CProgress,
    CDataTable,
    CForm,
    CPagination,
    CLabel,
    CTooltip,
    CModal,
    CModalHeader,
    CSelect,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CInputFile,
    CTextarea,
    CInputCheckbox,
    CCallout,
    CCard,
    CCollapse,
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
    CCardHeader,
} from '@coreui/react'
import './messages.scss'
import { useState } from 'react'
import { phonePreview } from 'src/assets/icons/phone-preview'
import CIcon from '@coreui/icons-react'


const EditMsg = () => {
    //Modal
    const [modal, setModal] = useState(true)
    const [large, setLarge] = useState(false)
    const [small, setSmall] = useState(false)
    const [success, setSuccess] = useState(false)
    //collapse
    const [collapse, setCollapse] = useState(false)
    const [collapseMulti, setCollapseMulti] = useState([false, false])
    const [accordion, setAccordion] = useState(1)
    const [fade, setFade] = useState(true)

    const toggle = (e) => {
        setCollapse(!collapse)
        e.preventDefault()
    }

    const toggleMulti = (type) => {
        let newCollapse = collapseMulti.slice()
        switch (type) {
            case "left":
                newCollapse[0] = !collapseMulti[0];
                break;
            case "right":
                newCollapse[1] = !collapseMulti[1];
                break;
            case "both":
                newCollapse[0] = !collapseMulti[0];
                newCollapse[1] = !collapseMulti[1];
                break;
            default:
        }
        setCollapseMulti(newCollapse)
    }
    //text limit

    return (
        <>
            <CRow className="d-flex flex-column bd-highlight">
                <CCol>
                    <CCard>
                        <CCardHeader className="text-muted font-weight-bold">1. Audience</CCardHeader>
                        <CCardBody>
                            <CCol className="p-0" lg="3" md="3">
                                <CLabel htmlFor="district" className="text-muted">Channel<span className="danger-color pl-1">*</span></CLabel>
                                <CSelect custom name="select" id="select">
                                    <option>select..</option>
                                    <option value="1">Zalo</option>
                                    <option value="2">Viber</option>
                                </CSelect>
                                <small className="form-text text-muted"><strong>Select</strong> a Channel to send message</small>
                            </CCol>
                            <CCol className="p-0 pt-3" lg="2">
                                <CLabel htmlFor="segments" className="text-muted">Segments <span className="danger-color pl-1">*</span></CLabel>
                            </CCol>
                            <CCol className="p-0 d-flex flex-column bd-highlight pb-2">
                                <CFormGroup variant="custom-radio" inline className="pb-1">
                                    <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1"><strong>Send to Subscribed Users</strong></CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-radio" inline >
                                    <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" onClick={() => { toggleMulti('left') }} />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-radio2"><strong>Send to particular segment(s)</strong></CLabel>
                                </CFormGroup>
                                {/* collapes */}
                                <CCol>
                                    <CCollapse show={collapseMulti[0]}>
                                        <CCol className="p-0">
                                            <CLabel className="pl-2 font-weight-bold text-muted pt-2">Who should receive this campaign?</CLabel>
                                            <CCol col="12" className="p-0 pl-1">
                                                <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-1">
                                                    <FontAwesomeIcon icon={faChartPie} />
                                                    <span className="tags-text pr-2 ml-2" maxLength={20} > User details such as first name, last name, email address, phone number and password  </span>
                                                    <FontAwesomeIcon icon={faTimes} style={{ height: 16, width: 16 }} className="mr-2" />
                                                </div>
                                                <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-1">
                                                    <FontAwesomeIcon icon={faChartPie} />
                                                    <span className="tags-text pr-2 ml-2"> Segment Name 2 dài hơn chút xíu</span>
                                                    <FontAwesomeIcon icon={faTimes} style={{ height: 16, width: 16 }} className="mr-2" />
                                                </div>
                                                <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-1">
                                                    <FontAwesomeIcon icon={faChartPie} />
                                                    <span className="tags-text pr-2 ml-2"> Segment Name 3</span>
                                                    <FontAwesomeIcon icon={faTimes} style={{ height: 16, width: 16 }} className="mr-2" />
                                                </div>
                                                <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-1">
                                                    <FontAwesomeIcon icon={faChartPie} />
                                                    <span className="tags-text pr-2 ml-2"> Segment Name 3</span>
                                                    <FontAwesomeIcon icon={faTimes} style={{ height: 16, width: 16 }} className="mr-2" />
                                                </div>
                                            </CCol>
                                            <CCol className="p-0 pl-1">
                                                <div className="m-1">
                                                    <CButton color="ghost" onClick={() => setSmall(!large)} className="mr-1"><FontAwesomeIcon icon={faPlusCircle} className="mr-2" /><span>Add Segment</span></CButton>
                                                </div>
                                            </CCol>
                                        </CCol>
                                    </CCollapse>
                                    {/* Modal select segment Show */}
                                    <CModal
                                        show={small}
                                        onClose={() => setSmall(!small)}
                                        size="md"
                                    >
                                        <CModalHeader closeButton>
                                            <CModalTitle>Select Segment</CModalTitle>
                                        </CModalHeader>
                                        <CModalBody>
                                            <CCol className="p-0">
                                                <div className="el-tag-bg">
                                                    <div className="icon-left"><FontAwesomeIcon icon={faChartPie} /></div>
                                                    <div className="content-segments">
                                                        <span className="text-tag">Segmnets 1 holoa dai them mot chut di nao </span>
                                                        <p className="icon-right">
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="el-tag-bg">
                                                    <div className="icon-left"><FontAwesomeIcon icon={faChartPie} /></div>
                                                    <div className="content-segments">
                                                        <span className="text-tag">Segmnets Default 2</span>
                                                        <p className="icon-right">
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="el-tag-bg">
                                                    <div className="icon-left"><FontAwesomeIcon icon={faChartPie} /></div>
                                                    <div className="content-segments">
                                                        <span className="text-tag">Khu vực miền nam</span>
                                                        <p className="icon-right">
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </p>
                                                    </div>
                                                </div>
                                            </CCol>
                                        </CModalBody>
                                        <CModalFooter>
                                            <CButton color="primary" onClick={() => setSmall(!small)}>Create Segment</CButton>{' '}
                                        </CModalFooter>
                                    </CModal>
                                </CCol>
                            </CCol>

                        </CCardBody>
                    </CCard>
                </CCol>
                {/* Messages */}
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <CCol lg="12" className="p-0 d-flex flex-row bd-highlight align-items-center">
                                <div className="text-muted font-weight-bold">
                                    <span>2. Message</span>
                                </div>
                                {/* <div className="ml-auto">
                                    <CButton color="outline">Preview</CButton>
                                </div> */}
                            </CCol>
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                                <CCol col="6" lg="6" md="6">
                                    <CCol className="p-0 pb-4">
                                        <CLabel htmlFor="district" className="text-muted">Template</CLabel>
                                        <CSelect custom name="select" id="select">
                                            <option>select..</option>
                                            <option value="1">Template 1</option>
                                            <option value="2">Template 2</option>
                                        </CSelect>
                                        <small className="form-text text-muted"><strong>Select</strong> your Template</small>
                                    </CCol>
                                    <CCol className="p-0 pb-2">
                                        <CFormGroup>
                                            <CLabel htmlFor="district" className="text-muted">Message<span className="danger-color pl-1">*</span></CLabel>
                                            <CTextarea
                                                name="textarea-input"
                                                id="textarea-input"
                                                rows="4"
                                                placeholder="Message..."
                                                maxLength="1000"
                                            />
                                        </CFormGroup>
                                    </CCol>
                                    <CCol className="p-0 pb-2">
                                        <CFormGroup>
                                            <CLabel htmlFor="file-input" className="text-muted">File input</CLabel>
                                            <CCol>
                                                <CInputFile
                                                    id="file-multiple-input"
                                                    name="file-multiple-input"
                                                    multiple
                                                    custom
                                                />
                                                <CLabel htmlFor="file-multiple-input" variant="custom-file">
                                                    Choose Files...
                                            </CLabel>
                                            </CCol>
                                        </CFormGroup>
                                    </CCol>
                                    <CCol className="p-0">
                                        <CFormGroup>
                                            <CLabel htmlFor="file-input" className="text-muted">Launch URL</CLabel>
                                            <CInput id="name" placeholder="http://bit.ly/abc" required />
                                        </CFormGroup>
                                    </CCol>
                                </CCol>
                                <CCol col="6" className="d-flex justify-content-center flex-column">
                                    <CIcon name="phonePreview" height="600" alt="phonePreview" />
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
                {/* Schedule */}
                <CCol>
                    <CCard>
                        <CCardHeader>
                            <div className="text-muted font-weight-bold">
                                <span>3. Schedule</span>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <CCol className="d-flex flex-column pb-2">
                                <CLabel className="font-weight-bold text-muted">When should this message start sending?</CLabel>
                                <CFormGroup variant="custom-radio" inline className="pb-1">
                                    <CInputRadio custom id="inline-radio3" name="inline-radios" value="option1" />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-radio3"><strong>Message will send right away</strong></CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-radio" inline >
                                    <CInputRadio custom id="inline-radio4" name="inline-radios" value="option2" onClick={() => { toggleMulti('right') }} />
                                    <CLabel variant="custom-checkbox" htmlFor="inline-radio4"><strong>Specific Time</strong></CLabel>
                                </CFormGroup>
                            </CCol>
                            <CCol lg="4" className="pl-4 ">
                                <CCollapse show={collapseMulti[1]}>
                                    <CCol className="pt-2">
                                        <CInput id="name" type="date" placeholder="http://bit.ly/abc" required />
                                        <small className="form-text text-muted"><strong>Select</strong> time you want to send message</small>
                                    </CCol>
                                </CCollapse>
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol className="pb-5">
                    <CButton color="primary" className="mr-2" onClick={() => setLarge(!large)}><FontAwesomeIcon icon={faPaperPlane} className="mr-2" />Review and Send</CButton>
                    <CButton color="outline">Save as Draft</CButton>
                </CCol>
                {/* Collapse review */}
                <CModal
                    show={large}
                    onClose={() => setLarge(!large)}
                    size="lg"
                >
                    <CModalHeader closeButton>
                        <CModalTitle>Review Your Message</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CCol className="p-0">
                            <CCol className="p-0">
                                <CLabel><strong>Audience</strong></CLabel>
                                <CCol className="box-review p-0 py-4">
                                    <CCol className="d-flex bd-highlight pl-2">
                                        <CCol lg="3" className="text-muted" >
                                            Channel
                                        </CCol>
                                        <CCol className="font-weight-bold">Zalo
                                        </CCol>
                                    </CCol><hr />
                                    <CCol className="d-flex bd-highlight pl-2">
                                        <CCol lg="3" className="text-muted" >
                                            Estimated recipients
                                        </CCol>
                                        <CCol className="font-weight-bold">100.000.000 Users</CCol>
                                    </CCol><hr />
                                    <CCol className="d-flex bd-highlight pl-2">
                                        <CCol lg="3" className="text-muted" >
                                            Included segments
                                        </CCol>
                                        <CCol className="font-weight-bold">Subscribed Users</CCol>
                                    </CCol>
                                </CCol>
                            </CCol>
                            <CCol className="p-0 py-3">
                                <CLabel><strong>Message</strong></CLabel>
                                <CCol className="box-review p-0 py-4">
                                    <CCol className="d-flex bd-highlight pl-2">
                                        <CCol lg="3" className="text-muted" >
                                            Content
                                        </CCol>
                                        <CCol className="font-weight-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        </CCol>
                                    </CCol><hr />
                                    <CCol className="d-flex bd-highlight pl-2">
                                        <CCol lg="3" className="text-muted" >
                                            Launch URL
                                        </CCol>
                                        <CCol className="font-weight-bold" style={{ cursor: 'pointer', color: '#007BFF' }}>https://fontawesome.com/icons?d=gallery&p=2&q=send</CCol>
                                    </CCol>
                                </CCol>
                            </CCol>
                            <CCol className="p-0 pb-3">
                                <CLabel><strong>Schedule</strong></CLabel>
                                <CCol className="box-review p-0 py-4">
                                    <CCol className="d-flex bd-highlight pl-2">
                                        <CCol lg="3" className="text-muted" >
                                            Start sending
                                        </CCol>
                                        <CCol className="font-weight-bold">
                                            Friday, April 16, 2021 12:20 AM UTC+07:00 (in 6 days)
                                        </CCol>
                                    </CCol>
                                </CCol>
                            </CCol>
                        </CCol>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="outline" onClick={() => setLarge(!large)}>Make changes</CButton>{' '}
                        <CLink to="/messages/MessagesReport"><CButton color="primary">Send Message</CButton></CLink>
                    </CModalFooter>
                </CModal>
            </CRow>
        </>
    )
}

export default EditMsg
