import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import './messages.scss'
import femaleimg from '../users/avatar/female.jpg'
import {
    CBadge,
    CButton,
    CImg,
    CCol,
    CProgress,
    CDataTable,
    CForm,
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
    CLink,
} from '@coreui/react'
import messageData from './messageData'
import { faTelegram, faViber } from '@fortawesome/free-brands-svg-icons'

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Pause': return 'danger'
        default: return 'primary'
    }
}

const Messages = () => {

    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    // const pageChange = newPage => {
    //     currentPage !== newPage && history.push(`/contacts?page=${newPage}`)
    // }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/messages?page=${newPage}`)
    }

    const placements = [
        'top'
    ]

    return (
        <>
            <CRow>
                <CCol>
                    <CCol lg="12" className="p-0  pb-3 d-flex bd-highlight ">
                        <div className="p-0 d-flex align-items-end">
                            <h4><FontAwesomeIcon icon={faEnvelope} className="mr-3" />Messages</h4>
                        </div>
                        <div className="p-0 ml-auto">
                            <CLink to="/messages/CreateMsg"><CButton color="primary"><FontAwesomeIcon icon={faPlusCircle} className="mr-2" /><span>Create Message</span></CButton></CLink>
                        </div>
                    </CCol>
                    <CCard>
                        <CCardBody>
                            <CRow className="mt-2">
                                <CCol lg="2" md="3" sm="3">
                                    <CDropdown>
                                        <CDropdownToggle block color="outline" className="d-flex align-items-center">
                                            <span>Messages</span>
                                            <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1 ml-auto" />
                                        </CDropdownToggle>
                                        <CDropdownMenu className="mt-2" >
                                            <CDropdownItem checked><FontAwesomeIcon icon={faCircle} className="mr-2" style={{ color: '#007BFF', width: 10, height: 10 }} />Messages</CDropdownItem>
                                            <CDropdownItem><FontAwesomeIcon icon={faCircle} className="mr-2" style={{ color: '#28A745', width: 10, height: 10 }} />Draft</CDropdownItem>
                                            <CDropdownItem><FontAwesomeIcon icon={faCircle} className="mr-2" style={{ color: '#9492A0', width: 10, height: 10 }} />Schedule</CDropdownItem>
                                        </CDropdownMenu>
                                        <div className="pl-1">
                                            <small className="form-text text-muted"><strong>Filter</strong> by Type</small>
                                        </div>
                                    </CDropdown>
                                </CCol>
                                {/* Filter */}
                                <CCol lg="2" md="3" sm="3" >
                                    <CDropdown>
                                        <CDropdownToggle block color="outline" className="d-flex align-items-center">
                                            <span>Date Filter</span>
                                            <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1 ml-auto" />
                                        </CDropdownToggle>
                                        <CDropdownMenu className="mt-2" >
                                            <CForm className="px-4 py-3" >
                                                <CCol className="p-0">
                                                    <CFormGroup>
                                                        <CLabel htmlFor="exampleDropdownFormEmail1">Start Date</CLabel>
                                                        <CInput className="form-control" id="exampleDropdownFormEmail1" type="date" placeholder="email@example.com" autoComplete="email" />
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol className="p-0">
                                                    <CFormGroup>
                                                        <CLabel htmlFor="exampleDropdownFormEmail1">End Date</CLabel>
                                                        <CInput className="form-control" id="exampleDropdownFormEmail1" type="date" placeholder="email@example.com" autoComplete="email" />
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol className="p-0">
                                                    <CFormGroup className="mt-2">
                                                        <CButton color="primary" type="submit">Submit</CButton>
                                                    </CFormGroup>
                                                </CCol>
                                            </CForm>
                                        </CDropdownMenu>
                                        <div className="pl-1">
                                            <small className="form-text text-muted"><strong>Filter</strong> by Date</small>
                                        </div>
                                    </CDropdown>
                                </CCol>
                                <CCol lg="2" md="3" sm="3">
                                    <CFormGroup>
                                        <CInput id="" type="text" placeholder="Search" required />
                                        <div className="pl-1">
                                            <small className="form-text text-muted"><strong>Search</strong> in all fields</small>
                                        </div>
                                    </CFormGroup>
                                </CCol>
                            </CRow>
                            <CDataTable
                                items={messageData}
                                fields={[
                                    { key: 'content', label: 'content', _style: { width: '15%' } },
                                    { key: 'status', label: 'status', _style: { width: '2%' } },
                                    { key: 'sentAt', label: 'sent at', _style: { width: '3%' } },
                                    { key: 'delivery', label: 'delivery', _style: { width: '1%' } },
                                    { key: 'sent', label: 'sent', _style: { width: '3%' } },
                                    { key: 'segments', label: 'segments', _style: { width: '3%' } },
                                    { key: 'createBy', label: 'createby', _style: { width: '1%' } },
                                    { key: 'action', label: 'action', _style: { width: '1%' } },
                                ]}
                                hover
                                bordered
                                // sorter
                                striped
                                itemsPerPage={8}
                                activePage={page}
                                clickableRows
                                scopedSlots={{
                                    //name
                                    'content':
                                        (item) => (
                                            <td>
                                                <div className="pb-2">
                                                    <span className="tags-text" maxLength={100}><strong>{item.content}</strong></span>
                                                </div>
                                                <div className="small text-muted">
                                                    <span>Create Date: {item.createDate}</span>
                                                </div>
                                                {/* tags draf schedule */}
                                                {/* <div className="pt-2">
                                                    <CBadge className="mr-1 badge-status" color="light">Draft</CBadge>
                                                    <CBadge className="mr-1 badge-status" color="danger">Schedule</CBadge>
                                                </div> */}

                                            </td>
                                        ),
                                    //sent
                                    'sent':
                                        (item) => (
                                            <td>
                                                <div>
                                                    <span className="font-weight-bold">{item.sent}</span><br />
                                                </div>
                                                <div className="small text-muted">
                                                    <span>Users recieved Message</span>
                                                </div>
                                            </td>
                                        ),
                                    // delivery
                                    'delivery':
                                        (item) => (
                                            <td>

                                                <div className="d-flex align-items-center">
                                                    {/* <div className="pb-1">
                                                        <small><strong>Success</strong></small>
                                                    </div>  */}
                                                    {item.delivery.includes("sending") && <CTooltip content={`Sending...20%`} placement="top"><CProgress striped color="warning" value={75} className="delivery-progress" /></CTooltip>}
                                                    {item.delivery.includes("success") && <CTooltip content={`Delivered`} placement="top"><CProgress color="info" value={100} className="delivery-progress" /></CTooltip>}
                                                    {item.delivery.includes("pause") && <CTooltip content={`Pause...`} placement="top"><CProgress color="danger" value={10} className="delivery-progress" /></CTooltip>}
                                                </div>

                                            </td>
                                        ),
                                    //
                                    // Trạng thái
                                    'status':
                                        (item) => (
                                            <td>
                                                <CBadge className="badge-status" color={getBadge(item.status)}>
                                                    {item.status}
                                                </CBadge>
                                            </td>
                                        ),
                                    // user create message
                                    'createBy':
                                        (item) => (
                                            <td>
                                                <CCol className="c-avatar">
                                                    <img src={femaleimg} className="c-avatar-img" alt="admin@bootstrapmaster.com" style={{ height: 30, width: 30 }} name="avatar-male-default" /><br />
                                                    {/* <small>Nguyen Van Ba</small> */}
                                                </CCol>
                                            </td>
                                        ),
                                    'segments':
                                        (item) => (
                                            <td>
                                                <div>
                                                    <span className="tags-text" maxLength={100}>{item.segments}</span>
                                                </div>
                                            </td>
                                        ),
                                    //button action
                                    'action':
                                        (item) => (
                                            <td>
                                                <CDropdown className="pr-2 d-flex justify-content-center">
                                                    <CDropdownToggle color="ghost">
                                                        <FontAwesomeIcon icon={faEllipsisV} style={{ width: 12, height: 12 }} />
                                                    </CDropdownToggle>
                                                    <CDropdownMenu>
                                                        <CDropdownItem>
                                                            <CLink to="/messages/MessagesReport"><FontAwesomeIcon icon={faEye} className="mr-2" />View details</CLink>
                                                        </CDropdownItem>
                                                        <CDropdownItem>
                                                            {/* Edit message wwith message draft and schedule */}
                                                            <CLink to="/messages/EditMsg"><FontAwesomeIcon icon={faPen} className="mr-2" />Edit</CLink>
                                                        </CDropdownItem>
                                                        <CDropdownItem>
                                                            <FontAwesomeIcon icon={faCopy} className="mr-2" />Duplicate
                                                        </CDropdownItem>
                                                        <CDropdownDivider />
                                                        <CDropdownItem className="danger-color">
                                                            <FontAwesomeIcon icon={faTrash} className="mr-2" />Delete
                                                        </CDropdownItem>
                                                    </CDropdownMenu>
                                                </CDropdown>
                                                {' '}
                                            </td>
                                        )
                                }}
                            />

                            <CPagination
                                className="pt-4 d-flex flex-wrap py-2 mr-3 "
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

export default Messages

