import React, { useEffect, useState } from 'react'
import './users.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faMapMarkerAlt, faAt, faArrowUp, faArrowDown, faUserShield, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import {
  CBadge,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CTooltip,
  CLabel,
  CInput,
  CSelect,
  CModalFooter,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CImg,
  CRow,
} from '@coreui/react'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import UserService from '../../services/user.service'
import { setFullName, setAddress } from '../../utils/_common'


const Profile = () => {
  const { t } = useTranslation();
  const user = useSelector(state => state.auth.user);
  const lang = useSelector(state => state.auth.lang);
  const [large, setLarge] = useState(false)
  const [small, setSmall] = useState(false)
  const [userProfile, setUserProfile] = useState({});

  useEffect(async () => {
    const profile = await UserService.getProfile();
    setUserProfile(profile.data);
  }, [])

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
                      <strong style={{ fontSize: 22 }}>{setFullName(userProfile.firstName, userProfile.lastName, lang)}</strong>
                    </div>
                    <div className="mr-2">
                      {(user.isAdmin || user.isModerator) && <CBadge color="light" className="badge-status">
                        <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                        {user.isAdmin ? t('role.admin') : 'role.moderator'}
                      </CBadge>}
                    </div>
                  </CCol>
                  <CCol className="d-flex flex-wrap p-0 pt-1">
                    <div className="text-muted pr-3 d-flex flex-row align-items-center pb-1">
                      <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /><span >{userProfile.username}</span>
                    </div>
                    {/* <div className="text-muted pr-3 d-flex flex-row align-items-center pb-1">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /><span >{location}</span>
                    </div> */}
                    <div className="text-muted d-flex flex-row align-items-center pb-1">
                      <FontAwesomeIcon icon={faAt} className="mr-2" /><span>{userProfile.email}</span>
                    </div>
                  </CCol>
                  <CCol className="d-flex flex-lg-row flex-column align-items-end p-0 pt-2">
                    <CCol className="pt-3 d-flex flex-lg-row flex-column p-0">
                      <CCol lg="3" className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                        <div className="d-flex bd-highlight align-items-center">
                          <FontAwesomeIcon icon={faArrowUp} color="#50cd89" className="mr-2" />
                          <span style={{ fontSize: 24, fontWeight: 600 }}>12.000</span>
                        </div>
                        <span className="text-muted small">{t('profile.lb-total-msg')}</span>
                      </CCol>
                      <CCol lg="3" className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                        <div className="d-flex bd-highlight align-items-center">
                          <FontAwesomeIcon icon={faArrowUp} color="#50cd89" className="mr-2" />
                          <span style={{ fontSize: 24, fontWeight: 600 }}>12.000</span>
                        </div>
                        <span className="text-muted small">{t('profile.lb-success-msg')}</span>
                      </CCol>
                      <CCol lg="3" className="border border-gray-300 border-dashed rounded min-w-125px py-2 px-2 me-6 mb-3 mr-3" >
                        <div className="d-flex bd-highlight align-items-center">
                          <FontAwesomeIcon icon={faArrowDown} color="#D9214E" className="mr-2" />
                          <span style={{ fontSize: 24, fontWeight: 600 }}>100</span>
                        </div>
                        <span className="text-muted small">{t('profile.lb-fail-msg')}</span>
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
                <span className="float-left" style={{ fontSize: 20, fontWeight: 700 }}>{t('profile.title')}</span>
                <CButton color="primary" size="lg" className="ml-auto" onClick={() => setLarge(!large)}>{t('profile.btn-update-info')}</CButton>
              </CCol>
            </CCardHeader>
            <CCardBody>
              <CCol className="py-lg-3 px-lg-3 p-0">
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('profile.lb-name')}</CCol>
                  <CCol col="6"><span >{setFullName(userProfile.firstName, userProfile.lastName, lang)}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('profile.lb-phone')}
                    {/* <span style={{ fontWeight: 500 }}>Contact Phone </span> */}
                  </CCol>
                  <CCol col="6"><span>{userProfile.username}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('profile.lb-email')}</CCol>
                  <CCol col="6"><span>{userProfile.email}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('profile.lb-gender')}</CCol>
                  <CCol col="6"><span >{t(userProfile.gender)}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('profile.lb-dob')}</CCol>
                  <CCol col="6"><span>{userProfile.dob}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('profile.lb-address')}</CCol>
                  <CCol col="6"><span>{setAddress(userProfile.address)}</span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('profile.lb-channel-mng')}</CCol>
                  <CCol col="6"><span ></span></CCol>
                </CRow>
                <CRow className="pb-4">
                  <CCol col="3" xs="12" sm="2" lg="3" className="text-muted">{t('profile.lb-last-update')}</CCol>
                  <CCol col="6"><span >20 july 2021</span></CCol>
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
              <span className="float-left" style={{ fontSize: 20, fontWeight: 700 }}>{t('profile.lb-signin-method')}</span>
            </CCardHeader>
            <CCardBody>
              <CCol className="d-flex flex-column p-lg-3 p-0">
                <CCol className="p-0 pb-3 box-phone">
                  <div className="d-flex flex-column float-left">
                    <span> <strong>{t('profile.lb-username')}</strong></span>
                    <span className="light-color  pt-1">{userProfile.username}</span>
                  </div>
                </CCol>
                <CCol className="p-0 d-flex flex-lg-row flex-column align-items-center pt-3">
                  <CCol className="d-flex flex-column float-left p-0">
                    <span> <strong>{t('profile.lb-password')}</strong></span>
                    <span className="light-color  pt-1"><em> {t('profile.pw-update-msg')}</em></span>
                  </CCol>
                  <div className="mr-auto pt-2 pt-lg-0">
                    <CButton color="light" onClick={() => setSmall(!large)}> {t('profile.btn-change-pw')}</CButton>
                  </div>
                </CCol>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
        {/* Modal Upadate profile */}
        <CModal
          show={large}
          onClose={() => setLarge(!large)}
          size="lg"
        >
          <CModalHeader closeButton>
            <CModalTitle><h4 className="font-weight-bold">Update Profile</h4></CModalTitle>
          </CModalHeader>
          <CModalBody className="p-3" style={{ height: '80vh', overflow: 'auto' }}>
            <CCol lg="12" className="p-lg-4 px-lg-5 p-0 ">
              {/* Avatar */}
              <CCol className="pb-3 p-0 ">
                <CCol col="3" xs="12" sm="2" lg="3" className="p-0">
                  <span style={{ fontWeight: 600, fontSize: 15 }}>Avatar</span>
                </CCol>
                <CCol col="6" className="p-1">
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
                    <span className="text-muted small">Allowed file types: png, jpg, jpeg. 125px X 125px </span>
                  </div>
                </CCol>
              </CCol>
              {/* Name */}
              <CCol className="pb-2 p-0 d-flex flex-lg-row flex-column ">
                <CCol className="p-0 pr-4">
                  <CCol className="p-0 d-flex align-items-center">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>First Name<span className="danger-color pl-2">*</span>
                    </span>
                  </CCol>
                  <CCol className="p-0 py-2 me-6">
                    <CInput htmlFor="First-name" placeholder="First Name" />
                  </CCol>
                </CCol>
                <CCol className="p-0">
                  <CCol className="p-0 d-flex align-items-center">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Last Name <span className="danger-color pl-2">*</span>
                    </span>
                  </CCol>
                  <CCol className="p-0 py-2 me-6">
                    <CInput htmlFor="First-name" placeholder="First Name" />
                  </CCol>
                </CCol>
              </CCol>
              {/* email and gender */}
              <CCol className="pb-1 p-0 d-flex flex-lg-row flex-column">
                <CCol className="p-0 pr-lg-4">
                  <CCol className="p-0 d-flex align-items-center">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Email <span className="danger-color pl-2">*</span>
                    </span>
                  </CCol>
                  <CCol className="p-0 py-2 me-6">
                    <CInput htmlFor="First-name" placeholder="First Name" />
                  </CCol>
                </CCol>
                <CCol className="p-0">
                  <CCol className="p-0">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Gender</span></CCol>
                  <CCol col="6" className="py-2 p-0">
                    <CSelect custom name="select" id="select">
                      <option value="0">select..</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Other</option>
                    </CSelect>
                  </CCol>
                </CCol>
              </CCol>
              {/* Address */}
              <CCol className="p-0 pt-4 pb-2"><h5><strong>Addres Info</strong></h5></CCol>
              <CCol col="6" className="d-flex flex-column p-0">
                <CCol className="p-0">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Adress</span></CCol>
                <CCol className="p-0 mr-3 py-2">
                  <CInput htmlFor="Phone" placeholder="" />
                  <small className="text-muted"><strong>Enter</strong> the address</small>
                </CCol>
              </CCol>
              <CCol col="6" className="d-flex flex-column p-0 pt-2 pr-0">
                <CCol className="p-0">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>City/Provincial</span></CCol>
                <CCol className="p-0 py-2">
                  <CSelect custom name="select" id="select">
                    <option value="0">select..</option>
                    <option value="1">Vietnam</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </CSelect>
                  <small className="text-muted"><strong>Select</strong> the Provincial/City</small>
                </CCol>
              </CCol>
              <CCol className="pt-2 p-0 d-flex flex-lg-row flex-column">
                <CCol col="6" className="d-flex flex-column p-0 pr-lg-4">
                  <CCol className="p-0">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>City/Provincial</span></CCol>
                  <CCol className="p-0 py-2">
                    <CSelect custom name="select" id="select">
                      <option value="0">select..</option>
                      <option value="1">Vietnam</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </CSelect>
                    <small className="text-muted"><strong>Select</strong> the Provincial/City</small>
                  </CCol>
                </CCol>
                <CCol col="6" className="d-flex flex-column p-0">
                  <CCol className="p-0">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>District</span></CCol>
                  <CCol className="p-0 py-2">
                    <CSelect custom name="select" id="select">
                      <option value="0">select..</option>
                      <option value="1">Vietnam</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </CSelect>
                    <small className="text-muted"><strong>Select</strong> the district</small>
                  </CCol>
                </CCol>
              </CCol>
              {/* street */}
            </CCol>
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center py-3">
            <CButton color="ghost" variant="light" onClick={() => setLarge(!large)}>Cancel</CButton>
            <CButton color="primary" onClick={() => setLarge(!large)}>Save Changes</CButton>{' '}
          </CModalFooter>
        </CModal>
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
          <CModalFooter className="d-flex justify-content-center py-3">
            <CButton color="ghost" variant="light" onClick={() => setSmall(!small)}>Cancel</CButton>
            <CButton color="primary" onClick={() => setSmall(!small)}>Update Password</CButton>{' '}
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  )
}

export default Profile
