import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPen,
  faEllipsisV,
  faSortDown,
  faFilter,
  faCheckCircle,
  faTimesCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import CIcon from "@coreui/icons-react";
import "./contacts.scss";
import femaleimg from '../../users/avatar/female.jpg'
import maleimg from '../../users/avatar/male.jpg'
import {
  CBadge,
  CButton,
  CImg,
  CCol,
  CDataTable,
  CDropdownHeader,
  CForm,
  CPagination,
  CLabel,
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
  CLink,
} from "@coreui/react";
import { faTelegram, faViber } from "@fortawesome/free-brands-svg-icons";

//lodash
import _ from "lodash";
//convert data
import { convert_day_hours_minute } from "../../../helpers/convertdate";
// api service
import AudienceService from "../../../services/audience.service";

const Contacts = () => {
  const limitpage = 15;
  const [channelDropdown, setChannelDropdown] = useState("All");
  const [data, setData] = useState([]);
  const getAllAudience = async (page, limit) => {
    const response = await AudienceService.getAllAudience(page, limit);
    if (response.data.errorCode === 0) {
      setData(response.data.Contacts);
    }
  };

  const getAudienceByChannelType = async (page, limit, type) => {
    const response = await AudienceService.getAudienceByChannelType(
      page,
      limit,
      type
    );
    if (response.data.errorCode === 0) {
      setData(response.data.Contacts);
    }
  };

  //pagination
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/contacts?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
    if (channelDropdown === "All") {
      getAllAudience(currentPage, limitpage);
    } else {
      getAudienceByChannelType(currentPage, limitpage, channelDropdown);
    }
  }, [currentPage, page, channelDropdown]);
  //end pagination
  if (_.isNil(data)) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <CRow>
        <CCol col="12" lg="12">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol className="d-flex flex-row">
                  {/* search */}
                  <CCol className="p-0" lg="2" md="4" sm="4" xs="8">
                    <CFormGroup className="form-group2 has-search">
                      <span className="form-control-feedback mt-1 ml-2">
                        <FontAwesomeIcon icon={faSearch} style={{ height: 18, width: 18 }} />
                      </span>
                      <CInput id="" type="text" size="lg" placeholder="Search" required className="form-control2" />
                    </CFormGroup>
                  </CCol>
                  {/* End Search */}
                  {/* Start Filter */}
                  <CCol className="d-flex p-0 ml-auto">
                    {/* <div className="ml-auto d-inline"> */}
                      <CDropdown className="ml-auto">
                        <CDropdownToggle color="secondary" size="lg" className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faFilter} className="mr-2" />
                          <span>Filter</span>
                        </CDropdownToggle>
                        <CDropdownMenu className="mt-2" placement="bottom-end" >
                          <CDropdownHeader className="pr-5">
                            <span style={{ fontSize: 16, fontWeight: 600, color: '#181c32' }} className="pr-5">Filter Options</span>
                          </CDropdownHeader>
                          <CDropdownDivider />
                          <CForm className="px-3 py-2" >
                            <CCol className="p-0 pb-3" col="6">
                              <CLabel htmlFor="exampleDropdownFormEmail1">
                                <span style={{ fontSize: 14, fontWeight: 700 }}>Status</span>
                              </CLabel>
                              <CDropdown>
                                <CDropdownToggle color="light" size="lg" block className="d-flex align-items-center">
                                  <span className="d-flex justify-content-start">Filter</span>
                                  <FontAwesomeIcon icon={faSortDown} className="ml-2 mb-1 ml-auto" />
                                </CDropdownToggle>
                                <CForm>
                                  <CDropdownMenu className="mt-2" placement="bottom-end" block>
                                    <CDropdownItem>All Channels</CDropdownItem>
                                    <CDropdownItem>Zalo</CDropdownItem>
                                    <CDropdownItem>Viber</CDropdownItem>
                                  </CDropdownMenu>
                                </CForm>
                              </CDropdown>
                            </CCol>
                            {/* Filter Channels type */}
                            <CCol className="p-0 pt-3 d-flex flex-column pb-3">
                              <CLabel htmlFor="exampleDropdownFormEmail1">
                                <span style={{ fontSize: 14, fontWeight: 700 }}>Channels Type:</span>
                              </CLabel>
                              <CCol className="p-0 pt-1 d-flex flex-row">
                                <CFormGroup variant="custom-checkbox" inline>
                                  <CInputCheckbox
                                    custom
                                    id="inline-checkbox1"
                                    name="inline-checkbox1"
                                    value="option1"
                                  />
                                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1" >Zalo</CLabel>
                                </CFormGroup>
                                <CFormGroup variant="custom-checkbox" inline>
                                  <CInputCheckbox
                                    custom
                                    id="inline-checkbox1"
                                    name="inline-checkbox1"
                                    value="option1"
                                  />
                                  <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Viber</CLabel>
                                </CFormGroup>
                              </CCol>
                            </CCol>
                            <CCol className="p-0 py-2">
                              <CFormGroup className="mt-2 float-right">
                                <CButton color="ghost" size="lg" className="mr-2">Reset</CButton>
                                <CButton color="primary" size="lg" type="submit">Submit</CButton>
                              </CFormGroup>
                            </CCol>
                          </CForm>
                        </CDropdownMenu>
                      </CDropdown>
                    
                    {/* End Filter */}
                  </CCol>
                </CCol>
              </CRow>
              <CDataTable
                items={data}
                fields={[
                  // { key: 'id', _style: { width: '1%' } },
                  {
                    key: "name",
                    label: "name",
                    _style: { width: "10%" }
                  },
                  {
                    key: "phonenumber",
                    label: "phone",
                    _style: { width: "4%" }
                  },
                  {
                    key: "channels",
                    label: "channels",
                    _style: { width: "2%" },
                  },
                  {
                    key: 'email',
                    label: 'email',
                    _style: { width: '4%' }
                  },
                  {
                    key: 'gender',
                    label: 'gender',
                    _style: { width: '1%' }
                  },
                  {
                    key: 'lastUpdate',
                    label: 'lastupdate',
                    _style: { width: '4%' }
                  },
                  {
                    key: "status",
                    label: "status",
                    _style: { width: "1%" }
                  },
                  // {
                  //   key: "action",
                  //   label: "action",
                  //   _style: { width: "1%" }
                  // },
                ]}
                bordered
                sorter
                striped
                itemsPerPage={8}
                activePage={page}
                onRowClick={
                  (item) => history.push(`/contacts/${item.id}`)}
                clickableRows
                scopedSlots={{
                  //name
                  name: (item) => (
                    <td>
                      <CRow>
                        <CCol className="d-flex flex-row bd-highlight">
                          <CCol lg="0" className="p-0 pr-3 d-flex align-items-center pl-2" >
                            <div className="c-avatar ">
                              {/* avatar */}
                              <img src={item.ZaloAccount?.avatar || item.ViberAccount?.avatar || maleimg} className="c-avatar-img" alt="admin@bootstrapmaster.com" height="48" width="48" name="avatar-female-default" />
                            </div>
                          </CCol>
                          <CCol className="p-0 d-flex flex-column">
                            <span style={{ fontWeight: 600 }} className="pb-1">
                              {item.ChatName}
                            </span>
                            <span className="small text-muted" style={{ fontWeight: 500 }}>Registered{''}: {convert_day_hours_minute(item.CreateDate)}</span>
                          </CCol>
                        </CCol>
                      </CRow>
                    </td>
                  ),
                  //channels
                  channels: (item) => (
                    <td>
                      <CCol className="p-2 d-flex flex-row bd-highlight">
                        {/* channels icon */}
                        {item.ChannelType === "Viber" && (
                          <FontAwesomeIcon
                            icon={faViber}
                            className="channel-icon mr-2"
                            style={{ color: "#665CAC" }}
                          />
                        )}
                        {item.ChannelType === "Zalo" && (
                          <CIcon
                            name="zaloIcon"
                            className="channel-icon mr-2 zalo-icon"
                          />
                        )}
                        {item.ChannelType === "Telegram" && (
                          <FontAwesomeIcon
                            icon={faTelegram}
                            className="channel-icon mr-2"
                            style={{ color: "#0088cc" }}
                          />
                        )}
                      </CCol>
                    </td>
                  ),
                  status: (item) => (
                    <td>
                      <CCol className="p-0">
                        <CBadge color={item.ChatStatus ? "success" : "danger"} className="badge-status text-uppercase">{item.ChatStatus ? "Subscribed" : "UnSubcribe"}
                          <FontAwesomeIcon icon={item.ChatStatus ? faCheckCircle : faTimesCircle} className="ml-2" />
                        </CBadge>
                      </CCol>
                    </td>
                  ),
                  gender: (item) => (
                    <td>
                      <CCol className="pl-1">
                        <span className="text-muted">_</span>
                      </CCol>
                    </td>
                  ),
                  phonenumber: (item) => (
                    <td>
                      <CCol className="pl-1">
                        <span className="text-muted">_</span>
                      </CCol>
                    </td>
                  ),
                  email: (item) => (
                    <td>
                      <CCol className="pl-1">
                        <span className="text-muted">_</span>
                      </CCol>
                    </td>
                  ),
                  lastUpdate: (item) => (
                    <td>
                      <CCol className="pl-1">
                        <span className="">{convert_day_hours_minute(item.CreateDate)}</span>
                      </CCol>
                    </td>
                  ),
                  action: (item) => (
                    <td>
                      <CDropdown className="pr-1 d-flex justify-content-center">
                        <CDropdownToggle color="ghost">
                          <FontAwesomeIcon
                            icon={faEllipsisV}
                            style={{ width: 12, height: 12 }}
                          />
                        </CDropdownToggle>
                        <CDropdownMenu className="mt-2">
                          <CDropdownItem>
                            <CLink to="/contacts/contactDetails">
                              <FontAwesomeIcon icon={faEye} className="mr-2" />
                              View details
                            </CLink>
                          </CDropdownItem>
                          <CDropdownItem>
                            <FontAwesomeIcon icon={faPen} className="mr-2" />
                            Update Info
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </td>
                  ),
                }}
              />
              <CPagination
                className="pt-2"
                activePage={page}
                onActivePageChange={pageChange}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Contacts;
