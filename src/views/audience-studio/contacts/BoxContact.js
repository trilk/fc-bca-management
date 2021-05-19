import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
  faUsers,
  faArrowUp,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./contacts.scss";
import { CCol, CLabel, CCard, CCardBody, CRow } from "@coreui/react";
import { faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";
const Contacts = () => {
  const { t } = useTranslation();
  return (
    <>
      <CCol xxl={12}>
        <CCard>
          <CCardBody>
            <CCol className="d-flex flex-lg-row flex-xl-row flex-md-lg flex-column p-0">
              {/* Box user totals */}
              <div
                className="d-flex flex-column rounded-lg bg-light-primary pl-2 mb-3 border-primary"
                style={{ height: 120, width: 240 }}
              >
                <CCol className="px-2 py-2 primary-color d-flex align-items-center">
                  <div className="d-flex flex-column">
                    <span>
                      <FontAwesomeIcon icon={faUsers} className="mr-2" />
                      {t("contact.lb-total")}
                    </span>
                    <div className="d-flex flex-row align-items-center">
                      <h2 className="pt-2 pr-2">20.000</h2>
                      <span className="d-flex flex-row align-items-center success-color">
                        <FontAwesomeIcon
                          icon={faArrowUp}
                          style={{ height: 10, width: 10 }}
                        />
                        10%
                      </span>
                    </div>
                  </div>
                </CCol>
              </div>
              {/* Channels */}
              <CCol className="d-flex flex-row pl-lg-4 pl-xl-4 pl-0">
                <CCol className="p-0">
                  <CCol className="p-0">
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
                      <span style={{ fontSize: 18 }}>
                        {t("contact.lb-channel")}
                      </span>
                    </div>
                  </CCol>
                  <CCol className="pl-0 py-3">
                    {/* Box channnels */}
                    <CLabel className="border border-dashed rounded p-2 d-inline-flex flex-column mr-3">
                      <span className="d-flex justify-content-">Zalo</span>
                      <CLabel>
                        <span style={{ fontSize: 18, fontWeight: 600 }}>
                          10.000.000{" "}
                        </span>
                        <small className="text-muted">
                          {t("contact.lb-contact")}
                        </small>
                      </CLabel>
                    </CLabel>
                    {/* End box channels */}
                    {/* Box channnels */}
                    <CLabel className="border border-dashed rounded p-2 d-inline-flex flex-column">
                      <span className="d-flex justify-content-">Viber</span>
                      <CLabel>
                        <span style={{ fontSize: 18, fontWeight: 600 }}>
                          1.000.000{" "}
                        </span>
                        <small className="text-muted">
                          {t("contact.lb-contact")}
                        </small>
                      </CLabel>
                    </CLabel>
                  </CCol>
                </CCol>
              </CCol>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default Contacts;
