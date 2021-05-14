import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import Statistics from "./MessageReport/Statistics";
import Info from "./MessageReport/Info";
import MsgListType from "./MessageReport/MsgListType";
import MsgTextType from "./MessageReport/MsgTextType";
import MsgImageType from "./MessageReport/MsgImageType";
import {
  faPen,
  faCopy,
  faSortDown,
  faTimes,
  faChartLine,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import "./messages.scss";
import {
  CCardBody,
  CRow,
  CDropdown,
  CProgress,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton,
  CCol,
  CCard,
  CLabel,
  CImg,
  CDropdownDivider,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import Imagedemo from "./photo/demo.jpeg";

//lodash
import _ from "lodash";

import { useParams } from "react-router-dom";

//api
import MessageService from "../../services/message.service";

//redux
import { useSelector } from "react-redux";

// helpers
import { convert_day_hours_minute } from "../../helpers/convertdate";
import {
  faFantasyFlightGames,
  faFly,
} from "@fortawesome/free-brands-svg-icons";
import boxStatistics from "./MessageReport/Statistics";
import AudienceInfo from "./MessageReport/AudienceInfo";

const MessageReport = () => {
  const { t } = useTranslation();
  const [messageDetail, setMessageDetail] = useState({});
  console.log(messageDetail);
  const { id } = useParams();
  //get message detail by id
  const getDetailMessageById = async () => {
    const response = await MessageService.getDetailMessageById(id);
    if (response.status === 200 || response.status === 201) {
      setMessageDetail(response.data);
    }
  };

  const onSendMessage = async () => {
    await MessageService.sendMessage({
      id: messageDetail._id,
    }).then((response) => {
      console.log("response", response);
    });
  };
  useEffect(() => {
    getDetailMessageById();
  }, []);

  //return
  if (_.isEmpty(messageDetail)) {
    return <p>Loading...</p>;
  }
  return (
    <CRow>
      {/* Begign Title  */}
      <CCol className="d-flex flex-row p-3 py-2" xxl={12} xl={12} lg={12}>
        <CCol className="p-0 d-flex flex-column">
          <h4 className="pb-1">
            <FontAwesomeIcon icon={faChartLine} className="mr-3" />
            <strong>{t("detail-msg.title")}</strong>
          </h4>
          <span style={{ fontSize: 16, fontWeight: 700 }}>
            {messageDetail.title}
          </span>
        </CCol>
        <div className="p-0 ml-auto">
          <CDropdown className="ml-3">
            <CDropdownToggle
              color="secondary"
              variant="outline"
              size="md"
              className="d-flex align-items-center"
            >
              <span>{t("detail-msg.btn-dropdown")}</span>
              <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1" />
            </CDropdownToggle>
            <CDropdownMenu className="mt-2">
              <CDropdownItem checked>
                <FontAwesomeIcon icon={faPen} className="mr-2" />
                {t("detail-msg.dropdown-edit")}
              </CDropdownItem>
              <CDropdownItem>
                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                {t("detail-msg.dropdown-duplicate")}
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem
                className="primary-color"
                onClick={() => onSendMessage()}
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                Send
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem className="danger-color">
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                {t("detail-msg.dropdown-delete")}
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </CCol>
      {/* End */}
      {/* boxStatistics */}
      <Statistics />
      {/* End */}
      <CCol>
        <CCard>
          <CCardBody>
            <CCol className="p-0 d-flex flex-lg-row flex-column">
              <CCol col="6" lg="6" md="12" className="p-0">
                {/* Info Form */}
                <Info
                  createdBy={messageDetail.createdBy}
                  createdAt={messageDetail.createdAt}
                />
                {/* AudienceInfo */}
                <AudienceInfo channel={messageDetail.channel} />
                {/* Message */}
                <CCol className="p-0 py-4">
                  <CLabel>
                    <h4>{t("detail-msg.lb-message")}</h4>
                  </CLabel>
                  {messageDetail.type === "list" && (
                    <MsgListType MsgList={messageDetail.list} />
                  )}
                  {messageDetail.type === "text" && (
                    <MsgTextType
                      title={messageDetail.title}
                      content={messageDetail.content}
                    />
                  )}
                  {messageDetail.type === "image" && (
                    <MsgImageType
                      image={messageDetail.image}
                      content={messageDetail.content}
                    />
                  )}
                </CCol>

                <CCol className="p-0">
                  <CLabel>
                    <h4>{t("detail-msg.lb-schedule")}</h4>
                  </CLabel>
                  <CCol className="border rounded p-0 py-4">
                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                      <CCol lg="3" md="3" sm="3" xs="12" className="text-muted">
                        {t("detail-msg.lb-send")}
                      </CCol>
                      <CCol className="font-weight-bold">
                        {convert_day_hours_minute(messageDetail.schedule)}
                      </CCol>
                    </CCol>
                  </CCol>
                </CCol>
              </CCol>
              <CCol col="6" className="d-lg-block d-ms-block d-none">
                <div className="d-flex justify-content-center flex-column">
                  <strong className="pb-3 d-flex justify-content-center primary-color">
                    {t("detail-msg.col-preview")}
                  </strong>
                  <CIcon name="phonePreview" height="700" alt="Logo" />
                </div>
              </CCol>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default MessageReport;
