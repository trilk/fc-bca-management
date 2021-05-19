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
import { CButton, CCol, CLabel, CTextarea, CInput, CImg } from "@coreui/react";
import "../messages.scss";

const ListMsgType = ({
  listMsg,
  link,
  title,
  image,
  content,
  onValueChange,
  onCreateListMsg,
  onRemoveListMsg,
  onRemoveImage,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <CCol className="p-0">
        <CLabel>
          <h6 className="font-weight-bold mb-0">{t("msg-list.title")}</h6>
          <small className="text-muted">{t("msg-list.description ")}</small>
        </CLabel>
        <hr className="mt-0" />
        {/* Box content vs images */}
        <CCol className="border rounded bg-light p-3 mt-4">
          <CCol className="p-0">
            <CLabel style={{ fontWeight: 600, fontSize: 14 }}>{t("msg-list.lb-image")}</CLabel>
            <div className="Upload__img">
              {!image ? (
                <>
                  <CLabel
                    htmlFor="img-upload"
                    className="mb-0 d-flex flex-row align-items-center upload"
                    block
                  >
                    {/* <div className=""> */}
                    <FontAwesomeIcon
                      icon={faFileImport}
                      className="ml-3"
                      size="lg"
                    />
                    <div className="d-flex flex-column pl-2">
                      {/* <h6 className="mb-0 font-weight-bold">Drop file here or click to upload</h6> */}
                      <span>{t("msg-list.lb-upload")}</span>
                    </div>
                    {/* </div> */}
                  </CLabel>
                  <input
                    accept=".jpg, .png, .jpeg, .gif, "
                    id="img-upload"
                    type="file"
                    className="d-none"
                    name="fileName"
                    onChange={(value) => onValueChange(value)}
                  />
                </>
              ) : (
                <div className="bg__uploaded">
                  <CImg src={image} className="image__uploaded " />
                  <span color="ghost" onClick={onRemoveImage}>
                  {t("msg-list.lb-delete-img")}
                  </span>
                </div>
              )}
            </div>
          </CCol>
          <CCol className="p-0 pt-3">
            <CLabel>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{t("msg-list.lb-title")}</span>
            </CLabel>
            <CInput
              className="bg-white border"
              name="title"
              placeholder={t("msg-list.ph-title")}
              onChange={(value) => onValueChange(value)}
              value={title}
            />
          </CCol>
          <CCol className="p-0 pt-3">
            <CLabel>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{t("msg-list.lb-content")}</span>
            </CLabel>
            <CTextarea
              rows="2"
              className="bg-white border"
              placeholder={t("msg-list.ph-content")}
              name="content"
              onChange={(value) => onValueChange(value)}
              value={content}
            />
          </CCol>
          <CCol className="p-0 pt-3">
            <CLabel>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{t("msg-list.lb-url")}</span>
            </CLabel>
            <CInput
              className="bg-white border"
              placeholder="http://OTTABC.com.vn"
              name="link"
              onChange={(value) => onValueChange(value)}
              value={link}
            />
          </CCol>
          <CCol className="p-0 pt-3 d-flex justify-content-end">
            <CButton
              color={listMsg.length >= 5 ? "light" : "primary"}
              size="sm"
              onClick={() => {
                listMsg.length < 5 && onCreateListMsg();
              }}
            >
              <span className="d-flex align-items-center">
                <FontAwesomeIcon icon={faPlus} size="xs" className="mr-1" />
                {t("msg-list.btn-create")}
              </span>
            </CButton>
          </CCol>
        </CCol>
        {/* End */}
        {/* list when created */}
        {listMsg.map((item, index) => {
          return (
            <CCol className="d-flex flex-column pt-3 p-0" key={index}>
              <div className="d-flex flex-row align-items-center py-2">
                <CLabel className="font-weight-bold">{t("msg-list.lb-list")} {index + 1}</CLabel>
                <div className="ml-auto">
                  <CButton color="secondary" size="sm" className="mr-2">
                    <FontAwesomeIcon icon={faPen} className="mx-1" />
                  </CButton>
                  <CButton
                    color="secondary"
                    size="sm"
                    onClick={() => onRemoveListMsg(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="mx-1" />
                  </CButton>
                </div>
              </div>
              <CCol className="d-flex flex-row border rounded py-3">
                <div className="bg__img">
                  <CImg src={item.image} className="img" />
                </div>
                <CCol className="d-flex flex-column pl-3 p-0">
                  <strong className="tags-text1Line">{item.title}</strong>
                  <span className="d-flex flex-wrap">{item.content}</span>
                  <small className="primary-color">
                    <u className="tags-text1Line">{item.url}</u>
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

export default ListMsgType;
