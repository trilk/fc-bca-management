import React, { useState, useEffect } from 'react'
import {
    CFormGroup, CLabel, CSelect, CCol,
    CRow} from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import * as fbDb from 'src/services/index'
import { useMediaQuery } from 'react-responsive'
import ExpenseManagement from '../expense/ExpenseManagement'

const Home = () => {    
    const largeScreen = useMediaQuery({
        query: '(min-device-width: 600px)'
    });
    const dispatch = useDispatch()
    const sysUser = useSelector(state => state.auth.user);
    const eventGroups = useSelector(state => state.auth.groups);
    const expenseTypes = useSelector(state => state.auth.exTypes);
    const [expenseFilter, setExpenseFilter] = useState({group: '', category: ''});
    const [expenseData, setExpenseData] = useState(null);
 
    const searchExpenses =  async () => {
        fbDb.ExpenseService.getExpenses('vq2022', expenseFilter.group, eventGroups, expenseFilter.category).then((response) => {
          setExpenseData(response);
        });
    }

    const onSelectChanged = (e) => {
        setExpenseFilter({...expenseFilter, [e.target.name]: e.target.value})        
    }    

    useEffect(() => {
        if(sysUser !== null && expenseFilter !== null) {
            console.log('Filter changed');

            searchExpenses()
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
                {expenseData !== null && 
                  <ExpenseManagement expenseData={expenseData} />
                }
            </CRow>

        </>
    )
}

export default Home
