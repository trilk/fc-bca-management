
import './team-selection.scss'
import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
    CModalHeader, CModal, CModalBody, CModalFooter, CButton, CRow, CCol, CFormGroup, CLabel, CSelect, CInputRadio, CAlert
} from '@coreui/react'
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { showAdminModal, calculateUserPointByRound, startRound } from 'src/actions/event'

const ModalAdminTask = props => {
    const dispatch = useDispatch()
    const sysUser = useSelector(state => state.auth.user);
    const event = useSelector(state => state.auth.event);
    const adminModal = useSelector(state => state.event.showAdminModal);
    const [show, setShowModal] = useState(false)
    const [selectedRound, setSelectedRound] = useState(0)
    const [feature, setFeature] = useState(0)

    const onSelectRound = (e) => {
        setSelectedRound(e.target.value)
    }
    const onSubmit = (confirmed) => {
        if (confirmed) {
            if (feature === 1) {
                dispatch(calculateUserPointByRound(event.id, parseInt(selectedRound)))
            }
            if (feature === 2) {
                dispatch(startRound(event.id, parseInt(selectedRound)))
            }
        } else {
            dispatch(showAdminModal(false))
        }
    }

    useEffect(() => {
        setShowModal(adminModal)
    }, [adminModal])

    return (
        <CModal className=""
            show={show}
            onClose={() => onSubmit(false)}
            color="info" className="ts-modal">
            <CModalHeader closeButton>
                Can nhac khi thuc hien
            </CModalHeader>
            <CModalBody>
                <CRow>
                    <CCol md="4">
                        <CLabel>Chọn chức năng</CLabel>
                    </CCol>
                    <CCol>
                        <CFormGroup variant="custom-radio" inline>
                            <CInputRadio custom id="inline-radio1" name="inline-radios" value="endRound" onClick={() => setFeature(1)} />
                            <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Tổng kết vòng</CLabel>
                        </CFormGroup>
                        <CFormGroup variant="custom-radio" inline>
                            <CInputRadio custom id="inline-radio2" name="inline-radios" value="startRound" onClick={() => setFeature(2)} />
                            <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Khởi động vòng mới</CLabel>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow className="my-3">
                    <CCol md="4">
                        <CLabel htmlFor="selectedRound">Chọn vòng đấu</CLabel>
                    </CCol><CCol>
                        <CSelect custom name="selectedRound" value={selectedRound} onChange={(e) => onSelectRound(e)}>
                            <option value="0"></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </CSelect>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CAlert color="danger">Xem lại và Backup database trước khi thực hiện!</CAlert>
                    </CCol>
                </CRow>
            </CModalBody>
            <CModalFooter className="d-flex justify-content-center">
                <CButton color="primary" onClick={() => onSubmit(true)} disabled={selectedRound === 0}>
                    <CIcon className="mr-2" name="cil-check" />
                    {'Thực hiện'}
                </CButton>
                <CButton color="secondary" onClick={() => onSubmit(false)}><CIcon className="mr-2" name="cil-x" />Bỏ Qua</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default React.memo(ModalAdminTask)

