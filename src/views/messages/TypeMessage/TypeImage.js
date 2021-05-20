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
import { CCol, CLabel, CTooltip, CTextarea, CImg } from "@coreui/react";
import "../messages.scss";

const ImageMsgType = ({ image, content, onValueChange, onRemoveImage }) => {
  const { t } = useTranslation();

  return (
    <>
      <CCol className="p-0">
        <CLabel>
          <h6 className="font-weight-bold mb-0">{t("msg-image.title")}</h6>
          <small className="text-muted">{t("msg-image.description")}</small>
        </CLabel>
        <hr className="mt-0" />
        <CCol className="p-0">
          <CLabel style={{ fontWeight: 600, fontSize: 14 }}>
            {t("msg-image.lb-img")}
          </CLabel>
          <div className="boxUpload">
            {!image ? (
              <>
                <CLabel htmlFor="upload-input" className="mb-0 upload-img ">
                  <FontAwesomeIcon
                    icon={faFileImport}
                    size="3x"
                    className="primary-color ml-3"
                  />
                  <div className="pl-3">
                    <h5 className="mb-0 font-weight-bold">
                      {t("msg-image.lb-upload")}
                    </h5>
                    <small className="text-muted">
                      {t("msg-image.lb-description")}
                    </small>
                  </div>
                </CLabel>
                <input
                  accept=".jpg, .png, .jpeg, .gif, "
                  id="upload-input"
                  type="file"
                  onChange={(value) => onValueChange(value)}
                  className="d-none"
                  name="fileName"
                />
              </>
            ) : (
              <div className="previewImage">
                <CTooltip content={t("msg-image.tooltip")}>
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="close__img"
                    size="2x"
                    onClick={onRemoveImage}
                  />
                </CTooltip>
                <CImg
                  id="uploaded-image"
                  src={image}
                  alt="uploaded-img"
                  className="uploaded-image"
                />
              </div>
            )}
          </div>
        </CCol>
        <CCol className="p-0 pt-3">
          <CLabel style={{ fontWeight: 600, fontSize: 14 }}>
            {t("msg-image.lb-content")}
          </CLabel>
          <CTextarea
            placeholder={t("msg-image.ph-content")}
            rows="2"
            name="content"
            onChange={(value) => onValueChange(value)}
            value={content}
          />
        </CCol>
      </CCol>
      {/* Image */}
      {/* {message.type === "image" && <CCol className="p-0 pb-2">
                    <CFormGroup>
                      <CLabel htmlFor="file-input">
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          {t("create-msg.lb-image")} <span className="danger-color">*</span>
                        </span>
                      </CLabel>
                      <CCol>
                        <CInputFile
                          id="file-multiple-input"
                          name="fileName"
                          multiple
                          custom
                          onChange={(value) => onValueChange(value)}
                        />
                        <CLabel
                          htmlFor="file-multiple-input"
                          variant="custom-file"
                        >
                          {message.fileName
                            ? message.fileName
                            : "Choose Files..."}
                        </CLabel>
                      </CCol>
                    </CFormGroup>
                  </CCol>} */}
    </>
  );
};

export default ImageMsgType;
