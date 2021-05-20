import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPlusCircle,
  faTimes,
  faChartPie,
  faUpload,
  faFileImage,
  faFileImport,
  faTimesCircle,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { CCol, CLabel, CTextarea, CFormGroup, CInput } from "@coreui/react";
import "../messages.scss";

const TextMsgType = ({ title, content, onValueChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <CCol className="p-0">
        <CLabel>
          <h6 className="font-weight-bold mb-0">{t("msg-text.title")}</h6>
          <small className="text-muted">{t("msg-text.description")}</small>
        </CLabel>
        <hr className="mt-0" />
        <CCol className="p-0">
          <CFormGroup>
            <CLabel htmlFor="">
              <span style={{ fontWeight: 600, fontSize: 14 }}>
                {t("msg-text.title-messages")}
              </span>
              <span className="danger-color pl-1">*</span>
            </CLabel>
            <CInput
              name="title"
              placeholder={t("msg-text.ph-message")}
              required
              onChange={(value) => onValueChange(value)}
              value={title}
            />
          </CFormGroup>
        </CCol>
        {/* Content */}
        <CCol className="p-0 pb-2">
          <CFormGroup>
            <CLabel>
              <span style={{ fontWeight: 600, fontSize: 14 }}>
                {t("msg-text.lb-content")}
              </span>
              <span className="danger-color pl-1">*</span>
            </CLabel>
            <CTextarea
              name="content"
              id="textarea-input"
              rows="4"
              placeholder={t("msg-text.ph-content")}
              maxLength="1000"
              onChange={(value) => onValueChange(value)}
              value={content}
            />
          </CFormGroup>
        </CCol>
      </CCol>
    </>
  );
};

export default TextMsgType;
