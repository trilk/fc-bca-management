import React, { useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CCol,
  CLink,
  CImg,
  CDropdownDivider,
  CRow
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { logout } from 'src/actions/auth'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'

import { setFullName } from './../utils/_common'

const TheHeaderDropdown = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const lang = useSelector(state => state.auth.lang);
  const fullName = setFullName(user.firstName, user.lastName, lang);

  const userLogout = () => {
    dispatch(logout());
    history.replace('/login');
  }

  const pageNavigate = (page) => {
    history.push('/' + page);
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-2 mt-2" placement="bottom-end">
        <CDropdownItem href="#/profile">
          <CRow>
            <CCol className="d-flex flex-row p-0 pr-5 py-2">
              <div className="c-avatar-dropdown mr-3">
                <CImg
                  src={'avatars/6.jpg'}
                  className="c-avatar-bg"
                />
              </div>
              <div className="d-flex flex-column bd-highlight">
                <span style={{ fontSize: 16 }}>
                  <strong>{fullName}</strong>
                  {/* <CBadge color="primary" className="small ml-2">{user.role}</CBadge> */}
                </span>
                <span className="light-color">{user.username}</span>
              </div>
            </CCol>
          </CRow>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem className="pl-0 py-2" href="#/profile">
          <div className="d-flex py-1">
            <div className="mr-3 ml-3">
              <FontAwesomeIcon icon={faUser} size='lg' />
            </div>
            <div>
              <span className="d-flex justify-content-start">{t('user-topmenu.item-profile-info')}</span>
            </div>
          </div>
        </CDropdownItem>
        <CDropdownItem className="pl-0 py-2" onClick={() => pageNavigate("user-settings")}>
          <div className="d-flex py-1">
            <div className="mr-3 ml-3">
              <FontAwesomeIcon icon={faCog} size='lg' />
            </div>
            <div>
              <span className="d-flex justify-content-start">{t('user-topmenu.item-setting')}</span>
            </div>
          </div>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem className="pl-0 py-2" onClick={userLogout}>
          <div className="d-flex py-1">
            <div className="mr-3 ml-3">
              <FontAwesomeIcon icon={faSignOutAlt} size='lg' />
            </div>
            <div>
              <span>{t('user-topmenu.item-logout')}</span>
            </div>
          </div>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
