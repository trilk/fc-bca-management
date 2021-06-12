import React, { } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Register = () => {
  // const user = useSelector(state => state.auth.user);
  // const [acceptedUser, setUser] = useState(firebase.auth.currentUser);

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <CRow>
                    <CCol>
                      <h1>Đăng ký</h1>
                    </CCol>
                    <CCol className="pt-2">
                      <CButton className="btn-facebook mb-1" block><span>Facebook</span></CButton>
                    </CCol>
                  </CRow>
                  <hr></hr>
                  <p className="text-muted mt-5 text-center">Nhập thông tin tài khoản mới.</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Tên" autoComplete="" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" name="username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Mật khẩu" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Nhập lại mật khẩu" autoComplete="new-password" />
                  </CInputGroup>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow className="justify-content-center">
                  <CCol xs="12" sm="6" className="text-center">
                    <CButton color="success" block>Tạo mới</CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
