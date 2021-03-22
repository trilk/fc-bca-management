import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-bootstrap-icons'
import "./login.scss"
import {
  CButton,
  CInputCheckbox,
  CCard,
  CFormGroup,
  CCardBody,
  CDropdownItem,
  CCardGroup,
  CCol,
  CContainer,
  CLabel,
  CForm,
  CInput,
  CAlert,
  CInputGroup,
  CInputGroupPrepend,
  CPopover,
  CInputGroupText,
  CHeaderBrand,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next';
const Login = () => {
  const { t, i18n } = useTranslation();
  const placements = [
    'bottom',
  ]
  return (
    <div className="c-app c-default-layout flex-row align-items-start pt-4" >
      <CContainer>
        <CRow classname="d-flex justify-content-center">
          <CCol col="6">
            <CHeaderBrand className="mb-3 d-flex justify-content-center" to="">
              <CIcon name="logoBg" height="120" alt="Logo-bg" />
            </CHeaderBrand>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol col="6" md="4">
            <CCardGroup>
              <CCard className="pt-0 pb-4 form-login">
                <CCardBody className="pb-5">
                  <CForm>
                    <CRow>
                      <CCol col="6" className="pb-4 pr-0">
                        {placements.map(placement => {
                          return (
                            <CCol col="6" className="pb-4" key={placement}>
                              <CPopover className="d-inline-block float-right"

                                content={
                                  <>
                                    <CDropdownItem className="select-item">English</CDropdownItem>
                                    <CDropdownItem className="select-item">Vietnamese</CDropdownItem>
                                  </>
                                }
                                placement={placement}
                                interactive={true}
                                trigger="click"
                              >
                                <a className="d-inline-block float-right language pr-0">English<Icon.ChevronDown className="ml-2" /></a>
                              </CPopover>
                            </CCol>)
                        })}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol col="6">
                        <CAlert color="danger">
                          {t('login.msg-error')}
                        </CAlert>
                      </CCol>
                    </CRow>
                    <CRow className="d-flex justify-content-center">
                      <CCol col="6" lg="0" className=" mt-2 pb-2 ">
                        <h1 className="title-login mb-3 d-flex justify-content-center ">{t('login.title')}</h1>
                        <h6 className="description mb-4  d-flex justify-content-center">{t('login.description')}</h6>
                      </CCol>
                    </CRow>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder={t('login.ph-username')} autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder={t('login.ph-password')} autoComplete="current-password" />
                    </CInputGroup>
                    {/* check login */}
                    <CRow>
                      <CCol col="3" lg="0" className="pt-0 pr-0 pl-3">
                        <CFormGroup variant="custom-checkbox" inline>
                          <CInputCheckbox
                            custom
                            id="inline-checkbox1"
                            name="inline-checkbox1"
                            value="option1"
                          />
                       <CLabel className="check-label-custom" variant="custom-checkbox" htmlFor="inline-checkbox1"><p>{t('login.lb-check-login')}</p></CLabel>
                        </CFormGroup>
                      </CCol>
                      <CCol col="3" className="pt-0 pb-4"> <a href="##" className="text-ps d-inline-block float-right">{t('login.bt-forget-password')}</a></CCol>
                    </CRow>
                    {/* button login  */}
                    <CCol col="6" lg="0" className="pt-2 pb-2">
                      <CButton block color="primary">Log in</CButton>
                    </CCol>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
