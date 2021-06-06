
import React from 'react'
import CIcon from '@coreui/icons-react'
import { CCol, CButton, CRow } from '@coreui/react'
import { useHistory } from 'react-router-dom'

const Error404 = props => {
    const history = useHistory();

    return (
        <CRow className="justify-content-center text-align-center">
            <CCol col="6" md="4">
                <div className="clearfix">
                    <CIcon name="cil-sad" size={'3xl'} />
                    <h2 className="pt-3">404! You{'\''}re lost.</h2>
                    <p className="text-muted">The {props.page} you are looking for was not found.</p>
                </div>
                <CButton color="info" onClick={() => history.push(`/${props.backUrl}`)}>Go Back</CButton>

            </CCol>
        </CRow>
    )
}

export default React.memo(Error404)

