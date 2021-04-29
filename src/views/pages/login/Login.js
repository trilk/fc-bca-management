import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, } from '@fortawesome/free-solid-svg-icons'
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
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { login } from "../../../actions/auth";
import { CHANGE_LANGUAGE } from "../../../actions/types";

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import i18n from './../../../i18n';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'


const Login = () => {
  const { t } = useTranslation();
  const placements = [
    'bottom',
  ];

  const dispatch = useDispatch();
  // get from store redux
  let isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const message = useSelector(state => state.message.msgCode);
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [showMsg, setShowMessage] = useState(false);

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

  useEffect(() => {
    if (message) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, [message]);

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
                  <CForm onSubmit={onSubmit}>
                    {/* <CRow>
                      <CCol col="6" className="pb-2">
                        <CSelect className='col-md-4 float-right' custom name="select" id="select-lang" defaultValue={language} onChange={value => onLanguageChanged(value)}>
                          <option value="en" >English</option>
                          <option value="vi" >Tieng Viet</option>
                        </CSelect>
                      </CCol>
                    </CRow> */}
                    <CRow>
                      <CCol col="6">
                        {showMsg && <CAlert color="danger">
                          {t(message)}
                        </CAlert>}
                      </CCol>
                    </CRow>
                    <CRow className="d-flex justify-content-center">
                      <CCol col="6" lg="0" className=" mt-2 pb-2 ">
                        <h2 className="title-login mb-3 d-flex justify-content-center ">{t('login.title')}</h2>
                        <h6 className="description mb-4  d-flex justify-content-center">{t('login.description')}</h6>
                      </CCol>
                    </CRow>
                    <CFormGroup className="form-group2 has-search pb-1">
                      <span className="form-control-feedback mt-1 ml-2">
                        <FontAwesomeIcon icon={faPhoneAlt} style={{ height: 18, width: 18 }} />
                      </span>
                      <CInput id="" type="text" size="lg" placeholder={t('login.ph-username')} required autoComplete="username" name="username" className="form-control2" onChange={value => onChange(value)} />
                    </CFormGroup>
                    <CFormGroup className="form-group2 has-search pb-2">
                      <span className="form-control-feedback mt-1 ml-2">
                        <FontAwesomeIcon icon={faLock} style={{ height: 18, width: 18 }} />
                      </span>
                      <CInput id="" type="password" size="lg" placeholder={t('login.ph-password')} required autoComplete="current-password" name="password" className="form-control2" onChange={value => onChange(value)} />
                    </CFormGroup>
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
                      <CCol col="3" className="pt-0 pb-4"> <Link to="##" className="text-ps d-inline-block float-right">{t('login.bt-forget-password')}</Link></CCol>
                    </CRow>
                    {/* button login  */}
                    <CCol col="6" lg="0" className="pt-2 pb-2">
                      <CButton block color="primary" type="submit">{t('login.bt-login')}</CButton>
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
