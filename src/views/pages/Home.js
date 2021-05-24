import React, { useState, useEffect } from 'react'
import {
    CButton,
    CCol,
    CContainer,
    CInput,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'

const Home = () => {
    console.log('Home page')
    const authed = useSelector(state => state.auth.isAuthenticated);
    const [isSignedIn, setSignedIn] = useState(authed);

    useEffect(() => {
        setSignedIn(authed)
    }, [authed]);

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="6">
                        <span className="clearfix">
                            <h1 className="float-left display-3 mr-4">500</h1>
                            <h4 className="pt-3">Houston, we have a problem!</h4>
                            <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
                        </span>
                        <CInputGroup className="input-prepend">
                            <CInputGroupPrepend>
                                <CInputGroupText>
                                    <CIcon name="cil-magnifying-glass" />
                                </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput size="16" type="text" placeholder="What are you looking for?" />
                            <CInputGroupAppend>
                                {isSignedIn ? <CButton color="info">Dashboard</CButton> : <CButton color="info">Login</CButton>}
                            </CInputGroupAppend>
                        </CInputGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Home
