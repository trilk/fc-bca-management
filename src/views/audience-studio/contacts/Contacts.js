import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faUsers,
  fabViber,
  faChessQueen,
  faFacebookMessenger,
  faEye,
  faEdit,
  faPen,
  faPause,
  faCopy,
  faEllipsisV,
  faPlus,
  faPlusCircle,
  faChevronCircleDown,
  faSortDown,
  faClone,
  faCircle,
  faTag,
  faFilter,
  faUserCircle,
  faUser,
  faDatabase,
  faHamburger,
  faVenusMars,
  faIdBadge,
  faMinus,
  faExchangeAlt,
  faTrash,
  faUserTag,
  faCheck,
  faTimes,
  faUserFriends,
  faFileImport,
  faUserPlus,
  faPhone,
  faCalendarCheck,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import "./contacts.scss";
import femaleimg from '../../users/avatar/female.jpg'
import maleimg from '../../users/avatar/male.jpg'
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
  CLink,
} from "@coreui/react";
import { faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";

//lodash
import _ from "lodash";
//convert data
import { convert_day_hours_minute } from "../../../helpers/convertdate";
// api service
import AudienceService from "../../../services/audience.service";

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

  const getAudienceByChannelType = async (page, limit, type) => {
    const response = await AudienceService.getAudienceByChannelType(
      page,
      limit,
      type
    );
    if (response.data.errorCode === 0) {
      setData(response.data.Contacts);
    }
  };

  //pagination
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/contacts?page=${newPage}`);
  };

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
        <CCol col="12" lg="12">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol className="d-flex bd-highlight">
                  <div className="pr-3">
                    <CDropdown>
                      <CDropdownToggle
                        color="outline"
                        className="d-flex align-items-center"
                      >
                        <span>Channel: {channelDropdown}</span>
                        <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                      </CDropdownToggle>
                      <CDropdownMenu className="mt-2" placement="bottom-start">
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
                    <div className="pl-1">
                      <small className="form-text text-muted"><strong>Filter</strong> by Channels</small>
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
                    <span style={{ fontSize: 20, fontWeight: 600,}} className="d-flex justify-content-end">12</span>
                  </div>
                </CCol>
              </CRow>
              <CDataTable
                items={data}
                fields={[
                  // { key: 'id', _style: { width: '1%' } },
                  {
                    key: "name",
                    label: "name",
                    _style: { width: "10%" }
                  },
                  {
                    key: "phonenumber",
                    label: "phone number",
                    _style: { width: "4%" }
                  },
                  {
                    key: "channels",
                    label: "channels",
                    _style: { width: "2%" },
                  },
                  {
                    key: 'email',
                    label: 'email',
                    _style: { width: '4%' }
                  },
                  {
                    key: 'gender',
                    label: 'gender',
                    _style: { width: '1%' }
                  },
                  {
                    key: 'lastUpdate',
                    label: 'last update',
                    _style: { width: '4%' }
                  },
                  {
                    key: "status",
                    label: "status",
                    _style: { width: "1%" }
                  },
                  {
                    key: "action",
                    label: "action",
                    _style: { width: "1%" }
                  },
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
                      <CRow>
                        <CCol className="d-flex flex-row bd-highlight">
                          <CCol lg="0" className="p-0 pr-3 d-flex align-items-center">
                            <div className="c-avatar ">
                              {/* avatar */}
                              <img src={item.ZaloAccount?.avatar || item.ViberAccount?.avatar || maleimg} className="c-avatar-img" alt="admin@bootstrapmaster.com" height="48" width="48" name="avatar-female-default" />
                            </div>
                          </CCol>
                          <CCol className="p-0 d-flex flex-column">
                            <span style={{ fontWeight: 600 }} className="pb-1">
                              {item.ChatName}
                            </span>
                            <span className="small text-muted" style={{ fontWeight: 500 }}>Registered{''}: {convert_day_hours_minute(item.CreateDate)}</span>
                          </CCol>
                        </CCol>
                      </CRow>
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
                      <CCol className="p-0">
                        <CBadge color={item.ChatStatus ? "success" : "danger"} className="badge-status text-uppercase">{item.ChatStatus ? "Subscribed" : "UnSubcribe"}
                          <FontAwesomeIcon icon={item.ChatStatus ? faCheckCircle : faTimesCircle} className="ml-2" />
                        </CBadge>
                      </CCol>
                    </td>
                  ),
                  gender: (item) => (
                    <td>
                      <CCol className="pl-1">
                        <span className="text-muted">no data</span>
                      </CCol>
                    </td>
                  ),
                  phonenumber: (item) => (
                    <td>
                      <CCol className="pl-1">
                        <span className="text-muted">no data</span>
                      </CCol>
                    </td>
                  ),
                  email: (item) => (
                    <td>
                      <CCol className="pl-1">
                        <span className="text-muted">no data</span>
                      </CCol>
                    </td>
                  ),
                  lastUpdate: (item) => (
                    <td>
                      <CCol className="pl-1">
                        <span className="">{convert_day_hours_minute(item.CreateDate)}</span>
                      </CCol>
                    </td>
                  ),
                  action: (item) => (
                    <td>
                      <CDropdown className="pr-1 d-flex justify-content-center">
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
                      </CDropdown>
                    </td>
                  ),
                }}
              />
              <CPagination
                className="pt-2"
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
