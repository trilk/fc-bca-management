import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { faSortDown, faFilter } from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import "./contacts.scss";
import femaleimg from "../../users/avatar/female.jpg";
import maleimg from "../../users/avatar/male.jpg";
import {
  CButton,
  CCol,
  CDropdownHeader,
  CForm,
  CLabel,
  CInputCheckbox,
  CDropdownItem,
  CFormGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CInput,
  CDropdownDivider,
} from "@coreui/react";
import { faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";

const Contacts = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Start Filter */}
      <CDropdown className="ml-auto">
        <CDropdownToggle
          color="secondary"
          size="lg"
          className="d-flex align-items-center"
        >
          <FontAwesomeIcon icon={faFilter} className="mr-2" />
          <span>{t("contact.lb-filter")}</span>
        </CDropdownToggle>
        <CDropdownMenu
          style={{ minWidth: 340 }}
          className="mt-2"
          placement="bottom-end"
          style={{ minWidth: 300 }}
        >
          <CDropdownHeader>
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#181c32",
              }}
              className="d-flex justify-content-center"
            >
              {t("contact.ft-header")}
            </span>
          </CDropdownHeader>
          <CDropdownDivider />
          <CForm className="px-2 py-2">
            <CCol className="p-0 pb-3">
              <CLabel htmlFor="exampleDropdownFormEmail1">
                <span style={{ fontSize: 14, fontWeight: 700 }}>
                  {t("contact.lb-date")}
                </span>
              </CLabel>
              <CInput type="date" />
            </CCol>
            <CCol className="p-0 pb-3" col="12">
              <CLabel htmlFor="exampleDropdownFormEmail1">
                <span style={{ fontSize: 14, fontWeight: 700 }}>
                  {t("contact.lb-status")}
                </span>
              </CLabel>
              <CDropdown>
                <CDropdownToggle
                  color="light"
                  size="lg"
                  block
                  className="d-flex align-items-center"
                >
                  <span className="d-flex justify-content-start">
                    {t("contact.lb-all")}
                  </span>
                  <FontAwesomeIcon
                    icon={faSortDown}
                    className="ml-2 mb-1 ml-auto"
                  />
                </CDropdownToggle>
                <CForm>
                  <CDropdownMenu className="mt-2" placement="bottom-end" block>
                    <CDropdownItem>{t("contact.lb-all")}</CDropdownItem>
                    <CDropdownItem>{t("contact.lb-subscribed")}</CDropdownItem>
                    <CDropdownItem>
                      {t("contact.lb-unsubscribed")}
                    </CDropdownItem>
                  </CDropdownMenu>
                </CForm>
              </CDropdown>
            </CCol>
            {/* Filter Channels type */}
            <CCol className="p-0 d-flex flex-column pb-3">
              <CLabel htmlFor="exampleDropdownFormEmail1">
                <span style={{ fontSize: 14, fontWeight: 700 }}>
                  {t("contact.lb-type")}
                </span>
              </CLabel>
              <CCol className="p-0 pt-1 d-flex flex-row">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="inline-checkbox1"
                    name="inline-checkbox1"
                    value="option1"
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">
                    Zalo
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="inline-checkbox1"
                    name="inline-checkbox1"
                    value="option1"
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">
                    Viber
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CCol>
            <hr />
            <CCol className="p-0 py-2 d-flex justify-content-center">
              <CButton color="ghost" size="lg" className="mr-2">
                {t("contact.btn-reset")}
              </CButton>
              <CButton color="primary" size="lg" type="submit">
                {t("contact.btn-submit")}
              </CButton>
            </CCol>
          </CForm>
        </CDropdownMenu>
      </CDropdown>
      {/* End Filter */}
    </>
  );
};

export default Contacts;
