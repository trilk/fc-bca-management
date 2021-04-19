import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import femaleimg from './avatar/female.jpg'
import maleimg from './avatar/male.jpg'
import './users.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, faPlusCircle, faEllipsisV, faEye, faPen, faSortDown, faChessQueen, faUser, faMapMarkerAlt, faAt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import {
  CBadge,
  CButton,
  CCol,
  CDataTable,
  CFormGroup,
  CLabel,
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

  CPagination
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

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CCol className="p-0 d-flex bd-highlight">
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
                  <CCol className="d-flex bd-highlight">
                    <div className="text-muted pr-3">
                      <FontAwesomeIcon icon={faUser} className="mr-2" /><span style={{ fontWeight: 600 }}>Adminstrator</span>
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
                    <CCol className="pb-3" lg="4">
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
            </CCardBody>
          </CCard>
          <h1>tobe con tor nieu</h1>
        </CCol>
      </CRow>
    </>
  )
}

export default Profile
