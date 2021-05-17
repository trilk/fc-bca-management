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
import "../messages/messages.scss";
// import femaleimg from '../users/avatar/female.jpg'
import {
  CBadge,
  CButton,
  CCol,
  CProgress,
  CDataTable,
  CTooltip,
  CCard,
  CCardBody,
  CRow,
} from "@coreui/react";
import messageData from "../messages/messageData";
import { faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";

const getBadge = (status) => {
  switch (status) {
    case "Delivered":
      return "primary";
    case "Sending":
      return "warning";
    case "Pause":
      return "danger";
    default:
      return "primary";
  }
};

const Messages = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  // const pageChange = newPage => {
  //     currentPage !== newPage && history.push(`/contacts?page=${newPage}`)
  // }

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/messages?page=${newPage}`);
  };
  return (
    <>
      <CCol xxl={12}>
        <CCard>
          <CCardBody>
            <CCol className="px-lg-3 px-md-3 px-sm-3 p-0 py-3">
              <CCol className="p-0 pb-3 d-flex flex-row">
                <div>
                  <h4>
                    <strong>Messages</strong>
                  </h4>
                  <span className="text-muted small">Lastest 3 Messages </span>
                </div>
                <div className="ml-auto">
                  <CButton color="secondary">All Messages</CButton>
                </div>
              </CCol>
              <CDataTable
                items={messageData}
                fields={[
                  { key: "type", label: "", _style: { width: "1%" } },
                  {
                    key: "content",
                    label: "content",
                    _style: { width: "15%" },
                  },
                  { key: "status", label: "status", _style: { width: "1%" } },
                  {
                    key: "delivery",
                    label: "delivery",
                    _style: { width: "1%" },
                  },
                  { key: "sent", label: "sent", _style: { width: "2%" } },
                  { key: "sentAt", label: "sentat", _style: { width: "4%" } },
                ]}
                bordered
                striped
                itemsPerPage={3}
                activePage={page}
                clickableRows
                scopedSlots={{
                  type: (item) => (
                    <td className="p-0">
                      <CCol className="d-flex justify-content-center p-lg-1 p-md-1">
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
                        Title Of Messages
                      </span>
                      <div className="py-2">
                        <span
                          className="tags-text text-gray-800"
                          style={{ fontWeight: 600 }}
                          maxLength={100}
                        >
                          {item.content}
                        </span>
                      </div>
                      <CTooltip content={`User Create message`}>
                        <span className="small font-weight-bold text-gray-400">
                          <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
                          NGUYEN VAN BA
                        </span>
                      </CTooltip>
                    </td>
                  ),
                  //sent
                  sent: (item) => (
                    <td>
                      <div>
                        <span>{item.sent}</span>
                        <br />
                      </div>
                      <div className="small text-muted">
                        <span>Users recieved Message</span>
                      </div>
                    </td>
                  ),
                  // delivery
                  delivery: (item) => (
                    <td>
                      <CCol className="p-0">
                        {item.delivery.includes("delivered") && (
                          <div className="d-flex flex-column">
                            <span className="pb-1">100%</span>
                            <CProgress
                              color="info"
                              value={100}
                              className="delivery-progress"
                              size="sm"
                            />
                          </div>
                        )}
                        {item.delivery.includes("sending") && (
                          <div className="d-flex flex-column">
                            <span className="pb-1">90%</span>
                            <CProgress
                              animated
                              color="warning"
                              value={90}
                              className="delivery-progress"
                              size="sm"
                            />
                          </div>
                        )}
                        {item.delivery.includes("pause") && (
                          <div className="d-flex flex-column">
                            <span className="pb-1">10%</span>
                            <CProgress
                              color="danger"
                              value={10}
                              size="sm"
                              className="delivery-progress"
                            />
                          </div>
                        )}
                      </CCol>
                    </td>
                  ),
                  //
                  // Trạng thái
                  status: (item) => (
                    <td>
                      <CCol className="p-0">
                        <CBadge
                          className="badge-status mt-2"
                          color={getBadge(item.status)}
                        >
                          {item.status}
                        </CBadge>
                      </CCol>
                    </td>
                  ),
                }}
              />
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default Messages;
