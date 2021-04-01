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
import { useTranslation } from 'react-i18next';

const TheHeaderDropdown = () => {
  const { t, i18n } = useTranslation();
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
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-2" placement="bottom-end">
        <CDropdownItem>
          <CLink to="/users/:id"><CIcon name="cil-user" className="mfe-2" />{t('user-topmenu.item-profile-info')}</CLink>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          {t('user-topmenu.item-setting')}
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem>
          <Icon.BoxArrowRight className="mfe-2" />
          {t('user-topmenu.item-logout')}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
