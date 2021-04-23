import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, faEnvelope, faChartLine, faEnvelopeOpenText, } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import '../messages.scss'
import { CCardBody, CRow, CLink, CDropdown, CProgress, CDropdownToggle, CBadge, CDropdownMenu, CDropdownItem, CButton, CCol, CCard, CLabel, CImg, CDropdownDivider } from '@coreui/react'
import React from 'react'
import Imagedemo from '../photo/demo.jpeg'

const TemplateDetails = () => {

    return (
        <CRow>
            <CCol col="12" lg="12">
                <CCard>
                    <CCardBody>
                        <CCol className="p-0 pt-3 d-flex bd-highlight">
                            <CCol col="6" lg="6">
                                <CCol className="border rounded-lg p-0 py-4">
                                    <CCol className="d-flex bd-highlight pl-2 d-flex align-items-center">
                                        <CCol lg="3" className="text-muted" >
                                            Name Segmnet
                                        </CCol>
                                        <CCol className="font-weight-bold" style={{ fontSize: 16 }}>Tin nhắn mẫu ngày cá tháng 4 nha</CCol>
                                    </CCol>
                                </CCol>
                                <CCol className="p-0 py-3">
                                    <CLabel><strong>Basic info</strong></CLabel>
                                    <CCol className="p-0 py-3 border rounded-lg">
                                        <CCol className="d-flex bd-highlight pl-0" >
                                            <CCol lg="3" className="text-muted" >
                                                Status
                                            </CCol>
                                            <CCol className="font-weight-bold">
                                                <CBadge className="mr-1 badge-status" color="light">Template</CBadge>
                                                {/* <CBadge className="mr-1 badge-status" color="danger">Schedule</CBadge> */}
                                            </CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex bd-highlight pl-0">
                                            <CCol lg="3" className="text-muted" >
                                                Create By
                                            </CCol>
                                            <CCol className="font-weight-bold">Nguyen Van Nam
                                        </CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex bd-highlight pl-0">
                                            <CCol lg="3" className="text-muted" >
                                                Create Date
                                        </CCol>
                                            <CCol className="font-weight-bold">10/08/20, 4:28:02 pm. 17 hours, 45 minutes ago</CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex bd-highlight pl-0">
                                            <CCol lg="3" className="text-muted" >
                                                Last update
                                        </CCol>
                                            <CCol className="font-weight-bold">Started sending at: October 8th 2020, 7:30:57 am UTC +07:00 (Completed in: 0.51 seconds)</CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex bd-highlight pl-0">
                                            <CCol lg="3" className="text-muted" >
                                                Sent
                                        </CCol>
                                            <CCol className="font-weight-bold">100.000.000 Messages</CCol>
                                        </CCol>
                                    </CCol>
                                </CCol>
                                <CCol className="p-0 py-1">
                                    <CLabel><strong>Message</strong></CLabel>
                                    <CCol className="border rounded-lg p-0 py-4">
                                        <CCol className="d-flex bd-highlight pl-2">
                                            <CCol lg="3" className="text-muted" >
                                                Content
                                        </CCol>
                                            <CCol className="font-weight-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        </CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex bd-highlight pl-2">
                                            <CCol lg="3" className="text-muted" >
                                                Image
                                        </CCol>
                                            <CCol className="font-weight-bold">
                                                <CImg src={Imagedemo} height="80" width="80" className="rounded" />
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
                                <CCol className="p-0 py-3">
                                    <CLabel><strong>Schedule</strong></CLabel>
                                    <CCol className="border rounded-lg p-0 py-4">
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
                            <CCol col="6" className="d-flex justify-content-center flex-column">
                                <CIcon name="phonePreview" height="700" alt="Logo" />
                            </CCol>
                        </CCol>
                        <CCol className="d-inline-flex pt-3">
                            <CButton color="primary">Edit Template</CButton>
                        </CCol>
                    </CCardBody>

                </CCard>
            </CCol>

        </CRow>

    )
}

export default TemplateDetails
