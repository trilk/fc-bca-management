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
  CProgress,
  CTooltip
} from '@coreui/react'
import { getIconsView } from '../views/icons/flags/Flags'
import { flagSet } from '@coreui/icons'
import { Flags } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const TheHeaderDropDownLanguage = () => {
  const placements = [
    'top'
  ]
  const itemsCount = 5
  return (
    <CDropdown className="d-flex justify-content-center">
      <CTooltip 
      content={`Select Language`}
      placement="bottom">
        <CDropdownToggle color="ghost" className=" rounder py-1 px-2">
          <CIcon style={{ height: 24, width: 24 }} name="cif-us" title="us" id="us" className="p-0" />
        </CDropdownToggle>
      </CTooltip>
      <CDropdownMenu className="mt-2" placement="bottom-end">
        <CDropdownItem>
          <CIcon style={{ height: 24, width: 24 }} name="cif-us" title="us" id="us" className="mr-2" />English
        </CDropdownItem>
        <CDropdownItem>
          <CIcon height={25} name="cif-vn" title="vn" id="vn" />Vietnamese
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>



  )
}

export default TheHeaderDropDownLanguage