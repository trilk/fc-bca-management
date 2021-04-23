import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faUserCircle,
  faUser,
  faVenusMars,
  faTimes,
  faAt,
  faGlobeAsia,
  faCalendarCheck,
  faIdCard,
  faMapMarkerAlt,
  faHistory,
  faEnvelopeOpenText,
  faPoll,
  faChartPie,
  faCheckCircle,
  faCalendarPlus,
  faDotCircle,
  faArrowUp,
  faArrowDown,
  faPhoneAlt,
  faCalendarDay,
  faTrash,
  faTrashAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import femaleimg from "../../users/avatar/female.jpg";
import MsgOfContact from "./msgOfContact"
import "./contacts.scss";
import {
  CBadge,
  CButton,
  CInvalidFeedback,
  CValidFeedback,
  CImg,
  CForm,
  CCol,
  CDataTable,
  CPagination,
  CLabel,
  CTooltip,
  CModal,
  CModalHeader,
  CSelect,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLink,
  CInputCheckbox,
  CCallout,
  CCard,
  CCardBody,
  CPopover,
  CDropdownItem,
  CFormGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CInputRadio,
  CInput,
  CRow,
  CDropdownDivider,
} from "@coreui/react";
import {
  faAccessibleIcon,
  faTelegram,
  faViber,
} from "@fortawesome/free-brands-svg-icons";

const placements = ["top"];
const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};
const ContactDetails = () => {
  const [large, setLarge] = useState(false)
  const [small, setSmall] = useState(false)
  return (
    <>
      <CRow>
        <CCol className="d-flex flex-lg-row flex-column">
          <CCol lg="5" xl="4" md="12" className="p-0">
            <CCard>
              <CCardBody>
                <CCol className="pb-4 p-0 p-lg-2 p-md-2 p-sm-2">
                  <CCol className="p-0">
                    <CCol className="p-0">
                      <CCol className="pt-3 d-flex justify-content-center p-0">
                        {/* avatar */}
                        <img
                          src={femaleimg}
                          style={{ height: 120, width: 120 }}
                          className="c-avatar-img-bg"
                          alt="admin@bootstrapmaster.com"
                          name="avatar-male-default"
                        />
                      </CCol>
                      <CCol className="d-flex flex-column pt-3">
                        <h4 className="d-flex justify-content-center align-items-center">Nguyen Van Nam <CTooltip content={`Subscribed`} placement="top"><FontAwesomeIcon icon={faCheckCircle} style={{ height: 12, width: 12 }} className="ml-2 success-color" /></CTooltip></h4>

                      </CCol>
                      <CCol className="d-flex flex-wrap p-0 pt-1 pb-3 justify-content-center">
                        <div className="text-muted pr-3 d-flex flex-row align-items-center pb-1">
                          <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" /><span style={{ fontWeight: 600 }}>0987 8878 88</span>
                        </div>
                        <div className="text-muted pr-3 d-flex flex-row align-items-center pb-1">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /><span style={{ fontWeight: 600 }}>HCM, District 2</span>
                        </div>
                      </CCol>
                    </CCol>
                    <CCol className="d-flex flex-lg-row flex-md-row flex-sm-row flex-column pt-2 p-0">
                      <CCol className="border rounded border-dashed mr-lg-2 mr-md-3 mr-sm-3 p-0 mb-3">
                        <CCol className="d-flex flex-column py-2">
                          <span style={{ fontSize: 16, fontWeight: 700 }} className="d-flex align-items-center">1.009 <FontAwesomeIcon style={{ height: 10, width: 10, color: '#28A745' }} icon={faArrowUp} className="ml-auto" /></span>
                          <span className="text-muted small">Messages </span>
                        </CCol>
                      </CCol>
                      <CCol className="border rounded border-dashed mr-lg-2 mr-md-3 mr-sm-3 p-0 mb-3">
                        <CCol className="d-flex flex-column py-2">
                          <span style={{ fontSize: 16, fontWeight: 700 }} className="d-flex align-items-center">1.009 <FontAwesomeIcon style={{ height: 10, width: 10, color: '#28A745' }} icon={faArrowUp} className="ml-auto" /></span>
                          <span className="text-muted small">Delivered</span>
                        </CCol>
                      </CCol>
                      <CCol className="border rounded border-dashed p-0 mb-3">
                        <CCol className="d-flex flex-column py-2">
                          <span style={{ fontSize: 16, fontWeight: 700 }} className="d-flex align-items-center">12 <FontAwesomeIcon style={{ height: 10, width: 10, }} icon={faArrowDown} className="ml-auto danger-color" /></span>
                          <span className="text-muted small">Failed</span>
                        </CCol>
                      </CCol>
                    </CCol>
                  </CCol>
                  {/* end user avatar and more */}
                  <CCol className="pt-3 p-0">
                    <CCol className="p-0">
                      <CCol className="p-0 pt-2 d-flex align-items-center">
                        <span style={{ fontSize: 16, fontWeight: 600 }}>Details</span>
                        <div className="ml-auto">
                          <CButton size="sm" color="secondary" className="d-flex align-items-center" onClick={() => setLarge(!large)}><FontAwesomeIcon icon={faPen} style={{ height: 10, width: 10 }} className="mr-2" />Update Info</CButton>
                        </div>
                      </CCol>
                      <hr className="border-dashed" />
                    </CCol>
                  </CCol>
                  <CCol className="p-0">
                    {/* label */}
                    <CCol className="p-0  py-2 d-flex flex-column">
                      <CCol lg="3" className="p-0">
                        <span className="text-muted" style={{ fontWeight: 500 }}>Contact ID</span>
                      </CCol>
                      <CCol className="p-0 py-1">
                        <span style={{ fontWeight: 600 }}>ID-97868677</span>
                      </CCol>
                    </CCol>
                    {/* Endlabel */}
                    {/* label */}
                    <CCol className="p-0  py-2 d-flex flex-column">
                      <CCol lg="3" className="p-0">
                        <span className="text-muted" style={{ fontWeight: 500 }}>Email</span>
                      </CCol>
                      <CCol className="p-0 py-1">
                        <span style={{ fontWeight: 600 }}>xuanhauholo@gmail.com</span>
                      </CCol>
                    </CCol>
                    {/* Endlabel */}
                    {/* label */}
                    <CCol className="p-0  py-2 d-flex flex-column">
                      <CCol lg="3" className="p-0">
                        <span className="text-muted" style={{ fontWeight: 500 }}>Gender</span>
                      </CCol>
                      <CCol className="p-0 py-1">
                        <span style={{ fontWeight: 600 }}>Male</span>
                      </CCol>
                    </CCol>
                    {/* Endlabel */}
                    {/* label */}
                    <CCol className="p-0  py-2 d-flex flex-column">
                      <CCol lg="3" className="p-0">
                        <span className="text-muted" style={{ fontWeight: 500 }}>Date Of Birth</span>
                      </CCol>
                      <CCol className="p-0 py-1">
                        <span style={{ fontWeight: 600 }}>20, july, 1994</span>
                      </CCol>
                    </CCol>
                    {/* Endlabel */}
                    {/* label */}
                    <CCol className="p-0  py-2 d-flex flex-column">
                      <CCol lg="3" className="p-0">
                        <span className="text-muted" style={{ fontWeight: 500 }}>Address</span>
                      </CCol>
                      <CCol className="p-0 py-1">
                        <span style={{ fontWeight: 600 }}>101 Collin Street, Melbourne 3000 VIC Australia</span>
                      </CCol>
                    </CCol>
                    {/* Endlabel */}
                    {/* label */}
                    <CCol className="p-0  py-2 d-flex flex-column">
                      <CCol lg="3" className="p-0">
                        <span className="text-muted" style={{ fontWeight: 500 }}>Last Update</span>
                      </CCol>
                      <CCol className="py-1 p-0">
                        <span style={{ fontWeight: 600 }}>20, july, 2021</span>
                      </CCol>
                    </CCol>
                    {/* Endlabel */}
                  </CCol>
                </CCol>
              </CCardBody>
            </CCard>
          </CCol>
          {/* End card left */}
          {/* right content */}
          <CCol className="p-0 pl-lg-4">
            {/* begin card channels Subscribed */}
            <CCol className="p-0">
              <CCard>
                <CCardBody>
                  <CCol className="p-0 px-lg-3 px-md-3 px-sm-3 p-0 py-3">
                    <CCol className="p-0">
                      <h4><strong>Subscribed Channels</strong></h4>
                    </CCol>
                    <CCol className="overflow-auto p-0 ">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>
                              Channels
                           </th>
                            <th>
                              Status
                           </th>
                            <th>
                              Started
                           </th>
                          </tr>
                        </thead>
                        <tr>
                          <td className="pl-0">
                            <CCol className="d-flex flex-row align-items-center p-0">
                              <div className="icon-drop mr-3 ml-0 mt-1 bg-light">
                                <CIcon
                                  name="zaloIcon"
                                  style={{ height: 24, width: 24, }}
                                />
                              </div>
                              <CCol className="p-0 d-flex flex-column">
                                <span style={{ fontSize: 14, fontWeight: 700 }}>Zalo</span>
                                <span className="text-muted small pt-1"><strong>Name:</strong> Nguyen Van C</span>
                              </CCol>
                            </CCol>
                          </td>
                          <td>
                            <div>
                              <CBadge color="success" className="badge-status text-uppercase">Subscribed
                              <FontAwesomeIcon icon={faCheckCircle} className="ml-2" />
                              </CBadge>
                            </div>
                          </td>
                          <td>
                            15 Apr 2021
                        </td>
                        </tr>
                        <tr>
                          <td className="pl-0">
                            <CCol className="d-flex flex-row align-items-center p-0">
                              <div className="icon-drop mr-3 ml-0 mt-1 bg-light">
                                <FontAwesomeIcon icon={faViber} style={{ height: 24, width: 24, color: '#665CAC' }} />
                              </div>
                              <CCol className="p-0 d-flex flex-column">
                                <span style={{ fontSize: 14, fontWeight: 700 }}>Viber</span>
                                <span className="text-muted small pt-1"><strong>Name:</strong> Nguyen Van C</span>
                              </CCol>
                            </CCol>
                          </td>
                          <td>
                            <div>
                              <CBadge color="danger" className="badge-status text-uppercase">Unsubscribed
                              <FontAwesomeIcon icon={faTimesCircle} className="ml-2" />
                              </CBadge>
                            </div>
                          </td>
                          <td>
                            15 Apr 2021
                        </td>
                        </tr>
                      </table>
                    </CCol>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
            {/* End Card Subscribed Channels */}
            {/* card segments */}
            <CCol className="p-0">
              <CCard>
                <CCardBody className="overflow-auto">
                  <CCol className="p-0 px-lg-3 px-md-3 px-sm-3 py-3">
                    <CCol className="p-0 pb-4">
                      <h4><strong>Segmnets this contact</strong></h4>
                      <span className="text-muted small">All Segments of this contact</span>
                    </CCol>
                    {/* Segment */}
                    <CCol className="d-flex flex-row align-items-center p-0">
                      <div className="icon-drop mr-3 ml-0 mt-1 bg-light">
                        <FontAwesomeIcon icon={faChartPie} style={{ color: '#009ef7' }} />
                      </div>
                      <CCol className="p-0 d-flex flex-column">
                        <span style={{ fontSize: 14, fontWeight: 700 }}>Ten Segment Quan 2 TP Sai Son </span>
                        <span className="text-muted small pt-1">Create Date: 12/ 12 / 2021</span>
                      </CCol>
                      <div className="float-right">
                        <CTooltip content={`Delete`}><CButton color="light" variant="ghost"><FontAwesomeIcon icon={faTrashAlt} /></CButton></CTooltip>
                      </div>
                    </CCol>
                    <hr className="border-dashed" />
                    {/* Segment */}
                    <CCol className="d-flex flex-row align-items-center p-0">
                      <div className="icon-drop mr-3 ml-0 mt-1 bg-light">
                        <FontAwesomeIcon icon={faChartPie} style={{ color: '#009ef7' }} />
                      </div>
                      <CCol className="p-0 d-flex flex-column">
                        <span style={{ fontSize: 14, fontWeight: 700 }}>Ten Segment Quan 2 TP Sai Son </span>
                        <span className="text-muted small pt-1">Create Date: 12/ 12 / 2021</span>
                      </CCol>
                      <div className="float-right">
                        <CTooltip content={`Delete`}><CButton color="light" variant="ghost"><FontAwesomeIcon icon={faTrashAlt} /></CButton></CTooltip>
                      </div>
                    </CCol>
                    <hr className="border-dashed" />
                    {/* Segment */}
                    <CCol className="d-flex flex-row align-items-center p-0">
                      <div className="icon-drop mr-3 ml-0 mt-1 bg-light">
                        <FontAwesomeIcon icon={faChartPie} style={{ color: '#009ef7' }} />
                      </div>
                      <CCol className="p-0 d-flex flex-column">
                        <span style={{ fontSize: 14, fontWeight: 700 }}>Ten Segment Quan 2 TP Sai Son </span>
                        <span className="text-muted small pt-1">Create Date: 12/ 12 / 2021</span>
                      </CCol>
                      <div className="float-right">
                        <CTooltip content={`Delete`}><CButton color="light" variant="ghost"><FontAwesomeIcon icon={faTrashAlt} /></CButton></CTooltip>
                      </div>
                    </CCol>
                    <hr className="border-dashed" />
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
            {/* End  */}
            {/* begin card message list newest */}
            {/* messages list */}
            <MsgOfContact />
            {/* End  */}
          </CCol>
        </CCol>

        {/* Modal Upadate profile */}
        <CModal
          show={large}
          onClose={() => setLarge(!large)}
          size="lg"
          className="custom-modal"
        >
          <CModalHeader closeButton>
            <CModalTitle><h4 className="font-weight-bold">Update Contact</h4></CModalTitle>
          </CModalHeader>
          <CModalBody className="p-3" style={{ height: '80vh', overflow: 'auto' }}>
            <CCol lg="12" className="p-lg-4 px-lg-5 p-0 ">
              {/* Name */}
              <CCol className="pb-2 p-0 d-flex flex-lg-row flex-column ">
                <CCol className="p-0 pr-lg-4">
                  <CCol className="p-0 d-flex align-items-center">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>First Name<span className="danger-color pl-2">*</span>
                    </span>
                  </CCol>
                  <CCol className="p-0 py-2 me-6">
                    <CInput htmlFor="First-name" placeholder="First Name" />
                  </CCol>
                </CCol>
                <CCol className="p-0">
                  <CCol className="p-0 d-flex align-items-center">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Last Name <span className="danger-color pl-2">*</span>
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
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Email <span className="danger-color pl-2">*</span>
                    </span>
                  </CCol>
                  <CCol className="p-0 py-2 me-6">
                    <CInput htmlFor="First-name" placeholder="First Name" />
                  </CCol>
                </CCol>
                <CCol className="p-0">
                  <CCol className="p-0">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>Gender</span></CCol>
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
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Day of birth</span>
                </CCol>
                <CCol className="p-0 py-2 me-6">
                  <CInput htmlFor="date" type="date" placeholder="" />
                </CCol>
              </CCol>
              {/* Address */}
              <CCol className="p-0 pt-4 pb-2"><h5><strong>Addres Info</strong></h5></CCol>
              <CCol col="6" className="d-flex flex-column p-0">
                <CCol className="p-0">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>Adress</span></CCol>
                <CCol className="p-0 mr-3 py-2">
                  <CInput htmlFor="Phone" placeholder="" />
                  <small className="text-muted"><strong>Enter</strong> the address</small>
                </CCol>
              </CCol>
              <CCol col="6" className="d-flex flex-column p-0 pt-2 pr-0">
                <CCol className="p-0">
                  <span style={{ fontWeight: 600, fontSize: 14 }}>City/Provincial</span></CCol>
                <CCol className="p-0 py-2">
                  <CSelect custom name="select" id="select">
                    <option value="0">select..</option>
                    <option value="1">Vietnam</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </CSelect>
                  <small className="text-muted"><strong>Select</strong> the Provincial/City</small>
                </CCol>
              </CCol>
              <CCol className="pt-2 p-0 d-flex flex-lg-row flex-column">
                <CCol col="6" className="d-flex flex-column p-0 pr-lg-4">
                  <CCol className="p-0">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>City/Provincial</span></CCol>
                  <CCol className="p-0 py-2">
                    <CSelect custom name="select" id="select">
                      <option value="0">select..</option>
                      <option value="1">Vietnam</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </CSelect>
                    <small className="text-muted"><strong>Select</strong> the Provincial/City</small>
                  </CCol>
                </CCol>
                <CCol col="6" className="d-flex flex-column p-0">
                  <CCol className="p-0">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>District</span></CCol>
                  <CCol className="p-0 py-2">
                    <CSelect custom name="select" id="select">
                      <option value="0">select..</option>
                      <option value="1">Vietnam</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </CSelect>
                    <small className="text-muted"><strong>Select</strong> the district</small>
                  </CCol>
                </CCol>
              </CCol>
              {/* street */}
            </CCol>
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center">
            <CButton color="ghost" variant="light" onClick={() => setLarge(!large)}>Cancel</CButton>
            <CButton color="primary" onClick={() => setLarge(!large)}>Save Changes</CButton>{' '}
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  );
};

export default ContactDetails;
