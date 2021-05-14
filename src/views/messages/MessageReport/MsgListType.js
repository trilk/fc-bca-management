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

const MsgListType = ({ MsgList }) => {
  const { t } = useTranslation();
  return (
    <>
      <CCol className="border rounded p-0 py-3">
        <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
          <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
            {t("msg-list.lb-type")}
          </CCol>
          <CCol className="font-weight-bold">{t("msg-list.title")}</CCol>
        </CCol>
        <hr className="mt-3" />
        {/* Message List */}
        {MsgList.map((item, index) => {
          return (
            <CCol className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center py-2">
                <CLabel className="font-weight-bold">{t("msg-list.lb-list")} {index + 1}</CLabel>
                <div className="ml-auto"></div>
              </div>
              <CCol className="d-flex flex-row border rounded bg-light py-3">
                <div className="bg__img">
                  <CImg src={item.image} className="img" />
                </div>
                <CCol className="d-flex flex-column pl-3 p-0">
                  <strong>{item.title}</strong>
                  <span className="d-flex flex-wrap">{item.content}</span>
                  <small className="primary-color">
                    <u> {item.url}</u>
                  </small>
                </CCol>
              </CCol>
            </CCol>
          );
        })}
      </CCol>
    </>
  );
};

export default MsgListType;
