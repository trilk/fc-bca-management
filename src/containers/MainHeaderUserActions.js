import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownDivider
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { showTeamSelection, showAdminModal } from '../actions/event'

import ModalTeamSelection from 'src/reusable/ModalTeamSelection'


const MainHeaderUserActions = () => {
  const dispatch = useDispatch()
  // const sidebarShow = useSelector(state => state.auth.sidebarShow)
  const sysUser = useSelector(state => state.auth.user);
  const event = useSelector(state => state.auth.event)
  const [display, setDisplay] = useState(0)

  const onOpenModal = () => {
    dispatch(showTeamSelection(true))
  }

  const onOpenAdminModal = () => {
    dispatch(showAdminModal(true))
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-menu" size="xl" />
        {/* <CBadge shape="pill" color="danger">{2}</CBadge> */}
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>Chọn đại gì đi</strong>
        </CDropdownItem>
        {!sysUser.isAdmin &&
          <>
            <CDropdownItem onClick={onOpenModal}><CIcon name="cil-star" className="mr-2 text-success" /> Bói nhà vô địch</CDropdownItem>
            <CDropdownItem to={`/event-user/${sysUser.id}`}><CIcon name="cil-user" className="mr-2 text-danger" /> Dự đoán của tao</CDropdownItem>
          </>}
        {sysUser.isAdmin &&
          <CDropdownItem onClick={onOpenAdminModal} ><CIcon name="cil-star" className="mr-2 text-success" /> Quản lý dữ liệu</CDropdownItem>
        }
        <CDropdownDivider />
        <CDropdownItem to={`/events/today`}><CIcon name="cil-zoom-in" className="mr-2 text-info" /> Soi kèo hôm nay</CDropdownItem>
        <CDropdownItem to={`/events/${event.id}`}><CIcon name="cil-sort-numeric-down" className="mr-2 text-primary" /> Bảng xếp hạng</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default MainHeaderUserActions