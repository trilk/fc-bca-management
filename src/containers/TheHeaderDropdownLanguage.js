import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, } from '@fortawesome/free-solid-svg-icons'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CLink,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropDownLanguage = () => {
  const itemsCount = 5
  return (
    <CDropdown className="pr-2 d-flex justify-content-center">
      <CDropdownToggle color="ghost">
        <FontAwesomeIcon icon={faEllipsisV} style={{ width: 12, height: 12 }} />
      </CDropdownToggle>
      <CDropdownMenu className="mt-2">
        <CDropdownItem>
          <CLink to="/contacts/contactDetails"><FontAwesomeIcon icon={faEye} className="mr-2" />View details</CLink>
        </CDropdownItem>
        <CDropdownItem><FontAwesomeIcon icon={faPen} className="mr-2" />Update Info</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropDownLanguage