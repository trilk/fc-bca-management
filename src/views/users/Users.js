import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import femaleimg from './avatar/female.jpg'
import maleimg from './avatar/male.jpg'
import './users.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faEllipsisV, faEye, faPen, faSortDown, faUserShield, faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import {
  CBadge,
  CButton,
  CCol,
  CDataTable,
  CFormGroup,
  CInputGroup,
  CSelect,
  CInputGroupPrepend,
  CCard,
  CLink,
  CCardBody,
  CDropdownItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CInput,
  CRow,

  CPagination,
  CInputGroupAppend
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import UserService from '../../services/user.service'
import { setFullName, getUserRole, formatDate, formatDateTime } from '../../utils/_common'

// import usersData from './UsersData'
import CIcon from '@coreui/icons-react'

const getBadge = status => {
  return status ? 'success' : 'secondary';

  // switch (status) {
  //   case 'Active': return 'success'
  //   case 'Inactive': return 'secondary'
  // }
}
const getRole = role => {
  switch (role) {
    case 'admin': return 'dark'
    case 'moderator': return 'dark'
    case 'user': return 'light'
  }
}


const Users = () => {

  const { t } = useTranslation();
  const limitItem = 10
  const lang = useSelector(state => state.auth.lang);
  const [usersData, setUserData] = useState([]);
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [totalPage, setTotalPage] = useState(1)
  const [searchParams, setSearchParams] = useState({ text: '', isActive: '' });
  const [queryStr, setQuery] = useState('');

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  const onChange = e => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  }

  const onSearch = () => {
    let query = Object.keys(searchParams).map(function (key) {
      if (searchParams[key].trim() !== '') {

        return key + '=' + searchParams[key]
      } else {
        return ''
      }
    }).filter(Boolean).join('&');
    if (query !== '') {
      query = '?' + query
    }
    if (query !== queryStr) {
      setQuery(query);
    }
  }

  useEffect(async () => {
    currentPage !== page && setPage(currentPage)

    const users = await UserService.getUsers(queryStr);
    setUserData(users.data);
    setTotalPage(Math.ceil(users.data.length / limitItem));
  }, [queryStr, currentPage, page])

  return (
    <>
      {/* buttons */}
      <CRow className="" lg="12" md="12" sm="12" xs="12">
        <CCol lg="6" md="6" sm="4" xs="6" className="d-flex" >
          <CInputGroup className="mb-3">
            <CInputGroupPrepend>
              <CButton color="primary" onClick={onSearch}><FontAwesomeIcon icon={faSearch} className="mr-2" />
                {t('user-list.btn-search')}</CButton>
            </CInputGroupPrepend>
            <CInput type="text" name="text" placeholder={t('user-list.ph-search')} className="form-control2 bg-White" onChange={value => onChange(value)} />
            <CInputGroupAppend className="select-status">
              <CSelect custom name="isActive" className="bg-White" onChange={value => onChange(value)}>
                <option value="">{t('user-list.col-status')}</option>
                <option value="true">{t('common.status_active')}</option>
                <option value="false">{t('common.status_inactive')}</option>
              </CSelect>
            </CInputGroupAppend>
          </CInputGroup>
        </CCol>
        <CCol>
          {/* Right */}
          <div className="d-flex flex-row ml-lg-auto ml-md-auto ml-sm-auto">
            <div className="ml-lg-auto p-0" lg="0">
              <CLink to="/users/create-user">
                <CButton color="primary">
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  <span>{t('user-list.btn-new-user')}</span>
                </CButton>
              </CLink>
            </div>

          </div>
        </CCol>
      </CRow>
      <CRow className="pt-2">
        <CCol xs="12" lg="12">
          <CCard>
            <CCardBody className="pt-0">
              <CDataTable
                items={usersData}
                fields={[
                  { key: 'name', label: t('user-list.col-name'), _style: { width: '20%' } },
                  { key: 'role', label: t('user-list.col-role'), _style: { width: '8%' } },
                  { key: 'username', label: t('user-list.col-phone'), _style: { width: '10%' } },
                  { key: 'gender', label: t('user-list.col-gender'), _style: { width: '5%' } },
                  { key: 'email', label: t('user-list.col-email'), _style: { width: '15%' } },
                  { key: 'updatedAt', label: t('user-list.col-last-update'), _style: { width: '8%' } },
                  { key: 'status', label: t('user-list.col-status'), _style: { width: '5%' } },
                  // { key: 'action', label: '', _style: { width: '5%' } },
                ]}
                bordered
                striped
                itemsPerPage={10}
                activePage={page}
                clickableRows
                onRowClick={
                  (item) => history.push(`/users/${item._id}`)}
                scopedSlots={{
                  'name':
                    (item) => (
                      <td>
                        <CRow>
                          <CCol className="d-flex flex-row bd-highlight">
                            <CCol lg="0" className="p-0 pr-3 d-flex align-items-center pl-2">
                              <div className="c-avatar">
                                {/* avatar */}
                                <img src={item.gender == "male" ? maleimg : femaleimg} className="c-avatar-img" height="48" width="48" name="avatar-male-default" />
                                {/* status */}
                                <span className={`c-avatar-status ${item.isActive ? "bg-success" : "bg-secondary"}`} ></span>
                              </div>
                            </CCol>
                            <CCol className="p-0">
                              <h6><strong>{setFullName(item.firstName, item.lastName, lang)}</strong></h6>
                              <div className="small text-muted">
                                <span>{t('user-list.col-created', { 'at': formatDateTime(item.createdAt, lang) })} </span>
                              </div>
                            </CCol>
                          </CCol>
                        </CRow>
                      </td>
                    ),
                  'gender':
                    (item) => (
                      <td>{t(`gender.${item.gender}`)}</td>
                    ),
                  'updatedAt':
                    (item) => (
                      <td>{formatDateTime(item.updatedAt, lang)}</td>
                    ),
                  // Trạng thái
                  'status':
                    (item) => (
                      <td>
                        <CBadge className="badge-status" color={getBadge(item.isActive)}>
                          {item.isActive ? t('common.status_active') : t('common.status_inactive')}
                        </CBadge>
                      </td>
                    ),
                  // Role
                  'role':
                    (item) => (
                      <td>
                        <CBadge className="badge-status border" color={getRole(getUserRole(item.roles))}>
                          <FontAwesomeIcon icon={faUserShield} className="mr-1" />
                          {t(`role.${getUserRole(item.roles)}`)}
                        </CBadge>
                        {/* <CBadge color="light" className="badge-status border">
                          {item.roles.includes("admin") && <FontAwesomeIcon icon={faUserShield} className="mr-2" /> && t('role.admin')}
                          {item.roles.includes("moderator") && <FontAwesomeIcon icon={faUserEdit} className="mr-2" />}
                        </CBadge> */}
                      </td>
                    ),
                  'action':
                    (item) => (
                      <td>
                        <CDropdown className="d-flex justify-content-center">
                          <CDropdownToggle color="ghost">
                            <FontAwesomeIcon icon={faEllipsisV} style={{ width: 12, height: 12 }} />
                          </CDropdownToggle>
                          <CDropdownMenu className="">
                            <CDropdownItem>
                              <CLink to="/users/:id"><FontAwesomeIcon icon={faEye} className="" />View details</CLink>
                            </CDropdownItem>
                            <CDropdownItem><FontAwesomeIcon icon={faPen} className="" />Update Info</CDropdownItem>
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
                pages={totalPage}
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
