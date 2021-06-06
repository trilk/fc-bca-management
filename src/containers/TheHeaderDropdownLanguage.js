import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CHANGE_LANGUAGE } from "./../actions/types";

import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const TheHeaderDropDownLanguage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector(state => state.auth.lang);
  const iconName = language === 'en' ? "flag-en" : "flag-vi";

  const onLanguageChanged = (lang) => {
    i18n.changeLanguage(lang);
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: lang
    });
  };

  return (
    <CDropdown inNav className="c-header-nav-item mx-2"
      direction="down">
      <CTooltip
        content={t('top-menu.tooltip-lang')}
        placement="bottom">
        <CDropdownToggle caret={false} className="c-header-nav-link">
          <CIcon name={iconName} size="2xl" />
        </CDropdownToggle>
      </CTooltip>
      <CDropdownMenu className="pt-0 pb-0" placement="bottom-end">
        <CDropdownItem onClick={() => onLanguageChanged("en")}>
          <CIcon name="flag-en" size="xl" className="mr-2" /> English
        </CDropdownItem>
        <CDropdownItem onClick={() => onLanguageChanged("vi")}>
          <CIcon name="flag-vi" size="xl" className="mr-2" /> Tiếng Việt
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>



  )
}

export default TheHeaderDropDownLanguage