import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Imagedemo from "./photo/demo.jpeg";
import { useTranslation } from "react-i18next";
import ListMsgType from "./TypeMessage/TypeList";
import ImageMsgType from "./TypeMessage/TypeImage";
import TextMsgType from "./TypeMessage/TypeText";
import {
  faPlus,
  faPlusCircle,
  faTimes,
  faChartPie,
  faUpload,
  faFileImage,
  faFileImport,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  CButton,
  CCol,
  CLabel,
  CModal,
  CModalHeader,
  CSelect,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInputFile,
  CTextarea,
  CCard,
  CCollapse,
  CCardBody,
  CFormGroup,
  CInputRadio,
  CInput,
  CRow,
  CLink,
  CCardHeader,
  CAlert,
  CImg,
} from "@coreui/react";
import "./messages.scss";
import { phonePreview } from "src/assets/icons/phone-preview";
import ReviewMsg from "./ModalReview";
import CIcon from "@coreui/icons-react";

//redux
import { useSelector } from "react-redux";

import ChannelService from "../../services/channel.service";
import MessageService from "../../services/message.service";

import { useHistory } from "react-router-dom";
import { text } from "@fortawesome/fontawesome-svg-core";

const CreateMsg = () => {
  const { t } = useTranslation();
  //history routes
  const history = useHistory();
  // get channels when login
  const channels = useSelector((state) => state.auth.user.channels);
  const [large, setLarge] = useState(false);
  const [small, setSmall] = useState(false);

  const [collapseMulti, setCollapseMulti] = useState([false, false]);

  const [error, setError] = useState("");

  const [message, setMessage] = useState({
    channel: {},
    segment: { check: true, filter: ["all"] },
    template: "",
    title: "",
    content: "",
    link: "",
    fileName: "",
    filePath: "",
    schedule: { check: true, filter: "" },
    type: "text",
    date: null,
    listMsg: [],
  });

  const toggleMulti = (type) => {
    let newCollapse = collapseMulti.slice();
    switch (type) {
      case "left":
        newCollapse[0] = !collapseMulti[0];
        break;
      case "right":
        newCollapse[1] = !collapseMulti[1];
        break;
      case "both":
        newCollapse[0] = !collapseMulti[0];
        newCollapse[1] = !collapseMulti[1];
        break;
      default:
        newCollapse[0] = false;
        newCollapse[1] = false;
    }
    setCollapseMulti(newCollapse);
  };

  const onValueChange = async (event) => {
    const target = event.target;
    const name = target.name;
    setMessage({ ...message, [name]: target.value });

    if (target.files && target.files[0]) {
      const formData = new FormData();
      formData.append("picture", target.files[0], target.files[0].name);
      const response = await ChannelService.uploadFile(formData);
      if (response.data.status === "OKE") {
        setMessage({
          ...message,
          [name]: target.files[0].name,
          filePath: response.data.filePath,
        });
      }
    }
    if (name === "channel") {
      setMessage({ ...message, [name]: target.value });
    }
    if (name === "segment") {
      const array = [];
      array.push(target.value);
      setMessage({
        ...message,
        segment: {
          check: !message.segment.check,
          filter: array,
        },
      });
    }
    if (name === "schedule") {
      setMessage({
        ...message,
        schedule: {
          ...message.schedule,
          check: !message.schedule.check,
        },
      });
    }
    if (name === "date") {
      console.log(new Date(target.value).getTime());
      setMessage({
        ...message,
        schedule: {
          ...message.schedule,
          filter: new Date(target.value).toLocaleString(),
        },
      });
    }
  };
  const onSubmit = async () => {
    MessageService.createMessage(message)
      .then((response) => {
        const { message_id } = response.data;
        return history.push(`/messages/${message_id}`);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onCreateListMsg = () => {
    const msg = {
      title: message.title,
      url: message.link,
      image: message.filePath,
      content: message.content,
    };
    const listMsg = message.listMsg;
    listMsg.push(msg);
    setMessage({
      ...message,
      listMsg,
      link: "",
      filePath: "",
      fileName: "",
      title: "",
      content: "",
    });
  };
  const onRemoveListMsg = (id) => {
    const listMsg = message.listMsg;
    listMsg.splice(id, 1);
    setMessage({ ...message, listMsg });
  };
  const onRemoveImage = () => {
    setMessage({ ...message, fileName: "", filePath: "" });
  };

  return (
    <>
      {error && (
        <CAlert color="warning" closeButton>
          {error}
        </CAlert>
      )}
      <CRow className="d-flex flex-column bd-highlight">
        <CCol>
          <CCard>
            <CCardHeader className="font-weight-bold text-muted">
              {t("create-msg.card-audience")}
            </CCardHeader>
            <CCardBody>
              <CCol className="p-0" lg="3" md="3">
                <CLabel htmlFor="">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    {t("create-msg.lb-channel")}
                  </span>
                  <span className="danger-color pl-1">*</span>
                </CLabel>
                <CSelect
                  custom
                  name="channel"
                  id="select"
                  onChange={(value) => {
                    onValueChange(value);
                  }}
                >
                  <option value="">{t("create-msg.opt-seclect")}</option>
                  {channels.map((item, index) => {
                    return (
                      <option value={item._id} key={index}>
                        {item.name} - {item.type}
                      </option>
                    );
                  })}
                </CSelect>
                <small className="form-text text-muted">
                  {t("create-msg.sl-channel-description")}
                </small>
              </CCol>
              <CCol className="p-0 pt-3" lg="2">
                <CLabel htmlFor="segments">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    {t("create-msg.lb-segment")}
                  </span>{" "}
                  <span className="danger-color pl-1">*</span>
                </CLabel>
              </CCol>
              <CCol className="p-0 d-flex flex-column bd-highlight pb-2">
                <CFormGroup variant="custom-radio" inline className="pb-1">
                  <CInputRadio
                    custom
                    id="inline-radio1"
                    name="segment"
                    value="all"
                    checked={message.segment.check}
                    onChange={(value) =>
                      onValueChange(value) && toggleMulti("left")
                    }
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                    <strong>{t("create-msg.cb-user")}</strong>
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-radio" inline>
                  <CInputRadio
                    custom
                    id="inline-radio2"
                    name="segment"
                    value="custom"
                    checked={!message.segment.check}
                    onChange={(value) => {
                      onValueChange(value) && toggleMulti("left");
                    }}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                    <strong>{t("create-msg.cb-segment")}</strong>
                  </CLabel>
                </CFormGroup>
                {/* collapes */}
                <CCol>
                  <CCollapse show={collapseMulti[0]}>
                    <CCol className="p-0">
                      <CLabel className="pl-2 font-weight-bold text-muted pt-2">
                        {t("create-msg.cb-description")}
                      </CLabel>
                      <CCol col="12" className="p-0 pl-1">
                        <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-1">
                          <FontAwesomeIcon icon={faChartPie} />
                          <span className="tags-text pr-2 ml-2" maxLength={20}>
                            {" "}
                            User details such as first name, last name, email
                            address, phone number and password{" "}
                          </span>
                          <FontAwesomeIcon
                            icon={faTimes}
                            style={{ height: 16, width: 16 }}
                            className="mr-2"
                          />
                        </div>
                        <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-1">
                          <FontAwesomeIcon icon={faChartPie} />
                          <span className="tags-text pr-2 ml-2">
                            {" "}
                            Segment Name 2 dài hơn chút xíu
                          </span>
                          <FontAwesomeIcon
                            icon={faTimes}
                            style={{ height: 16, width: 16 }}
                            className="mr-2"
                          />
                        </div>
                        <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-1">
                          <FontAwesomeIcon icon={faChartPie} />
                          <span className="tags-text pr-2 ml-2">
                            {" "}
                            Segment Name 3
                          </span>
                          <FontAwesomeIcon
                            icon={faTimes}
                            style={{ height: 16, width: 16 }}
                            className="mr-2"
                          />
                        </div>
                        <div className="el-tag d-inline-flex p-2 bd-highlight d-flex align-items-center m-1">
                          <FontAwesomeIcon icon={faChartPie} />
                          <span className="tags-text pr-2 ml-2">
                            {" "}
                            Segment Name 3
                          </span>
                          <FontAwesomeIcon
                            icon={faTimes}
                            style={{ height: 16, width: 16 }}
                            className="mr-2"
                          />
                        </div>
                      </CCol>
                      <CCol className="p-0 pl-1">
                        <div className="m-1">
                          <CButton
                            color="ghost"
                            onClick={() => setSmall(!large)}
                            className="mr-1"
                          >
                            <FontAwesomeIcon
                              icon={faPlusCircle}
                              className="mr-2"
                            />
                            <span>{t("create-msg.btn-addsegment")}</span>
                          </CButton>
                        </div>
                      </CCol>
                    </CCol>
                  </CCollapse>
                  {/* Modal select segment Show */}
                  <CModal
                    show={small}
                    onClose={() => setSmall(!small)}
                    size="md"
                  >
                    <CModalHeader closeButton>
                      <CModalTitle>{t("create-msg.md-segment")}</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CCol className="p-0">
                        <div className="el-tag-bg">
                          <div className="icon-left">
                            <FontAwesomeIcon icon={faChartPie} />
                          </div>
                          <div className="content-segments">
                            <span className="text-tag">
                              Segmnets 1 holoa dai them mot chut di nao{" "}
                            </span>
                            <p className="icon-right">
                              <FontAwesomeIcon icon={faPlus} />
                            </p>
                          </div>
                        </div>
                        <div className="el-tag-bg">
                          <div className="icon-left">
                            <FontAwesomeIcon icon={faChartPie} />
                          </div>
                          <div className="content-segments">
                            <span className="text-tag">Segmnets Default 2</span>
                            <p className="icon-right">
                              <FontAwesomeIcon icon={faPlus} />
                            </p>
                          </div>
                        </div>
                        <div className="el-tag-bg">
                          <div className="icon-left">
                            <FontAwesomeIcon icon={faChartPie} />
                          </div>
                          <div className="content-segments">
                            <span className="text-tag">Khu vực miền nam</span>
                            <p className="icon-right">
                              <FontAwesomeIcon icon={faPlus} />
                            </p>
                          </div>
                        </div>
                      </CCol>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="primary" onClick={() => setSmall(!small)}>
                        {t("create-msg.btn-create-segment")}
                      </CButton>{" "}
                    </CModalFooter>
                  </CModal>
                </CCol>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
        {/* Messages */}
        <CCol>
          <CCard>
            <CCardHeader>
              <CCol
                lg="12"
                className="p-0 d-flex flex-row bd-highlight align-items-center"
              >
                <div className="font-weight-bold">
                  <span className="text-muted">
                    2. {t("create-msg.card-message")}
                  </span>
                </div>
                <div className="ml-auto d-md-none d-lg-none">
                  <CButton color="secondary">
                    {t("create-msg.btn-preview")}
                  </CButton>
                </div>
              </CCol>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol col="6" lg="6" md="6">
                  <CCol className="p-0">
                    <h6 className="font-weight-bold">
                      {t("create-msg.sl-type-msg")}
                    </h6>
                    <div className="d-flex flex-xxl-row flex-column bg-light-primary border-primary-light p-3 rounded mb-4">
                      <CFormGroup
                        variant="custom-radio"
                        inline
                        className="py-1"
                      >
                        <CInputRadio
                          custom
                          value="text"
                          id="inline-radio5"
                          name="type"
                          checked={message.type === "text" && true}
                          onChange={(value) => onValueChange(value)}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio5"
                        >
                          <strong>{t("create-msg.text-msg")}</strong>
                        </CLabel>
                      </CFormGroup>
                      {/* end */}
                      {/* begin select image messages */}
                      <CFormGroup
                        variant="custom-radio"
                        inline
                        className="py-1"
                      >
                        <CInputRadio
                          custom
                          value="image"
                          id="inline-radio6"
                          name="type"
                          checked={message.type === "image" && true}
                          onChange={(value) => onValueChange(value)}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio6"
                        >
                          <strong>{t("create-msg.image-msg")}</strong>
                        </CLabel>
                      </CFormGroup>
                      {/* end */}
                      {/* begin select list messages */}
                      <CFormGroup
                        variant="custom-radio"
                        inline
                        className="py-1"
                      >
                        <CInputRadio
                          custom
                          value="list"
                          id="inline-radio7"
                          name="type"
                          checked={message.type === "list" && true}
                          onChange={(value) => onValueChange(value)}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio7"
                        >
                          <strong>{t("create-msg.list-msg")}</strong>
                        </CLabel>
                      </CFormGroup>
                    </div>
                    {/* end */}
                  </CCol>
                  {/* Message text only */}
                  {message.type === "text" && (
                    <TextMsgType
                      title={message.title}
                      content={message.content}
                      onValueChange={onValueChange}
                    />
                  )}
                  {/* message image */}
                  {message.type === "image" && (
                    <ImageMsgType
                      onValueChange={onValueChange}
                      onRemoveImage={onRemoveImage}
                      content={message.content}
                      image={message.filePath}
                    />
                  )}
                  {/* List message */}
                  {message.type === "list" && (
                    <ListMsgType
                      listMsg={message.listMsg}
                      onCreateListMsg={onCreateListMsg}
                      onRemoveListMsg={onRemoveListMsg}
                      onRemoveImage={onRemoveImage}
                      onValueChange={onValueChange}
                      link={message.link}
                      title={message.title}
                      image={message.filePath}
                      content={message.content}
                    />
                  )}
                </CCol>
                <CCol col="6" className="d-lg-block d-ms-block d-none">
                  <div className="d-flex justify-content-center flex-column">
                    <strong className="pb-3 d-flex justify-content-center primary-color">
                      {t("detail-msg.col-preview")}
                    </strong>
                    <CIcon name="phonePreview" height="700" alt="Logo" />
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        {/* Schedule */}
        <CCol>
          <CCard>
            <CCardHeader>
              <div className="font-weight-bold ">
                <span className="text-muted">
                  3. {t("create-msg.card-schedule")}
                </span>
              </div>
            </CCardHeader>
            <CCardBody>
              <CCol className="d-flex flex-column pb-2 p-0">
                <CLabel className="font-weight-bold text-muted">
                  {t("create-msg.lb-schedule")}
                </CLabel>
                <CFormGroup variant="custom-radio" inline className="pb-1">
                  <CInputRadio
                    custom
                    id="inline-radio3"
                    name="schedule"
                    value="now"
                    checked={message.schedule.check}
                    onChange={(value) =>
                      onValueChange(value) && toggleMulti("right")
                    }
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio3">
                    <strong>{t("create-msg.cb-sendnow")}</strong>
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="custom-radio" inline>
                  <CInputRadio
                    custom
                    id="inline-radio4"
                    name="schedule"
                    value="specific"
                    checked={!message.schedule.check}
                    onChange={(value) =>
                      onValueChange(value) && toggleMulti("right")
                    }
                  />
                  <CLabel variant="custom-checkbox" htmlFor="inline-radio4">
                    <strong>{t("create-msg.cb-selecttime")}</strong>
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol lg="4" className="pl-4 ">
                <CCollapse show={collapseMulti[1]}>
                  <CCol className="pt-2">
                    <CInput
                      id="name"
                      type="date"
                      name="date"
                      required
                      onChange={(value) => onValueChange(value)}
                    />
                    <small className="form-text text-muted">
                      {t("create-msg.cb-schedule-description")}
                    </small>
                  </CCol>
                </CCollapse>
              </CCol>
            </CCardBody>
          </CCard>
        </CCol>
        {/* Modal Review Msg to sending */}
        <ReviewMsg onSubmit={onSubmit} message={message} />
      </CRow>
    </>
  );
};

export default CreateMsg;
