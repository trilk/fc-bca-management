import React, { useState } from 'react'
import './ProfileInfo.scss'
import * as Icon from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import {
    CCard,
    CCardBody,
    CButton,
    CCol,
    CRow,
    CImg,
    CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const ProfileInfo = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <CRow>
                <CCol col="12" lg="12" >
                    <CCol className="d-flex justify-content-center" ><h2>{t('personal-info.title')}</h2></CCol>
                    <CCol className="d-flex justify-content-center text-discription" ><h6>{t('personal-info.description')}</h6></CCol>
                </CCol>
                <CCol col="12" xs="12" className="d-flex justify-content-center pt-2 p-0" >
                    <CCol lg="10" sm="12">
                        <CCard>
                            <CCardBody>
                                <CRow>
                                    <CCol col="6" className="pb-3 lb-tt">
                                        <h4 className="label-tmd mb-0">{t('personal-info.lb-detail')}</h4>
                                        <small className="text-discription">{t('personal-info.lb-last-update')}</small>
                                    </CCol>
                                    <CCol col="6" className="pl-3">
                                        <CLink to="/update-info">
                                            <CButton color="primary" className="mb-2 float-right">
                                                {t('personal-info.btn-update-info')}
                                            </CButton>
                                        </CLink>
                                    </CCol>
                                </CRow>
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
                                    <CCol col="3" xs="12" sm="2" lg="2" className="title-left"><small>{t('personal-info.lb-role')}</small></CCol>
                                    <CCol col="6" className="tr-tt">Administration</CCol>
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
                                    <CCol col="3" xs="12" sm="2" lg="2" className="title-left"><small>{t('personal-info.lb-birthday')}</small></CCol>
                                    <CCol col="6" className="tr-tt">July, 5, 1992</CCol>
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
                </CCol>
            </CRow>
        </>
    )
}

export default ProfileInfo
