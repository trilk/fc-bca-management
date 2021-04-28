import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Imagedemo from "./photo/demo.jpeg";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  CButton,
  CImg,
  CCol,
  CLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CRow,
  CLink,
} from "@coreui/react";
import "./messages.scss";
import { useState } from "react";
import { phonePreview } from "src/assets/icons/phone-preview";
import CIcon from "@coreui/icons-react";

const ReviewMsg = ({ onSubmit, message }) => {
  //Modal
  const [large, setLarge] = useState(false);

  return (
    <>
      <CCol className="d-flex bd-highlight">
        <CCol className="pb-5 p-0">
          <CButton
            color="primary"
            className="mr-3"
            onClick={() => setLarge(!large)}
          >
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Review and Send
          </CButton>
          <CButton color="outline" onClick={() => onSubmit("Draft")}>
            Save as Draft
          </CButton>
        </CCol>
        {/* Collapse review */}
        <CModal show={large} onClose={() => setLarge(!large)} size="lg">
          <CModalHeader closeButton>
            <CModalTitle>
              <h4>Review Your Message</h4>
            </CModalTitle>
          </CModalHeader>
          <CModalBody style={{ height: "80vh", overflow: "auto" }}>
            <CCol className="p-0 p-lg-3">
              {/* form Audience */}
              <CCol className="p-0">
                <CLabel>
                  <h5>Audience</h5>
                </CLabel>
                <CCol className="border rounded-lg p-0 py-4">
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column">
                    <CCol
                      lg="3"
                      md="3"
                      sm="3"
                      xs="12"
                      className="text-muted py-1"
                    >
                      Channel
                    </CCol>
                    <CCol className="font-weight-bold">
                      {message.channel.name}
                    </CCol>
                  </CCol>
                  <hr />
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                    <CCol
                      lg="3"
                      md="3"
                      sm="3"
                      xs="12"
                      className="text-muted py-1"
                    >
                      Included segments
                    </CCol>
                    <CCol className="font-weight-bold">
                      {message.segment.check
                        ? "Subscribed Users"
                        : message.segment.filter.map((item, index) => {
                            return <span key={index}>{item}</span>;
                          })}
                    </CCol>
                  </CCol>
                  <hr />
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                    <CCol
                      lg="3"
                      md="3"
                      sm="3"
                      xs="12"
                      className="text-muted py-1"
                    >
                      Estimated recipients
                    </CCol>
                    <CCol className="font-weight-bold">100.000.000 Users</CCol>
                  </CCol>
                </CCol>
              </CCol>
              {/* End */}
              {/* Content */}
              <CCol className="p-0 py-4">
                <CLabel>
                  <h5>Messages</h5>
                </CLabel>
                <CCol className="border rounded p-0 py-4">
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                    <CCol lg="3" className="text-muted">
                      <span>Title</span>
                    </CCol>
                    <CCol className="font-weight-bold">{message.title}</CCol>
                  </CCol>
                  <hr />
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                    <CCol lg="3" className="text-muted">
                      Content
                    </CCol>
                    <CCol className="font-weight-bold">{message.message}</CCol>
                  </CCol>
                  <hr />
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                    <CCol lg="3" className="text-muted">
                      Image
                    </CCol>
                    <CCol className="font-weight-bold">
                      <CImg
                        src={message.filePath}
                        height="80"
                        width="80"
                        className="rounded"
                      />
                    </CCol>
                  </CCol>
                  <hr />
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                    <CCol lg="3" className="text-muted">
                      Launch URL
                    </CCol>
                    <CCol
                      className="font-weight-bold"
                      style={{ cursor: "pointer", color: "#007BFF" }}
                    >
                      {message.link}
                    </CCol>
                  </CCol>
                </CCol>
              </CCol>
              <CCol className="p-0">
                <CLabel>
                  <h5>Schedule</h5>
                </CLabel>
                <CCol className="border rounded p-0 py-4">
                  <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                    <CCol lg="3" className="text-muted">
                      Start sending
                    </CCol>
                    <CCol className="font-weight-bold">
                      {message.schedule.check
                        ? "Send right away"
                        : message.schedule.filter}
                    </CCol>
                  </CCol>
                </CCol>
              </CCol>
            </CCol>
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center">
            <CButton color="ghost" onClick={() => setLarge(!large)}>
              Make changes
            </CButton>
            <CButton
              color="primary"
              onClick={() =>
                onSubmit(message.schedule.check ? "OneTime" : "Schedule")
              }
            >
              Send Message
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    </>
  );
};

export default ReviewMsg;
