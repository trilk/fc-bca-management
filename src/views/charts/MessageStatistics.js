import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import { useTranslation } from "react-i18next";
import {
  CCard,
  CCardBody,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CCol,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarWeek,
  faCircle,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

const brandSent = getStyle("sent") || "#009ef7";
const brandDelivered = getStyle("delivered") || "#4dbd74";
const brandFailed = getStyle("failed") || "#f86c6b";

const MessageStatistics = (attributes) => {
  const { t, i18n } = useTranslation();
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const defaultDatasets = (() => {
    let elements = 27;
    const data1 = [];
    const data2 = [];
    const data3 = [];
    for (let i = 0; i <= elements; i++) {
      data1.push(random(50, 200));
      data2.push(random(80, 100));
      data3.push(65);
    }
    return [
      {
        label: "Sent",
        backgroundColor: hexToRgba(brandSent, 4),
        borderColor: brandSent,
        pointHoverBackgroundColor: brandSent,
        borderWidth: 1.5,
        data: data1,
      },
      {
        label: "Delivery",
        backgroundColor: "transparent",
        borderColor: brandDelivered,
        pointHoverBackgroundColor: brandDelivered,
        borderWidth: 1.5,
        data: data2,
      },
      {
        label: "Failed(Cancel)",
        backgroundColor: "transparent",
        borderColor: brandFailed,
        pointHoverBackgroundColor: brandFailed,
        borderWidth: 0.5,
        borderDash: [8, 5],
        data: data3,
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
        position: "bottom",
      },
      scales: {
        vAxis: {
          title: "My title",
          gridlines: {
            count: 10,
          },
        },
        hAxis: {
          title: "title hAxis",
          gridlines: {
            color: "transparent",
          },
        },

        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 250,
            },
            gridLines: {
              display: true,
              color: "#e4e6ef",
              borderDash: [4],
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      tooltip: {
        enabled: true,
        position: "nearest",
        text: (ctx) =>
          "Tooltip position mode: " +
          ctx.chart.options.plugins.tooltip.position,
      },
    };
  })();
  // render
  return (
    <CCol lg="12">
      <CCard>
        <CCardBody>
          <CCol className="p-0 d-flex bd-highlight">
            <CCol className="d-flex flex-column">
              <h4>{t("msg-statistics.title")}</h4>
              <strong className="text-muted small">
                {t("msg-statistics.description")}
              </strong>
            </CCol>
            <CCol className="pr-3">
              <CDropdown className="float-right">
                <CDropdownToggle
                  color="outline"
                  size="md"
                  className="d-flex align-items-center"
                >
                  <FontAwesomeIcon icon={faCalendarWeek} className="mr-2" />
                  <span>{t("msg-statistics.filter")}</span>
                  <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
                </CDropdownToggle>
                <small className="d-flex justify-content-end pt-1 text-muted">
                  <strong className="mr-1">
                    {t("msg-statistics.lb-filter")}
                  </strong>
                  {t("msg-statistics.ft-description")}
                </small>
                <CDropdownMenu className="mt-2" placement="bottom-end">
                  <CDropdownItem>{t("msg-statistics.item-1h")}</CDropdownItem>
                  <CDropdownItem>{t("msg-statistics.item-24h")}</CDropdownItem>
                  <CDropdownItem>{t("msg-statistics.item-30d")}</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          </CCol>
          <CChartLine
            style={{ height: "300px", marginTop: "40px" }}
            {...attributes}
            datasets={defaultDatasets}
            options={defaultOptions}
            labels={[
              "Mo",
              "Tu",
              "We",
              "Th",
              "Fr",
              "Sa",
              "Su",
              "Mo",
              "Tu",
              "We",
              "Th",
              "Fr",
              "Sa",
              "Su",
              "Mo",
              "Tu",
              "We",
              "Th",
              "Fr",
              "Sa",
              "Su",
              "Mo",
              "Tu",
              "We",
              "Th",
              "Fr",
              "Sa",
              "Su",
            ]}
          />
          <CCol className="pl-4 d-flex bd-highlight py-4">
            <div className="mr-4">
              <FontAwesomeIcon icon={faCircle} className="mr-1 primary-color" />
              <span className="light-color">{t("widget-msg.totalmsg")}</span>
            </div>
            <div className="mr-4">
              <FontAwesomeIcon icon={faCircle} className="mr-1 success-color" />
              <span className="light-color">
                {t("widget-msg.msgdelivered")}
              </span>
            </div>
            <div>
              <FontAwesomeIcon icon={faCircle} className="mr-1 danger-color" />
              <span className="light-color">{t("widget-msg.msgfail")}</span>
            </div>
          </CCol>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default MessageStatistics;
