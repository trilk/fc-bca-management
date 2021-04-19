import React, { lazy } from 'react'
import './dashboard.scss'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CWidgetProgress,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CWidgetDropdown,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CCol,
  CWidgetIcon,
  CProgress,
  CRow,
  CCallout,
  CTooltip,
  CPopover
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'

import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'

import MainChartExample from '../charts/MainChartExample.js'
import MainChartUsersTrend from '../charts/MainChartUsersTrend.js'
import MainChartUsersRevoked from '../charts/MainChartUsersRevoked.js'
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCalendarWeek, faCircle, faCommentAlt, faCommentDots, faCommentSlash, faCompressAlt, faDotCircle, faEnvelopeOpenText, faHelicopter, faMobileAlt, faPaperPlane, faPhoneAlt, faQuestionCircle, faSortDown, faUserCheck, faUserClock, faUserEdit, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))


const Dashboard = () => {

  const { t, i18n } = useTranslation();
  return (
    <>
      <CRow>
        <CCol className="p-0 d-flex flex-lg-row flex-column" xs="12" lg="12" md="12" sm="12">
          <CCol className="">
            <CWidgetDropdown
              className="widget p-0"
            >
              <CCol className="d-flex flex-column pb-4 p-0">
                <div>
                  <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#009ef7', height: 40, width: 40 }} />
                </div>
                <div className="pt-1">
                  <span className="widget-header">120.000.298</span>
                </div>
                <div className="pt-1">
                  <span className="light-color">Total Messages Sent</span>
                </div>
              </CCol>
            </CWidgetDropdown>
          </CCol>
          <CCol className="">
            <CWidgetDropdown
              className="widget p-0"
            >
              <CCol className="d-flex flex-column pb-4 p-0">
                <div>
                  <FontAwesomeIcon icon={faEnvelopeOpenText} style={{ color: '#4dbd74', height: 40, width: 40 }} />
                </div>
                <div className="pt-1">
                  <span className="widget-header">120.000.298</span>
                </div>
                <div className="pt-1">
                  <span className="light-color">Total Messages Delivered</span>
                </div>
              </CCol>
            </CWidgetDropdown>
          </CCol>
          <CCol className="">
            <CWidgetDropdown
              className="widget p-0"
            >
              <CCol className="d-flex flex-column pb-4 p-0">
                <div>
                  <FontAwesomeIcon icon={faCommentSlash} style={{ color: '#f1416c', height: 40, width: 40 }} />
                </div>
                <div className="pt-1">
                  <span className="widget-header">298</span>
                </div>
                <div className="pt-1">
                  <span className="light-color">Total Messages sent Failed</span>
                </div>
              </CCol>
            </CWidgetDropdown>
          </CCol>
        </CCol>
        {/* ChartLineSimple */}
        <CCol lg="12">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol className="p-0 d-flex bd-highlight">
                  <CCol className="d-flex flex-column">
                    <span style={{ fontSize: 20, fontWeight: 700 }}>Messages Statistics</span>
                    <strong className="text-muted small">More than 4000 new Messages Sent </strong>
                  </CCol>
                  <CCol className="pr-3">
                    <CDropdown className="float-right">
                      <CDropdownToggle color="outline" size="md" className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCalendarWeek} className="mr-2" />
                        <span>30 Days</span>
                        <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                      </CDropdownToggle>
                      <small className="d-flex justify-content-end pt-1 text-muted"><strong className="mr-1">Filter </strong> by Times</small>
                      <CDropdownMenu className="mt-2" placement="bottom-end">
                        <CDropdownItem>1 Hours</CDropdownItem>
                        <CDropdownItem>24 Hours</CDropdownItem>
                        <CDropdownItem>30 Days</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CCol>
                </CCol>
              </CRow>
              <MainChartExample style={{ height: '300px', marginTop: '40px' }} />
              <CCol className="pl-4 d-flex bd-highlight py-4">
                <div className="mr-4">
                  <FontAwesomeIcon icon={faCircle} className="mr-1" style={{ color: '#009ef7' }} /> <span className="light-color">Sent</span>
                </div>
                <div className="mr-4">
                  <FontAwesomeIcon icon={faCircle} className="mr-1" style={{ color: '#4dbd74' }} /> <span className="light-color">Delivered</span>
                </div>
                <div>
                  <FontAwesomeIcon icon={faCircle} className="mr-1" style={{ color: '#f86c6b' }} /> <span className="light-color">Failed</span>
                </div>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
        {/* lasst message */}
        {/* <CCol lg="12">
          <CCard>
            <CCardHeader>
              <CCol className="d-flex flex-column p-0">
                <span style={{ fontSize: 18, }}>Lastest Messages</span>
                <strong className="text-muted small">More than 400 new messages sent</strong>
              </CCol>
            </CCardHeader>
            <CCardBody className="overflow-auto">
              <table className="">
                <CCol className="p-0 d-flex flex-row overflow-auto align-items-center" lg="12">
                  <div className="symbol symbol-45px me-2 p-0 mr-3">
                    <div className="symbol-label">
                      <FontAwesomeIcon icon={faCommentDots} style={{ color: '#009ef7' }} />
                    </div>
                  </div>
                  <div className="p-0 d-flex flex-column">
                    <span className="font-weight-bold">Title Messages</span>
                    <span className="opacity-0-hover"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                  </div>
                  <div className="p-0">
                    <span className="font-weight-bold text-gray-400"><FontAwesomeIcon icon={faUserEdit} className="mr-2" />NGUYEN VAN BA</span>
                  </div>
                  <div className="p-0" style={{width:600}}>
                    <div className="clearfix">
                      <div className="float-left">
                        <strong>50%</strong>
                      </div>
                      <div className="">
                        <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                      </div>
                    </div>
                    <CProgress className="progress-xs" color="success" value="50" />
                  </div>
                  <div className="p-0 mr-auto w-100px">
                    <CButton color="secondary"><FontAwesomeIcon icon={faArrowRight} /></CButton>
                  </div>
                </CCol>

                <thead className="thead-light">
                  <tr>
                    <th className="p-0 w-50px"></th>
                    <th className="p-0 min-w-800px"></th>
                    <th className="p-0 min-w-140px"></th>
                    <th className="p-0 min-w-160px"></th>
                    <th className="p-0 min-w-50px"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="symbol symbol-45px me-2">
                        <div className="symbol-label">
                          <FontAwesomeIcon icon={faCommentDots} style={{ color: '#009ef7' }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <span className="font-weight-bold">Title Messages</span>
                        <span className="text-muted"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column">

                        <span className="text-muted pt-1" style={{ fontWeight: 700 }}>Nguyen Van Nam</span>
                      </div>
                    </td>
                    <td>
                      <CBadge color="primary" className="badge-status">Delivered</CBadge>
                    </td>
                    <td>
                      <div className="float-right">
                        <CButton color="secondary"><FontAwesomeIcon icon={faArrowRight} /></CButton>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol> */}
        <CCol className="pb-2 pt-3">
          <CCol className="p-0 pt-2 pb-4">
            <span style={{ fontSize: 20, fontWeight: 700 }}>Subscriber Trends</span>
          </CCol>
          {/* Widgets User trend */}
          <CCol className="p-0 d-flex flex-lg-row flex-column" xs="12" lg="12" md="12" sm="12">
            <CCol className="p-0 mr-4">
              <CWidgetDropdown
                className="widget p-0"
              >
                <CCol className="d-flex flex-column pb-4 p-0">
                  <CCol className="d-flex bd-highlight p-0">
                    <FontAwesomeIcon icon={faUserCheck} style={{ color: '#009ef7', height: 40, width: 40 }} />
                    <CPopover content={`The number of users when subscribing to the channel`} >
                      <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#b5b5c3' }} className="ml-auto" />
                    </CPopover>
                  </CCol>
                  <div className="pt-3">
                    <span className="widget-header">120.000.298</span>
                  </div>
                  <div className="pt-1">
                    <span className="light-color">Subscribed Users</span>
                  </div>
                </CCol>
              </CWidgetDropdown>
            </CCol>
            {/* Widgets Active Users */}
            <CCol className="p-0 mr-4">
              <CWidgetDropdown
                className="widget p-0"
              >
                <CCol className="d-flex flex-column pb-4 p-0">
                  <CCol className="d-flex bd-highlight p-0">
                    <FontAwesomeIcon icon={faUserClock} style={{ color: '#ffc700', height: 40, width: 40 }} />
                    <CPopover content={`The number of users when subscribing to the channel`} >
                      <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#b5b5c3' }} className="ml-auto" />
                    </CPopover>
                  </CCol>
                  <div className="pt-3">
                    <span className="widget-header">120</span>
                  </div>
                  <div className="pt-1">
                    <span className="light-color">Monthly Active Users</span>
                  </div>
                </CCol>
              </CWidgetDropdown>
            </CCol>
            <CCol className="p-0">
              <CWidgetDropdown
                className="widget p-0"
              >
                <CCol className="d-flex flex-column pb-4 p-0">
                  <CCol className="d-flex bd-highlight p-0">
                    <FontAwesomeIcon icon={faUsers} style={{ color: '#4dbd74', height: 40, width: 40 }} />
                    <CPopover content={`The number of users when subscribing to the channel`} >
                      <FontAwesomeIcon icon={faQuestionCircle} style={{ color: '#b5b5c3' }} className="ml-auto" />
                    </CPopover>
                  </CCol>
                  <div className="pt-3">
                    <span className="widget-header">120.908.888</span>
                  </div>
                  <div className="pt-1">
                    <span className="light-color">Total Users</span>
                  </div>
                </CCol>
              </CWidgetDropdown>
            </CCol>
          </CCol>
          <CCol className="p-0 d-flex flex-column">
            {/* Sort */}
            <CCol className="p-0 d-flex flex-lg-row">
              <CCol className="p-0 pb-3 mr-2" lg="0">
                <CDropdown>
                  <CDropdownToggle color="outline" size="md" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faCalendarWeek} className="mr-2" />
                    <span>Last 30 Days</span>
                    <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                  </CDropdownToggle>
                  <CDropdownMenu className="mt-2" placement="bottom-end">
                    <CDropdownItem>24 Hours</CDropdownItem>
                    <CDropdownItem>Last 30 days</CDropdownItem>
                    <CDropdownItem>Past Year</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
              {/* sort channels */}
              <CCol className="p-0 pb-3" lg="0">
                <CDropdown>
                  <CDropdownToggle color="outline" size="md" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
                    <span>Channels: Type</span>
                    <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                  </CDropdownToggle>
                  <CDropdownMenu className="mt-2" placement="bottom-end">
                    <CDropdownItem>All Channels</CDropdownItem>
                    <CDropdownItem>Zalo</CDropdownItem>
                    <CDropdownItem>Viber</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CCol>
          </CCol>
          <CCard>
            <CCardBody>
              <CCol className="p-0">
                <span className="light-color">Total Users</span>
                <div className="d-flex flex-row d-flex align-items-end pt-2">
                  <span className="mr-2" style={{ fontSize: 28, fontWeight: 500 }}>123.090.998</span>
                  <span className="text-success mb-2" style={{ fontWeight: 600 }}>+0.00% (0)</span>
                </div>
              </CCol>
              <MainChartUsersTrend style={{ height: '300px', marginTop: '40px' }} />
            </CCardBody>
          </CCard>
          {/* Chart User Revoked */}
          <CCol className="p-0">
            <CCard>
              <CCardBody>
                <CCol className="p-0">
                  <span className="light-color">Revoked</span>
                  <div className="d-flex flex-row d-flex align-items-end pt-2">
                    <span className="mr-2" style={{ fontSize: 28, fontWeight: 500 }}>18</span>
                    <span className="text-success mb-2" style={{ fontWeight: 600 }}>+0.00% (0)</span>
                  </div>
                </CCol>
                <MainChartUsersRevoked style={{ height: '300px', marginTop: '40px' }} />
              </CCardBody>
            </CCard>
          </CCol>
        </CCol>



      </CRow>
    </>
  )
}

export default Dashboard
