import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, faEnvelope, faChartLine, faPaperPlane, faEnvelopeOpenText, faCommentSlash, } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import './messages.scss'
import { CCardBody, CRow, CAlert, CDropdown, CProgress, CDropdownToggle, CBadge, CDropdownMenu, CDropdownItem, CButton, CCol, CCard, CLabel, CImg, CDropdownDivider } from '@coreui/react'
import React from 'react'
import Imagedemo from './photo/demo.jpeg'
import {
    CChartPie,
} from '@coreui/react-chartjs'


const MessageReport = () => {
    const [visible, setVisible] = React.useState(10)

    return (
        <CRow>
            {/* Begign Title  */}
            <CCol className="d-flex flex-row p-3 py-2" lg="12">
                <CCol className="p-0 d-flex flex-column">
                    <h4 className="pb-1"><FontAwesomeIcon icon={faChartLine} className="mr-3" />
                        <strong>Message Statistics</strong></h4>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Name This Messages</span>
                    <span>Started sending at: October 8th 2020, 7:30:57 am UTC +07:00 (Completed in: 0.51 seconds) </span>
                </CCol>
                <div className="p-0 ml-auto">
                    <CDropdown className="ml-3">
                        <CDropdownToggle color="secondary" variant="outline" size="md" className="d-flex align-items-center">
                            <span>Action</span>
                            <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                        </CDropdownToggle>
                        <CDropdownMenu className="mt-2">
                            {/* edit with status schedule */}
                            <CDropdownItem checked><FontAwesomeIcon icon={faPen} className="mr-2" />Edit</CDropdownItem>
                            <CDropdownItem><FontAwesomeIcon icon={faCopy} className="mr-2" />Duplicate</CDropdownItem>
                            <CDropdownDivider />
                            <CDropdownItem className="danger-color"><FontAwesomeIcon icon={faTimes} className="mr-2" />Cancel</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </div>
            </CCol>
            {/* End */}
            <CCol className="p-lg-3 d-flex flex-lg-row flex-column" lg="12">
                {/* Messages Statistics */}
                <CCol className="d-flex flex-lg-row flex-wrap flex-column p-0">
                    {/* Begin Totals Messages */}
                    <CCol className="rounded-lg bg-white p-0 mr-lg-4 my-2" style={{ boxShadow: 'rgba(0, 0, 0, 0.01) 0px 4px 10px' }}>
                        <CCol className="d-flex flex-column p-4 d-flex justify-content-start">
                            <div className="pb-1 d-flex flex-row">
                                <div className="d-flex flex-column">
                                    <span className="text-muted pb-1">Total Messages</span>
                                    <span style={{ fontSize: 24, fontWeight: 700 }}>1.097.099</span>
                                </div>
                                <div className="ml-auto">
                                    <FontAwesomeIcon icon={faPaperPlane} style={{ height: 24, width: 24 }} className="light-color" />
                                </div>
                            </div>
                            <div>
                                <div className="d-flex flex-row small align-items-end pb-2">
                                    <span className="text-muted">Progress</span>
                                    <span className="ml-auto text-muted" style={{ fontSize: 14, fontWeight: 600 }}>90%</span>
                                </div>
                                <CProgress color="primary" value="90" style={{ height: 4 }} />
                            </div>
                        </CCol>
                    </CCol>
                    {/* End total Messages */}
                    {/* Begin Delivered Messages */}
                    <CCol className="rounded-lg bg-white p-0 mr-lg-4 my-2" style={{ boxShadow: 'rgba(0, 0, 0, 0.01) 0px 4px 10px' }}>
                        <CCol className="d-flex flex-column p-4 d-flex justify-content-start">
                            <div className="pb-1 d-flex flex-row">
                                <div className="d-flex flex-column">
                                    <span className="text-muted pb-1">Delivered</span>
                                    <div className="d-flex flex-row">
                                        <span style={{ fontSize: 30, fontWeight: 700 }}>90.09% <span className="text-muted" style={{ fontSize: 14, fontWeight: 600 }}>1.090.000</span></span>

                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ height: 24, width: 24 }} className="light-color" />
                                </div>
                            </div>
                        </CCol>
                    </CCol>
                    {/* End Delivered Messages */}
                    {/* Begin Failed Messages */}
                    <CCol className="rounded-lg bg-white p-0 my-2" style={{ boxShadow: 'rgba(0, 0, 0, 0.01) 0px 4px 10px' }}>
                        <CCol className="d-flex flex-column p-4 d-flex justify-content-start">
                            <div className="pb-1 d-flex flex-row">
                                <div className="d-flex flex-column">
                                    <span className="text-muted pb-1">Delivered Failed</span>
                                    <span style={{ fontSize: 24, fontWeight: 700 }}>9.09%</span>
                                </div>
                                <div className="ml-auto">
                                    <FontAwesomeIcon icon={faCommentSlash} style={{ height: 24, width: 24 }} className="light-color" />
                                </div>
                            </div>
                            <div>
                                <div className="d-flex flex-row small align-items-end pb-2">
                                    <span className="text-muted">Progress</span>
                                    <span className="ml-auto text-muted" style={{ fontSize: 14, fontWeight: 600 }}>9.000 (10%)</span>
                                </div>
                                <CProgress color="danger" value="10" style={{ height: 4 }} />
                            </div>
                        </CCol>
                    </CCol>
                    {/* End Failed Messages */}
                </CCol>
            </CCol>
            {/* Chart pie deliver Statistics */}
            <CCol className="d-flex flex-lg-row flex-column flex-wrap" lg="12">
                <CCol className="p-0 ">
                    <CCard style={{ minHeight: 300 }}>
                        <CCardBody>
                            <CCol className="p-0">
                                <CLabel><h5 className="font-weight-bold">Delivery Statistics</h5></CLabel>
                                <CCol className="p-0 d-flex flex-lg-row flex-md-row flex-column">
                                    <CCol lg="4" md="6" sm="6" className="p-0 py-3">
                                        <CCol className="p-0">
                                            <CCol className="p-0">
                                                <div className="progress-group-header">
                                                    <FontAwesomeIcon icon={faCircle} className="mr-2 mb-1 success-color" style={{ height: 8, width: 8 }} />
                                                    <span className="title">Delivered</span>
                                                    <span className="ml-auto font-weight-bold">191,235</span>
                                                </div>
                                                <hr className="border-dashed" />
                                            </CCol>
                                            <CCol className="p-0">
                                                <div className="progress-group-header">
                                                    <FontAwesomeIcon icon={faCircle} className="mr-2 mb-1" style={{ height: 8, width: 8, color: '#3399ff' }} />
                                                    <span className="title">Read</span>
                                                    <span className="ml-auto font-weight-bold">235</span>
                                                </div>
                                                <hr className="border-dashed" />
                                            </CCol>
                                            <CCol className="p-0">
                                                <div className="progress-group-header">
                                                    <FontAwesomeIcon icon={faCircle} className="mr-2 mb-1 danger-color" style={{ height: 8, width: 8 }} />
                                                    <span className="title">Failed (Cancel)</span>
                                                    <span className="ml-auto font-weight-bold">0</span>
                                                </div>
                                                <hr className="border-dashed" />
                                            </CCol>
                                            <CCol className="p-0">
                                                <div className="progress-group-header">
                                                    <FontAwesomeIcon icon={faCircle} color="success" className="mr-2 mb-1 warning-color" style={{ height: 8, width: 8 }} />
                                                    <span className="title">Remaining</span>
                                                    <span className="ml-auto font-weight-bold">100</span>
                                                </div>
                                            </CCol>
                                        </CCol>
                                    </CCol>
                                    <CCol className="p-0" col="8" lg="8" className="p-0">
                                        <CChartPie
                                            className="hola"
                                            datasets={[
                                                {
                                                    backgroundColor: [
                                                        '#28A745', //Delivered
                                                        '#3399ff', // read
                                                        '#DC3545', // failed
                                                        '#f9b115' // Remaining
                                                    ],
                                                    data: [56, 10, 0, 2]
                                                }
                                            ]}
                                            labels={['Delivered', 'Read', 'Failed ( Cancel )', 'Remaining']}
                                            options={{
                                                maintainAspectRatio: true,
                                                responsive: true,
                                                legend: {
                                                    display: false
                                                },
                                                tooltips: {
                                                    enabled: true,
                                                    displayColors: false,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                    borderColor: '#e4e6ef',
                                                    color: '#666',
                                                },
                                                layout: {
                                                    padding: {
                                                        left: 0,
                                                        right: 0,
                                                        top: 0,
                                                        bottom: 20
                                                    }
                                                },

                                            }}
                                        />
                                    </CCol>
                                </CCol>
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
                {/* End */}
                {/* Chart pie deliver Statistics */}
                <CCol className="p-0 pl-lg-4" >
                    <CCard style={{ minHeight: 300 }}>
                        <CCardBody>
                            <CCol className="p-0">
                                <CLabel><h5 className="font-weight-bold">Channels Statistics</h5></CLabel>
                                <CCol className="p-0 d-flex flex-lg-row flex-md-row flex-column">
                                    <CCol col="6" lg="5" md="6" sm="6" className="p-0 py-3">
                                        <CCol className="p-0">
                                            <CCol className="p-0 pt-1">
                                                <div className="progress-group-header">
                                                    <FontAwesomeIcon icon={faCircle} className="mr-2 mb-1 primary-color" style={{ height: 8, width: 8 }} />
                                                    <span className="title">Zalo Channel</span>
                                                </div>
                                                <hr className="border-dashed" />
                                            </CCol>
                                            <CCol className="p-0 pt-1">
                                                <div className="progress-group-header">
                                                    <FontAwesomeIcon icon={faCircle} className="mr-2 mb-1" style={{ height: 8, width: 8, color: '#665CAC' }} />
                                                    <span className="title">Viber Channel</span>
                                                </div>
                                                <hr className="border-dashed" />
                                            </CCol>
                                        </CCol>
                                    </CCol>
                                    <CCol className="p-0" col="8" lg="8" xs="12" className="p-0">
                                        {/* <canvas id="safe_id_b8runsgrlub" width="400" height="400"></canvas> */}
                                        <CChartPie
                                            className="hola"
                                            datasets={[
                                                {
                                                    backgroundColor: [
                                                        '#009ef7', //Zalo
                                                        '#665CAC', // Viber
                                                    ],
                                                    data: [90, 10,]
                                                }
                                            ]}
                                            labels={['Zalo', 'Viber',]}
                                            options={{
                                                maintainAspectRatio: true,
                                                responsive: true,
                                                legend: {
                                                    display: false
                                                },
                                                tooltips: {
                                                    enabled: true,
                                                    displayColors: false,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                    borderColor: '#e4e6ef',
                                                    color: '#666',
                                                },
                                                layout: {
                                                    padding: {
                                                        left: 0,
                                                        right: 0,
                                                        top: 0,
                                                        bottom: 20
                                                    }
                                                },
                                            }}
                                        />
                                    </CCol>
                                </CCol>
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CCol>
            {/* End */}
            {/* Messages Details */}
            <CCol>
                <CCard>
                    <CCardBody>
                        <CCol className="p-0 d-flex flex-lg-row flex-column">
                            {/* Col left */}
                            <CCol col="6" lg="6" md="12" className="p-0">
                                {/* form Audience */}
                                <CCol className="p-0 py-4">
                                    <CLabel className="d-flex flex-row">
                                        <h4>Info</h4>
                                        <div className="ml-auto d-block d-sm-none">
                                            <CButton color="secondary">Preview</CButton>
                                        </div>
                                    </CLabel>
                                    <CCol className="border rounded-lg p-0 py-4">
                                        <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                                            <CCol lg="3" md="3" sm="3" xs="12" className="text-muted py-1">
                                                <span>Create By</span>
                                            </CCol>
                                            <CCol className="font-weight-bold"><span>Nguyen Van Nam</span></CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                                            <CCol lg="3" md="3" sm="3" xs="12" className="text-muted py-1">
                                                <span>Sent At</span>
                                            </CCol>
                                            <CCol className="font-weight-bold">
                                                <span>Started sending at: October 8th 2020, 7:30:57 am UTC +07:00 (Completed in: 0.51 seconds)</span>
                                            </CCol>
                                        </CCol>
                                    </CCol>
                                </CCol>
                                {/* End */}
                                {/* form Audience */}
                                <CCol className="p-0">
                                    <CLabel><h4>Audience</h4></CLabel>
                                    <CCol className="border rounded-lg p-0 py-4">
                                        <CCol className="d-flex flex-lg-row flex-md-row flex-column">
                                            <CCol lg="3" md="3" sm="3" xs="12" className="text-muted py-1">
                                                Channel
                                            </CCol>
                                            <CCol className="font-weight-bold">Zalo
                                        </CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                                            <CCol lg="3" md="3" sm="3" xs="12" className="text-muted py-1">
                                                Included segments
                                        </CCol>
                                            <CCol className="font-weight-bold">Subscribed Users, Segment 2 Holoa</CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                                            <CCol lg="3" md="3" sm="3" xs="12" className="text-muted py-1">
                                                Estimated recipients
                                        </CCol>
                                            <CCol className="font-weight-bold">100.000.000 Users</CCol>
                                        </CCol>
                                    </CCol>
                                </CCol>
                                {/* End */}
                                {/* Content */}
                                <CCol className="p-0 py-4">
                                    <CLabel><h4>Messages</h4></CLabel>
                                    <CCol className="border rounded p-0 py-4">
                                        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                                            <CCol lg="3" className="text-muted" >
                                                <span>Title</span>
                                            </CCol>
                                            <CCol className="font-weight-bold">Lorem Ipsum is simply dummy text of the printing
                                        </CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                                            <CCol lg="3" className="text-muted" >
                                                Content
                                        </CCol>
                                            <CCol className="font-weight-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        </CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                                            <CCol lg="3" className="text-muted" >
                                                Image
                                        </CCol>
                                            <CCol className="font-weight-bold">
                                                <CImg src={Imagedemo} height="80" width="80" className="rounded" />
                                            </CCol>
                                        </CCol><hr />
                                        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                                            <CCol lg="3" className="text-muted" >
                                                Launch URL
                                        </CCol>
                                            <CCol className="font-weight-bold" style={{ cursor: 'pointer', color: '#007BFF' }}>https://fontawesome.com/icons?d=gallery&p=2&q=send</CCol>
                                        </CCol>
                                    </CCol>
                                </CCol>
                                <CCol className="p-0">
                                    <CLabel><h4>Schedule</h4></CLabel>
                                    <CCol className="border rounded p-0 py-4">
                                        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
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
                            <CCol col="6" className="d-lg-block d-ms-block d-none">
                                <div className="d-flex justify-content-center pt-5 flex-column">
                                    <strong className="pb-3 d-flex justify-content-center primary-color">Preview Message</strong>
                                    <CIcon name="phonePreview" height="700" alt="Logo" />
                                </div>
                            </CCol>
                        </CCol>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

    )
}

export default MessageReport
