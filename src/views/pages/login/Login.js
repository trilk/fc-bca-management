import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
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
  CHeaderBrand,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow, CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { login, fbLogin } from "../../../actions/auth";
import { auth } from 'src/firebase'

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

const Login = () => {
  console.log('Login');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // get from store redux
  const sysUser = useSelector(state => state.auth.user);
  // const authedUser = auth.currentUser
  const message = useSelector(state => state.message.msgCode);
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [showMsg, setShowMessage] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);

  const onChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    dispatch(login(userData));
  };

  const onFbLogin = () => {
    dispatch(fbLogin());
  }

  useEffect(() => {
    if (sysUser && !sysUser.isAnonymous) {
      console.log('Login: user loggedin ');
      setRedirectTo(true);
    }

    if (message) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [sysUser, message]);

  if (redirectTo) {
    console.log('bye bye');
    return <Redirect to='/' />
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-start pt-4" >
      <CContainer>
        <CRow className="d-flex justify-content-center">
          <CCol xs="10" md="5">
            <CHeaderBrand className="mb-5" to="">
              <CLink to="/">
                <div className="logo position-absolute text-center">
                  <CIcon name="logoBg" height="150" alt="Logo-bg" className="mt-10" color="#3c4b64" />
                </div>
                <div className="half-circle position-absolute"></div>
              </CLink>
            </CHeaderBrand>
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol xs="10" md="5">
            <CCardGroup>
              <CCard className="pt-0 pb-4 form-login">
                <CCardBody className="pb-5">
                  <CForm onSubmit={onSubmit}>

                    <CRow className="d-flex justify-content-center">
                      <CCol className="mt-5 mb-4">
                        <h1 className="title-login mt-5 mb-3 d-flex justify-content-center">Welcome</h1>
                      </CCol>
                    </CRow>
                    <CFormGroup>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText><CIcon name="cil-user" size="lg" /></CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput size="lg" placeholder={'Email'} required autoComplete="username" name="username" className="form-control2" onChange={value => onChange(value)} />
                      </CInputGroup>
                    </CFormGroup>
                    <CFormGroup>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText><CIcon name="cil-lock-locked" size="lg" /></CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput id="" type="password" size="lg" placeholder={'Mật khẩu'} required name="password" className="form-control2" onChange={value => onChange(value)} />
                      </CInputGroup>
                    </CFormGroup>

                    {/* check login */}
                    <CRow>
                      <CCol col="6" className="pt-0 pr-0 pl-3">
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
                      <CCol col="6" className="pt-0 pb-4"> <Link to="##" className="text-ps d-inline-block float-right">{t('login.bt-forget-password')}</Link></CCol>
                    </CRow>
                    {/* button login  */}
                    <CRow className="mt-3">
                      <CCol className="pt-2 pb-2 d-flex justify-content-center">
                        <CButton block size="lg" color="success" type="submit" style={{ width: '200px' }}><CIcon className="mr-2" name="cil-lock-unlocked" size="lg" />{t('login.bt-login')}</CButton>
                        {/* <CButton block color="primary" onClick={onFbLogin}>Login Facebook</CButton> */}
                      </CCol></CRow>
                    <CRow>
                      <CCol col="12">
                        {showMsg && <CAlert color="danger">
                          {t(message)}
                        </CAlert>}
                      </CCol>
                    </CRow>
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
