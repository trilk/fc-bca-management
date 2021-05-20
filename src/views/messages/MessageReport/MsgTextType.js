import React from "react";
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
import { CButton, CCol, CImg, CLabel } from "@coreui/react";

const MsgListType = ({ message }) => {
  const { t } = useTranslation();
  return (
    <>
      <CCol className="border rounded p-0 py-3">
        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
          <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
            Type Message
          </CCol>
          <CCol className="font-weight-bold">Message Text</CCol>
        </CCol>
        <hr />
        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
          <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
            <span>{t("detail-msg.msg-title")}</span>
          </CCol>
          <CCol className="font-weight-bold">{message.title}</CCol>
        </CCol>
        <hr />
        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
          <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
            {t("detail-msg.msg-content")}
          </CCol>
          <CCol className="font-weight-bold">{message.content}</CCol>
        </CCol>
      </CCol>
    </>
  );
};

export default MsgListType;
