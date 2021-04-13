import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CLink,
  CLabel,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { logout } from 'src/actions/auth'
import { useHistory } from 'react-router-dom';

const TheHeaderDropdown = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

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
      <CDropdownToggle className="c-header-nav-link drop-down" caret={false}>
        <div className="pr-2">
          <span className="text-muted">Hi: <strong>Admin</strong></span>
        </div>
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-2 mt-2" placement="bottom-end">
        <CDropdownItem>
          <CLink to="/users/:id"><CIcon name="cil-user" className="mfe-2" />{t('user-topmenu.item-profile-info')}</CLink>
        </CDropdownItem>
        <CDropdownItem onClick={() => pageNavigate("user-settings")}>
          <CIcon name="cil-settings" className="mfe-2" />
          {t('user-topmenu.item-setting')}
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={userLogout}>
          <Icon.BoxArrowRight className="mfe-2" />
          {t('user-topmenu.item-logout')}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
