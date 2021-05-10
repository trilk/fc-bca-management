import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faUsers,
  fabViber,
  faChessQueen,
  faFacebookMessenger,
  faEye,
  faEdit,
  faPen,
  faPause,
  faCopy,
  faEllipsisV,
  faPlus,
  faPlusCircle,
  faChevronCircleDown,
  faSortDown,
  faClone,
  faCircle,
  faTag,
  faFilter,
  faUserCircle,
  faUser,
  faDatabase,
  faHamburger,
  faVenusMars,
  faIdBadge,
  faMinus,
  faExchangeAlt,
  faTrash,
  faUserTag,
  faCheck,
  faTimes,
  faUserFriends,
  faFileImport,
  faUserPlus,
  faIndent,
  faMailBulk,
  faAt,
  faMapMarkedAlt,
  faAddressBook,
  faAddressCard,
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
  faWindowClose,
  faChargingStation,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  CBadge,
  CButton,
  CImg,
  CCol,
  CProgress,
  CDataTable,
  CForm,
  CPagination,
  CLabel,
  CTooltip,
  CModal,
  CModalHeader,
  CSelect,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInputFile,
  CTextarea,
  CInputCheckbox,
  CCallout,
  CCard,
  CCollapse,
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
  CLink,
  CAlert,
  CCardHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const NewTemplate = () => {
  const placements = [
    "top-start",
    "top",
    "top-end",
    "bottom-start",
    "bottom",
    "bottom-end",
    "right-start",
    "right",
    "right-end",
    "left-start",
    "left",
    "left-end",
  ];
  const [visible, setVisible] = React.useState(10);
  return (
    <>
      <CCol
        className="pb-4 p-0"
        xxl={12}
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
      >
        <CCard>
          <CCardHeader>
            <CCol
              lg="12"
              className="p-0 d-flex flex-row bd-highlight align-items-center"
            >
              <div className="font-weight-bold">
                <span>Message Template</span>
              </div>
              {/* <div className="ml-auto">
                                    <CButton color="outline">Preview</CButton>
                                </div> */}
            </CCol>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol col="6" lg="6" md="6">
                <CCol className="p-0 pb-1">
                  <CFormGroup>
                    <CLabel htmlFor="file-input" className="text-muted">
                      TEMPLATE NAME (REQUIRED)
                      <span className="danger-color pl-1">*</span>
                    </CLabel>
                    <CInput id="name" placeholder="" required />
                  </CFormGroup>
                </CCol>
                <CCol className="p-0 pb-2">
                  <CFormGroup>
                    <CLabel htmlFor="district" className="text-muted">
                      Message<span className="danger-color pl-1">*</span>
                    </CLabel>
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="4"
                      placeholder="Message..."
                      maxLength="1000"
                    />
                  </CFormGroup>
                </CCol>
                <CCol className="p-0 pb-2">
                  <CFormGroup>
                    <CLabel htmlFor="file-input" className="text-muted">
                      File input
                    </CLabel>
                    <CCol>
                      <CInputFile
                        id="file-multiple-input"
                        name="file-multiple-input"
                        multiple
                        custom
                      />
                      <CLabel
                        htmlFor="file-multiple-input"
                        variant="custom-file"
                      >
                        Choose Files...
                      </CLabel>
                    </CCol>
                  </CFormGroup>
                </CCol>
                <CCol className="p-0">
                  <CFormGroup>
                    <CLabel htmlFor="file-input" className="text-muted">
                      Launch URL
                    </CLabel>
                    <CInput
                      id="name"
                      placeholder="http://bit.ly/abc"
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CCol>
              <CCol col="6" className="d-none d-lg-block d-md-block">
                <CCol className="d-flex justify-content-center align-items-start">
                  <CIcon name="phonePreview" height="600" alt="phonePreview" />
                </CCol>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CLink to="/template/new-template/template-details">
          <CButton size="lg" color="primary">
            Save
          </CButton>
        </CLink>
      </CCol>
    </>
  );
};

export default NewTemplate;
