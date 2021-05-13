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
  faPager,
  faPaperPlane,
  faCommentSlash,
  faClock,
  faCommentAlt,
  faTimesCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";
import CIcon from "@coreui/icons-react";
import "./messages.scss";
import {
  CBadge,
  CButton,
  CProgress,
  CCol,
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
} from "@coreui/react";

//lodash
import _ from "lodash";

// helpers
import { convert_day_hours_minute } from "../../helpers/convertdate";

//api service
import MessageService from "../../services/message.service";

//redux and actions
import { useDispatch } from "react-redux";
import { setMessage } from "../../actions/message";
const getBadge = (status) => {
  switch (status) {
    case "Draft":
      return "light";
    default:
      return "success";
  }
};

//limit page
const limit = 15;
const Messages = () => {
  const { t } = useTranslation();
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
    if (response.status === 200) {
      setData(response.data);
    }
  };

  //effect afert page render
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    getAllMessage();
  }, [currentPage, page]);
  return (
    <>
      <CRow>
        <CCol xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
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
                        placeholder={t("message-list.ph-search")}
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
                          <span>{t("message-list.ft-title")}</span>
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
                              {t("message-list.tt-header")}
                            </span>
                          </CDropdownHeader>
                          <CDropdownDivider />
                          <CForm className="px-3 py-2">
                            <CCol className="p-0 d-flex flex-column pb-3">
                              <CLabel htmlFor="exampleDropdownFormEmail1">
                                <span style={{ fontSize: 14, fontWeight: 700 }}>
                                  {t("message-list.ft-typemsg")}
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
                                      {t("message-list.lb-message")}
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
                                      {t("message-list.lb-draft")}
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
                                      {t("message-list.lb-schedule")}
                                    </span>
                                  </CLabel>
                                </CFormGroup>
                              </CCol>
                            </CCol>
                            <CCol className="p-0" lg="12">
                              <CLabel htmlFor="exampleDropdownFormEmail1">
                                <span style={{ fontSize: 14, fontWeight: 700 }}>
                                  {t("message-list.ft-typedate")}
                                </span>
                              </CLabel>
                              <CCol className="p-0">
                                <CFormGroup>
                                  <CLabel htmlFor="exampleDropdownFormEmail1">
                                    <span className="text-muted small">
                                      {t("message-list.lb-startdate")}
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
                                      {t("message-list.lb-enddate")}
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
                                    {t("message-list.btn-reset")}
                                  </CButton>
                                  <CButton color="primary" type="submit">
                                    {t("message-list.btn-submit")}
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
                          <span>{t("message-list.btn-createmsg")}</span>
                        </CButton>
                      </CLink>
                    </div>
                    {/* End */}
                  </CCol>
                </CCol>
              </CRow>
              {/* Table */}
              <CDataTable
                items={data}
                fields={[
                  { key: "label", label: "", _style: { width: "1%" } },
                  {
                    key: "message",
                    label: "message",
                    _style: { width: "15%" },
                  },
                  {
                    key: "delivery",
                    _style: { width: "4%" },
                  },
                  {
                    key: "channel",
                    label: "Channel",
                    _style: { width: "2%" },
                  },
                  {
                    key: "createBy",
                    label: "CreateBy",
                    _style: { width: "3%" },
                  },
                  {
                    key: "type",
                    label: "Type Message",
                    _style: { width: "1%" }
                  },
                  // {
                  //   key: "type",
                  //   label: "type",
                  //   _style: { width: "1%" },
                  // },
                  {
                    key: "action",
                    label: "action",
                    _style: { width: "1%" },
                  },
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
                  message: (item) => (
                    <td>
                      {/* <h6
                        htmlFor="titleMessage"
                        className="text-gray-800 tags-text1Line"
                        style={{ fontWeight: 700 }}
                      >
                        {item.title}
                      </h6> */}
                      <h6
                        className="tags-text text-gray-800 pb-1"
                        style={{ fontWeight: 600 }}
                      >
                        {item.content}
                      </h6>
                      <div>
                        <CBadge
                          className="badge-status mr-2"
                          color={getBadge(item.type)}
                        >
                          {item.type}
                        </CBadge>
                        <small>
                          {convert_day_hours_minute(item.createdAt)}
                        </small>
                      </div>
                    </td>
                  ),
                  type: (item) => (
                    <td>
                      <CBadge className="badge-status border-primary-light" color="secondary">Image Message</CBadge>
                    </td>
                  ),
                  channel: (item) => (
                    <td>
                      {/* Viber */}
                      {item.channel.type == "Viber" && (
                        <div className="d-flex flex-row align-items-end">
                          <FontAwesomeIcon
                            icon={faViber}
                            size="lg"
                            className="channel-icon mr-2"
                            style={{ color: "#665CAC" }}
                          />
                          <span className="tags-text1Line">
                            Chatbot Tesolf Zalo
                          </span>
                        </div>
                      )}
                      {/* Zalo */}
                      {item.channel.type == "Zalo" && (
                        <div className="d-flex flex-row align-items-center">
                          <CIcon name="zaloIcon" size="lg" className="mr-2" />
                          <span className="tags-text1Line">
                            Zalo Channel
                          </span>
                        </div>
                      )}
                    </td>
                  ),
                  //creat at
                  // createAt: (item) => (
                  //   <td>
                  //     <span>{convert_day_hours_minute(item.createdAt)}</span>
                  //   </td>
                  // ),
                  //create by
                  createBy: (item) => (
                    <td>
                      <span>
                        {/* <FontAwesomeIcon icon={faUserEdit} className="mr-2" /> */}
                        {item.createdBy.lastName +
                          " " +
                          item.createdBy.firstName}
                      </span>
                    </td>
                  ),
                  delivery: (item) => (
                    <td>
                      <div className="d-flex flex-column">
                        <div className="d-flex flex-row align-items-center">
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="mr-2 primary-color"
                            size="xs"
                          />
                          <strong>1.000.000</strong>
                          <small className="pl-2 text-muted d-inline">{t("message-list.td-delivered")}</small>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="mr-2 text-muted"
                            size="xs"
                          />
                          <strong>100</strong>
                          <small className="pl-2 text-muted">{t("message-list.td-remaining")}</small>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <FontAwesomeIcon
                            icon={faExclamationCircle}
                            className="mr-2 text-muted"
                            size="xs"
                          />
                          <strong>100</strong>
                          <small className="pl-2 text-muted">{t("message-list.td-failed")}</small>
                        </div>
                      </div>
                    </td>
                  ),
                  //message type
                  // type: (item) => (
                  //   <td>
                  //     <CCol className="p-0">
                  //       <CBadge
                  //         className="badge-status"
                  //         color={getBadge(item.type)}
                  //       >
                  //         {item.type}
                  //       </CBadge>
                  //     </CCol>
                  //   </td>
                  // ),
                  //button action
                  action: (item) => (
                    <td>
                      <CDropdown className="pl-2">
                        <CDropdownToggle color="ghost">
                          <FontAwesomeIcon
                            icon={faEllipsisV}
                            style={{ width: 12, height: 12 }}
                          />
                        </CDropdownToggle>
                        <CDropdownMenu
                          placement="bottom-end"
                        // className="position-absolute"
                        >
                          <CDropdownItem onClick={() => onGetDetail(item)}>
                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                            {t("message-list.it-details")}
                          </CDropdownItem>
                          <CDropdownItem>
                            {/* Edit message wwith message draft and schedule */}
                            <CLink to="/EditMsg">
                              <FontAwesomeIcon icon={faPen} className="mr-2" />
                              {t("message-list.it-edit")}
                            </CLink>
                          </CDropdownItem>
                          <CDropdownItem>
                            <FontAwesomeIcon icon={faCopy} className="mr-2" />
                            {t("message-list.it-duplicate")}
                          </CDropdownItem>
                          <CDropdownDivider />
                          <CDropdownItem
                            className="danger-color"
                            onClick={() => setDanger(!danger)}
                          >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            {t("message-list.it-delete")}
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>{" "}
                    </td>
                  ),
                }}
              />
              <CPagination
                className="pt-3 d-flex flex-wrap py-2 mr-3 "
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
              <CModalTitle>{t("message-list.md-delete")}</CModalTitle>
            </CModalHeader>
            <CModalBody>{t("message-list.md-content")}</CModalBody>
            <CModalFooter>
              <CButton color="outline">{t("message-list.md-btncancel")}</CButton>{" "}
              <CButton color="primary">{t("message-list.md-btndelete")}</CButton>
            </CModalFooter>
          </CModal>
        </CCol>
      </CRow>
    </>
  );
};

export default Messages;
