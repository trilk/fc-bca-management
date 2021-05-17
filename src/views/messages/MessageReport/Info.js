import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {convert_day_hours_minute} from "../../../helpers/convertdate";
import {
  faPen,
  faCopy,
  faSortDown,
  faTimes,
  faChartLine,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CLabel } from "@coreui/react";
import React, { useEffect, useState } from "react";
const Info = ({ createdBy, createdAt }) => {
  const { t } = useTranslation();
  return (
    <>
      <CCol className="p-0 pb-4">
        <CLabel className="d-flex flex-row">
          <h4>{t("detail-msg.lb-detail")}</h4>
          <div className="ml-auto d-block d-sm-none">
            <CButton color="secondary">{t("detail-msg.btn-preview")}</CButton>
          </div>
        </CLabel>
        <CCol className="border rounded-lg p-0 py-3">
          <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
            <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
              <span>{t("detail-msg.lb-createby")}</span>
            </CCol>
            <CCol className="font-weight-bold">
              <span>{createdBy.lastName + " " + createdBy.firstName}</span>
            </CCol>
          </CCol>
          <hr />
          <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
            <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
              <span>{t("detail-msg.lb-lastupdate")}</span>
            </CCol>
            <CCol className="font-weight-bold">
              <span>{convert_day_hours_minute(createdAt)}</span>
            </CCol>
          </CCol>
        </CCol>
      </CCol>
      {/* End */}
    </>
  );
};

export default Info;
