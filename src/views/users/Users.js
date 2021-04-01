import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './users.scss'
import * as Icon from 'react-bootstrap-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers } from '@fortawesome/free-solid-svg-icons'
import {
  CBadge,
  CButton,
  CCol,
  CDataTable,
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
          <CCard>
            <CCardHeader>
              <CRow className="align-items-start">
                <CCol className="d-flex bd-highlight">
                  <CCol className="pt-2 pl-0">
                    <h5 className="tt-header">List Users</h5>
                  </CCol>
                  {/* sm,md,lg,xl, screen */}
                  <CCol col="6" sm="4" md="4" lg="4" className="d-none d-sm-block">
                    <CInput id="text-input" name="text-input" placeholder="Search by name" />
                  </CCol>
                  {/* sm,md,lg,xl, screen*/}
                  <CCol col="2" lg="0" className="d-none d-sm-block">
                    <CLink to="/create-user"><CButton color="primary"><Icon.PlusCircleFill className="mr-2 mb-0" />New User</CButton></CLink>
                  </CCol>
                </CCol>
                {/* Mobile xs */}
                <CCol col="12" xs="12" className="d-block d-sm-none p-0 pt-2 d-flex bd-highlight" >
                  <CCol className="pr-0">
                    <CInput id="text-input" name="text-input" placeholder="Search by name" />
                  </CCol >
                  {/* Mobile xs */}
                  <CCol>
                    <CButton color="primary"><Icon.PlusCircleFill className="mr-2 mb-0 " />New User</CButton>
                  </CCol>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody className="pt-0">
              <CDataTable
                items={usersData}
                fields={[
                  { key: 'name', label: 'name',_style: { width: '20%' }, _classes: 'font-weight-bold'},
                  { key: 'status', label: 'status', _style: { width: '8%' } },
                  { key: 'role', label: 'role', _style: { width: '12%' } },
                  { key: 'phone', label: 'phone no.', _style: { width: '15%' } },
                  { key: 'gender', label: 'gender', _style: { width: '10%' }},
                  { key: 'createdate', label: 'create date', _style: { width: '15%' } },
                  { key: 'lastupdate', label: 'last update', _style: { width: '15%' } },
                ]}
                hover
                bordered
                striped
                itemsPerPage={10}
                activePage={page}
                clickableRows
                onRowClick={
                  (item) => history.push(`/users/${item.id}`)}
                scopedSlots={{
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
