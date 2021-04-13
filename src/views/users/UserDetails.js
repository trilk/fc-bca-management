import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CBadge, CRow, CLink, CImg, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import femaleimg from './avatar/female.jpg'
import maleimg from './avatar/male.jpg'
import './users.scss'
import { useTranslation } from 'react-i18next'
import { faUsersCog, faUsers, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import imgblank from './avatar/male.jpg'


import usersData from './UsersData'

const UserDetails = ({ match }) => {
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
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" />No data</span>)]]

  return (



    <CRow>
      {/* <span>Avatar</span>
                <div className="">
                  <div className="image-input image-input-outline">
                    <div>
                      <CImg src={imgblank} className="image-input-wrapper" />
                    </div>
                    <div className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="remove">
                      <FontAwesomeIcon icon={faPen} style={{ height: 9, width: 9 }} />
                    </div>
                  </div>
                </div> */}
      <CCol lg="12">
        <CCard>
          <CCardBody>
            <table className="table">
              <tbody>
                <CCol col="12" className="d-flex flex-row bd-highlight p-0 pb-4">
                  <div>
                    <img src={femaleimg} className="c-avatar-img-bg" alt="admin@bootstrapmaster.com" name="avatar-male-default" />
                  </div>
                  <div className="pl-4">
                    <div>
                      <h4>Nguyễn Văn Nam</h4>
                    </div>
                    <div col="6" className="tr-tt pb-2">
                      <CBadge className="role-tag-inner" color={getRole(item.role)}>
                        <FontAwesomeIcon icon={faUsers} style={{ height: 16, width: 16 }} className="mr-1" />
                          Super Admin
                        </CBadge>
                    </div>
                    <small className="light-color"><strong>Online 10 minutes ago</strong></small>
                  </div>
                  <div className="ml-auto">
                    <CLink to="/updateUser"><CButton color="primary"><FontAwesomeIcon icon={faPen} className="mr-2" />Update Info</CButton></CLink>
                  </div>
                </CCol>
                <hr />
                <CRow>
                  <CCol col="3" xs="12" sm="2" lg="2" className="title-left"><small>{t('personal-info.lb-phone')}</small></CCol>
                  <CCol col="6" className="tr-tt">+84 989 767 77</CCol>
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
                  <CCol col="3" xs="12" sm="2" lg="2" className="title-left"><small>{t('personal-info.lb-createdate')}</small></CCol>
                  <CCol col="6" className="tr-tt">10:00 20/10/2020</CCol>
                </CRow>
                <hr />
                <CRow>
                  <CCol col="3" xs="12" md="3" sm="2" lg="2" className="title-left mb-0"><small>{t('personal-info.lb-password')}</small>
                  </CCol>
                  <CCol col="4" xs="12" md="8" sm="8" className="tr-tt mb-2">
                    <em>{t('personal-info.lb-password-update')}</em>
                  </CCol>
                </CRow>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserDetails
