import React, { useState } from 'react'
import {
  CCard, CCardBody, CModal, CModalHeader, CModalTitle, CModalBody, CInput, CModalFooter,
  CCardHeader, CCol, CBadge, CRow, CLink, CImg, CButton, CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CDropdownHeader, CDropdownDivider
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import femaleimg from './avatar/female.jpg'
import maleimg from './avatar/male.jpg'
import './users.scss'
import { useTranslation } from 'react-i18next'
import { faUsersCog, faUsers, faPen, faUserShield, faMapMarkedAlt, faMapMarkerAlt, faPhoneAlt, faAt, faArrowUp, faArrowDown, faUserEdit, faEllipsisH, faSortDown, faDotCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import imgblank from './avatar/male.jpg'


import usersData from './UsersData'


const UserDetails = ({ match }) => {
  const [small, setSmall] = useState(false)
  const [large, setLarge] = useState(false)
  const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
    }
  }
  const [item] = useState(usersData)
  const { t, i18n } = useTranslation()
  const user = usersData.find(user => user.id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" />No data</span>)]]

  return (
    <CRow>
      {/* Card name info */}
      <CCol>
        <CCard>
          <CCardBody>
            <CCol className="p-0 d-flex flex-lg-row  flex-md-row flex-column pt-lg-3 px-lg-3">
              <div className="mb-2 pr-2">
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
                <CCol className="p-0 pb-2 d-flex flex-lg-row flex-column">
                  <CCol className="p-0">
                    <CCol className="d-flex flex-row align-items-center p-0">
                      <div className="mr-2 p-0">
                        <strong style={{ fontSize: 22 }}>Max Smith</strong>
                      </div>
                      <div className="mr-2">
                        <CBadge color="light" className="badge-status">
                          <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
                        Moderator
                      </CBadge>
                      </div>
                    </CCol>
                    <CCol className="d-flex flex-wrap p-0 pt-1 pb-2">
                      <div className="text-muted pr-3 d-flex flex-row align-items-center pb-1">
                        <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /><span style={{ fontWeight: 600 }}>0987 8878 88</span>
                      </div>
                      <div className="text-muted pr-3 d-flex flex-row align-items-center pb-1">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /><span style={{ fontWeight: 600 }}>HCM, District 2</span>
                      </div>
                      <div className="text-muted d-flex flex-row align-items-center pb-1">
                        <FontAwesomeIcon icon={faAt} className="mr-2" /><span style={{ fontWeight: 600 }}>admin@gmail.com</span>
                      </div>
                    </CCol>
                  </CCol>
                  {/* icon action right */}
                  <div className="d-flex bd-highlight">
                    <div className="mr-2">
                      <CDropdown className="float-right">
                        <CDropdownToggle size="md" className="d-flex align-items-center badge-success">
                          <span>Active</span>
                          <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                        </CDropdownToggle>
                        <CDropdownMenu className="mt-2" placement="bottom-end">
                          <CDropdownHeader><strong>Change status user</strong></CDropdownHeader>
                          <CDropdownDivider />
                          <CDropdownItem><FontAwesomeIcon icon={faCircle} className="text-muted mr-2" />Inactive</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                    <div>
                      <CDropdown>
                        <CDropdownToggle color="light">
                          <FontAwesomeIcon icon={faEllipsisH} />
                        </CDropdownToggle>
                        <CDropdownMenu className="mt-2">
                          <CDropdownItem><span className="danger-color">Delete User</span></CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                  </div>
                  {/* end icon right */}
                </CCol>
                  <CCol className="pt-2 d-flex flex-lg-row flex-md-row flex-column p-0">
                    <CCol lg="2" className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                      <div className="d-flex bd-highlight align-items-center">
                        <FontAwesomeIcon icon={faArrowUp} style={{ height: 10, width: 10, color: '#50cd89' }} className="mr-2" />
                        <span style={{ fontSize: 24, fontWeight: 600 }}>12.000</span>
                      </div>
                      <span className="text-muted small">Total Messages Create</span>
                    </CCol>
                    <CCol lg="2" className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                      <div className="d-flex bd-highlight align-items-center">
                        <FontAwesomeIcon icon={faArrowUp} style={{ height: 10, width: 10, color: '#50cd89' }} className="mr-2" />
                        <span style={{ fontSize: 24, fontWeight: 600 }}>12.000</span>
                      </div>
                      <span className="text-muted small">Sent Success</span>
                    </CCol>
                    <CCol lg="2" className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                      <div className="d-flex bd-highlight align-items-center">
                        <FontAwesomeIcon icon={faArrowDown} style={{ height: 10, width: 10, color: '#D9214E' }} className="mr-2" />
                        <span style={{ fontSize: 24, fontWeight: 600 }}>100</span>
                      </div>
                      <span className="text-muted small">Send Failed</span>
                    </CCol>
                  </CCol>
              </CCol>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
      {/* tab overview */}
      <CCol lg="12">
        <CCard>
          <CCardHeader className="">
            <CCol className="d-flex align-items-center p-0">
              <span className="float-left" style={{ fontSize: 20, fontWeight: 700 }}>User Details</span>
              <CLink to="/users/:id/edit-user" className="ml-auto"><CButton color="primary">Edit User</CButton></CLink>
            </CCol>
          </CCardHeader>
          <CCardBody>
            <CCol className="py-lg-3 px-lg-3 p-0">
              <CRow className="pb-4">
                <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Full Name</span></CCol>
                <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>Max Smith</span></CCol>
              </CRow>
              <CRow className="pb-4">
                <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">
                  <span style={{ fontWeight: 500 }}>Contact Phone </span>
                </CCol>
                <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>0446 454 935</span></CCol>
              </CRow>
              <CRow className="pb-4">
                <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Email</span></CCol>
                <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>admin@gmail.com</span></CCol>
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
                <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Manage Segments</span></CCol>
                <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>Segment 1, Segment 2</span></CCol>
              </CRow>
              <CRow className="pb-4">
                <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Country</span></CCol>
                <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>Vietnam</span></CCol>
              </CRow>
              <CRow className="pb-4">
                <CCol col="3" xs="12" sm="2" lg="3" className="text-muted"><span style={{ fontWeight: 500 }}>Last Update</span></CCol>
                <CCol col="6"><span style={{ fontSize: 15, fontWeight: 700 }}>20 july 2021</span></CCol>
              </CRow>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
      {/* </CTabPane> */}
      {/* Password */}
      <CCol lg="12">
        <CCard>
          <CCardHeader className="py-3">
            <span className="float-left" style={{ fontSize: 20, fontWeight: 700 }}>Sign-in Method</span>
          </CCardHeader>
          <CCardBody>
            <CCol className="d-flex flex-column p-lg-3 p-0">
              <CCol className="p-0 pb-3 box-phone">
                <div className="d-flex flex-column float-left">
                  <span> <strong>Phone Number</strong></span>
                  <span className="text-muted pt-1">+84 987 567 678</span>
                </div>
              </CCol>
              <CCol className="p-0 d-flex flex-lg-row flex-column align-items-center pt-3">
                <CCol className="d-flex flex-column float-left p-0">
                  <span> <strong>Password</strong></span>
                  <span className="text-muted pt-1"><em> Last Update 10:00 20/11/2021</em></span>
                </CCol>
                <div className="mr-auto pt-2 pt-lg-0">
                  <CButton color="light" onClick={() => setSmall(!large)}> Reset Password</CButton>
                </div>
              </CCol>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
      {/* Modal change password */}
      <CModal
        show={small}
        onClose={() => setSmall(!small)}
        size="md"
      >
        <CModalHeader closeButton>
          <CModalTitle><h4 className="font-weight-bold">Change Password</h4></CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCol className="d-flex flex-column p-0 p-lg-4 p-md-4">
            <CCol col="6" className="d-flex flex-column p-0 pb-2">
              <CCol className="p-0">
                <span style={{ fontWeight: 600, fontSize: 14 }}>Current password</span></CCol>
              <CCol className="p-0 mr-3 py-2">
                <CInput htmlFor="Phone" placeholder="" />
              </CCol>
            </CCol>
            <CCol col="6" className="d-flex flex-column p-0 pb-2">
              <CCol className="p-0">
                <span style={{ fontWeight: 600, fontSize: 14 }}>New password</span></CCol>
              <CCol className="p-0 mr-3 py-2">
                <CInput htmlFor="Phone" placeholder="" />
                <small className="text-muted">Password must be at least 8 character and contain symbols</small>
              </CCol>
            </CCol>
            <CCol col="6" className="d-flex flex-column p-0">
              <CCol className="p-0">
                <span style={{ fontWeight: 600, fontSize: 14 }}>Confirm New password</span></CCol>
              <CCol className="p-0 mr-3 py-2">
                <CInput htmlFor="Phone" placeholder="" />
              </CCol>
            </CCol>
          </CCol>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center">
          <CButton color="ghost" variant="ghost" onClick={() => setSmall(!small)}>Cancel</CButton>
          <CButton color="primary" onClick={() => setSmall(!small)}>Update Password</CButton>{' '}
        </CModalFooter>
      </CModal>

    </CRow>
  )
}

export default UserDetails
