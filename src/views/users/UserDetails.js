import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CBadge, CRow, CLink, CImg, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import './users.scss'
import { useTranslation } from 'react-i18next'
import { faUsersCog, faUsers, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import usersData from './UsersData'

const User = ({ match }) => {
  const getRole = role => {
    switch (role) {
      case 'Admin': return 'dark'
      case 'User': return 'light'
    }
  }
  const getBadge = status => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }
  const [item] = useState(usersData)
  const { t, i18n } = useTranslation()
  const user = usersData.find(user => user.id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            <CCol className="d-flex bd-highlight p-0">
              <CCol className="pt-2 pl-0">
                <h4 className="label-tmd mb-1">{t('personal-info.lb-detail')}</h4>
                <small className="text-discription">{t('personal-info.lb-last-update')}</small>
              </CCol>
              <CCol col="2" lg="0" className="d-flex align-items-center">
                <CButton color="primary">{t('personal-info.btn-update-info')}</CButton>
              </CCol>
            </CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol col="3" xs="12" sm="2" lg="2" className="title-left d-flex align-items-center" ><small>{t('personal-info.lb-photo')}</small></CCol>
              <CCol col="6" className="tr-tt mt-1">
                <div>
                  <CImg
                    style={{ height: 36, width: 36 }}
                    src={'avatars/6.jpg'}
                    className="c-avatar-img"
                    alt="admin@bootstrapmaster.com"
                  />
                </div>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol col="3" xs="12" sm="2" lg="2" className="title-left"><small>{t('personal-info.lb-name')}</small></CCol>
              <CCol col="6" className="tr-tt">Nguyễn Văn Nam</CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol col="3" xs="12" sm="2" lg="2" className="title-left"><small>{t('personal-info.lb-status')}</small></CCol>
              <CCol col="6" className="tr-tt">
              <CBadge className="badge-status" color="success">
                         Đang hoạt động
                        </CBadge>
              </CCol>
            </CRow>
            <hr />
            <CRow className="d-flex align-items-center">
              <CCol col="3" xs="12" sm="2" lg="2" className="title-left"><small>{t('personal-info.lb-role')}</small></CCol>
              <CCol col="6" className="tr-tt">
                <CBadge className="role-tag-inner" color={getRole(item.role)}>
                  <FontAwesomeIcon icon={faUsers} style={{ height: 16, width: 16 }} className="mr-1" />
                  Admin
                </CBadge>
              </CCol>
              <CCol className="d-flex justify-content-end ">
                <CButton color="outline" size="sm"><FontAwesomeIcon icon={faPen} size="xs" className="ml-0" /><span className="mfs-2"><small>Sửa</small></span></CButton>
              </CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol col="3" xs="12" sm="2" lg="2" className="title-left"><small>{t('personal-info.lb-phone')}</small></CCol>
              <CCol col="6" className="tr-tt">+84 989 767 77</CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol col="3" xs="12" sm="2" lg="2" className="title-left"><small>{t('personal-info.lb-address')}</small></CCol>
              <CCol col="6" className="tr-tt">25/2A Nguyễn Trung Nguyệt, Phường Bình Trưng Đông, Quận 2 , TP. Hồ Chí Minh</CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol col="3" xs="12" sm="2" lg="2" className="title-left"><small>{t('personal-info.lb-gender')}</small></CCol>
              <CCol col="6" className="tr-tt">{t('personal-info.lb-male')}</CCol>
            </CRow>
            <hr />
            <CRow>
              <CCol col="3" xs="12" md="3" sm="2" lg="2" className="title-left mb-0"><small>{t('personal-info.lb-password')}</small>
              </CCol>
              <CCol col="4" xs="12" md="8" sm="8" className="tr-tt mb-2">
                <em>{t('personal-info.lb-password-update')}</em>
              </CCol>
            </CRow>
          </CCardBody>

        </CCard>
      </CCol>
    </CRow>
  )
}

export default User