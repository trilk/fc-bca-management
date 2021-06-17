import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CRow,
  CCol
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  MainHeaderUser, MainHeaderUserActions
} from './index'
import { ModalTeamSelection, ModalAdminTask } from 'src/reusable/index'

const MainHeader = () => {
  // const sidebarShow = useSelector(state => state.auth.sidebarShow)
  const sysUser = useSelector(state => state.auth.user);
  const logo = useSelector(state => state.auth.logo);
  const [logoName, setLogoName] = useState(logo.icon)

  useEffect(() => {
    console.log(logo)
    if (logo.icon === '') {
      setLogoName(logo.img)
    } else {
      setLogoName(logo.icon)
    }
  }, [logo])
  return (
    <CHeader withSubheader>
      <div className="container">
        <CRow>
          <CCol className="col-auto pr-0">
            <CHeaderBrand className="position-relative pt-1" to="/">
              <CIcon className={`header-logo ${logo.img !== '' ? 'c-avatar-img' : ''}`} name={logo.icon} src={logo.img} height="96" />
            </CHeaderBrand>
          </CCol>
          <CCol>
            <CHeaderNav className="d-flex flex-row-reverse">
              <MainHeaderUser />
              {sysUser && !sysUser.isAnonymous && <MainHeaderUserActions />}
            </CHeaderNav>
            <CSubheader className="">
              <CRow className="w-100 d-flex justify-content-center">
                <div className="event-title">ĐI TÌM THÁNH DỰ</div>
              </CRow>
            </CSubheader>
          </CCol>

        </CRow>
        {sysUser && !sysUser.isAnonymous && <ModalTeamSelection />}
        {sysUser && sysUser.isAdmin && <ModalAdminTask />}
      </div>
    </CHeader>
  )
}

export default MainHeader
