import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import femaleimg from './avatar/female.jpg'
import maleimg from './avatar/male.jpg'
import './users.scss'
import * as Icon from 'react-bootstrap-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, faPlusCircle, faEllipsisV, faEye, faPen, faSortDown } from '@fortawesome/free-solid-svg-icons'
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
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
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
        <CCol xl={12}>
          <CCol lg="12" className="p-0  pb-3 d-flex bd-highlight ">
            <div className="p-0 d-flex align-items-end">
              <h4><FontAwesomeIcon icon={faUsersCog} className="mr-3" />List Users</h4>
            </div>
            <div className="p-0 ml-auto">
              <CLink to="/users/create-user"><CButton color="primary"><FontAwesomeIcon icon={faPlusCircle} className="mr-2" /><span>New User</span></CButton></CLink>
            </div>
          </CCol>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol className="d-flex bd-highlight">
                  <div className="pr-3">
                    <CDropdown>
                      <CDropdownToggle color="outline" className="d-flex align-items-center">
                        <span>Status: All</span>
                        <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                      </CDropdownToggle>
                      <CDropdownMenu className="mt-2">
                        <CDropdownItem>All</CDropdownItem>
                        <CDropdownItem>Subscribed</CDropdownItem>
                        <CDropdownItem>Unsubscribed</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    <div className="pl-1">
                      <small className="form-text text-muted"><strong>Filter</strong> by Status</small>
                    </div>
                  </div>
                  <div>
                    <CFormGroup>
                      <CInput id="" type="text" placeholder="Search" required />
                      <div className="pl-1">
                        <small className="form-text text-muted"><strong>Search</strong> in all fields</small>
                      </div>
                    </CFormGroup>
                  </div>
                </CCol>
              </CRow>
              <CDataTable
                items={usersData}
                fields={[
                  { key: 'name', label: 'name', _style: { width: '20%' } },
                  { key: 'phone', label: 'phone no.', _style: { width: '10%' } },
                  { key: 'role', label: 'role', _style: { width: '8%' } },
                  { key: 'gender', label: 'gender', _style: { width: '5%' } },
                  // { key: 'address', label: 'address', _style: { width: '15%' } },
                  { key: 'lastupdate', label: 'last update', _style: { width: '10%' } },
                  { key: 'status', label: 'status', _style: { width: '5%' } },
                  { key: 'action', label: 'action', _style: { width: '1%' } },
                ]}
                hover
                bordered
                striped
                itemsPerPage={10}
                activePage={page}
                clickableRows
                // onRowClick={
                //   (item) => history.push(`/users/${item.id}`)}
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
                        <CBadge className="role-tag-inner" color={getRole(item.role)}>
                          <FontAwesomeIcon icon={faUsers} style={{ height: 16, width: 16 }} className="mr-1" />
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
