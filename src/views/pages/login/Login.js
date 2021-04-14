import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import "./login.scss"
import {
  CButton,
  CInputCheckbox,
  CCard,
  CFormGroup,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CLabel,
  CForm,
  CInput,
  CAlert,
  CInputGroup,
  CInputGroupPrepend,
  CSelect,
  CInputGroupText,
  CHeaderBrand,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { login } from "../../../actions/auth";
import { CHANGE_LANGUAGE } from "../../../actions/types";

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import i18n from './../../../i18n';


const Login = () => {
  const { t } = useTranslation();
  const placements = [
    'bottom',
  ];

  const dispatch = useDispatch();
  // get from store redux
  let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  let language = useSelector(state => state.auth.lang);
  const [userData, setUserData] = useState({ phone: '', password: '' })

  const onChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onLanguageChanged = e => {
    i18n.changeLanguage(e.target.value);
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();

    dispatch(login(userData)).then(() => {
      isAuthenticated = true;
    });
  };
  // useEffect(() => {
  //   console.log("isAuthenticated", isAuthenticated)
  //   if (isAuthenticated) {
  //     console.log('Login roi vo day lam chi?');
  //     history.push('/');
  //   }
  // }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-start pt-4" >
      <CContainer>
        <CRow className="d-flex justify-content-center">
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
                      <CCol col="6" className="pb-2">
                        <CSelect className='col-md-4 float-right' custom name="select" id="select-lang" defaultValue={language} onChange={value => onLanguageChanged(value)}>
                          <option value="en" >English</option>
                          <option value="vi" >Tieng Viet</option>
                        </CSelect>
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
                      <CInput type="text" placeholder={t('login.ph-username')} autoComplete="username" name="phone" onChange={value => onChange(value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder={t('login.ph-password')} autoComplete="current-password" name="password" onChange={value => onChange(value)} />
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
                      <CButton block color="primary" onClick={onSubmit}>{t('login.bt-login')}</CButton>
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
