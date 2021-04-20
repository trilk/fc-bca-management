import React, { useState, useEffect } from 'react'
import './createUser.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faPen, faFileSignature, faUsers, faEye, faBan, faCheck, faUserShield } from '@fortawesome/free-solid-svg-icons'
import {
    CButton,
    CCardHeader,
    CCol,
    CLabel,
    CCard,
    CCardBody,
    CInputCheckbox,
    CInputRadio,
    CTooltip,
    CInput,
    CFormGroup,
    CSelect,
    CRow,
    CCardFooter,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
const EditUser = () => {

    //role admin or moderator
    const [role, setRole] = useState("Admin");
    const { t, i18n } = useTranslation()

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardHeader>
                            <span style={{ fontSize: 18, fontWeight: 700 }}>Edit User</span>
                        </CCardHeader>
                        <CCardBody>
                            <CRow className="p-lg-3 px-lg-4">
                                {/* Left content */}
                                <CCol lg="6" className=" pr-lg-4">
                                    {/* Name */}
                                    <CCol className="pb-2 p-0 d-flex flex-lg-row flex-md-row flex-sm-row flex-column">
                                        <CCol className="p-0 pr-lg-4 pr-md-3 pr-sm-3">
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
                                    <CCol className="pb-1 p-0 d-flex flex-lg-row flex-md-row flex-sm-row flex-column">
                                        <CCol className="p-0 pr-lg-4 pr-md-3 pr-sm-3">
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
                                    <CCol className="py-2 pb-3 p-0 d-flex flex-lg-row  flex-md-row flex-sm-row flex-column">
                                        <CCol col="6" className="d-flex flex-column p-0 pr-lg-4 pr-md-3 pr-sm-3">
                                            <CCol className="p-0">
                                                <span style={{ fontWeight: 600, fontSize: 14 }}>District</span></CCol>
                                            <CCol className="p-0 py-2">
                                                <CSelect custom name="select" id="select">
                                                    <option value="0">select..</option>
                                                    <option value="1">Vietnam</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </CSelect>
                                                <small className="text-muted"><strong>Select</strong> the District</small>
                                            </CCol>
                                        </CCol>
                                        <CCol col="6" className="d-flex flex-column p-0">
                                            <CCol className="p-0">
                                                <span style={{ fontWeight: 600, fontSize: 14 }}>Ward</span></CCol>
                                            <CCol className="p-0 py-2">
                                                <CSelect custom name="select" id="select">
                                                    <option value="0">select..</option>
                                                    <option value="1">Vietnam</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </CSelect>
                                                <small className="text-muted"><strong>Select</strong> the Ward</small>
                                            </CCol>
                                        </CCol>
                                    </CCol>
                                    {/* street */}
                                </CCol>
                                {/* Role */}
                                <CCol col="6" lg="6">
                                    <CCol className="mb-3 p-0 ">
                                        <CCol className="p-0 pb-0">
                                            <FontAwesomeIcon icon={faUsers} style={{ height: 16, width: 16 }} className="mr-2" />
                                            <CLabel htmlFor="name" className="mb-0">
                                                <h5><strong>Role</strong></h5>
                                            </CLabel>
                                        </CCol>
                                        <small className="text-discription">{t('create-user.subtt-role')}</small>
                                    </CCol>
                                    <CCol className="pb-3 p-0">
                                        <CFormGroup variant="custom-radio" inline className="pb-2">
                                            <CInputRadio custom id="inline-radio4" name="inline-radios" checked={role == 'Admin' ? true : false} onChange={() => { setRole("Admin") }} />
                                            <CLabel variant="custom-checkbox" htmlFor="inline-radio4" className="form-control-label">{t('create-user.lb-admin')}</CLabel>
                                        </CFormGroup>{' '}
                                        <CFormGroup variant="custom-radio" inline>
                                            <CInputRadio custom id="inline-radio5" name="inline-radios" checked={role == 'Moderator' ? true : false} onChange={() => { setRole("Moderator") }} />
                                            <CLabel variant="custom-checkbox" htmlFor="inline-radio5" className="form-control-label">{t('create-user.lb-moderator')}</CLabel>
                                        </CFormGroup>
                                    </CCol>
                                    <CRow className="d-flex flex-column">
                                        <CCol>
                                            <CCol className="p-0 overflow-auto">
                                                <table className="table table-outline mb-0 border">
                                                    <thead className="bg-light">
                                                        <tr>
                                                            <th className="text-center" htmlFor=""></th>
                                                            <th className="text-center" htmlFor=""><FontAwesomeIcon icon={faEye} style={{ height: 12, width: 12 }} className="mr-2" />Read</th>
                                                            <th className="text-center" htmlFor="message"><FontAwesomeIcon icon={faPen} style={{ height: 10, width: 10 }} className="mr-2" />Create</th>
                                                            <th className="text-center" htmlFor="template"><FontAwesomeIcon icon={faFileSignature} style={{ height: 12, width: 12 }} className="mr-2" />Edit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <strong>Messages</strong>
                                                            </td>
                                                            <td className="text-center">
                                                                <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
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
                                                            <td className="bg-light">
                                                                <strong>Template</strong>
                                                            </td>
                                                            {/* read */}
                                                            <td className="text-center bg-light">
                                                                <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                            </td>
                                                            {/* Create */}
                                                            <td className="text-center bg-light">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                            {/* Edit */}
                                                            <td className="text-center bg-light">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Users</strong>
                                                            </td>
                                                            <td className="text-center">
                                                                <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
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
                                                            <td className="bg-light">
                                                                <strong>Segments</strong>
                                                            </td>
                                                            {/* read */}
                                                            <td className="text-center bg-light">
                                                                <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                            </td>
                                                            {/* create */}
                                                            <td className="text-center bg-light">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                            {/* Edit */}
                                                            <td className="text-center bg-light">
                                                                {role == 'Admin' && <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />}
                                                                {role == 'Moderator' && <FontAwesomeIcon icon={faBan} className="icon-center icon-color-disable" />}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <strong>Contacts</strong>
                                                            </td>
                                                            <td className="text-center">
                                                                <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
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
                                    <CButton color="outline" name="cancel">{t('create-user.btn-cancel')}</CButton>
                                </CCol>
                            </CCardFooter>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default EditUser
