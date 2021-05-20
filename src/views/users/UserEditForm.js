import './createUser.scss'
import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faPen, faFileSignature, faEye, faBan, faCheck, faUserShield, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Multiselect } from 'multiselect-react-dropdown';
import {
    CButton,
    CCardHeader,
    CCol,
    CLabel,
    CCard,
    CCardBody,
    CInputRadio,
    CSwitch,
    CInvalidFeedback,
    CInput,
    CFormGroup,
    CSelect,
    CRow,
    CForm,
    CModal,
    CModalBody,
    CModalFooter, CModalHeader, CModalTitle, CSpinner
} from '@coreui/react'

import UserService from './../../services/user.service'
import { MESSAGES, SELECT_STYLES } from './../../utils/_constants'

const UserEditForm = (props) => {
    // console.log(props.userInfo);

    const channels = useSelector(state => state.auth.user.channels);
    const history = useHistory();
    const channelsRef = useRef();
    const { t, i18n } = useTranslation()
    const [iconRole, setIconRole] = useState({ icon: faBan, color: '#ced4da' })
    const [userInfo, setUserInfo] = useState({});
    const [deleteAlert, setDeleteConfirm] = useState(false)
    const isNewUser = props.isNewUser;

    const onChange = e => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

        if (e.target.name === 'role') {
            if (e.target.value === 'admin') {
                setIconRole({ icon: faCheck, color: '#28a745' })
            } else {
                setIconRole({ icon: faBan, color: '#ced4da' })
            }
        }
    }
    const onCancel = () => {
        history.goBack();
    }

    const onDelete = (confirmed) => {
        setDeleteConfirm(false);
        if (confirmed) {
            UserService.deleteUser(userInfo._id, userInfo.username).then(
                () => {
                    history.push('/users')
                    return Promise.resolve();
                },
                (error) => {
                    let message = (error.response && error.response.data && error.response.data.message) || MESSAGES.UNKNOW_ERROR;

                    message = message === MESSAGES.UNKNOW_ERROR ? 'common.' + message : 'user-form.' + message;
                    console.log(message);

                    return Promise.reject();
                }
            );
        }
    }

    const onSubmit = e => {
        e.preventDefault();

        const newChannels = channelsRef.current.getSelectedItems();
        const updatedUser = {
            ...userInfo,
            channels: newChannels.map((ch) => ch._id),
            roles: [userInfo.role],
            address: {
                street: userInfo.street,
                province: userInfo.province,
                country: userInfo.country
            }
        };

        UserService.saveUser(updatedUser, isNewUser).then(
            (response) => {
                history.push('/users/' + response.data._id)
                return Promise.resolve();
            },
            (error) => {
                let message = (error.response && error.response.data && error.response.data.message) || MESSAGES.UNKNOW_ERROR;

                message = message === MESSAGES.UNKNOW_ERROR ? 'common.' + message : 'user-form.' + message;
                console.log(message);
                // dispatch({
                //     type: SET_MESSAGE,
                //     payload: message,
                // });

                return Promise.reject();
            }
        );

    }

    useEffect(() => {
        if (props.userInfo) {
            setUserInfo(props.userInfo)

            if (props.userInfo.role === 'admin') {
                setIconRole({ icon: faCheck, color: '#28a745' })
            } else {
                setIconRole({ icon: faBan, color: '#ced4da' })
            }
        }
    }, [props.userInfo])

    return (
        <>
            <CForm onSubmit={onSubmit}>
                <CRow>
                    <CCol xs="12" sm="6" className="pr-2">
                        <CCard>
                            <CCardHeader>
                                <h4><FontAwesomeIcon icon={faAddressCard} className="mr-2" /><span>{t('user-edit-form.title-header1')}</span></h4>
                            </CCardHeader>
                            <CCardBody>
                                <CFormGroup row>
                                    <CCol md="6">
                                        <CLabel htmlFor="username">{t('user-edit-form.lb-username')}</CLabel>
                                        <CInput disabled={!isNewUser} type="text" name="username" value={userInfo.username || ''} onChange={value => onChange(value)} placeholder={t('user-edit-form.ph-username')} />
                                        <CInvalidFeedback>We have a problem...</CInvalidFeedback>
                                    </CCol>
                                    <CCol md="6">
                                        <CLabel htmlFor="email">{t('user-edit-form.lb-email')}</CLabel>
                                        <CInput name="email" value={userInfo.email || ''} onChange={value => onChange(value)} placeholder="" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="6">
                                        <CLabel htmlFor="firstName">{t('user-edit-form.lb-first-name')}</CLabel>
                                        <CInput name="firstName" value={userInfo.firstName || ''} onChange={value => onChange(value)} placeholder="" />
                                        <CInvalidFeedback>We have a problem...</CInvalidFeedback>
                                    </CCol>
                                    <CCol md="6">
                                        <CLabel htmlFor="lastName">{t('user-edit-form.lb-last-name')}</CLabel>
                                        <CInput name="lastName" value={userInfo.lastName || ''} onChange={value => onChange(value)} placeholder="" />
                                    </CCol>
                                </CFormGroup>

                                <CFormGroup row>
                                    <CCol md="6">
                                        <CLabel htmlFor="dob">{t('user-edit-form.lb-dob')}</CLabel>
                                        <CInput type="date" name="dob" value={userInfo.dob || ''} onChange={value => onChange(value)} />
                                        <CInvalidFeedback>Houston, we have a problem...</CInvalidFeedback>
                                    </CCol>
                                    <CCol md="6">
                                        <CLabel htmlFor="gender">{t('user-edit-form.lb-gender')}</CLabel>
                                        <CSelect custom name="gender" value={userInfo.gender || ''} onChange={value => onChange(value)}>
                                            <option value="">{t('user-edit-form.select-default-item')}</option>
                                            <option value="male">{t('gender.male')}</option>
                                            <option value="female">{t('gender.female')}</option>
                                            <option value="other">{t('gender.other')}</option>
                                        </CSelect>
                                    </CCol>
                                </CFormGroup>
                                <hr className="my-1" />
                                <CFormGroup row>
                                    <CCol>
                                        <CLabel htmlFor="street">{t('user-edit-form.lb-address')}</CLabel>
                                        <CInput name="street" value={userInfo.street || ''} onChange={value => onChange(value)} placeholder={t('user-edit-form.ph-address')} />
                                        <CInvalidFeedback>We have a problem...</CInvalidFeedback>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="6">
                                        <CLabel htmlFor="province">{t('user-edit-form.lb-province')}</CLabel>
                                        <CInput name="province" value={userInfo.province || ''} onChange={value => onChange(value)} placeholder="" />
                                        <CInvalidFeedback>Houston, we have a problem...</CInvalidFeedback>
                                    </CCol>
                                    <CCol md="6">
                                        <CLabel htmlFor="country">{t('user-edit-form.lb-country')}</CLabel>
                                        <CSelect custom name="country" value={userInfo.country || ''} onChange={value => onChange(value)} >
                                            <option value="VN">{t(`country.VN`)}</option>
                                        </CSelect>
                                    </CCol>
                                </CFormGroup>
                            </CCardBody>
                        </CCard>
                    </CCol>

                    <CCol xs="12" sm="6" className="pl-2">
                        <CCard>
                            <CCardHeader>
                                <h4><FontAwesomeIcon icon={faUserShield} className="mr-2" /> <span>{t('user-edit-form.title-header2')}</span></h4>
                            </CCardHeader>
                            <CCardBody>
                                <CFormGroup row>
                                    <CCol md="4">
                                        <CLabel>{t('user-edit-form.lb-role')}</CLabel>
                                    </CCol>
                                    <CCol md="8">
                                        <CFormGroup variant="custom-radio" inline className="pb-2">
                                            <CInputRadio custom id="admin-role" name="role" value="admin" checked={userInfo.role === 'admin'} onChange={value => onChange(value)} />
                                            <CLabel variant="custom-checkbox" htmlFor="admin-role" className="form-control-label">{t('role.admin')}</CLabel>
                                        </CFormGroup>
                                        <CFormGroup variant="custom-radio" inline>
                                            <CInputRadio custom id="user-role" name="role" value="user" checked={userInfo.role === 'user'} onChange={value => onChange(value)} />
                                            <CLabel variant="custom-checkbox" htmlFor="user-role" className="form-control-label">{t('role.user')}</CLabel>
                                        </CFormGroup>

                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="4">
                                        <CLabel htmlFor="channel" className="mr-2">{t('user-edit-form.lb-channels-mng')}</CLabel>
                                    </CCol>
                                    <CCol md="8">
                                        <Multiselect ref={channelsRef} disable={userInfo.role === 'admin'}
                                            options={channels}
                                            groupBy="type"
                                            displayValue="name"
                                            showCheckbox={true}
                                            selectedValues={userInfo.role === 'admin' ? [] : userInfo.channels}
                                            placeholder={userInfo.role === 'admin' ? t('user-edit-form.channell-all-items') : t('user-edit-form.select-default-item')}
                                            style={SELECT_STYLES}
                                        />
                                        {/* <CSelect custom name="channel" value={userInfo.channel || ''} onChange={value => onChange(value)} >
                                            <option value="">{t('user-edit-form.channell-all-items')}</option>
                                            {channels.map((ch) => <option value={ch._id}>{ch.name}</option>)}
                                        </CSelect> */}
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol md="4">
                                        <CLabel htmlFor="isActive">{t('user-edit-form.lb-status')}</CLabel>
                                    </CCol>
                                    <CCol md="8">
                                        <CSwitch name="isActive" className={'mx-1'} shape={'pill'} color={'primary'} size="lg" defaultChecked={userInfo.isActive || true} onChange={value => onChange(value)} />
                                    </CCol>
                                </CFormGroup>
                                <hr className="my-2" />
                                <CRow className="d-flex flex-column">
                                    <CCol md="12">
                                        <CCol className="p-0 overflow-auto">
                                            <table className="table table-outline mb-0 border">
                                                <thead className="bg-light">
                                                    <tr>
                                                        <th></th>
                                                        <th className="text-center" ><FontAwesomeIcon icon={faEye} style={{ height: 12, width: 12 }} className="mr-2" />{t('user-edit-form.td-read')}</th>
                                                        <th className="text-center" ><FontAwesomeIcon icon={faPen} style={{ height: 10, width: 10 }} className="mr-2" />{t('user-edit-form.td-create')}</th>
                                                        <th className="text-center" ><FontAwesomeIcon icon={faFileSignature} style={{ height: 12, width: 12 }} className="mr-2" />{t('user-edit-form.td-update')}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="pr-0">
                                                            <strong className="pl-3">{t('user-edit-form.th-message')}</strong>
                                                        </td>
                                                        <td className="text-center">
                                                            <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                        </td>
                                                        <td className="text-center">
                                                            <FontAwesomeIcon icon={iconRole.icon} className="icon-center" color={iconRole.color} />
                                                        </td>
                                                        <td className="text-center">
                                                            <FontAwesomeIcon icon={iconRole.icon} className="icon-center" color={iconRole.color} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="bg-light">
                                                            <strong className="pl-3">{t('user-edit-form.th-template')}</strong>
                                                        </td>
                                                        {/* read */}
                                                        <td className="text-center bg-light">
                                                            <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                        </td>
                                                        {/* Create */}
                                                        <td className="text-center bg-light">
                                                            <FontAwesomeIcon icon={iconRole.icon} className="icon-center" color={iconRole.color} />
                                                        </td>
                                                        {/* Edit */}
                                                        <td className="text-center bg-light">
                                                            <FontAwesomeIcon icon={iconRole.icon} className="icon-center" color={iconRole.color} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong className="pl-3">{t('user-edit-form.th-user')}</strong>
                                                        </td>
                                                        <td className="text-center">
                                                            <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                        </td>
                                                        <td className="text-center">
                                                            <FontAwesomeIcon icon={iconRole.icon} className="icon-center" color={iconRole.color} />
                                                        </td>
                                                        <td className="text-center">
                                                            <FontAwesomeIcon icon={iconRole.icon} className="icon-center" color={iconRole.color} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="bg-light">
                                                            <strong className="pl-3">{t('user-edit-form.th-channel')}</strong>
                                                        </td>
                                                        {/* read */}
                                                        <td className="text-center bg-light">
                                                            <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                        </td>
                                                        {/* create */}
                                                        <td className="text-center bg-light">
                                                            <FontAwesomeIcon icon={iconRole.icon} className="icon-center" color={iconRole.color} />
                                                        </td>
                                                        {/* Edit */}
                                                        <td className="text-center bg-light">
                                                            <FontAwesomeIcon icon={iconRole.icon} className="icon-center" color={iconRole.color} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <strong className="pl-3">{t('user-edit-form.th-user')}</strong>
                                                        </td>
                                                        <td className="text-center">
                                                            <FontAwesomeIcon icon={faCheck} className="icon-center icon-color-enable" />
                                                        </td>
                                                        <td className="text-center">
                                                            <FontAwesomeIcon icon={iconRole.icon} className="icon-center" color={iconRole.color} />
                                                        </td>
                                                        <td className="text-center">
                                                            <FontAwesomeIcon icon={iconRole.icon} className="icon-center" color={iconRole.color} />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </CCol>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                <CCol className="p-0 pt-3 d-flex flex-row-reverse bd-highlight">
                                    <CButton color="primary" className="ml-2" type="submit"><FontAwesomeIcon icon={faSave} className="mr-2" />{t('user-edit-form.btn-save')}</CButton>
                                    {!isNewUser && <CButton color="danger" className="ml-2" name="delete" onClick={() => setDeleteConfirm(true)}><FontAwesomeIcon icon={faTrash} className="mr-2" />{t('user-edit-form.btn-delete')}</CButton>}
                                    <CButton color="outline-dark" className="ml-2" name="cancel" onClick={onCancel}><FontAwesomeIcon icon={faTimes} className="mr-2" />{t('user-edit-form.btn-cancel')}</CButton>
                                </CCol>
                            </CCardHeader>
                        </CCard>
                    </CCol>
                </CRow>
            </CForm>
            <CModal
                show={deleteAlert}
                onClose={() => setDeleteConfirm(false)}
                color="danger"
            >
                <CModalHeader closeButton>
                    <CModalTitle>Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Ban co chac xoa user nay ra khoi he thong ko?
              </CModalBody>
                <CModalFooter>
                    <CButton color="danger" onClick={() => onDelete(true)}>Confirm</CButton>{' '}
                    <CButton color="secondary" onClick={() => onDelete(false)}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default UserEditForm
