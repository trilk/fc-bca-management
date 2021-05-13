import React, { useEffect, useState } from "react";
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
const Statistics = () => {
  const { t } = useTranslation();
  return (
    <>
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
    </>
  );
};

export default Statistics;
