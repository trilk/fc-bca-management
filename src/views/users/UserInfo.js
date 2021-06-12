import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './users.scss'
import {
  CBadge,
  CButton,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CImg,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import UserService from '../../services/user.service'
import { setFullName, setAddress, formatDate, formatDateTime, getUserRole } from '../../utils/_common'


const UserInfo = (props) => {
  const { t } = useTranslation();
  const lang = useSelector(state => state.auth.lang);
  const [userInfo, setUserInfo] = useState({});
  const [userRole, setUserRole] = useState('user');
  const parentPage = props.parentPage;

  useEffect(() => {
    if (props.userInfo) {
      setUserInfo(props.userInfo)
      setUserRole(getUserRole(props.userInfo.roles))
    }
  }, [props.userInfo])

  return (
    <>
      <CRow>
        {/* Card name info */}
        <CCol>
          <CCard>
            <CCardBody>
              <CCol className="p-0 d-flex flex-lg-row flex-column pt-lg-3 px-lg-3">
                <div className="mb-2 pr-2">
                  <div className="c-avatar-lg position-relative">
                    <CImg
                      src={'avatars/6.jpg'}
                      className="avatar-lg"
                    />
                    <span className="c-status bg-success"></span>
                  </div>
                </div>
                <CCol className="p-0">
                  <CCol className="d-flex flex-row align-items-center p-0">
                    <div className="mr-2 p-0">
                      <strong style={{ fontSize: 22 }}>{setFullName(userInfo.firstName, userInfo.lastName, lang)}</strong>
                    </div>
                    <div className="mr-2">
                      {(userRole !== 'user') && <CBadge color="light" className="badge-status">
                        {/* <FontAwesomeIcon icon={faUserShield} className="mr-2" /> */}
                        {t(`role.${userRole}`)}
                      </CBadge>}
                    </div>
                  </CCol>
                  <CCol className="d-flex flex-wrap p-0 pt-1">
                    <div className="text-muted pr-3 d-flex flex-row align-items-center pb-1">
                      {/* <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /><span >{userInfo.username || ''}</span> */}
                    </div>
                    {/* <div className="text-muted pr-3 d-flex flex-row align-items-center pb-1">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /><span >{location}</span>
                    </div> */}
                    <div className="text-muted d-flex flex-row align-items-center pb-1">
                      {/* <FontAwesomeIcon icon={faAt} className="mr-2" /><span>{userInfo.email || ''}</span> */}
                    </div>
                  </CCol>
                  <CCol className="d-flex flex-lg-row flex-column align-items-end p-0 pt-2">
                    <CCol className="pt-3 d-flex flex-lg-row flex-column p-0">
                      <CCol lg="3" className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                        <div className="d-flex bd-highlight align-items-center">
                          {/* <FontAwesomeIcon icon={faArrowUp} color="#50cd89" className="mr-2" /> */}
                          <span style={{ fontSize: 24, fontWeight: 600 }}>12.000</span>
                        </div>
                        <span className="text-muted small">{t('user-info.lb-total-msg')}</span>
                      </CCol>
                      <CCol lg="3" className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                        <div className="d-flex bd-highlight align-items-center">
                          {/* <FontAwesomeIcon icon={faArrowUp} color="#50cd89" className="mr-2" /> */}
                          <span style={{ fontSize: 24, fontWeight: 600 }}>12.000</span>
                        </div>
                        <span className="text-muted small">{t('user-info.lb-success-msg')}</span>
                      </CCol>
                      <CCol lg="3" className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                        <div className="d-flex bd-highlight align-items-center">
                          {/* <FontAwesomeIcon icon={faArrowDown} color="#D9214E" className="mr-2" /> */}
                          <span style={{ fontSize: 24, fontWeight: 600 }}>100</span>
                        </div>
                        <span className="text-muted small">{t('user-info.lb-fail-msg')}</span>
                      </CCol>
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
                {/* <h4><FontAwesomeIcon icon={faAddressCard} className="mr-2" /> {t('user-info.title')}</h4> */}
                <CButton color="primary" size="lg" className="ml-auto" onClick={props.onEditClick}>
                  <CIcon name="cil-pencil" className="mr-2" />
                  {t(`user-info.btn-${parentPage}-update`)}
                </CButton>
              </CCol>
            </CCardHeader>
            <CCardBody>
              <CCol className="py-lg-3 px-lg-3 p-0">
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('user-info.lb-name')}</CCol>
                  <CCol col="6"><span >{setFullName(userInfo.firstName, userInfo.lastName, lang)}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('user-info.lb-phone')}
                  </CCol>
                  <CCol col="6"><span>{userInfo.username || ''}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('user-info.lb-email')}</CCol>
                  <CCol col="6"><span>{userInfo.email || ''}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('user-info.lb-gender')}</CCol>
                  <CCol col="6"><span >{t(`gender.${userInfo.gender || ''}`)}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('user-info.lb-dob')}</CCol>
                  <CCol col="6"><span>{formatDate(userInfo.dob, lang)}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('user-info.lb-address')}</CCol>
                  <CCol col="6"><span>{setAddress(userInfo.address)}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('user-info.lb-channel-mng')}</CCol>
                  <CCol col="6">{userInfo.channels && userInfo.channels.map((ch) => ch.name).join(', ')}</CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('user-info.lb-last-update')}</CCol>
                  <CCol col="6"><span >{formatDateTime(userInfo.updatedAt, lang)}</span></CCol>
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
              <h4>{t('user-info.lb-signin-method')}</h4>
            </CCardHeader>
            <CCardBody>
              <CCol className="d-flex flex-column p-lg-3 p-0">
                <CCol className="p-0 pb-3 box-phone">
                  <div className="d-flex flex-column float-left">
                    <span> <strong>{t('user-info.lb-username')}</strong></span>
                    <span className="light-color  pt-1">{userInfo.username}</span>
                  </div>
                </CCol>
                <CCol className="p-0 d-flex flex-lg-row flex-column align-items-center pt-3">
                  <CCol className="d-flex flex-column float-left p-0">
                    <span> <strong>{t('user-info.lb-password')}</strong></span>
                    <span className="light-color  pt-1"><em> {t('user-info.pw-update-msg')}</em></span>
                  </CCol>
                  <div className="mr-auto pt-2 pt-lg-0">
                    <CButton color="light" onClick=""> {t('user-info.btn-change-pw')}</CButton>
                  </div>
                </CCol>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default UserInfo
