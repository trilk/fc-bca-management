import React, { lazy } from "react";
import "../dashboard.scss";
import { CWidgetDropdown, CCol, CRow, CPopover } from "@coreui/react";
import { useTranslation } from "react-i18next";
const UserWidget = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <CCol className="pt-2 pb-4">
        <h3>{t("widget-user.title")}</h3>
      </CCol>
      <CCol
        className="p-0 d-flex flex-lg-row flex-column"
        xxl={12}
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
      >
        <CCol>
          <CWidgetDropdown className="widget">
            <CCol className="d-flex flex-column p-2">
              <div className="d-flex flex-row align-items-center">
                <h6 className="light-color">{t("widget-user.lb-subscribed")}</h6>
                <div className="ml-auto">
                  {/* <FontAwesomeIcon
                    icon={faUserCheck}
                    className="primary-color"
                    size="2x"
                  /> */}
                </div>
              </div>
              <div className="pt-1">
                <h1 className="text-gray-800">12.000.000</h1>
              </div>
            </CCol>
          </CWidgetDropdown>
        </CCol>
        {/* Widgets Active Users */}
        <CCol>
          <CWidgetDropdown className="widget">
            <CCol className="d-flex flex-column p-2">
              <div className="d-flex flex-row align-items-center">
                <h6 className="light-color">{t("widget-user.lb-unsubscribed")}</h6>
                <div className="ml-auto">
                  {/* <FontAwesomeIcon
                    icon={faUserClock}
                    className="danger-color"
                    size="2x"
                  /> */}
                </div>
              </div>
              <div className="pt-1">
                <h1 className="text-gray-800">12.000.000</h1>
              </div>
            </CCol>
          </CWidgetDropdown>
        </CCol>
        <CCol>
          <CWidgetDropdown className="widget">
            <CCol className="d-flex flex-column p-2">
              <div className="d-flex flex-row align-items-center">
                <h6 className="light-color">{t("widget-user.lb-total")}</h6>
                <div className="ml-auto">
                  {/* <FontAwesomeIcon
                    icon={faUsers}
                    className="success-color"
                    size="2x"
                  /> */}
                </div>
              </div>
              <div className="pt-1">
                <h1 className="text-gray-800">12.000.000</h1>
              </div>
            </CCol>
          </CWidgetDropdown>
        </CCol>
      </CCol>
    </>
  );
};

export default UserWidget;
