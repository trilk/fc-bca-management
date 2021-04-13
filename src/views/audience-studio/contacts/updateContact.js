import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, faIndent, faMailBulk, faAt, faMapMarkedAlt, faAddressBook, faAddressCard, faGlobeAsia, faCalendarCheck, faIdCard, faMapMarkerAlt, faHistory, faEnvelopeOpenText, faPoll, faChartPie, faCheckCircle, faCalendarPlus, faDotCircle, faWindowClose, faChargingStation, } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import femaleimg from '../../users/avatar/female.jpg'
import './contacts.scss'
import imgblank from '../img/blank.png'
import {
    CBadge,
    CButton,
    CImg,
    CCol,
    CDataTable,
    CPagination,
    CLabel,
    CTooltip,
    CModal,
    CModalHeader,
    CSelect,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CInputCheckbox,
    CCallout,
    CCard,
    CCardBody,
    CPopover,
    CDropdownItem,
    CFormGroup,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CInputRadio,
    CInput,
    CRow,
    CDropdownDivider,
} from '@coreui/react'
import { faAccessibleIcon, faTelegram, faViber } from '@fortawesome/free-brands-svg-icons'

const placements = [
    'top'
]
const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}
const updateContact = () => {

    return (
        <>
            <CCol lg="12" className="p-0">
                <CCard>
                    <CCardBody>
                        <CCol col="12">
                            <CCol className="p-0">
                                <span>Avatar</span>
                                <div className="">
                                    <div className="image-input image-input-outline">
                                        <div>
                                            <CImg src={imgblank} className="image-input-wrapper" />
                                        </div>
                                        <div className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="remove">
                                            <FontAwesomeIcon icon={faPen} style={{ height: 9, width: 9 }} />
                                        </div>
                                    </div>
                                </div>
                            </CCol>




                        </CCol>

                    </CCardBody>
                </CCard>

            </CCol>

        </>
    )
}

export default updateContact
