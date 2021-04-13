import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersCog, faUsers, fabViber, faChessQueen, faFacebookMessenger, faEye, faEdit, faPen, faPause, faCopy, faEllipsisV, faPlus, faPlusCircle, faChevronCircleDown, faSortDown, faClone, faCircle, faTag, faFilter, faUserCircle, faUser, faDatabase, faHamburger, faVenusMars, faIdBadge, faMinus, faExchangeAlt, faTrash, faUserTag, faCheck, faTimes, faUserFriends, faFileImport, faUserPlus, faCheckCircle, faPhone, faCalendarCheck, } from '@fortawesome/free-solid-svg-icons'
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
    CForm,
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
import contactData from './contactData'
import { faTelegram, faViber } from '@fortawesome/free-brands-svg-icons'

const Contacts = () => {
  const limitpage = 15;
  const [channelDropdown, setChannelDropdown] = useState("All");
  const [data, setData] = useState([]);
  const getAllAudience = async (page, limit) => {
    const response = await AudienceService.getAllAudience(page, limit);
    if (response.data.errorCode === 0) {
      setData(response.data.Contacts);
    }
  };

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])



    return (
        <>
            <CRow>
                <CCol col="12" lg="12">
                    <h4 className="pb-3"><FontAwesomeIcon icon={faUserFriends} className="mr-3" />All Contacts</h4>
                </CCol>
                <CCol col="12" lg="12">
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol className="d-flex bd-highlight">
                                    <div className="pr-3">
                                        <CDropdown>
                                            <CDropdownToggle color="outline" className="d-flex align-items-center">
                                                <span>Channels: All</span>
                                                <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                                            </CDropdownToggle>
                                            <CDropdownMenu className="mt-2">
                                                <CDropdownItem checked>All</CDropdownItem>
                                                <CDropdownItem>Zalo</CDropdownItem>
                                                <CDropdownItem>Viber</CDropdownItem>
                                                <CDropdownItem>Telegram</CDropdownItem>
                                            </CDropdownMenu>
                                        </CDropdown>
                                        <div className="pl-1">
                                            <small className="form-text text-muted"><strong>Filter</strong> by Channels</small>
                                        </div>
                                    </div>
                                    {/* Filter */}
                                    <div className="pr-3">
                                        <CDropdown>
                                            <CDropdownToggle color="outline" className="d-flex align-items-center">
                                                {/* Text maxLength */}
                                                <span className="tags-text" style={{ fontWeight: 600, display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '25ch' }} maxLength={10}>Segment: Subscribed Users Segment 3 Ho Chi Minh City</span>
                                                <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                                            </CDropdownToggle>
                                            <CDropdownMenu className="mt-2 overflow-scroll">
                                                <CDropdownItem>Subscribed Users</CDropdownItem>
                                                <CDropdownItem>Segment 1</CDropdownItem>
                                                <CDropdownItem>Segment 2</CDropdownItem>
                                                <CDropdownItem>Segment 3 Ho Chi Minh City</CDropdownItem>
                                                <CDropdownItem>Subscribed Users</CDropdownItem>
                                                <CDropdownItem>Segment 1</CDropdownItem>
                                                <CDropdownItem>Segment 2</CDropdownItem>
                                                <CDropdownItem>Segment 3 Ho Chi Minh City</CDropdownItem>
                                                <CDropdownItem>Subscribed Users</CDropdownItem>
                                                <CDropdownItem>Segment 1</CDropdownItem>
                                                <CDropdownItem>Segment 2</CDropdownItem>
                                                <CDropdownItem>Segment 3 Ho Chi Minh City</CDropdownItem>
                                            </CDropdownMenu>
                                        </CDropdown>
                                        <div className="pl-1">
                                            <small className="form-text text-muted"><strong>Filter</strong> by Status</small>
                                        </div>
                                    </div>
                                    <div>
                                        <CFormGroup>
                                            <CInput id="" type="text" placeholder="Search" required />
                                            <div className="pl-1">
                                                <small className="form-text text-muted"><strong>Search</strong> in all fields</small>
                                            </div>
                                        </CFormGroup>
                                    </div>
                                    <div className="ml-auto d-flex flex-column">
                                        <span className="small text-muted d-flex justify-content-end">Contacts Total</span>
                                        <span style={{ fontSize: 20, fontWeight: 600 }}>100.000.000</span>
                                    </div>
                                </CCol>
                            </CRow>
                            <CDataTable
                                items={contactData}
                                fields={[
                                    { key: 'id', _style: { width: '1%' } },
                                    { key: 'name', label: 'name', _style: { width: '10%' } },
                                    { key: 'channels', label: 'channels', _style: { width: '2%' } },
                                    { key: 'email', label: 'email', _style: { width: '2%' } },
                                    { key: 'gender', label: 'gender', _style: { width: '1%' } },
                                    { key: 'segments', label: 'Segments', _style: { width: '8%' } },
                                    { key: 'activity', label: 'activity', _style: { width: '5%' } },
                                    { key: 'status', label: 'status', _style: { width: '1%' } },
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
                                                <CCol className="p-0">
                                                    <span style={{ fontWeight: 700, }}>{item.name}</span>
                                                    <div className="d-flex flex-column text-muted">
                                                        <div className="pt-1"><FontAwesomeIcon icon={faPhone} className="mr-2" style={{ heigh: 12, width: 12 }} /><span style={{ fontWeight: 600 }}>{item.phonenumber}</span></div>
                                                        <CTooltip content={`Registered: 20/10/2021`}><div className="pt-1"><FontAwesomeIcon icon={faCalendarCheck} className="mr-2" style={{ heigh: 12, width: 12 }} /><span className="small">{item.createDate}</span></div></CTooltip>
                                                    </div>
                                                </CCol>
                                            </td>
                                        ),
                                    //channels
                                    'channels':
                                        (item) => (
                                            <td>
                                                <CCol className="p-2 d-flex flex-row bd-highlight">
                                                    {/* channels icon */}
                                                    {item.channels.includes("viber") && <CTooltip content="Viber"><FontAwesomeIcon icon={faViber} className="channel-icon mr-2" style={{ color: '#665CAC' }} /></CTooltip>}
                                                    {item.channels.includes("zalo") && <CTooltip content="Zalo"><CIcon name="zaloIcon" className="channel-icon mr-2 zalo-icon" /></CTooltip>}
                                                    {item.channels.includes("telegram") && <CTooltip content="Telegram"><FontAwesomeIcon icon={faTelegram} className="channel-icon mr-2" style={{ color: '#0088cc' }} /></CTooltip>}
                                                </CCol>
                                            </td>
                                        ),
                                    'status':
                                        (item) => (
                                            <td>
                                                <CCol className="p-0">
                                                    {item.status.includes("subscribed") && <CBadge color="success" className="badge-status text-uppercase">Subscribed<FontAwesomeIcon icon={faCheckCircle} className="ml-2" /></CBadge>}
                                                    {item.status.includes("none") && <CBadge color="danger" className="badge-status text-uppercase">Unsubscribed<FontAwesomeIcon icon={faCheckCircle} className="ml-2" /></CBadge>}
                                                </CCol>
                                            </td>
                                        ),
                                    //last login
                                    'activity':
                                        (item) => (
                                            <td>
                                                <CCol className="pl-2">
                                                    <div className="small mb-1 text-muted">Last Active</div>
                                                    <span style={{ fontWeight: 500 }}>{item.activity}</span>
                                                </CCol>

                                            </td>
                                        ),
                                    //segment
                                    'segments':
                                        (item) => (
                                            <td>
                                                <CCol className="tags-text p-0">{item.segments}</CCol>
                                            </td>
                                        ),
                                    'action':
                                        (item) => (
                                            <td>
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
                {/* </CCol> */}
            </CRow>
        </>
    )
}

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    if (channelDropdown === "All") {
      getAllAudience(currentPage, limitpage);
    } else {
      getAudienceByChannelType(currentPage, limitpage, channelDropdown);
    }
  }, [currentPage, page, channelDropdown]);
  //end pagination
  if (_.isNil(data)) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <CRow>
        <CCol col="12" lg="12">
          <h4 className="pb-3">
            <FontAwesomeIcon icon={faUserFriends} className="mr-3" />
            All Contacts
          </h4>
        </CCol>
        <CCol className="d-flex bd-highlight flex-wrap pb-2">
          <div className="mr-auto pb-2">
            <CInput
              name="input-search"
              placeholder="Search by name..."
            ></CInput>
          </div>
          <div className="order-2">
            <CDropdown>
              <CDropdownToggle
                color="outline"
                className="d-flex align-items-center"
              >
                <span>{channelDropdown}</span>
                <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
              </CDropdownToggle>
              <CDropdownMenu className="" placement="bottom-end">
                <CDropdownItem onClick={() => setChannelDropdown("All")}>
                  All
                </CDropdownItem>
                <CDropdownItem onClick={() => setChannelDropdown("Zalo")}>
                  Zalo
                </CDropdownItem>
                <CDropdownItem onClick={() => setChannelDropdown("Viber")}>
                  Viber
                </CDropdownItem>
                <CDropdownItem onClick={() => setChannelDropdown("Telegram")}>
                  Telegram
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
          <div className="order-1 pr-2 pb-2">
            <CDropdown>
              <CDropdownToggle
                color="outline"
                className="d-flex align-items-center"
              >
                <span>Segments: Độ tuổi từ 30 - 35 tuổi</span>
                <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
              </CDropdownToggle>
              <CDropdownMenu className="mt-2">
                <CDropdownItem checked value="all">
                  <strong>All</strong>
                </CDropdownItem>
                <CDropdownItem>
                  <strong>Subscriber users</strong>
                </CDropdownItem>
                <CDropdownItem value="30-35">
                  <strong>Độ tuổi từ 30 - 35 tuổi và nó dài</strong>
                </CDropdownItem>
                <CDropdownItem>
                  <strong>Segments 1</strong>
                </CDropdownItem>
                <CDropdownItem>
                  <strong>Segments 2</strong>
                </CDropdownItem>
                <CDropdownItem>
                  <strong>Segments 3</strong>
                </CDropdownItem>
                <CDropdownItem>
                  <strong>Segments 4</strong>
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </CCol>
        <CCol col="12" lg="12">
          <CCard>
            <CCardBody className="pt-0">
              <CDataTable
                items={data}
                fields={[
                  { key: "name", label: "name", _style: { width: "10%" } },
                  { key: "status", label: "status", _style: { width: "1%" } },
                  {
                    key: "channels",
                    label: "channels",
                    _style: { width: "2%" },
                  },
                  {
                    key: "phonenumber",
                    label: "Phone Number",
                    _style: { width: "5%" },
                  },
                  {
                    key: "segments",
                    label: "Segments",
                    _style: { width: "10%" },
                  },
                  // { key: 'status', label: 'status', _style: { width: '2%' } },
                  {
                    key: "activity",
                    label: "activity",
                    _style: { width: "5%" },
                  },
                  { key: "action", label: "action", _style: { width: "1%" } },
                ]}
                hover
                bordered
                sorter
                striped
                itemsPerPage={8}
                activePage={page}
                clickableRows
                scopedSlots={{
                  //name
                  name: (item) => (
                    <td>
                      <h6>
                        <strong>{item.ChatName}</strong>
                      </h6>
                      <div className="small text-muted">
                        <span>
                          Registered:{" "}
                          {convert_day_hours_minute(item.CreateDate)}
                        </span>
                      </div>
                    </td>
                  ),
                  //channels
                  channels: (item) => (
                    <td>
                      <CCol className="p-2 d-flex flex-row bd-highlight">
                        {/* channels icon */}
                        {item.ChannelType === "Viber" && (
                          <FontAwesomeIcon
                            icon={faViber}
                            className="channel-icon mr-2"
                            style={{ color: "#665CAC" }}
                          />
                        )}
                        {item.ChannelType === "Zalo" && (
                          <CIcon
                            name="zaloIcon"
                            className="channel-icon mr-2 zalo-icon"
                          />
                        )}
                        {item.ChannelType === "Telegram" && (
                          <FontAwesomeIcon
                            icon={faTelegram}
                            className="channel-icon mr-2"
                            style={{ color: "#0088cc" }}
                          />
                        )}
                      </CCol>
                    </td>
                  ),
                  status: (item) => (
                    <td>
                      <CCol className="pl-4">
                        <FontAwesomeIcon
                          icon={item.ChatStatus ? faCheck : faTimes}
                        />
                      </CCol>
                    </td>
                  ),
                  //last login
                  activity: (item) => (
                    <td>
                      <CCol className="pl-2">
                        <div className="small mb-1">Last login</div>
                        <strong>{item.activity}</strong>
                      </CCol>
                    </td>
                  ),
                  // Trạng thái
                  // 'status':
                  //     (item) => (
                  //         <td>
                  //             <CBadge className="badge-status" color={getBadge(item.status)}>
                  //                 {item.status}
                  //             </CBadge>
                  //         </td>
                  //     ),
                  //button action
                  action: (item) => (
                    <td>
                      <CDropdown className="pr-2 d-flex justify-content-center">
                        <CDropdownToggle color="ghost">
                          <FontAwesomeIcon
                            icon={faEllipsisV}
                            style={{ width: 12, height: 12 }}
                          />
                        </CDropdownToggle>
                        <CDropdownMenu className="mt-2">
                          <CDropdownItem>
                            <CLink to="/contacts/contactDetails">
                              <FontAwesomeIcon icon={faEye} className="mr-2" />
                              View details
                            </CLink>
                          </CDropdownItem>
                          <CDropdownItem>
                            <FontAwesomeIcon icon={faPen} className="mr-2" />
                            Update Info
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>{" "}
                    </td>
                  ),
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
  );
};

export default Contacts;
