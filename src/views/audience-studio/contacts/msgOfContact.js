import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, faEnvelope, faCommentDots, faUserEdit, faSearch, } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import '../../messages/messages.scss'
// import femaleimg from '../users/avatar/female.jpg'
import {
    CBadge,
    CButton,
    CCol,
    CProgress,
    CDataTable,
    CForm,
    CPagination,
    CLabel,
    CTooltip,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CCard,
    CCardBody,
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
    CDropdownHeader,
} from '@coreui/react'
import messageData from '../../messages/messageData'
import { faTelegram, faViber } from '@fortawesome/free-brands-svg-icons'

const getBadge = status => {
    switch (status) {
        case 'Delivered': return 'primary'
        case 'Sending': return 'warning'
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
    //Modal
    const [danger, setDanger] = useState(false)
    return (
        <>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardBody>
                            <CCol className="px-lg-3 px-md-3 px-sm-3 p-0 py-3">
                                <CCol className="p-0 pb-3">
                                    <h4><strong>Messages</strong></h4>
                                    <span className="text-muted small">Lastest messages of contact</span>
                                </CCol>
                                <CDataTable
                                    items={messageData}
                                    fields={[
                                        { key: 'type', label: '', _style: { width: '1%' } },
                                        { key: 'content', label: 'content', _style: { width: '15%' } },
                                        { key: 'status', label: 'status', _style: { width: '2%' } },
                                        { key: 'sentAt', label: 'sent at', _style: { width: '3%' } },
                                        { key: 'delivery', label: 'delivery', _style: { width: '1%' } },
                                        // { key: 'action', label: 'action', _style: { width: '1%' } },
                                    ]}
                                    bordered
                                    striped
                                    itemsPerPage={3}
                                    activePage={page}
                                    clickableRows
                                    scopedSlots={{
                                        'type':
                                            (item) => (
                                                <td className="p-0">
                                                    <CCol className="">
                                                        <FontAwesomeIcon icon={faCommentDots} className="text-gray-400" />
                                                    </CCol>
                                                </td>
                                            ),
                                        //name
                                        'content':
                                            (item) => (
                                                <td>
                                                    <span htmlFor="titleMessage" className="text-gray-800" style={{ fontSize: 16, fontWeight: 600, }}>Title Of Message</span>
                                                    <div className="py-2">
                                                        <span className="tags-text text-gray-800" style={{ fontWeight: 600 }} maxLength={100}>{item.content}</span>
                                                    </div>
                                                    <CTooltip content={`User Create message`}><span className="small font-weight-bold text-gray-400">
                                                        <FontAwesomeIcon icon={faUserEdit} className="mr-2" />NGUYEN VAN BA</span>
                                                    </CTooltip>
                                                </td>
                                            ),
                                        //sent
                                        'sent':
                                            (item) => (
                                                <td>
                                                    <div>
                                                        <span className="font-weight-bold">{item.sent}</span><br />
                                                    </div>
                                                    <div className="small text-gray-600">
                                                        <span>Users recieved Message</span>
                                                    </div>
                                                </td>
                                            ),
                                        // delivery
                                        'delivery':
                                            (item) => (
                                                <td>

                                                    <div className="d-flex align-items-center">
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
                                        'segments':
                                            (item) => (
                                                <td>
                                                    <div>
                                                        <span className="tags-text" maxLength={100}>{item.segments}</span>
                                                    </div>
                                                </td>
                                            ),
                                        //button action
                                        // 'action':
                                        //     (item) => (
                                        //         <td>
                                        //             <CDropdown className="pr-2 d-flex justify-content-center">
                                        //                 <CDropdownToggle color="ghost">
                                        //                     <FontAwesomeIcon icon={faEllipsisV} style={{ width: 12, height: 12 }} />
                                        //                 </CDropdownToggle>
                                        //                 <CDropdownMenu>
                                        //                     <CDropdownItem>
                                        //                         <CLink to="/messages/MessagesReport"><FontAwesomeIcon icon={faEye} className="mr-2" />View details</CLink>
                                        //                     </CDropdownItem>
                                        //                     <CDropdownItem>
                                        //                         {/* Edit message wwith message draft and schedule */}
                                        //                         <CLink to="/messages/EditMsg"><FontAwesomeIcon icon={faPen} className="mr-2" />Edit</CLink>
                                        //                     </CDropdownItem>
                                        //                     <CDropdownItem>
                                        //                         <FontAwesomeIcon icon={faCopy} className="mr-2" />Duplicate
                                        //                     </CDropdownItem>
                                        //                     <CDropdownDivider />
                                        //                     <CDropdownItem className="danger-color" onClick={() => setDanger(!danger)}>
                                        //                         <FontAwesomeIcon icon={faTrash} className="mr-2" />Delete
                                        //                     </CDropdownItem>
                                        //                 </CDropdownMenu>
                                        //             </CDropdown>
                                        //             {' '}
                                        //         </td>
                                        //     )
                                    }}
                                />

                                <CPagination
                                    className="pt-4 d-flex flex-wrap mr-3 float-right"
                                    activePage={page}
                                    onActivePageChange={pageChange}
                                    doubleArrows={false}

                                />
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

        </>
    )
}

export default Messages

