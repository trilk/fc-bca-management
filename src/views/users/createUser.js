import React, { useState, useEffect } from 'react'
import './createUser.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faPen, faFileSignature, faUsers, faEye, faBan, faCheck } from '@fortawesome/free-solid-svg-icons'
import {
    CButton,
    CCardHeader,
    CCol,
    CLabel,
    CCard,
    CCardBody,
    CInputRadio,
    CInput,
    CFormGroup,
    CSelect,
    CRow,
    CCardFooter,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
const CreateUser = () => {

    //role admin or moderator
    const [role, setRole] = useState("Admin");
    const { t, i18n } = useTranslation()

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardHeader>
                            <h5 className="pt-2 tt-header">{t('create-user.tt-header')}</h5>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="pb-5">
                                {/* Left content */}
                                <CCol col="6" xs="12" lg="6" className="p-0">
                                    <CCol>
                                        <CCol className="p-0 pb-3">
                                            <CFormGroup row className="my-0">
                                                <CCol className="pr-1">
                                                    <CLabel htmlFor="first-name" className="form-control-label">{t('create-user.lb-fr-name')}</CLabel>
                                                    <CInput id="first-name" placeholder="" />
                                                </CCol>
                                                <CCol>
                                                    <CLabel htmlFor="last-name" className="form-control-label">{t('create-user.lb-lastname')}</CLabel>
                                                    <CInput id="last-name" placeholder="" />
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        {/* phone */}
                                        <CCol className="p-0">
                                            <CFormGroup>
                                                <CLabel htmlFor="phone-number" className="form-control-label">{t('create-user.lb-phone')}</CLabel>
                                                <CInput id="phone-number" placeholder={t('create-user.pl-phone')} required />
                                            </CFormGroup>
                                        </CCol>
                                        {/* gender */}
                                        <CCol className="p-0">
                                            <CLabel htmlFor="gender" className="form-control-label">{t('create-user.lb-gender')}</CLabel>
                                            <CCol className="d-flex justify-content-start pl-0">
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                                                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1">{t('create-user.lb-male')}</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio custom id="inline-radio2" name="inline-radios" value="option1" />
                                                    <CLabel variant="custom-checkbox" htmlFor="inline-radio2">{t('create-user.lb-female')}</CLabel>
                                                </CFormGroup>
                                                <CFormGroup variant="custom-radio" inline>
                                                    <CInputRadio custom id="inline-radio3" name="inline-radios" value="option1" />
                                                    <CLabel variant="custom-checkbox" htmlFor="inline-radio3">{t('create-user.lb-other')}</CLabel>
                                                </CFormGroup>
                                            </CCol>
                                        </CCol>
                                        <hr />
                                        <CCol className="p-0 pb-2"><h5 htmlFor="address">{t('create-user.lb-address')}</h5></CCol>
                                        <CCol className="p-0">
                                            <CFormGroup row>
                                                <CCol xs="12" className="pb-3">
                                                    <CLabel htmlFor="city-province" className="form-control-label">{t('create-user.lb-city')}</CLabel>
                                                    <CSelect custom name="select" id="select">
                                                        <option value="0">select..</option>
                                                        <option value="1">Option #1</option>
                                                        <option value="2">Option #2</option>
                                                        <option value="3">Option #3</option>
                                                    </CSelect>
                                                </CCol>
                                                <CCol>
                                                    <CLabel htmlFor="district" className="form-control-label">{t('create-user.lb-district')}</CLabel>
                                                    <CSelect custom name="select" id="select">
                                                        <option value="0">select..</option>
                                                        <option value="1">Option #1</option>
                                                        <option value="2">Option #2</option>
                                                        <option value="3">Option #3</option>
                                                    </CSelect>
                                                </CCol>
                                                <CCol>
                                                    <CLabel htmlFor="ward" className="form-control-label">{t('create-user.lb-ward')}</CLabel>
                                                    <CSelect custom name="select" id="select">
                                                        <option value="0">select..</option>
                                                        <option value="1">Option #1</option>
                                                        <option value="2">Option #2</option>
                                                        <option value="3">Option #3</option>
                                                    </CSelect>
                                                </CCol>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol className="p-0">
                                            <CFormGroup>
                                                <CLabel htmlFor="street" className="form-control-label">{t('create-user.lb-street')}</CLabel>
                                                <CInput id="name" placeholder="" required />
                                            </CFormGroup>
                                        </CCol>
                                    </CCol>
                                </CCol>
                                {/* Role */}
                                <CCol col="6" lg="6">
                                    <CCol className="mb-3 p-0 ">
                                        <CCol className="p-0 pb-0">
                                            <FontAwesomeIcon icon={faUsers} style={{ height: 16, width: 16 }} className="mr-2" />
                                            <CLabel htmlFor="name" className="form-control-label mb-0">
                                                <h5 htmlFor="role">{t('create-user.tt-role')}</h5>
                                            </CLabel>
                                        </CCol>
                                        <small className="text-discription">{t('create-user.subtt-role')}</small>
                                    </CCol>
                                    <CCol className="pb-3 p-0">
                                        <CFormGroup variant="custom-radio" inline>
                                            <CInputRadio custom id="inline-radio4" name="inline-radios" checked={role == 'Admin' ? true : false} onChange={() => { setRole("Admin") }} />
                                            <CLabel variant="custom-checkbox" htmlFor="inline-radio4" className="form-control-label">{t('create-user.lb-admin')}</CLabel>
                                        </CFormGroup>{' '}
                                        <CFormGroup variant="custom-radio" inline>
                                            <CInputRadio custom id="inline-radio5" name="inline-radios" checked={role == 'Moderator' ? true : false} onChange={() => { setRole("Moderator") }} />
                                            <CLabel variant="custom-checkbox" htmlFor="inline-radio5" className="form-control-label">{t('create-user.lb-moderator')}</CLabel>
                                        </CFormGroup>
                                    </CCol>
                                    <CRow className="d-flex flex-column">
                                        <CCol className="mb-2"><span className="text-discription" htmlFor="title-authority-option">{t('create-user.tt-table')}</span></CCol>
                                        <CCol>
                                            <CCol className="tb-explan p-0">
                                                <table className="table table-hover table-outline mb-0">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th className="text-center" htmlFor="">{t('create-user.th-classification')}</th>
                                                            <th className="text-center" htmlFor="message">{t('create-user.th-message')}</th>
                                                            <th className="text-center" htmlFor="template">{t('create-user.th-template')}</th>
                                                            <th className="text-center" htmlFor="user">{t('create-user.th-user')}</th>
                                                            <th className="text-center" htmlFor="customer">{t('create-user.th-customer')}</th>
                                                            <th className="text-center" htmlFor="segment">{t('create-user.th-segment')}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="text-left">
                                                                <span><FontAwesomeIcon icon={faEye} style={{ height: 12, width: 12 }} className="mr-2" /><strong>{t('create-user.td-read')}</strong></span>
                                                            </td>
                                                            <td className="text-center">
                                                                <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                            </td>
                                                            <td className="text-center">
                                                                <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                            </td>
                                                            <td className="text-center">
                                                                <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                            </td>
                                                            <td className="text-center">
                                                                <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                            </td>
                                                            <td className="text-center">
                                                                <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-left">
                                                                <span><FontAwesomeIcon icon={faPen} style={{ height: 10, width: 10 }} className="mr-2" /><strong>{t('create-user.td-change')}</strong></span>
                                                            </td>
                                                            <td className="text-center">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                            <td className="text-center">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                            <td className="text-center">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                            <td className="text-center">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                            <td className="text-center">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-left">
                                                                <span><FontAwesomeIcon icon={faFileSignature} style={{ height: 12, width: 12 }} className="mr-2" /><strong>{t('create-user.td-create')}</strong></span>
                                                            </td>
                                                            <td className="text-center">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                            <td className="text-center">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                            <td className="text-center">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                            <td className="text-center">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                            <td className="text-center">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </CCol>
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                            <CCardFooter className="p-0">
                                <CCol className="p-0 pt-3 d-flex flex-row-reverse bd-highlight">
                                    <CButton color="primary" className="ml-3" name="submit">{t('create-user.btn-submit')}</CButton>
                                    <CButton variant="outline" color="dark" name="cancel">{t('create-user.btn-cancel')}</CButton>
                                </CCol>
                            </CCardFooter>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

        </>
    )
}

export default CreateUser
