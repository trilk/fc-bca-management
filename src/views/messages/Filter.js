import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";
import CIcon from "@coreui/icons-react";
import "./messages.scss";
import {
  CButton,
  CCol,
  CForm,
  CLabel,
  CFormGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CInputRadio,
  CInput,
  CDropdownDivider,
  CDropdownHeader,
  CSelect,
} from "@coreui/react";
const Filter = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="pr-3 ml-lg-auto ml-sm-auto ml-md-auto d-inline">
        <CDropdown>
          <CDropdownToggle
            color="secondary"
            size="lg"
            className="d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            <span>{t("message-list.ft-title")}</span>
          </CDropdownToggle>
          <CDropdownMenu className="mt-2" style={{ minWidth: 340 }}>
            <CDropdownHeader>
              <span
                className="d-flex justify-content-center"
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#181c32",
                }}
              >
                {t("message-list.tt-header")}
              </span>
            </CDropdownHeader>
            <CDropdownDivider />
            <CForm className="px-2 py-2">
              <CCol className="p-0 d-flex flex-column pb-3">
                <CCol className="p-0 py-2 pb-3">
                  <CSelect custom id="message">
                    <option value="message">Message</option>
                    <option value="draft">Draft</option>
                    <option value="schedule">Schedule</option>
                  </CSelect>
                </CCol>
                <CLabel htmlFor="exampleDropdownFormEmail1">
                  <span style={{ fontSize: 14, fontWeight: 700 }}>
                    {t("message-list.ft-typemsg")}
                  </span>
                </CLabel>
                <CCol className="p-0 d-flex flex-column">
                  <CFormGroup variant="custom-radio" inline className="pb-2">
                    <CInputRadio
                      custom
                      id="inline-radio1"
                      name="inline-radios"
                      value="option1"
                    />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                      <span style={{ fontWeight: 500 }} className="text-muted">
                        {t("message-list.msg-text")}
                      </span>
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline className="pb-2">
                    <CInputRadio
                      custom
                      id="inline-radio2"
                      name="inline-radios"
                      value="option2"
                    />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                      <span style={{ fontWeight: 500 }} className="text-muted">
                        {t("message-list.msg-img")}
                      </span>
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio
                      custom
                      id="inline-radio2"
                      name="inline-radios"
                      value="option2"
                    />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                      <span style={{ fontWeight: 500 }} className="text-muted">
                        {t("message-list.msg-list")}
                      </span>
                    </CLabel>
                  </CFormGroup>
                </CCol>
              </CCol>
              <CCol className="p-0" lg="12">
                <CLabel htmlFor="exampleDropdownFormEmail1">
                  <span style={{ fontSize: 14, fontWeight: 700 }}>
                    {t("message-list.ft-typedate")}
                  </span>
                </CLabel>
                <CCol className="p-0">
                  <CFormGroup>
                    <CLabel htmlFor="exampleDropdownFormEmail1">
                      <span className="text-muted small">
                        {t("message-list.lb-startdate")}
                      </span>
                    </CLabel>
                    <CInput
                      className="form-control"
                      id="exampleDropdownFormEmail1"
                      type="date"
                      placeholder="email@example.com"
                      autoComplete="email"
                    />
                  </CFormGroup>
                </CCol>
                <CCol className="p-0 pb-2">
                  <CFormGroup>
                    <CLabel htmlFor="exampleDropdownFormEmail1">
                      <span className="text-muted small">
                        {t("message-list.lb-enddate")}
                      </span>
                    </CLabel>
                    <CInput
                      className="form-control"
                      id="exampleDropdownFormEmail1"
                      type="date"
                      placeholder="email@example.com"
                      autoComplete="email"
                    />
                  </CFormGroup>
                </CCol>
                <CDropdownDivider />
                <CCol className="p-0 py-2 d-flex justify-content-center">
                  {/* <CFormGroup className="mt-2 "> */}
                  <CButton color="ghost" className="mr-2">
                    {t("message-list.btn-reset")}
                  </CButton>
                  <CButton color="primary" type="submit">
                    {t("message-list.btn-submit")}
                  </CButton>
                  {/* </CFormGroup> */}
                </CCol>
              </CCol>
            </CForm>
          </CDropdownMenu>
        </CDropdown>
      </div>
    </>
  );
};

export default Filter;
