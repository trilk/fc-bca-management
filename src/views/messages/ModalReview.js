import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Imagedemo from "./photo/demo.jpeg";
import { faCheckCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import MsgImageType from "./MessageReport/MsgImageType";
import MsgListType from "./MessageReport/MsgListType";
import MsgTextType from "./MessageReport/MsgTextType";
import {
  CButton,
  CImg,
  CCol,
  CLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAlert,
  CRow,
  CLink,
} from "@coreui/react";
import "./messages.scss";
import { useState } from "react";
import { phonePreview } from "src/assets/icons/phone-preview";
import CIcon from "@coreui/icons-react";

const ReviewMsg = ({ onSubmit, message }) => {
  const { t } = useTranslation();
  //Modal
  const [large, setLarge] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CCol className="d-flex bd-highlight">
        <CCol className="pb-5 p-0 d-flex align-items-center">
          <CButton
            color="primary"
            className="mr-3"
            onClick={() => setLarge(!large)}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            {t("create-msg.btn-send")}
          </CButton>
          <CButton color="outline" onClick={() => onSubmit("Draft")}>
            {t("create-msg.btn-savedraft")}
          </CButton>
        </CCol>
        {/* Collapse review */}
        <CModal show={large} onClose={() => setLarge(!large)} size="lg">
          <CModalHeader closeButton>
            <CModalTitle>
              <h4>{t("create-msg.md-reviewmsg")}</h4>
            </CModalTitle>
          </CModalHeader>
          <CModalBody style={{ height: "80vh", overflow: "auto" }}>
            <CCol className="p-0 p-lg-3">
              {/* form Audience */}
              <CCol className="p-0">
                <CLabel>
                  <h5>{t("create-msg.md-lb-audience")}</h5>
                </CLabel>
                <CCol className="border rounded-lg p-0 py-3">
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                    <CCol
                      lg="3"
                      md="3"
                      sm="3"
                      xs="12"
                      className="text-muted py-1"
                    >
                      {t("create-msg.md-lb-channel")}
                    </CCol>
                    <CCol className="font-weight-bold">
                      {message.channel.name}
                    </CCol>
                  </CCol>
                  <hr />
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                    <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
                      {t("create-msg.md-lb-segment")}
                    </CCol>
                    <CCol className="font-weight-bold">
                      {message.segment.check
                        ? "Subscribed Users"
                        : message.segment.filter.map((item, index) => {
                            return <span key={index}>{item}</span>;
                          })}
                    </CCol>
                  </CCol>
                  <hr />
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                    <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
                      {t("create-msg.md-lb-user")}
                    </CCol>
                    <CCol className="font-weight-bold">100.000.000 Users</CCol>
                  </CCol>
                </CCol>
              </CCol>
              {/* End */}
              {/* Content */}
              <CCol className="p-0 py-4">
                <CLabel>
                  <h5>{t("create-msg.md-message")}</h5>
                </CLabel>
                {message.type === "text" && <MsgTextType />}
                {message.type === "image" && <MsgImageType />}
                {message.type === "list" && <MsgListType />}
              </CCol>
              <CCol className="p-0">
                <CLabel>
                  <h5>{t("create-msg.md-lb-schedule")}</h5>
                </CLabel>
                <CCol className="border rounded p-0 py-4">
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                    <CCol
                      xxl="3"
                      xl="3"
                      lg="3"
                      md="3"
                      sm="3"
                      xs="12"
                      className="text-muted"
                    >
                      {t("create-msg.md-lb-send")}
                    </CCol>
                    <CCol className="font-weight-bold">
                      {message.schedule.check
                        ? "Send right away"
                        : message.schedule.filter}
                    </CCol>
                  </CCol>
                </CCol>
              </CCol>
            </CCol>
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center">
            <CButton color="ghost" onClick={() => setLarge(!large)}>
              {t("detail-msg.md-btn-change")}
            </CButton>
            <CButton
              color="primary"
              onClick={() =>
                onSubmit(message.schedule.check ? "OneTime" : "Schedule")
              }
            >
              <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
              {t("detail-msg.md-btn-send")}
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    </>
  );
};

export default ReviewMsg;
