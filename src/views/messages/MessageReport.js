import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  faPen,
  faCopy,
  faSortDown,
  faTimes,
  faChartLine,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import "./messages.scss";
import {
  CCardBody,
  CRow,
  CDropdown,
  CProgress,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
  CCol,
  CCard,
  CLabel,
  CImg,
  CDropdownDivider,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import Imagedemo from "./photo/demo.jpeg";

//lodash
import _ from "lodash";

import { useParams } from "react-router-dom";

//api
import MessageService from "../../services/message.service";

//redux
import { useSelector } from "react-redux";

// helpers
import { convert_day_hours_minute } from "../../helpers/convertdate";
import {
  faFantasyFlightGames,
  faFly,
} from "@fortawesome/free-brands-svg-icons";

const MessageReport = () => {
  const { t } = useTranslation();
  const [messageDetail, setMessageDetail] = useState({});
  const { id } = useParams();
  //get message detail by id

  const getDetailMessageById = async () => {
    const response = await MessageService.getDetailMessageById(id);
    if (response.status === 200 || response.status === 201) {
      setMessageDetail(response.data);
    }
  };

  const onSendMessage = async () => {
    await MessageService.sendMessage({
      id: messageDetail._id,
    }).then((response) => {
      console.log("response", response);
    });
  };
  useEffect(() => {
    getDetailMessageById();
  }, []);

  //return
  if (_.isEmpty(messageDetail)) {
    return <p>Loading...</p>;
  }
  return (
    <CRow>
      {/* Begign Title  */}
      <CCol className="d-flex flex-row p-3 py-2" xxl={12} xl={12} lg={12}>
        <CCol className="p-0 d-flex flex-column">
          <h4 className="pb-1">
            <FontAwesomeIcon icon={faChartLine} className="mr-3" />
            <strong>{t("detail-msg.title")}</strong>
          </h4>
          <span style={{ fontSize: 16, fontWeight: 700 }}>
            {messageDetail.Title}
          </span>
          <span>
          {t("detail-msg.lb-sentat")}
            {convert_day_hours_minute(messageDetail.createdAt)}
          </span>
        </CCol>
        <div className="p-0 ml-auto">
          <CDropdown className="ml-3">
            <CDropdownToggle
              color="secondary"
              variant="outline"
              size="md"
              className="d-flex align-items-center"
            >
              <span>{t("detail-msg.btn-dropdown")}</span>
              <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
            </CDropdownToggle>
            <CDropdownMenu className="mt-2">
              {/* edit with status schedule */}
              <CDropdownItem checked>
                <FontAwesomeIcon icon={faPen} className="mr-2" />
                {t("detail-msg.dropdown-edit")}
              </CDropdownItem>
              <CDropdownItem>
                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                {t("detail-msg.dropdown-duplicate")}
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem
                className="primary-color"
                onClick={() => onSendMessage()}
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                Send
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem className="danger-color">
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                {t("detail-msg.dropdown-delete")}
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </CCol>
      {/* End */}
      {/* Messages Statistics */}
      <CCol
        className="d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-wrap flex-column pb-3"
        xxl={12}
        xl={12}
        lg={12}
        md={12}
        sm={12}
      >
        {/* Begin Totals Messages */}
        <CCol
          className="d-flex flex-column py-3 rounded-lg bg-white p-0 mr-lg-4 my-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.01) 0px 4px 10px" }}
        >
          <div className="text-muted pb-2 d-flex align-items-center justify-content-center">
            <span>
              <FontAwesomeIcon icon={faPaperPlane} size="xs" className="mr-2" />
              {t("detail-msg.box-recipients")}
            </span>
          </div>
          <span
            className="d-flex justify-content-center"
            style={{ fontSize: 26, fontWeight: 700 }}
          >
            1.200.000
          </span>
        </CCol>
        {/* End total Messages */}
        {/* Begin Totals Messages */}
        <CCol
          className="d-flex flex-column py-3 rounded-lg bg-white p-0 mr-lg-4 my-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.01) 0px 4px 10px" }}
        >
          <span className="text-muted pb-2 d-flex justify-content-center">
          {t("detail-msg.box-delivered")}
          </span>
          <span
            className="d-flex justify-content-center"
            style={{ fontSize: 26, fontWeight: 700 }}
          >
            1.200.000
          </span>
        </CCol>
        {/* End total Messages */}
        {/* Begin Totals Messages */}
        <CCol
          className="d-flex flex-column py-3 rounded-lg bg-white p-0 mr-lg-4 my-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.01) 0px 4px 10px" }}
        >
          <span className="text-muted pb-2 d-flex justify-content-center">
          {t("detail-msg.box-remaining")}
          </span>
          <span
            style={{ fontSize: 26, fontWeight: 700 }}
            className="d-flex justify-content-center"
          >
            900.00
          </span>
        </CCol>
        {/* End total Messages */}
        {/* Begin Totals Messages */}
        <CCol
          className="d-flex flex-column py-3 rounded-lg bg-white p-0 my-2"
          style={{ boxShadow: "rgba(0, 0, 0, 0.01) 0px 4px 10px" }}
        >
          <span className="text-muted pb-2 d-flex justify-content-center">
          {t("detail-msg.box-fail")}
          </span>
          <span
            style={{ fontSize: 26, fontWeight: 700 }}
            className="d-flex justify-content-center"
          >
            9
          </span>
        </CCol>
        {/* End total Messages */}
      </CCol>
      <CCol>
        <CCard>
          <CCardBody>
            <CCol className="p-0 d-flex flex-lg-row flex-column">
              {/* Col left */}
              <CCol col="6" lg="6" md="12" className="p-0">
                {/* form Audience */}
                <CCol className="p-0 pb-4">
                  <CLabel className="d-flex flex-row">
                    <h4>{t("detail-msg.lb-detail")}</h4>
                    <div className="ml-auto d-block d-sm-none">
                      <CButton color="secondary">{t("detail-msg.btn-preview")}</CButton>
                    </div>
                  </CLabel>
                  <CCol className="border rounded-lg p-0 py-3">
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                      <CCol
                        lg="3"
                        md="3"
                        sm="3"
                        xs="12"
                        className="text-muted"
                      >
                        <span>{t("detail-msg.lb-createby")}</span>
                      </CCol>
                      <CCol className="font-weight-bold">
                        <span>
                          {messageDetail.createdBy.lastName +
                            " " +
                            messageDetail.createdBy.firstName}
                        </span>
                      </CCol>
                    </CCol>
                    <hr />
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                      <CCol
                        lg="3"
                        md="3"
                        sm="3"
                        xs="12"
                        className="text-muted"
                      >
                        <span>{t("detail-msg.lb-lastupdate")}</span>
                      </CCol>
                      <CCol className="font-weight-bold">
                        <span>
                          {convert_day_hours_minute(messageDetail.updatedAt)}
                        </span>
                      </CCol>
                    </CCol>
                  </CCol>
                </CCol>
                {/* End */}
                {/* form Audience */}
                <CCol className="p-0">
                  <CLabel>
                    <h4>{t("detail-msg.lb-audience")}</h4>
                  </CLabel>
                  <CCol className="border rounded-lg p-0 py-3">
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2  ">
                      <CCol
                        lg="3"
                        md="3"
                        sm="3"
                        xs="12"
                        className="text-muted"
                      >
                        {t("detail-msg.lb-channel")}
                      </CCol>
                      <CCol className="font-weight-bold">
                        {messageDetail.channel.type}
                      </CCol>
                    </CCol>
                    <hr />
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                      <CCol
                        lg="3"
                        md="3"
                        sm="3"
                        xs="12"
                        className="text-muted"
                      >
                        {t("detail-msg.lb-segment")}
                      </CCol>
                      <CCol className="font-weight-bold">
                        Subscribed Users, Segment 2 Holoa
                      </CCol>
                    </CCol>
                    <hr />
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                      <CCol
                        lg="3"
                        md="3"
                        sm="3"
                        xs="12"
                        className="text-muted"
                      >
                        {t("detail-msg.lb-recipients")}
                      </CCol>
                      <CCol className="font-weight-bold">
                        100.000.000 {t("detail-msg.lb-users")}
                      </CCol>
                    </CCol>
                  </CCol>
                </CCol>
                {/* End */}
                {/* Content */}
                <CCol className="p-0 py-4">
                  <CLabel>
                    <h4>{t("detail-msg.lb-message")}</h4>
                  </CLabel>
                  <CCol className="border rounded p-0 py-3">
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                      <CCol
                        lg="3"
                        md="3"
                        sm="3"
                        xs="12" className="text-muted">
                        <span>{t("detail-msg.msg-title")}</span>
                      </CCol>
                      <CCol className="font-weight-bold">
                        {messageDetail.title}
                      </CCol>
                    </CCol>
                    <hr />
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                      <CCol
                        lg="3"
                        md="3"
                        sm="3"
                        xs="12" className="text-muted">
                        {t("detail-msg.msg-content")}
                      </CCol>
                      <CCol className="font-weight-bold">
                        {messageDetail.content}
                      </CCol>
                    </CCol>
                    <hr />
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                      <CCol
                        lg="3"
                        md="3"
                        sm="3"
                        xs="12" className="text-muted">
                        {t("detail-msg.lb-image")}
                      </CCol>
                      <CCol className="font-weight-bold">
                        <CImg
                          src={messageDetail.image}
                          height="80"
                          width="80"
                          className="rounded"
                        />
                      </CCol>
                    </CCol>
                    <hr />
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                      <CCol
                        lg="3"
                        md="3"
                        sm="3"
                        xs="12" className="text-muted">
                        {t("detail-msg.lb-url")}
                      </CCol>
                      <CCol
                        className="font-weight-bold"
                        style={{ cursor: "pointer", color: "#007BFF" }}
                      >
                        {messageDetail.link}
                      </CCol>
                    </CCol>
                  </CCol>
                </CCol>
                <CCol className="p-0">
                  <CLabel>
                    <h4>{t("detail-msg.lb-schedule")}</h4>
                  </CLabel>
                  <CCol className="border rounded p-0 py-4">
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                      <CCol
                        lg="3"
                        md="3"
                        sm="3"
                        xs="12" className="text-muted">
                       {t("detail-msg.lb-send")}
                      </CCol>
                      <CCol className="font-weight-bold">
                        {convert_day_hours_minute(messageDetail.schedule)}
                      </CCol>
                    </CCol>
                  </CCol>
                </CCol>
              </CCol>
              <CCol col="6" className="d-lg-block d-ms-block d-none">
                <div className="d-flex justify-content-center flex-column">
                  <strong className="pb-3 d-flex justify-content-center primary-color">
                  {t("detail-msg.col-preview")}
                  </strong>
                  <CIcon name="phonePreview" height="700" alt="Logo" />
                </div>
              </CCol>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default MessageReport;
