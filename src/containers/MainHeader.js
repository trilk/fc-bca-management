import React, { } from 'react'
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
import ModalTeamSelection from 'src/reusable/ModalTeamSelection'

const MainHeader = () => {
  // const sidebarShow = useSelector(state => state.auth.sidebarShow)
  const sysUser = useSelector(state => state.auth.user);
  const logo = useSelector(state => state.auth.logo);

  return (
    <CHeader withSubheader>
      <div className="container">
        <CRow>
          <CCol className="col-auto pr-0">
            <CHeaderBrand className="position-relative pt-1" to="/">
              {logo.icon !== '' && <CIcon className="header-logo" name={logo.icon} height="95" />}
            </CHeaderBrand>
          </CCol>
          <CCol>
            <CHeaderNav className="d-flex flex-row-reverse">
              <MainHeaderUser />
              {sysUser && !sysUser.isAnonymous && <MainHeaderUserActions />}
            </CHeaderNav>
            <CSubheader className="">

            </CSubheader>
          </CCol>

        </CRow>
        {sysUser && !sysUser.isAnonymous && <ModalTeamSelection />}
      </div>
    </CHeader>
  )
}

export default MainHeader
