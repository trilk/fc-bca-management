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

const MsgImageType = ({ image,content }) => {
  const { t } = useTranslation();
  return (
    <>
      <CCol className="border rounded p-0 py-3">
        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
          <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
            Type Message
          </CCol>
          <CCol className="font-weight-bold">Message Image</CCol>
        </CCol>
        <hr className="mt-3" />
        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
          <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
            {t("detail-msg.lb-image")}
          </CCol>
          <CCol className="font-weight-bold">
            <CImg
              src={image}
              height="120"
              width="120"
              className="rounded bg-light"
            />
          </CCol>
        </CCol>
        <hr />
        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
          <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
            {t("detail-msg.msg-content")}
          </CCol>
          <CCol className="font-weight-bold">
            {content}
          </CCol>
        </CCol>
      </CCol>
    </>
  );
};

export default MsgImageType;
