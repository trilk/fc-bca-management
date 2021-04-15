import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import femaleimg from './avatar/female.jpg'
import maleimg from './avatar/male.jpg'
import avatarBlank from './avatar/blank.png'
import './users.scss'
import * as Icon from 'react-bootstrap-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, faPlusCircle, faEllipsisV, faEye, faPen, faSortDown, faChessQueen, faUser, faMapMarkerAlt, faAt, faArrowUp, faArrowDown, faUserShield, faInfo, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
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

const Profile = () => {

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
        <CCol>
          <CCard>
            <CCardBody className="pb-0">
              <CCol className="p-2 d-flex bd-highlight">
                <div className="mb-2">
                  <div className="c-avatar-lg position-relative">
                    <CImg
                      src={'avatars/6.jpg'}
                      className="avatar-lg"
                      alt="admin@bootstrapmaster.com"
                    />
                    <span className="c-status bg-success"></span>
                  </div>
                </div>
                <CCol className="p-0">
                  <CCol className="d-flex bd-highlight align-items-start">
                    <div className="mr-2">
                      <h3><strong>Max Smith</strong></h3>
                    </div>
                    <div className="mr-2">
                      <FontAwesomeIcon icon={faChessQueen} color="primary" style={{ color: '#009ef7', cursor: 'pointer', height: 20, width: 20 }} className="mt-1" />
                    </div>
                    <div className="mr-2">
                      <CBadge color="success" className="badge-status mt-1"><strong>Account Active</strong></CBadge>
                    </div>
                  </CCol>
                  <CCol className="d-flex bd-highlight pt-1">
                    <div className="text-muted pr-3">
                      <FontAwesomeIcon icon={faUserShield} className="mr-2" /><span style={{ fontWeight: 600 }}>Adminstrator</span>
                    </div>
                    <div className="text-muted pr-3">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /><span style={{ fontWeight: 600 }}>HCM, District 2</span>
                    </div>
                    <div className="text-muted">
                      <FontAwesomeIcon icon={faAt} className="mr-2" /><span style={{ fontWeight: 600 }}>admin@gmail.com</span>
                    </div>
                  </CCol>
                  <CCol className="d-flex bd-highlight align-items-end p-0 pt-2">
                    <CCol className="pt-3 d-flex bd-highlight mr-5">
                      <CCol className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                        <div className="d-flex bd-highlight align-items-center">
                          <FontAwesomeIcon icon={faArrowUp} style={{ height: 10, width: 10, color: '#50cd89' }} className="mr-2" />
                          <span style={{ fontSize: 24, fontWeight: 600 }}>12.000</span>
                        </div>
                        <span className="text-muted small">Total Messages Create</span>
                      </CCol>
                      <CCol className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                        <div className="d-flex bd-highlight align-items-center">
                          <FontAwesomeIcon icon={faArrowUp} style={{ height: 10, width: 10, color: '#50cd89' }} className="mr-2" />
                          <span style={{ fontSize: 24, fontWeight: 600 }}>12.000</span>
                        </div>
                        <span className="text-muted small">Sent Success</span>
                      </CCol>
                      <CCol className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                        <div className="d-flex bd-highlight align-items-center">
                          <FontAwesomeIcon icon={faArrowDown} style={{ height: 10, width: 10, color: '#D9214E' }} className="mr-2" />
                          <span style={{ fontSize: 24, fontWeight: 600 }}>100</span>
                        </div>
                        <span className="text-muted small">Send Failed</span>
                      </CCol>
                    </CCol>
                    <CCol className="pb-3" lg="3">
                      <div className="clearfix pb-2">
                        <div className="float-right">
                          <strong>50%</strong>
                        </div>
                        <div className="float-left">
                          <strong className="text-muted">Profile Compleation</strong>
                        </div>
                      </div>
                      <CProgress className="progress-sm" color="success" value="50" />
                    </CCol>
                  </CCol>
                </CCol>
              </CCol>
              <CCol className="pt-4">
                <CTabs className="d-flex flex-column p-0 d-flex overflow-auto h-55px" activeTab="overview">
                  <CNav className="flex-nowrap" variant="tabs">
                    <CNavItem onClick={() => setActiveTab(0)} action active={activeTab === 0} className="pr-3">
                      <CNavLink className="text-muted" data-tab="overview"><span>Account Info</span></CNavLink>
                    </CNavItem>
                    <CNavItem onClick={() => setActiveTab(1)} action active={activeTab === 1} className="pr-3">
                      <CNavLink className="text-muted" data-tab="setting" >Account Settings</CNavLink>
                    </CNavItem>
                    <CNavItem onClick={() => setActiveTab(2)} action active={activeTab === 2}>
                      <CNavLink className="text-muted" data-tab="security">Security</CNavLink>
                    </CNavItem>
                  </CNav>
                </CTabs>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
        {/* tab overview */}
        <CCol xs="12" >
          <CTabContent>
            <CTabPane active={activeTab === 0} data-tab="overview" activeTab="overview">
              <CCard>
                <CCardHeader className="">
                  <CCol className="d-flex align-items-center">
                    <span className="float-left" style={{ fontSize: 20, fontWeight: 700 }}>Profile Details</span>
                    <CButton color="primary" className="ml-auto">Edit Profile</CButton>
                  </CCol>
                </CCardHeader>
                <CCardBody>
                  <CCol className="py-3">
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Full Name</span></CCol>
                      <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>Max Smith</span></CCol>
                    </CRow>
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Role</span></CCol>
                      <CCol col="6"><FontAwesomeIcon icon={faUserShield} style={{ color: '#009ef7', cursor: 'pointer', height: 14, width: 14 }} className="mr-2" /><span style={{ fontSize: 15, fontWeight: 700 }}>Admin</span></CCol>
                    </CRow>
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Email</span></CCol>
                      <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>admin@gmail.com</span></CCol>
                    </CRow>
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">
                        <span style={{ fontWeight: 500 }}>Contact Phone </span>
                        <CTooltip placement="top" content={`Phone Number must be active`}><FontAwesomeIcon icon={faQuestionCircle} /></CTooltip></CCol>
                      <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>044 3276 454 935</span></CCol>
                    </CRow>
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Company</span></CCol>
                      <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>Pvioil Cop.</span></CCol>
                    </CRow>
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Gender</span></CCol>
                      <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>Male</span></CCol>
                    </CRow>
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Day of birth</span></CCol>
                      <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>20 july 1997</span></CCol>
                    </CRow>
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Address</span></CCol>
                      <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>Ho Chi Minh. City</span></CCol>
                    </CRow>
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Country</span></CCol>
                      <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>Vietnam</span></CCol>
                    </CRow>
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Create Date</span></CCol>
                      <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>20 july 2021</span></CCol>
                    </CRow>
                  </CCol>
                </CCardBody>
              </CCard>
            </CTabPane>
            {/* Setting tabs */}
            <CTabPane active={activeTab === 1} data-tab="setting">
              <CCard>
                <CCardHeader className="py-3">
                  <CCol className="d-flex align-items-center">
                    <span className="float-left" style={{ fontSize: 20, fontWeight: 700 }}>Profile Details</span>
                    {/* <CButton color="primary" className="ml-auto">Edit Profile</CButton> */}
                  </CCol>
                </CCardHeader>
                <CCardBody>
                  <CCol className="py-3">
                    {/* Avatar */}
                    <CRow className="pb-4">
                      <CCol col="3" xs="12" sm="2" lg="3"><span style={{ fontWeight: 600, fontSize: 15 }}>Avatar</span></CCol>
                      <CCol col="6">
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
                          <span className="text-muted">Allowed file types: png, jpg, jpeg. 125px X 125px </span>
                        </div>
                      </CCol>
                    </CRow>
                    {/* Name */}
                    <CRow className="pb-4 d-flex align-items-center">
                      <CCol col="3" xs="12" sm="2" lg="3"><span style={{ fontWeight: 600, fontSize: 13 }}>Full Name <span className="danger-color">*</span></span></CCol>
                      <CCol col="6">
                        <CInput htmlFor="First-name" placeholder="First Name" />
                      </CCol>
                      <CCol col="6">
                        <CInput htmlFor="Last-name" placeholder="Last Name" />
                      </CCol>
                    </CRow>
                    {/* Contact Phone */}
                    <CRow className="pb-4 d-flex align-items-center">
                      <CCol col="3" xs="12" sm="2" lg="3"><span style={{ fontWeight: 600, fontSize: 13 }}>Email</span></CCol>
                      <CCol col="6">
                        <CInput htmlFor="Phone" placeholder="Email Addess" />
                      </CCol>
                    </CRow>
                    {/* Gender */}
                    <CRow className="pb-4 d-flex align-items-center">
                      <CCol col="3" xs="12" sm="2" lg="3"><span style={{ fontWeight: 600, fontSize: 14 }}>Gender</span></CCol>
                      <CCol col="6">
                        <CSelect custom name="select" id="select">
                          <option value="0">select..</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="3">Other</option>
                        </CSelect>
                      </CCol>
                    </CRow>
                    {/* Address */}
                    <CRow className="pb-4 d-flex align-items-center">
                      <CCol col="3" xs="12" sm="2" lg="3"><span style={{ fontWeight: 600, fontSize: 14 }}>Country</span></CCol>
                      <CCol col="6">
                        <CSelect custom name="select" id="select">
                          <option value="0">select..</option>
                          <option value="1">Vietnam</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </CSelect>
                      </CCol>
                    </CRow>
                    <CRow className="pb-4 d-flex align-items-center">
                      <CCol col="3" xs="12" sm="2" lg="3"><span style={{ fontWeight: 600, fontSize: 14 }}>Address</span></CCol>
                      <CCol col="6" className="d-flex bd-highlight p-0">
                        <CCol>
                          <CSelect custom name="select" id="select">
                            <option value="0">select..</option>
                            <option value="1">Vietnam</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </CSelect>
                          <small className="text-muted"><strong>Select</strong> the Provincial/City</small>
                        </CCol>
                        <CCol>
                          <CSelect custom name="select" id="select">
                            <option value="0">select..</option>
                            <option value="1">Vietnam</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </CSelect>
                          <small className="text-muted"><strong>Select</strong> District/</small>
                        </CCol>
                        <CCol>
                          <CSelect custom name="select" id="select">
                            <option value="0">select..</option>
                            <option value="1">Vietnam</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </CSelect>
                          <small className="text-muted"><strong>Select</strong> Ward</small>
                        </CCol>
                      </CCol>
                    </CRow>
                    {/* street */}
                    <CRow className="pb-4 d-flex align-items-center">
                      <CCol col="3" xs="12" sm="2" lg="3"><span style={{ fontWeight: 600, fontSize: 14 }}>Street</span></CCol>
                      <CCol col="6">
                        <CInput htmlFor="Phone" placeholder="" />
                      </CCol>
                    </CRow>
                  </CCol>
                </CCardBody>
                <CCardFooter>
                  <div className="float-right">
                    <CButton color="ghost" className="mr-2">Discard</CButton>
                    <CButton color="primary">Save Changes</CButton>
                  </div>
                </CCardFooter>
              </CCard>
              {/* Password */}
              <CCard>
                <CCardHeader className="py-3">
                  <span className="float-left" style={{ fontSize: 20, fontWeight: 700 }}>Sign-in Method</span>
                </CCardHeader>
                <CCardBody>
                  <CCol className="d-flex flex-column p-0">
                    <CCol className="p-0 py-4 box-phone">
                      <div className="d-flex flex-column float-left">
                        <span> <strong>Phone Number</strong></span>
                        <span className="light-color  pt-1">+84 987 567 678</span>
                      </div>
                      {/* <div className="float-right">
                        <CButton color="light"> Change Phone Number</CButton>
                      </div> */}
                    </CCol>
                    <CCol className="p-0 py-4">
                      <div className="d-flex flex-column float-left">
                        <span> <strong>Password</strong></span>
                        <span className="light-color  pt-1"><em> Last Update 10:00 20/11/2021</em></span>
                      </div>
                      <div className="float-right">
                        <CButton color="light"> Change Password</CButton>
                      </div>
                    </CCol>
                  </CCol>
                </CCardBody>
              </CCard>
            </CTabPane>
            {/* Security */}
            <CTabPane active={activeTab === 2} data-tab="security">
              <CCard>
                <CCardHeader>
                  <span></span>
                </CCardHeader>
                <CCardBody>
                  kjsgfjhasgdj
                </CCardBody>
              </CCard>
            </CTabPane>
          </CTabContent>

        </CCol>
      </CRow>
    </>
  )
}

export default Profile
