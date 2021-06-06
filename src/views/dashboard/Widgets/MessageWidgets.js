import React, { lazy } from "react";
import "../dashboard.scss";
import { CWidgetDropdown, CCol, CRow, CPopover } from "@coreui/react";
import { useTranslation } from "react-i18next";

const MessageWidget = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <CCol
        className="p-0 d-flex flex-lg-row flex-column"
        xxl={12}
        xs={12}
        lg={12}
        md={12}
        sm={12}
      >
        <CCol name="message-total">
          <CWidgetDropdown className="widget">
            <CCol className="d-flex flex-column p-2">
              <div className="d-flex flex-row align-items-center">
                <h6 className="light-color">{t("widget-msg.totalmsg")}</h6>
                <div className="ml-auto">
                  {/* <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="primary-color"
                    size="2x"
                  /> */}
                </div>
              </div>
              <div className="pt-1">
                <h1 className="text-gray-800">120.000.298</h1>
              </div>
            </CCol>
          </CWidgetDropdown>
        </CCol>
        <CCol name="message-delivered">
          <CWidgetDropdown className="widget">
            <CCol className="d-flex flex-column p-2">
              <div className="d-flex flex-row align-items-center">
                <h6 className="light-color">{t("widget-msg.msgdelivered")}</h6>
                <div className="ml-auto">
                  {/* <FontAwesomeIcon
                    icon={faEnvelopeOpenText}
                    className="success-color"
                    size="2x"
                  /> */}
                </div>
              </div>
              <div className="pt-1">
                <h1 className="text-gray-800">120.000.298</h1>
              </div>
            </CCol>
          </CWidgetDropdown>
        </CCol>
        <CCol name="message-failed">
          <CWidgetDropdown className="widget">
            <CCol className="d-flex flex-column p-2">
              <div className="d-flex flex-row align-items-center">
                <h6 className="light-color">{t("widget-msg.msgfail")}</h6>
                <div className="ml-auto">
                  {/* <FontAwesomeIcon
                    icon={faCommentSlash}
                    className="danger-color"
                    size="2x"
                  /> */}
                </div>
              </div>
              <div className="pt-1">
                <h1 className="text-gray-800">298</h1>
              </div>
            </CCol>
          </CWidgetDropdown>
        </CCol>
      </CCol>
    </>
  );
};

export default MessageWidget;
