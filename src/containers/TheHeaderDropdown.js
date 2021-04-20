import React, { useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CCol,
  CButton,
  CBadge,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CLink,
  CImg,
  CInput,
  CLabel,
  CDropdownDivider,
  CPopover
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { logout } from 'src/actions/auth'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faSearch, faSortDown, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons'

const TheHeaderDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userName = useSelector(state => state.auth.user.data.name);
  const history = useHistory();

  const userLogout = () => {
    dispatch(logout());
    history.replace('/login');
  }

  const pageNavigate = (page) => {
    history.push('/' + page);
  }
  const [show, setShow] = useState(false)
  const closeModalHandler = () => setShow(false)

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
      <CDropdownMenu className="pt-2 mt-2" placement="bottom-end">
        <CCol>
          <CCol className="d-flex flex-row p-0 pr-5 py-2">
            <div className="c-avatar-dropdown mr-3">
              <CImg
                src={'avatars/6.jpg'}
                className="c-avatar-bg"
                alt="admin@bootstrapmaster.com"
              />
            </div>
            <CLink to="/profile">
              <div className="d-flex flex-column bd-highlight">
                <span style={{ fontSize: 16 }}>
                  <strong>{userName}</strong>
                  <CBadge color="primary" className="small ml-2">Admin</CBadge>
                </span>
                <span className="light-color font-weight-bold">admin@gmail.com</span>
              </div>
            </CLink>
          </CCol>
        </CCol>
        <CDropdownDivider />
        <CDropdownItem className="menu-item py-1">
          <CLink to="/profile" className=" py-1 d-flex bd-highlight align-items-center">
            <div className="icon-drop mr-3 ml-3">
              <FontAwesomeIcon icon={faUser} style={{ color: '#1bc5bd' }} />
            </div>
            <div>
              <span style={{ fontWeight: 600, }} className="d-flex justify-content-start">{t('user-topmenu.item-profile-info')}</span>
              <span style={{ fontWeight: 400, }} className="text-muted small">Account Info and more</span>
            </div>
          </CLink>
        </CDropdownItem>
        <CDropdownItem className="menu-item py-1" onClick={() => pageNavigate("user-settings")}>
          <div className="py-1 d-flex bd-highlight align-items-center pl-3">
            <div className="icon-drop mr-3 ml-0">
              <FontAwesomeIcon icon={faCog} style={{ color: '#ffa800' }} />
            </div>
            <div>
              <span style={{ fontWeight: 600, }} className="d-flex justify-content-start">{t('user-topmenu.item-setting')}</span>
              <span style={{ fontWeight: 400, }} className="text-muted small">Account Setting</span>
            </div>
          </div>
        </CDropdownItem>
        <CDropdown className="py-1">
          <CDropdownToggle size="lg" block className="d-flex align-items-center lang-chang">
            <div className="menu-item d-flex bd-highlight align-items-center ">
              <div className="icon-drop mr-3 ml-3">
                <CIcon name="enFlat" className="flat-lang" />
              </div>
              <div>
                <span style={{ fontWeight: 600, }} className="d-flex justify-content-start">English</span>
                <span style={{ fontWeight: 400, }} className="text-muted small">Account Setting</span>
              </div>
            </div>
          </CDropdownToggle>
          <CForm>
            <CDropdownMenu className="mt-2" placement="left-start" block>
              <CDropdownItem><CIcon name="enFlat" className="flat-lang mr-3"/>English</CDropdownItem>
              <CDropdownItem><CIcon name="viFlat" className="flat-lang mr-3"/>Vietnamese</CDropdownItem>
            </CDropdownMenu>
          </CForm>
        </CDropdown>
        <CDropdownItem divider />
        <CCol onClick={userLogout}>
          <CButton color="secondary">{t('user-topmenu.item-logout')}</CButton>
        </CCol>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
