import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import CreateElement from './../helpers/CreateElement'

import CIcon from '@coreui/icons-react'
import { SIDEBAR_SHOW } from './../actions/types'

// sidebar nav config
import { getNavs } from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.auth.sidebarShow);
  const isAdmin = useSelector(state => state.auth.user.isAdmin);
  const language = useSelector(state => state.auth.lang);
  const [menuItems, setMenuItems] = useState(getNavs(isAdmin));

  useEffect(() => {
    setMenuItems(getNavs(isAdmin));
  }, [language]);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: SIDEBAR_SHOW, payload: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo"
          // name="flag-tbd"
          height={42}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="logo"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CreateElement
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
