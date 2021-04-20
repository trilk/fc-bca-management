import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import femaleimg from './avatar/female.jpg'
import maleimg from './avatar/male.jpg'
import './users.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, faPlusCircle, faEllipsisV, faEye, faPen, faSortDown, faLungsVirus, faUserShield, faUserEdit, faSearch } from '@fortawesome/free-solid-svg-icons'
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

import usersData from './UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
  }
}
const getRole = role => {
  switch (role) {
    case 'Admin': return 'dark'
    case 'User': return 'light'
  }
}


const Users = () => {

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
        <CCol className="" xl={12}>
          <CCard>
            <CCardBody>
              <CCol className="p-0 d-flex flex-lg-row flex-column">
                <div className="d-flex flex-shrink-0 rounded bg-light w-lg-150px h-lg-150px me-7 mb-4 justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faLungsVirus} />
                </div>
                <CCol className="d-flex flex-lg-row flex-column">
                  <CCol className="p-0">
                    <div className="d-flex align-items-center">
                      <span style={{ fontSize: '1.875rem', fontWeight: 600 }} className="pr-2">PVOil Group</span>
                      <CBadge color="success" className="badge-status font-weight-bold">in Progress</CBadge>
                    </div>
                    <CCol className="p-0 pt-3 d-flex flex-lg-row">
                      <CCol className="border rounded border-dashed mr-3" lg="2">
                        <div className="d-flex flex-column p-2">
                          <span className="text-gray-400 pb-1" style={{ fontWeight: 600 }}>Total Users</span>
                          <span style={{ fontSize: 24, fontWeight: 700 }}>100</span>
                        </div>
                      </CCol>
                      <CCol className="border rounded border-dashed mr-3" lg="2">
                        <div className="d-flex flex-column p-2">
                          <span className="text-gray-400 pb-1" style={{ fontWeight: 600 }}><FontAwesomeIcon icon={faUserShield} className="mr-2" />Admin</span>
                          <span style={{ fontSize: 24, fontWeight: 700 }}>10</span>
                        </div>
                      </CCol>
                      <CCol className="border rounded border-dashed" lg="2">
                        <div className="d-flex flex-column p-2">
                          <span className="text-gray-400 pb-1" style={{ fontWeight: 600 }}><FontAwesomeIcon icon={faUserEdit} className="mr-2" />Moderator</span>
                          <span style={{ fontSize: 24, fontWeight: 700 }}>90</span>
                        </div>
                      </CCol>
                    </CCol>
                  </CCol>
                  <div className="ml-auto">
                    <CLink to="/users/create-user">
                      <CButton size="lg" color="primary">
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                        <span>New User</span>
                      </CButton>
                    </CLink>
                  </div>
                </CCol>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol className="pt-2 d-flex flex-lg-row flex-column pr-0" lg="12">
          <CCol lg="2" className="p-0">
            <CFormGroup className="form-group2 has-search ">
              <span className="form-control-feedback mt-1 ml-2">
                <FontAwesomeIcon icon={faSearch} style={{ height: 18, width: 18 }} />
              </span>
              <CInput id="" type="text" size="lg" placeholder="Search" required className="form-control2 bg-White" />
            </CFormGroup>
          </CCol>
          {/* Right */}
          <div className="pr-3 ml-lg-auto">
            <CDropdown>
              <CDropdownToggle color="outline" size="lg" className="d-flex align-items-center">
                <span>Recently Update</span>
                <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
              </CDropdownToggle>
              <CDropdownMenu className="mt-2">
                <CDropdownItem>Recently Updated</CDropdownItem>
                <CDropdownItem>Last Month</CDropdownItem>
                <CDropdownItem>Last Quarter</CDropdownItem>
                <CDropdownItem>Last Year</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
          <div className="pr-3">
            <CDropdown>
              <CDropdownToggle color="outline" size="lg" className="d-flex align-items-center">
                <span>Status</span>
                <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
              </CDropdownToggle>
              <CDropdownMenu className="mt-2">
                <CDropdownItem>Active</CDropdownItem>
                <CDropdownItem>Banned</CDropdownItem>
                <CDropdownItem>Inaactive</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </CCol>
        <CCol xl={12}>
          <CCard>
            <CCardBody className="pt-0">
              <CDataTable
                items={usersData}
                fields={[
                  { key: 'name', label: 'name', _style: { width: '20%' } },
                  { key: 'role', label: 'role', _style: { width: '8%' } },
                  { key: 'phone', label: 'phone no.', _style: { width: '10%' } },
                  { key: 'gender', label: 'gender', _style: { width: '5%' } },
                  { key: 'segments', label: 'Manage Segments', _style: { width: '15%' } },
                  { key: 'lastupdate', label: 'last update', _style: { width: '8%' } },
                  { key: 'status', label: 'status', _style: { width: '5%' } },
                ]}
                bordered
                striped
                itemsPerPage={10}
                activePage={page}
                clickableRows
                onRowClick={
                  (item) => history.push(`/users/${item.id}`)}
                scopedSlots={{
                  'name':
                    (item) => (
                      <td>
                        <CRow>
                          <CCol className="d-flex flex-row bd-highlight">
                            <CCol lg="0" className="p-0 pr-3 d-flex align-items-center">
                              <div className="c-avatar">
                                {/* avatar */}
                                {item.gender.includes("Female") && <img src={femaleimg} className="c-avatar-img" alt="admin@bootstrapmaster.com" height="48" width="48" name="avatar-male-default" />}
                                {item.gender.includes("Male") && <img src={maleimg} className="c-avatar-img" alt="admin@bootstrapmaster.com" height="48" width="48" name="avatar-female-default" />}
                                {/* status */}
                                {item.status.includes("Active") && <span className="c-avatar-status bg-success"></span>}
                                {item.status.includes("Inactive") && <span className="c-avatar-status bg-secondary"></span>}
                                {item.status.includes("Banned") && <span className="c-avatar-status bg-danger"></span>}
                              </div>
                            </CCol>
                            <CCol className="p-0">
                              <h6><strong>{item.name}</strong></h6>
                              <div className="small text-muted">
                                <span>Registered: {item.createdate}</span>
                              </div>
                            </CCol>
                          </CCol>
                        </CRow>
                      </td>
                    ),
                  // Trạng thái
                  'status':
                    (item) => (
                      <td>
                        <CBadge className="badge-status" color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                  // Role
                  'role':
                    (item) => (
                      <td>
                        {/* <CBadge className="role-tag-inner" color={getRole(item.role)}>
                          <FontAwesomeIcon icon={faUsers} style={{ height: 16, width: 16 }} className="mr-1" />
                          {item.role}
                        </CBadge> */}
                        <CBadge color="light" className="badge-status border">
                          {item.role.includes("Admin") && <FontAwesomeIcon icon={faUserShield} className="mr-2" />}
                          {item.role.includes("Moderator") && <FontAwesomeIcon icon={faUserEdit} className="mr-2" />}
                          {item.role}
                        </CBadge>
                      </td>
                    ),
                  'action':
                    (item) => (
                      <td>
                        <CDropdown className="pr-2 d-flex justify-content-center">
                          <CDropdownToggle color="ghost">
                            <FontAwesomeIcon icon={faEllipsisV} style={{ width: 12, height: 12 }} />
                          </CDropdownToggle>
                          <CDropdownMenu className="mt-2">
                            <CDropdownItem>
                              <CLink to="/users/:id"><FontAwesomeIcon icon={faEye} className="mr-2" />View details</CLink>
                            </CDropdownItem>
                            <CDropdownItem><FontAwesomeIcon icon={faPen} className="mr-2" />Update Info</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                        {' '}
                      </td>
                    )
                }}
              />
              <CPagination
                className="pt-4"
                activePage={page}
                onActivePageChange={pageChange}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Users
