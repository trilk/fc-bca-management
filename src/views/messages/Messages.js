import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filter from "./Filter";
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
import message from "src/reducers/message";
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
                  <CCol className="d-flex flex-row p-0">
                    {/* Start Filter */}
                    <Filter />
                    {/* End Filter */}
                    {/* Start Button create */}
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
                    label: `${t("message-list.th-message")}`,
                    _style: { width: "15%" },
                  },
                  {
                    key: "delivery",
                    label: `${t("message-list.th-delivery")}`,
                    _style: { width: "3%" },
                  },
                  {
                    key: "channel",
                    label: `${t("message-list.th-channel")}`,
                    _style: { width: "3%" },
                  },
                  {
                    key: "createBy",
                    label: `${t("message-list.th-createby")}`,
                    _style: { width: "3%" },
                  },
                  {
                    key: "type",
                    label: `${t("message-list.th-type")}`,
                    _style: { width: "1%" },
                  },
                  {
                    key: "action",
                    label: "",
                    _style: { width: "1%" },
                  },
                ]}
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
                      <h6
                        className="tags-text text-gray-800"
                        style={{ fontWeight: 600 }}
                      >
                        {item.content === ""
                          ? item.list[0].content
                          : item.content}
                      </h6>
                      <div>
                        <small>
                          {convert_day_hours_minute(item.createdAt)}
                        </small>
                      </div>
                    </td>
                  ),
                  type: (item) => (
                    <td>
                      <CBadge className="badge-status" color="success">
                        {item.type === "list" && `${t("msg-list.title")}`}
                        {item.type === "text" && `${t("msg-text.title")}`}
                        {item.type === "image" && `${t("msg-image.title")}`}
                      </CBadge>
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
                            {item.channel.name}
                          </span>
                        </div>
                      )}
                      {/* Zalo */}
                      {item.channel.type == "Zalo" && (
                        <div className="d-flex flex-row align-items-center">
                          <CIcon name="zaloIcon" className="mr-2 zaloIcon" />
                          <span className="tags-text1Line">
                            {item.channel.name}
                          </span>
                        </div>
                      )}
                    </td>
                  ),
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
                          <small className="pl-2 text-muted d-inline">
                            {t("message-list.td-delivered")}
                          </small>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="mr-2 text-muted"
                            size="xs"
                          />
                          <strong>100</strong>
                          <small className="pl-2 text-muted">
                            {t("message-list.td-remaining")}
                          </small>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                          <FontAwesomeIcon
                            icon={faExclamationCircle}
                            className="mr-2 text-muted"
                            size="xs"
                          />
                          <strong>100</strong>
                          <small className="pl-2 text-muted">
                            {t("message-list.td-failed")}
                          </small>
                        </div>
                      </div>
                    </td>
                  ),
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
              <CButton color="outline">
                {t("message-list.md-btncancel")}
              </CButton>{" "}
              <CButton color="primary">
                {t("message-list.md-btndelete")}
              </CButton>
            </CModalFooter>
          </CModal>
        </CCol>
      </CRow>
    </>
  );
};

export default Messages;
