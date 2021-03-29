import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { SIDEBAR_SHOW } from './../actions/types'

// sidebar nav config
import navigation from './_nav'
import navAdmin from './_navAdmin'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.auth.sidebarShow);
  const role = useSelector(state => state.auth.role);
  let menuItems = role === 'admin' ? navAdmin : navigation;
  console.log(menuItems);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: SIDEBAR_SHOW, payload: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={menuItems}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
