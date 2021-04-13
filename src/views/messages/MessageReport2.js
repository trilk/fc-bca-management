import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, faEnvelope, faChartLine, } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import './messages.scss'
import { CCardBody, CRow, CProgress, CBadge, CButton, CCol, CCard, CLabel, CImg } from '@coreui/react'
import React from 'react'
import Imagedemo from './photo/demo.jpeg'
import {
    CChartBar,
    CChartLine,
    CChartDoughnut,
    CChartRadar,
    CChartPie,
    CChartPolarArea
} from '@coreui/react-chartjs'


const MessageReport = () => {

    return (
        <CRow>
            <CCol lg="12">
                <CCol lg="12" className="p-0  pb-3 d-flex bd-highlight ">
                    <div className="p-0 d-flex align-items-end">
                        <h4><FontAwesomeIcon icon={faChartLine} className="mr-3" />Delivey</h4>
                    </div>
                    <div className="p-0 ml-auto">
                        <CButton color="outline"><span>Action</span></CButton>
                    </div>
                </CCol>
                <CCard>
                    <CCardBody>
                        <CCol className="p-0">
                            <CCol className="d-flex bd-highlight pl-0" >
                                <CCol lg="2" className="text-muted" >
                                    Status
                                    </CCol>
                                <CCol className="font-weight-bold">
                                    <CBadge className="mr-1 badge-status" color="info">Delivered</CBadge>
                                </CCol>
                            </CCol><hr />
                            <CCol className="d-flex bd-highlight pl-0">
                                <CCol lg="2" className="text-muted" >
                                    Create By
                                    </CCol>
                                <CCol className="font-weight-bold">Nguyen Van Nam
                                        </CCol>
                            </CCol><hr />
                            <CCol className="d-flex bd-highlight pl-0">
                                <CCol lg="2" className="text-muted" >
                                    Create Date
                                        </CCol>
                                <CCol className="font-weight-bold">10/08/20, 4:28:02 pm. 17 hours, 45 minutes ago</CCol>
                            </CCol><hr />
                            <CCol className="d-flex bd-highlight pl-0">
                                <CCol lg="2" className="text-muted" >
                                    Send Date
                                        </CCol>
                                <CCol className="font-weight-bold">Started sending at: October 8th 2020, 7:30:57 am UTC +07:00 (Completed in: 0.51 seconds)</CCol>
                            </CCol>
                        </CCol>

                    </CCardBody>
                </CCard>
            </CCol>
            <CCol lg="12">
                <CCard>
                    <CCardBody>
                        <CCol>
                            <CLabel><h5 className="text-muted">Delivery Statistics</h5></CLabel>
                            <CCol className="p-0 d-flex bd-highlight">
                                <CCol col="6" lg="4" className="p-0 pt-4">
                                    <div className="box-review p-4">
                                        <CCol className="p-0">
                                            <div className="progress-group">
                                                <div className="progress-group-header" style={{ fontSize: 18, fontWeight: 600 }}>
                                                    <span className="title">Total Sent</span>
                                                    <span className="ml-auto font-weight-bold">200,235 <span className="text-muted small">(66%)</span></span>
                                                </div>
                                            </div>
                                        </CCol>
                                        <hr />
                                        <CCol className="p-0 pt-2">
                                            <div className="progress-group">
                                                <div className="progress-group-header">
                                                    <FontAwesomeIcon icon={faCircle} className="mr-2 mb-1 success-color" style={{ height: 8, width: 8 }} />
                                                    <span className="title">Delivered</span>
                                                    <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                                                </div>
                                                <div className="progress-group-bars">
                                                    <CProgress className="progress-xs" color="success" value="56" />
                                                </div>
                                            </div>
                                        </CCol>
                                        <CCol className="p-0 pt-2">
                                            <div className="progress-group">
                                                <div className="progress-group-header">
                                                    <FontAwesomeIcon icon={faCircle} className="mr-2 mb-1" style={{ height: 8, width: 8, color: '#3399ff' }} />
                                                    <span className="title">Read</span>
                                                    <span className="ml-auto font-weight-bold">235 <span className="text-muted small">(10%)</span></span>
                                                </div>
                                                <div className="progress-group-bars">
                                                    <CProgress className="progress-xs" color="info" value="10" />
                                                </div>
                                            </div>
                                        </CCol>
                                        <CCol className="p-0 pt-2">
                                            <div className="progress-group">
                                                <div className="progress-group-header">
                                                    <FontAwesomeIcon icon={faCircle} className="mr-2 mb-1 danger-color" style={{ height: 8, width: 8 }} />
                                                    <span className="title">Failed ( Cancel )</span>
                                                    <span className="ml-auto font-weight-bold">0<span className="text-muted small">(0%)</span></span>
                                                </div>
                                                <div className="progress-group-bars">
                                                    <CProgress className="progress-xs" color="danger" value="0" />
                                                </div>
                                            </div>
                                        </CCol>
                                        <CCol className="p-0 pt-2">
                                            <div className="progress-group">
                                                <div className="progress-group-header">
                                                    <FontAwesomeIcon icon={faCircle} color="success" className="mr-2 mb-1 warning-color" style={{ height: 8, width: 8 }} />
                                                    <span className="title">Remaining</span>
                                                    <span className="ml-auto font-weight-bold">100<span className="text-muted small">(2%)</span></span>
                                                </div>
                                                <div className="progress-group-bars">
                                                    <CProgress className="progress-xs" color="warning" value="2" />
                                                </div>
                                            </div>
                                        </CCol>
                                    </div>
                                </CCol>
                                <CCol className="p-0" col="6" lg="7" className="p-0">
                                    <CChartPie
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
                                            legend: {
                                                display: false
                                            },
                                            tooltips: {
                                                enabled: true,
                                                displayColors: false,
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                borderColor: '#e4e6ef',
                                                color: '#666',
                                            }
                                        }}
                                    />

                                </CCol>
                            </CCol>
                        </CCol>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol>
                <CCard>
                    <CCardBody>
                        <CCol className="p-0 d-flex bd-highlight">
                            <CCol col="6" lg="6">
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
                            <CCol col="6" className="d-flex justify-content-center flex-column">
                                <CIcon name="phonePreview" height="700" alt="Logo" />
                            </CCol>
                        </CCol>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default MessageReport
