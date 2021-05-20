import React, { useEffect, useState } from 'react'
import './users.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import {
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
} from '@coreui/react'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import UserService from '../../services/user.service'
import UserInfo from './UserInfo'


const MyProfile = () => {
  const { t } = useTranslation();
  const user = useSelector(state => state.auth.user);
  const lang = useSelector(state => state.auth.lang);
  const [large, setLarge] = useState(false)
  const [small, setSmall] = useState(false)
  const [userProfile, setUserProfile] = useState({});

  const onEditProfile = () => {
    setLarge(true);
  }
  useEffect(async () => {
    const profile = await UserService.getProfile();
    setUserProfile(profile.data);
  }, [])

  return (
    <>
      <UserInfo userInfo={userProfile} onEditClick={onEditProfile} parentPage={'profile'}></UserInfo>
      {/* Modal Upadate profile */}
      <CModal
        show={large}
        onClose={() => setLarge(!large)}
        size="lg"
      >
        <CModalHeader closeButton>
          <CModalTitle>Update Profile</CModalTitle>
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
          <CButton color="ghost" onClick={() => setLarge(!large)}>Cancel</CButton>
          <CButton color="primary" onClick={() => setLarge(!large)}>Save Changes</CButton>{' '}
        </CModalFooter>
      </CModal>
      {/* Modal change password */}
      <CModal
        show={small}
        onClose={() => setSmall(!small)}
        size="sm"
      >
        <CModalHeader closeButton>
          <CModalTitle>Change Password</CModalTitle>
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
          <CButton color="ghost" onClick={() => setSmall(!small)}>Cancel</CButton>
          <CButton color="primary" onClick={() => setSmall(!small)}>Update Password</CButton>{' '}
        </CModalFooter>
      </CModal>
    </>
  )
}

export default MyProfile
