import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import {
  faPen,
  faMapMarkerAlt,
  faChartPie,
  faCheckCircle,
  faArrowUp,
  faArrowDown,
  faPhoneAlt,
  faTrashAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import femaleimg from "../../users/avatar/female.jpg";
import MsgOfContact from "./msgOfContact";
import "./contacts.scss";
import {
  CBadge,
  CButton,
  CCol,
  CTooltip,
  CModal,
  CModalHeader,
  CSelect,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
  CCardBody,
  CInput,
  CRow,
} from "@coreui/react";
import {
  faAccessibleIcon,
  faTelegram,
  faViber,
} from "@fortawesome/free-brands-svg-icons";
const ContactDetails = () => {
  const { t } = useTranslation();
  const [large, setLarge] = useState(false);
  return (
    <>
      {/* Modal Upadate profile */}
      <CModal
        show={large}
        onClose={() => setLarge(!large)}
        size="lg"
        className="custom-modal"
      >
        <CModalHeader closeButton>
          <CModalTitle>
            <h4 className="font-weight-bold">Update Contact</h4>
          </CModalTitle>
        </CModalHeader>
        <CModalBody
          className="p-3"
          style={{ height: "80vh", overflow: "auto" }}
        >
          <CCol lg="12" className="p-lg-4 px-lg-5 p-0 ">
            {/* Name */}
            <CCol className="pb-2 p-0 d-flex flex-lg-row flex-column ">
              <CCol className="p-0 pr-lg-4">
                <CCol className="p-0 d-flex align-items-center">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    First Name<span className="danger-color pl-2">*</span>
                  </span>
                </CCol>
                <CCol className="p-0 py-2 me-6">
                  <CInput htmlFor="First-name" placeholder="First Name" />
                </CCol>
              </CCol>
              <CCol className="p-0">
                <CCol className="p-0 d-flex align-items-center">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    Last Name <span className="danger-color pl-2">*</span>
                  </span>
                </CCol>
                <CCol className="p-0 py-2 me-6">
                  <CInput htmlFor="First-name" placeholder="First Name" />
                </CCol>
              </CCol>
            </CCol>
            {/* email and gender */}
            <CCol className="pb-2 p-0 d-flex flex-lg-row flex-column">
              <CCol className="p-0 pr-lg-4">
                <CCol className="p-0 d-flex align-items-center">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    Email <span className="danger-color pl-2">*</span>
                  </span>
                </CCol>
                <CCol className="p-0 py-2 me-6">
                  <CInput htmlFor="First-name" placeholder="First Name" />
                </CCol>
              </CCol>
              <CCol className="p-0">
                <CCol className="p-0">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Gender</span>
                </CCol>
                <CCol col="6" className="py-2 p-0">
                  <CSelect custom name="select" id="select">
                    <option value="0">select..</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Other</option>
                  </CSelect>
                </CCol>
              </CCol>
            </CCol>
            <CCol className="p-0 pb-2">
              <CCol className="p-0 d-flex align-items-center">
                <span style={{ fontWeight: 600, fontSize: 14 }}>
                  Day of birth
                </span>
              </CCol>
              <CCol className="p-0 py-2 me-6">
                <CInput htmlFor="date" type="date" placeholder="" />
              </CCol>
            </CCol>
            {/* Address */}
            <CCol className="p-0 pt-4 pb-2">
              <h5>
                <strong>Addres Info</strong>
              </h5>
            </CCol>
            <CCol col="6" className="d-flex flex-column p-0">
              <CCol className="p-0">
                <span style={{ fontWeight: 600, fontSize: 14 }}>Adress</span>
              </CCol>
              <CCol className="p-0 mr-3 py-2">
                <CInput htmlFor="Phone" placeholder="" />
                <small className="text-muted">
                  <strong>Enter</strong> the address
                </small>
              </CCol>
            </CCol>
            <CCol col="6" className="d-flex flex-column p-0 pt-2 pr-0">
              <CCol className="p-0">
                <span style={{ fontWeight: 600, fontSize: 14 }}>
                  City/Provincial
                </span>
              </CCol>
              <CCol className="p-0 py-2">
                <CSelect custom name="select" id="select">
                  <option value="0">select..</option>
                  <option value="1">Vietnam</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </CSelect>
                <small className="text-muted">
                  <strong>Select</strong> the Provincial/City
                </small>
              </CCol>
            </CCol>
            <CCol className="pt-2 p-0 d-flex flex-lg-row flex-column">
              <CCol col="6" className="d-flex flex-column p-0 pr-lg-4">
                <CCol className="p-0">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    City/Provincial
                  </span>
                </CCol>
                <CCol className="p-0 py-2">
                  <CSelect custom name="select" id="select">
                    <option value="0">select..</option>
                    <option value="1">Vietnam</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </CSelect>
                  <small className="text-muted">
                    <strong>Select</strong> the Provincial/City
                  </small>
                </CCol>
              </CCol>
              <CCol col="6" className="d-flex flex-column p-0">
                <CCol className="p-0">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    District
                  </span>
                </CCol>
                <CCol className="p-0 py-2">
                  <CSelect custom name="select" id="select">
                    <option value="0">select..</option>
                    <option value="1">Vietnam</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </CSelect>
                  <small className="text-muted">
                    <strong>Select</strong> the district
                  </small>
                </CCol>
              </CCol>
            </CCol>
            {/* street */}
          </CCol>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center">
          <CButton
            color="ghost"
            variant="light"
            onClick={() => setLarge(!large)}
          >
            Cancel
          </CButton>
          <CButton color="primary" onClick={() => setLarge(!large)}>
            Save Changes
          </CButton>{" "}
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ContactDetails;
