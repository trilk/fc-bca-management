import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, faEnvelope, faCompressAlt, faCommentDots, } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import '../messages.scss'
// import femaleimg from '../users/avatar/female.jpg'
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
    CAlert,
} from '@coreui/react'
import templateData from './templateData'
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

const Template = () => {

    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/template?page=${newPage}`)
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])
    //Modal
    const [danger, setDanger] = useState(false)
    //Arlets
    const [visible, setVisible] = React.useState(10)
    return (
        <>
            <CRow>
                <CCol className="position-relative">
                    {/* Arlets delete succes */}
                    {/* <CCol className="position-absolute d-flex justify-content-center">
                        <CAlert
                            color="info"
                            closeButton
                            onShowChange={setVisible}
                        >
                            Delete Success!
                        </CAlert>
                    </CCol> */}
                    <CCol lg="12" className="p-0  pb-3 d-flex bd-highlight ">
                        <div className="p-0 d-flex align-items-end">
                            <h4><FontAwesomeIcon icon={faEnvelope} className="mr-3" />Message Template</h4>
                        </div>
                        <div className="p-0 ml-auto">
                            <CLink to="/template/new-template"><CButton color="primary"><FontAwesomeIcon icon={faPlusCircle} className="mr-2" /><span>New Template</span></CButton></CLink>
                        </div>
                    </CCol>
                    <CCard>
                        <CCardBody>
                            <CRow>
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
                                items={templateData}
                                fields={[
                                    { key: 'content', label: 'content', _style: { width: '20%' } },
                                    // { key: 'open', label: 'open', _style: { width: '2%' } },
                                    { key: 'sent', label: 'sent', _style: { width: '3%' } },
                                    { key: 'lastupdate', label: 'last update', _style: { width: '4%' } },
                                    { key: 'createBy', label: 'createby', _style: { width: '4%' } },
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
                                                <div className="pb-1">
                                                    <span style={{ fontSize: 16 }}><strong>{item.name}</strong></span>
                                                </div>
                                                <div className="pb-2">
                                                    <span className="tags-text" maxLength={50}>{item.content}</span>
                                                </div>
                                                <div className="small text-muted">
                                                    <span>Create Date: {item.createDate}</span>
                                                </div>
                                                <div className="pt-2">
                                                    <CBadge className="mr-1 badge-status" color="light">Template</CBadge>
                                                </div>
                                            </td>
                                        ),
                                    //sent
                                    'sent':
                                        (item) => (
                                            <td>
                                                <div>
                                                    <span className="font-weight-bold" style={{ fontSize: 16 }}>{item.sent}</span><br />
                                                </div>
                                                {/* <div className="small text-muted">
                                                    <span></span>
                                                </div> */}
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
                                                    {item.delivery.includes("sending") && <CProgress striped color="warning" value={75} className="delivery-progress" />}
                                                    {item.delivery.includes("success") && <CProgress color="info" value={100} className="delivery-progress" />}
                                                    {item.delivery.includes("pause") && <CProgress color="danger" value={10} className="delivery-progress" />}
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
                                                {/* className="c-avatar" */}
                                                <CCol className="p-0">
                                                    {/* <img src={femaleimg} className="c-avatar-img" alt="admin@bootstrapmaster.com" style={{ height: 30, width: 30 }} name="avatar-male-default" /><br /> */}
                                                    <span>Nguyen Van Ba</span>
                                                </CCol>
                                            </td>
                                        ),
                                    //button action
                                    'action':
                                        (item) => (
                                            <td>
                                                <CDropdown className="pl-1">
                                                    <CDropdownToggle color="ghost">
                                                        <FontAwesomeIcon icon={faEllipsisV} style={{ width: 12, height: 12 }} />
                                                    </CDropdownToggle>
                                                    <CDropdownMenu className="position-absolute" placement="bottom-end">
                                                        <CDropdownItem>
                                                            <CLink to="/template/template-details"><FontAwesomeIcon icon={faEye} className="mr-2" />View / Edit</CLink>
                                                        </CDropdownItem>
                                                        <CDropdownItem>
                                                            {/* Edit message wwith message draft and schedule */}
                                                            <CLink to="/CreateMsg"><FontAwesomeIcon icon={faCommentDots} className="mr-2" />Use Template</CLink>
                                                        </CDropdownItem>
                                                        <CDropdownItem>
                                                            <FontAwesomeIcon icon={faClone} className="mr-2" />Create Duplicate
                                                        </CDropdownItem>
                                                        <CDropdownDivider />
                                                        <CDropdownItem onClick={() => setDanger(!danger)}>
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
                    {/* Modal delete */}
                    <CModal
                        show={danger}
                        onClose={() => setDanger(!danger)}
                    >
                        <CModalHeader closeButton>
                            <CModalTitle>Template Delete</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            Are you want delete this Template?
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="outline">Cancel</CButton>
                            <CButton color="primary">Delete</CButton>
                        </CModalFooter>
                    </CModal>
                </CCol> 
            </CRow>

        </>
    )
}

export default Template

