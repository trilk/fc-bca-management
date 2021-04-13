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
} from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import "./contacts.scss";
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
const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const getSubscriber = (Subscriber) => {
  switch (Subscriber) {
    case "subscribed":
      return true;
    case "unsubscribed":
      return false;
  }
};

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
                  {
                    key: "subscribed",
                    label: "subscribed",
                    _style: { width: "2%" },
                  },
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
                  { key: "status", label: "status", _style: { width: "2%" } },
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
                itemsPerPage={15}
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
                        {item.ChannelType == "Viber" && (
                          <FontAwesomeIcon
                            icon={faViber}
                            className="channel-icon mr-2"
                            style={{ color: "#665CAC" }}
                          />
                        )}
                        {item.ChannelType == "Zalo" && (
                          <CIcon
                            name="zaloIcon"
                            className="channel-icon mr-2 zalo-icon"
                          />
                        )}
                        {item.ChannelType == "Telegram" && (
                          <FontAwesomeIcon
                            icon={faTelegram}
                            className="channel-icon mr-2"
                            style={{ color: "#0088cc" }}
                          />
                        )}
                      </CCol>
                    </td>
                  ),
                  subscribed: (item) => (
                    <td>
                      <CCol className="d-flex justify-content-center pr-5">
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
                  status: (item) => (
                    <td>
                      <CBadge
                        className="badge-status"
                        color={getBadge(item.status)}
                      >
                        {item.status}
                      </CBadge>
                    </td>
                  ),
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
        {/* </CCol> */}
      </CRow>
    </>
  );
};

export default Contacts;
