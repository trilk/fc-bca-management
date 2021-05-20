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
import {CCol, CLabel } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { faViber } from "@fortawesome/free-brands-svg-icons";
const AudienceInfo = ({ channel }) => {
  const { t } = useTranslation();
  return (
    <>
      {/* Audience */}
      <CCol className="p-0">
        <CLabel>
          <h4>{t("detail-msg.lb-audience")}</h4>
        </CLabel>
        <CCol className="border rounded-lg p-0 py-3">
          <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
            <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
              {t("detail-msg.lb-channel")}
            </CCol>
            <CCol className="font-weight-bold">
              {channel.type === "Viber" && <FontAwesomeIcon icon={faViber} size="lg" style={{color:"#665CAC"}} />}
              {channel.type === "Zalo" && (
                <CIcon name="zaloIcon" className="mr-2 zaloIcon" />
              )}
              <span className="ml-2">{channel.name}</span>
            </CCol>
          </CCol>
          <hr />
          <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
            <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
              {t("detail-msg.lb-segment")}
            </CCol>
            <CCol className="font-weight-bold">
              Subscribed Users, Segment 2 Holoa
            </CCol>
          </CCol>
          <hr />
          <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
            <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
              {t("detail-msg.lb-recipients")}
            </CCol>
            <CCol className="font-weight-bold">
              100.000.000 {t("detail-msg.lb-users")}
            </CCol>
          </CCol>
        </CCol>
      </CCol>
      {/* End */}
    </>
  );
};

export default AudienceInfo;
