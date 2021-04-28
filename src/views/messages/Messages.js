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
  faEnvelope,
  faCommentDots,
  faUserEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import "./messages.scss";
import femaleimg from "../users/avatar/female.jpg";
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
  CProgressBar,
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
} from "@coreui/react";

//lodash
import _ from "lodash";

import { faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";

//api service
import MessageService from "../../services/message.service";

//redux and actions
import { useDispatch } from "react-redux";
import { setMessage } from "../../actions/message";
const getBadge = (status) => {
  switch (status) {
    case "Draft":
      return "warning";
    default:
      return "success";
  }
};

//limit page
const limit = 15;
const Messages = () => {
  // history react router
  const history = useHistory();

  //dispatch redux
  const dispatch = useDispatch();

  //pagination core ui
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/messages?page=${newPage}`);
  };
  //end pagination

  //Modal
  const [danger, setDanger] = useState(false);

  // go to message detail
  const onGetDetail = (item) => {
    dispatch(setMessage(item));
    return history.push(`/messages/${item._id}`);
  };

  //message data
  const [data, setData] = useState();

  //get all messages
  const getAllMessage = async () => {
    const response = await MessageService.getAllMessage(page, limit);
    if (response.data.errorCode === 0) {
      setData(response.data.messages);
    }
  };

  //effect afert page render
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    getAllMessage();
  }, [currentPage, page]);
  if (_.isNil(data)) {
    return <></>;
  }
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CRow>
                <CCol className="d-flex flex-lg-row flex-md-row flex-sm-row flex-column">
                  {/* search */}
                  <CCol className="p-0" lg="2" md="4" sm="4">
                    <CFormGroup className="form-group2 has-search">
                      <span className="form-control-feedback mt-1 ml-2">
                        <FontAwesomeIcon
                          icon={faSearch}
                          style={{ height: 18, width: 18 }}
                        />
                      </span>
                      <CInput
                        id=""
                        type="text"
                        size="lg"
                        placeholder="Search"
                        required
                        className="form-control2"
                      />
                    </CFormGroup>
                  </CCol>
                  {/* End Search */}
                  {/* Start Filter */}
                  <CCol className="d-flex flex-row p-0">
                    <div className="pr-3 ml-lg-auto ml-sm-auto ml-md-auto d-inline">
                      <CDropdown>
                        <CDropdownToggle
                          color="secondary"
                          size="lg"
                          className="d-flex align-items-center"
                        >
                          <FontAwesomeIcon icon={faFilter} className="mr-2" />
                          <span>Filter</span>
                        </CDropdownToggle>
                        <CDropdownMenu className="mt-2">
                          <CDropdownHeader className="mr-5">
                            <span
                              style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#181c32",
                              }}
                              className="mr-5"
                            >
                              Filter Options
                            </span>
                          </CDropdownHeader>
                          <CDropdownDivider />
                          <CForm className="px-3 py-2">
                            <CCol className="p-0 d-flex flex-column pb-3">
                              <CLabel htmlFor="exampleDropdownFormEmail1">
                                <span style={{ fontSize: 14, fontWeight: 700 }}>
                                  Filter Type Messages:
                                </span>
                              </CLabel>
                              <CCol className="p-0 d-flex flex-column">
                                <CFormGroup
                                  variant="custom-radio"
                                  inline
                                  className="pb-2"
                                >
                                  <CInputRadio
                                    custom
                                    id="inline-radio1"
                                    name="inline-radios"
                                    value="option1"
                                  />
                                  <CLabel
                                    variant="custom-checkbox"
                                    htmlFor="inline-radio1"
                                  >
                                    <span
                                      style={{ fontWeight: 500 }}
                                      className="text-muted"
                                    >
                                      Messages
                                    </span>
                                  </CLabel>
                                </CFormGroup>
                                <CFormGroup
                                  variant="custom-radio"
                                  inline
                                  className="pb-2"
                                >
                                  <CInputRadio
                                    custom
                                    id="inline-radio2"
                                    name="inline-radios"
                                    value="option2"
                                  />
                                  <CLabel
                                    variant="custom-checkbox"
                                    htmlFor="inline-radio2"
                                  >
                                    <span
                                      style={{ fontWeight: 500 }}
                                      className="text-muted"
                                    >
                                      Draft
                                    </span>
                                  </CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-radio" inline>
                                  <CInputRadio
                                    custom
                                    id="inline-radio2"
                                    name="inline-radios"
                                    value="option2"
                                  />
                                  <CLabel
                                    variant="custom-checkbox"
                                    htmlFor="inline-radio2"
                                  >
                                    <span
                                      style={{ fontWeight: 500 }}
                                      className="text-muted"
                                    >
                                      Schedule
                                    </span>
                                  </CLabel>
                                </CFormGroup>
                              </CCol>
                            </CCol>
                            <CCol className="p-0" lg="12">
                              <CLabel htmlFor="exampleDropdownFormEmail1">
                                <span style={{ fontSize: 14, fontWeight: 700 }}>
                                  Date Filter:
                                </span>
                              </CLabel>
                              <CCol className="p-0">
                                <CFormGroup>
                                  <CLabel htmlFor="exampleDropdownFormEmail1">
                                    <span className="text-muted small">
                                      Start Date
                                    </span>
                                  </CLabel>
                                  <CInput
                                    className="form-control"
                                    id="exampleDropdownFormEmail1"
                                    type="date"
                                    placeholder="email@example.com"
                                    autoComplete="email"
                                  />
                                </CFormGroup>
                              </CCol>
                              <CCol className="p-0 pb-2">
                                <CFormGroup>
                                  <CLabel htmlFor="exampleDropdownFormEmail1">
                                    <span className="text-muted small">
                                      End Date
                                    </span>
                                  </CLabel>
                                  <CInput
                                    className="form-control"
                                    id="exampleDropdownFormEmail1"
                                    type="date"
                                    placeholder="email@example.com"
                                    autoComplete="email"
                                  />
                                </CFormGroup>
                              </CCol>
                              <CDropdownDivider />
                              <CCol className="p-0 py-2">
                                <CFormGroup className="mt-2 float-right">
                                  <CButton color="ghost" className="mr-2">
                                    Reset
                                  </CButton>
                                  <CButton color="primary" type="submit">
                                    Submit
                                  </CButton>
                                </CFormGroup>
                              </CCol>
                            </CCol>
                          </CForm>
                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                    {/* End Filter */}
                    {/* Start Create */}
                    <div className="p-0">
                      <CLink to="/messages/CreateMsg">
                        <CButton size="lg" color="primary">
                          <FontAwesomeIcon
                            icon={faPlusCircle}
                            className="mr-2"
                          />
                          <span>Create Message</span>
                        </CButton>
                      </CLink>
                    </div>
                    {/* End */}
                  </CCol>
                </CCol>
              </CRow>
              <CDataTable
                items={data}
                fields={[
                  { key: "label", label: "", _style: { width: "1%" } },
                  {
                    key: "content",
                    label: "content",
                    _style: { width: "15%" },
                  },
                  { key: "channel", label: "Channel", _style: { width: "2%" } },
                  {
                    key: "type",
                    label: "type",
                    _style: { width: "1%" },
                  },
                  {
                    key: "createAt",
                    label: "Create At",
                    _style: { width: "2%" },
                  },
                  { key: "action", label: "action", _style: { width: "1%" } },
                ]}
                // hover
                bordered
                striped
                itemsPerPage={limit}
                activePage={page}
                clickableRows
                scopedSlots={{
                  label: (item) => (
                    <td className="p-0">
                      <CCol className="d-flex justify-content-center">
                        <FontAwesomeIcon
                          icon={faCommentDots}
                          className="text-gray-400"
                        />
                      </CCol>
                    </td>
                  ),
                  //name
                  content: (item) => (
                    <td>
                      <span
                        htmlFor="titleMessage"
                        className="text-gray-800 tags-text"
                        style={{ fontSize: 15, fontWeight: 700 }}
                      >
                        {item.Title}
                      </span>
                      <div className="py-2">
                        <span
                          className="tags-text text-gray-800"
                          style={{ fontWeight: 600 }}
                          maxLength={100}
                        >
                          {item.ContentOTT}
                        </span>
                      </div>
                      <CTooltip content={`User Create message`}>
                        <span className="small font-weight-bold text-gray-400">
                          <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
                          {item.CreateBy.LastName +
                            " " +
                            item.CreateBy.FirstName}
                        </span>
                      </CTooltip>
                      {/* <div className="small text-muted">
                                                    <span>Create Date: {item.createDate}</span>
                                                </div> */}
                      {/* tags draf schedule */}
                      {/* <div className="pt-2">
                                                    <CBadge className="mr-1 badge-status" color="light">Messages</CBadge>
                                                    <CBadge className="mr-1 badge-status" color="danger">Schedule</CBadge>
                                                </div> */}
                    </td>
                  ),
                  channel: (item) => (
                    <td>
                      <CCol className="p-2 d-flex flex-row bd-highlight">
                        {/* channels icon */}
                        {item.ChannelId.ChannelType === "Viber" && (
                          <FontAwesomeIcon
                            icon={faViber}
                            className="channel-icon"
                            style={{ color: "#665CAC" }}
                          />
                        )}
                        {item.ChannelId.ChannelType === "Zalo" && (
                          <CIcon
                            name="zaloIcon"
                            style={{ height: 18, width: 18 }}
                          />
                        )}
                        {item.ChannelId.ChannelType === "Telegram" && (
                          <FontAwesomeIcon
                            icon={faTelegram}
                            className="channel-icon"
                            style={{ color: "#0088cc" }}
                          />
                        )}
                      </CCol>
                    </td>
                  ),
                  //creat at
                  createAt: (item) => (
                    <td>
                      <div>
                        <span>{item.CreateDate}</span>
                        <br />
                      </div>
                      <div className="small text-muted">
                        <span>Create at</span>
                      </div>
                    </td>
                  ),
                  //delivery
                  //   delivery: (item) => (
                  //     <td>
                  //       <CCol className="p-0">
                  //         <div className="d-flex flex-column">
                  //           <span className="pb-1">100%</span>
                  //           <CProgress
                  //             color="info"
                  //             value={100}
                  //             className="delivery-progress"
                  //             size="sm"
                  //           />
                  //         </div>
                  //       </CCol>
                  //     </td>
                  //   ),
                  //

                  //message type
                  type: (item) => (
                    <td>
                      <CCol className="p-0">
                        <CBadge
                          className="badge-status mt-2"
                          color={getBadge(item.Type)}
                        >
                          {item.Type}
                        </CBadge>
                      </CCol>
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
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => onGetDetail(item)}>
                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                            View details
                          </CDropdownItem>
                          <CDropdownItem>
                            {/* Edit message wwith message draft and schedule */}
                            <CLink to="/messages/EditMsg">
                              <FontAwesomeIcon icon={faPen} className="mr-2" />
                              Edit
                            </CLink>
                          </CDropdownItem>
                          <CDropdownItem>
                            <FontAwesomeIcon icon={faCopy} className="mr-2" />
                            Duplicate
                          </CDropdownItem>
                          <CDropdownDivider />
                          <CDropdownItem
                            className="danger-color"
                            onClick={() => setDanger(!danger)}
                          >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            Delete
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>{" "}
                    </td>
                  ),
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
            alignment="center"
          >
            <CModalHeader closeButton>
              <CModalTitle>Message Delete</CModalTitle>
            </CModalHeader>
            <CModalBody>Are you want delete this Message?</CModalBody>
            <CModalFooter>
              <CButton color="outline">Cancel</CButton>
              <CButton color="primary">Delete</CButton>
            </CModalFooter>
          </CModal>
        </CCol>
      </CRow>
    </>
  );
};

export default Messages;
