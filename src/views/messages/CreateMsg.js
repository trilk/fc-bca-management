import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Imagedemo from "./photo/demo.jpeg";
import {
  faPlus,
  faPlusCircle,
  faTimes,
  faChartPie,
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

const CreateMsg = () => {
  //history routes
  const history = useHistory();
  // get channels when login
  const channels = useSelector((state) => state.auth.channels);

  const [large, setLarge] = useState(false);
  const [small, setSmall] = useState(false);

  const [collapseMulti, setCollapseMulti] = useState([false, false]);

  const [error, setError] = useState("");

  const [message, setMessage] = useState({
    channel: {},
    segment: { check: true, filter: ["all"] },
    template: null,
    title: null,
    message: null,
    link: null,
    fileName: null,
    filePath: null,
    schedule: { check: true, filter: Date.now() },
    type: null,
    date: null,
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
      setMessage({ ...message, [name]: JSON.parse(target.value) });
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
          check: !message.schedule.check,
          filter: target.value,
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
  const onSubmit = async (type) => {
    let messageData = message;
    messageData.type = type;
    MessageService.createMessage(messageData)
      .then((response) => {
        const { messageId } = response.data;
        return history.push(`/messages/${messageId}`);
      })
      .catch((error) => {
        console.log("error", error);
      });
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
              1. Audience
            </CCardHeader>
            <CCardBody>
              <CCol className="p-0" lg="3" md="3">
                <CLabel htmlFor="">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    Channels Type
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
                  <option value="">Select..</option>
                  {channels.map((item, index) => {
                    return (
                      <option value={JSON.stringify(item)} key={index}>
                        {item.name} - {item.type}
                      </option>
                    );
                  })}

                  {/* <option value="Zalo">Zalo</option>
                  <option value="Viber">Viber</option>
                  <option value="Telegram">Telegram</option> */}
                </CSelect>
                <small className="form-text text-muted">
                  <strong>Select</strong> a Channel to send message
                </small>
              </CCol>
              <CCol className="p-0 pt-3" lg="2">
                <CLabel htmlFor="segments">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    Segmnets
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
                    <strong>Send to Subscribed Users</strong>
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
                    <strong>Send to particular segment(s)</strong>
                  </CLabel>
                </CFormGroup>
                {/* collapes */}
                <CCol>
                  <CCollapse show={collapseMulti[0]}>
                    <CCol className="p-0">
                      <CLabel className="pl-2 font-weight-bold text-muted pt-2">
                        Who should receive this campaign?
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
                            <span>Add Segment</span>
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
                      <CModalTitle>Select Segment</CModalTitle>
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
                        Create Segment
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
                  <span className="text-muted">2. Message</span>
                </div>
                <div className="ml-auto d-md-none d-lg-none">
                  <CButton color="secondary">Preview</CButton>
                </div>
              </CCol>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol col="6" lg="6" md="6">
                  <CCol className="p-0 pb-4">
                    <CLabel htmlFor="district">
                      <span style={{ fontWeight: 600, fontSize: 14 }}>
                        Template
                      </span>
                    </CLabel>
                    <CSelect
                      custom
                      name="select"
                      id="select"
                      onChange={(value) => onValueChange(value)}
                    >
                      <option value="">Select..</option>
                      <option value="1">Template 1</option>
                      <option value="2">Template 2</option>
                    </CSelect>
                    <small className="form-text text-muted">
                      <strong>Select</strong> your Template
                    </small>
                  </CCol>
                  <CCol className="p-0">
                    <CFormGroup>
                      <CLabel htmlFor="">
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Title
                        </span>
                        <span className="danger-color pl-1">*</span>
                      </CLabel>
                      <CInput
                        name="title"
                        placeholder="Title"
                        required
                        onChange={(value) => onValueChange(value)}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol className="p-0 pb-2">
                    <CFormGroup>
                      <CLabel htmlFor="district">
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Content
                        </span>
                        <span className="danger-color pl-1">*</span>
                      </CLabel>
                      <CTextarea
                        name="message"
                        id="textarea-input"
                        rows="4"
                        placeholder="Message..."
                        maxLength="1000"
                        onChange={(value) => onValueChange(value)}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol className="p-0 pb-2">
                    <CFormGroup>
                      <CLabel htmlFor="file-input">
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Image
                        </span>
                      </CLabel>
                      <CCol>
                        <CInputFile
                          id="file-multiple-input"
                          name="fileName"
                          multiple
                          custom
                          onChange={(value) => onValueChange(value)}
                        />
                        <CLabel
                          htmlFor="file-multiple-input"
                          variant="custom-file"
                        >
                          {message.fileName
                            ? message.fileName
                            : "Choose Files..."}
                        </CLabel>
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol className="p-0">
                    <CFormGroup>
                      <CLabel htmlFor="file-input">
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Launch URL
                        </span>
                      </CLabel>
                      <CInput
                        id="name"
                        placeholder="http://bit.ly/abc"
                        name="link"
                        onChange={(value) => onValueChange(value)}
                      />
                    </CFormGroup>
                  </CCol>
                </CCol>
                <CCol col="6" className="d-none d-lg-block d-md-block">
                  <CCol className="d-flex justify-content-center align-items-start">
                    <CIcon
                      name="phonePreview"
                      height="600"
                      alt="phonePreview"
                    />
                  </CCol>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        {/* Schedule */}
        <CCol>
          <CCard>
            <CCardHeader>
              <div className="font-weight-bold">
                <span>3. Schedule</span>
              </div>
            </CCardHeader>
            <CCardBody>
              <CCol className="d-flex flex-column pb-2">
                <CLabel className="font-weight-bold text-muted">
                  When should this message start sending?
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
                    <strong>Message will send right away</strong>
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
                    <strong>Specific Time</strong>
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
                      <strong>Select</strong> time you want to send message
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
