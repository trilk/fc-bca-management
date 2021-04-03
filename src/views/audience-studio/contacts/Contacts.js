import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import './contacts.scss'
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
import contactData from './contactData'
import { faTelegram, faViber } from '@fortawesome/free-brands-svg-icons'

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}

const getSubscriber = Subscriber => {
    switch (Subscriber) {
        case 'subscribed': return true
        case 'unsubscribed': return false
    }
}

const Contacts = () => {

    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/contacts?page=${newPage}`)
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])



    return (
        <>
            <CRow>
                <CCol col="12" lg="12">
                    <h3 className="pb-3"><FontAwesomeIcon icon={faUserFriends} className="mr-3" />All Contacts</h3>
                    <CCol className="p-0 pb-3 d-flex align-content-start flex-wrap">
                        <CCol lg="0" className="p-0 mr-3 pb-2">
                            <CDropdown>
                                <CDropdownToggle color="outline" className="d-flex align-items-center">
                                    <span>Segments: Độ tuổi từ 30 - 35 tuổi</span>
                                    <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                                </CDropdownToggle>
                                <CDropdownMenu className="mt-2">
                                    <CDropdownItem checked><strong>All</strong></CDropdownItem>
                                    <CDropdownItem><strong>Subscriber users</strong></CDropdownItem>
                                    <CDropdownItem><strong>Độ tuổi từ 30 - 35 tuổi và nó dài</strong></CDropdownItem>
                                    <CDropdownItem><strong>Segments 1</strong></CDropdownItem>
                                    <CDropdownItem><strong>Segments 2</strong></CDropdownItem>
                                    <CDropdownItem><strong>Segments 3</strong></CDropdownItem>
                                    <CDropdownItem><strong>Segments 4</strong></CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                        <CCol lg="0" className="pr-3 pb-2">
                            <CDropdown>
                                <CDropdownToggle color="outline" className="d-flex align-items-center">
                                    <span>Channels</span>
                                    <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                                </CDropdownToggle>
                                <CDropdownMenu className="mt-2">
                                    <CDropdownItem checked>All</CDropdownItem>
                                    <CDropdownItem>Zalo</CDropdownItem>
                                    <CDropdownItem>Viber</CDropdownItem>
                                    <CDropdownItem>Telegram</CDropdownItem>
                                </CDropdownMenu>
                            </CDropdown>
                        </CCol>
                        <CCol lg="2" xs="6" sm="2" md="2" className="pl-0">
                            <CInput name="input-search" placeholder="Search by name..."></CInput>
                        </CCol>
                    </CCol>
                    <CCard>
                        <CCardBody>
                            <CDataTable
                                items={contactData}
                                fields={[
                                    { key: 'name', label: 'name', _style: { width: '15%' } },
                                    { key: 'phonenumber', label: 'Phone Number', _style: { width: '8%' } },
                                    { key: 'segments', label: 'Segments', _style: { width: '8%' } },
                                    { key: 'channels', label: 'channels', _style: { width: '5%' } },
                                    { key: 'subscribed', label: 'subscribed', _style: { width: '5%' } },
                                    { key: 'status', label: 'status', _style: { width: '3%' } },
                                    { key: 'activity', label: 'activity', _style: { width: '8%' } },
                                    { key: 'action', label: 'action', _style: { width: '1%' } },
                                ]}
                                hover
                                bordered
                                striped
                                itemsPerPage={8}
                                activePage={page}
                                clickableRows
                                scopedSlots={{
                                    //name
                                    'name':
                                        (item) => (
                                            <td>
                                                <h6><strong>{item.name}</strong></h6>
                                                <div className="small text-muted">
                                                    <span>Registered: {item.createDate}</span>
                                                </div>
                                            </td>
                                        ),
                                    //channels
                                    'channels':
                                        (item) => (
                                            <td>
                                                <CCol className="p-2 d-flex flex-row bd-highlight">
                                                    {/* channels icon */}
                                                    {item.channels.includes("viber") && <FontAwesomeIcon icon={faViber} className="channel-icon mr-2" style={{ color: '#665CAC' }} />}
                                                    {item.channels.includes("zalo") && <CIcon name="zaloIcon" className="channel-icon mr-2 zalo-icon" />}
                                                    {item.channels.includes("telegram") && <FontAwesomeIcon icon={faTelegram} className="channel-icon mr-2" style={{ color: '#665CAC' }} />}

                                                </CCol>
                                            </td>
                                        ),
                                    'subscribed':
                                        (item) => (
                                            <td>
                                                <CCol className="d-flex justify-content-center pr-5">
                                                    <FontAwesomeIcon icon={item.subscribed ? faCheck : faTimes} />
                                                </CCol>
                                            </td>
                                        ),
                                    //last login
                                    'activity':
                                        (item) => (
                                            <td>
                                                <CCol className="pl-2">
                                                    <div className="small mb-1">Last login</div>
                                                    <strong>{item.activity}</strong>
                                                </CCol>

                                            </td>
                                        ),
                                    // Trạng thái
                                    'status':
                                        (item) => (
                                            <td>
                                                <CBadge className="badge-status" color={getBadge(item.status)}>
                                                    {item.status}
                                                </CBadge>
                                            </td>
                                        ),
                                    //button action
                                    'action':
                                        (item) => (
                                            <td>
                                                <CDropdown className="m-1 d-flex justify-content-center">
                                                    <CDropdownToggle color="ghost">
                                                        <FontAwesomeIcon icon={faEllipsisV} style={{ width: 12, height: 12 }} />
                                                    </CDropdownToggle>
                                                    <CDropdownMenu className="mt-2">
                                                        <CDropdownItem><FontAwesomeIcon icon={faEye} className="mr-2" />View users</CDropdownItem>
                                                        <CDropdownItem><FontAwesomeIcon icon={faPen} className="mr-2" />Edit</CDropdownItem>
                                                        <CDropdownItem><FontAwesomeIcon icon={faPause} className="mr-2" />Pause</CDropdownItem>
                                                        <CDropdownItem><FontAwesomeIcon icon={faClone} className="mr-2" />Duplicate</CDropdownItem>
                                                        <CDropdownDivider />
                                                        <CDropdownItem className="danger-color"><FontAwesomeIcon icon={faTrash} className="mr-2" />Delete</CDropdownItem>
                                                    </CDropdownMenu>
                                                </CDropdown>
                                                {' '}
                                            </td>
                                        )
                                }}
                            />
                            <CPagination
                                className="pt-4"
                                activePage={page}
                                onActivePageChange={pageChange}
                                doubleArrows={false}
                                align="center"
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Contacts

