import React, { lazy } from "react";
import "./dashboard.scss";
import MessageWidget from "./Widgets/MessageWidgets";
import UserWidget from "./Widgets/UserWidgets";
import MessageStatistics from "../charts/MessageStatistics.js";
import MainChartUsersTrend from "../charts/MainChartUsersTrend.js";
import MainChartUsersRevoked from "../charts/MainChartUsersRevoked.js";
import {
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'

import { useTranslation } from "react-i18next";


const Dashboard = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <CRow>
        {/* Message Widgets */}
        <MessageWidget />
        {/* ChartLineSimple */}
        <MessageStatistics />
        {/* lasst message */}
        {/* <LastMsg /> */}
        {/* Widgets User trend */}
        <UserWidget />
        <CCol className="py-3">
          <CCol className="p-0 d-flex flex-column" name="sort-for-user-trend">
            {/* Sort */}
            <CCol className="p-0 d-flex flex-lg-row">
              <CCol className="p-0 pb-3 mr-2" lg="0">
                <CDropdown>
                  <CDropdownToggle
                    color="outline"
                    size="md"
                    className="d-flex align-items-center"
                  >
                    {/* <FontAwesomeIcon icon={faCalendarWeek} className="mr-2" /> */}
                    <span>{t("user-sort.lb-30d")}</span>
                    {/* <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" /> */}
                  </CDropdownToggle>

                  <CDropdownMenu className="mt-2" placement="bottom-end">
                    <CDropdownItem>{t("user-sort.lb-30d")}</CDropdownItem>
                    <CDropdownItem>{t("user-sort.item-24h")}</CDropdownItem>
                    <CDropdownItem>{t("user-sort.item-year")}</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
              {/* sort channels */}
              <CCol className="p-0 pb-3" lg="0">
                <CDropdown>
                  <CDropdownToggle
                    color="outline"
                    size="md"
                    className="d-flex align-items-center"
                  >
                    {/* <FontAwesomeIcon icon={faMobileAlt} className="mr-2" /> */}
                    <span>{t("channel-sort.lb-main")}<span className="ml-2">{t("channel-sort.item-all")}</span></span>
                    {/* <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" /> */}
                  </CDropdownToggle>
                  <CDropdownMenu className="mt-2" placement="bottom-end">
                    <CDropdownItem>All Channels</CDropdownItem>
                    <CDropdownItem>Zalo</CDropdownItem>
                    <CDropdownItem>Viber</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            </CCol>
          </CCol>
          {/* Chart User Trend */}
          <MainChartUsersTrend />
          {/* Chart User Unsubscribed */}
          <MainChartUsersRevoked />
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
