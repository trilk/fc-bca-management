import React, { useState, useEffect } from 'react'
import {
    CFormGroup, CLabel, CSelect,
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
    const eventGroups = useSelector(state => state.auth.groups);
    const expenseTypes = useSelector(state => state.auth.exTypes);
    const [expenseFilter, setExpenseFilter] = useState({group: '', category: ''});
    const [expenses, setExpenses] = useState({data: [], totalFee: 0});
 

    const searchExpenses =  async () => {
        fbDb.ExpenseService.getExpenses('vq2022', expenseFilter.group, expenseFilter.category, TYPE.ALL).then((response) => {
            setExpenses(response);
        });
    }

    const onSelectChanged = (e) => {
        setExpenseFilter({...expenseFilter, [e.target.name]: e.target.value})        
    }

    useEffect(() => {
        if(sysUser !== null) {
            console.log('Filter changed');

            searchExpenses(GROUP.ALL, CATEGORY.ALL)
        }
    }, [sysUser, expenseFilter]);

    return (
        <>
            <CRow >
                <CCol>
                    This is Landing page!                    
                </CCol>
            </CRow>
            <CRow>
            <CCol md="6" xs="9">
                  <CFormGroup>
                    <CLabel htmlFor="group">Gia đình</CLabel>
                    <CSelect custom name="group" id="group" onChange={onSelectChanged}>
                        <option value="">Tất cả</option>
                        {
                            eventGroups.map((grp) => 
                                <option key={grp.id} value={grp.id}>{grp.name}</option>
                            )
                        }                      
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol md="6" xs="3">
                  <div>
                    <CLabel htmlFor="category">Loại</CLabel>
                    <CSelect custom name="category" id="category" onChange={onSelectChanged}>
                        <option value="">Tất cả</option>
                        {
                            expenseTypes.map((type) => 
                                <option key={type.id} value={type.id}>{type.name}</option>
                            )
                        }  
                    </CSelect>
                  </div>
                </CCol>
            </CRow>
            
            <CRow className={'mt-2'}>
            </CRow>

        </>
    )
}

export default Home
