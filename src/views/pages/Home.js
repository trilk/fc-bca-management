import React, { useState, useEffect } from 'react'
import {
    CToaster,
    CToast,
    CToastBody,
    CToastHeader,
    CCol,
    CRow,
    CLink,
    CModal, CProgress, CProgressBar, CCard, CCardBody, CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { TeamGroup, MatchGroup } from 'src/reusable/index'
import ModalMatchInfo from 'src/reusable/ModalMatchInfo'
import * as fbDb from 'src/services/index'
import { isEmpty, find, maxBy } from 'lodash'
import { useMediaQuery } from 'react-responsive'
import { CATEGORY, GROUP, MODAL_RESPONSE_TYPE, TYPE } from 'src/utils/_constants'
import { setEventProgress } from 'src/utils/_common'
import { EVENT_TEAMS, SET_LOGO, SET_STAR } from 'src/actions/types'
import EventSummary from '../events/EventSummary'

const Home = () => {
    const largeScreen = useMediaQuery({
        query: '(min-device-width: 600px)'
    });
    const dispatch = useDispatch()
    const sysUser = useSelector(state => state.auth.user);

    useEffect(() => {
        fbDb.ExpenseService.getExpenses('vq2022', 'GRP02', CATEGORY.ALL, TYPE.SHARE).then((response) => {
            console.log(response)
        });
    }, [sysUser]);

    return (
        <>
            <CRow >
                <CCol>
                    This is Landing page!                    
                </CCol>
            </CRow>
            <CRow className={'mt-2'}>
            </CRow>

        </>
    )
}

export default Home
