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
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCalendarWeek, faCircle, faCommentAlt, faCommentDots, faCommentSlash, faCompressAlt, faDotCircle, faEnvelopeOpenText, faHelicopter, faPaperPlane, faQuestionCircle, faSortDown, faUserCheck, faUserClock, faUsers } from '@fortawesome/free-solid-svg-icons'
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
                      <CDropdownToggle color="outline" className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faCalendarWeek} className="mr-2" />
                        <span>30 Days</span>
                        <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                      </CDropdownToggle>
                      <small className="d-flex justify-content-end pt-1 text-muted"><strong className="mr-1">Filter </strong> by Times</small>
                      <CDropdownMenu className="mt-2" placement="bottom-end">
                        <CDropdownItem checked>1 Hours</CDropdownItem>
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
        <CCol>
          <CCol className="p-0 py-4">
            <span style={{ fontSize: 20, fontWeight: 700 }}>Subscriber Trends</span>
          </CCol>
          {/* Widgets User trend */}
          <CCol className="p-0 d-flex flex-lg-row flex-column" xs="12" lg="12" md="12" sm="12">
            <CCol className="p-0 py-2 mr-4">
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
            <CCol className="p-0 py-2 mr-4">
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
            <CCol className="p-0 py-2">
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
          <CCol className="p-0">
            {/* <CCol>
              <CButton color="outline">Last 30 Days</CButton>
            </CCol> */}
            <CCard>
              <CCardBody>
                <CCol>
                  <span>Total Users</span>
                  <h3 className="pt-2">123.090.998</h3>
                </CCol>
                <MainChartExample style={{ height: '300px', marginTop: '40px' }} />
              </CCardBody>
            </CCard>
          </CCol>
          <h1>Dang edit them</h1>
        </CCol>


        {/* <CCol>
          <CCard>
            <CCardHeader>
              <CCol className="d-flex flex-column p-0">
                <span style={{ fontSize: 20, fontWeight: 700 }}>Lastest Messages</span>
                <strong className="text-muted small">More than 400 new messages sent</strong>
              </CCol>
            </CCardHeader>
            <CCardBody>
              <table>
                <thead className="thead-light">
                  <tr>
                    <th className="p-0 w-50px"></th>
                    <th className="p-0 min-w-800px"></th>
                    <th className="p-0 min-w-140px"></th>
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
                      <CButton color="secondary"><FontAwesomeIcon icon={faArrowRight} /></CButton>
                    </td>
                  </tr>




                </tbody>
              </table>

            </CCardBody>
          </CCard>

        </CCol> */}
      </CRow>
    </>
  )
}

export default Dashboard
