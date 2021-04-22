import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Imagedemo from './photo/demo.jpeg'
import {
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
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

const ReviewMsg = () => {
    //Modal
    const [large, setLarge] = useState(false);

    return (
        <>
            <CCol className="d-flex bd-highlight">
                <CCol className="pb-5 p-0 d-flex justify-content-lg-start justify-content-center">
                    <CButton
                        color="primary"
                        className="mr-3"
                        onClick={() => setLarge(!large)}
                    >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        Review and Send
                    </CButton>
                    <CButton color="outline">Save as Draft</CButton>
                </CCol>
                {/* Collapse review */}
                <CModal show={large} onClose={() => setLarge(!large)} size="lg">
                    <CModalHeader closeButton>
                        <CModalTitle>Review Your Message</CModalTitle>
                    </CModalHeader>
                    <CModalBody style={{ height: '80vh', overflow: 'auto' }}>
                        <CCol className="p-0 p-lg-3">
                            {/* form Audience */}
                            <CCol className="p-0">
                                <CLabel><h4>Audience</h4></CLabel>
                                <CCol className="border rounded-lg p-0 py-4">
                                    <CCol className="d-flex flex-lg-row flex-md-row flex-column">
                                        <CCol lg="3" md="3" sm="3" xs="12" className="text-muted py-1">
                                            Channel
                                            </CCol>
                                        <CCol className="font-weight-bold">Zalo
                                        </CCol>
                                    </CCol><hr />
                                    <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                                        <CCol lg="3" md="3" sm="3" xs="12" className="text-muted py-1">
                                            Included segments
                                        </CCol>
                                        <CCol className="font-weight-bold">Subscribed Users, Segment 2 Holoa</CCol>
                                    </CCol><hr />
                                    <CCol className="d-flex flex-lg-row flex-md-row flex-column pl-2">
                                        <CCol lg="3" md="3" sm="3" xs="12" className="text-muted py-1">
                                            Estimated recipients
                                        </CCol>
                                        <CCol className="font-weight-bold">100.000.000 Users</CCol>
                                    </CCol>
                                </CCol>
                            </CCol>
                            {/* End */}
                            {/* Content */}
                            <CCol className="p-0 py-4">
                                <CLabel><h4>Messages</h4></CLabel>
                                <CCol className="border rounded p-0 py-4">
                                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                                        <CCol lg="3" className="text-muted" >
                                            <span>Title</span>
                                        </CCol>
                                        <CCol className="font-weight-bold">Lorem Ipsum is simply dummy text of the printing
                                        </CCol>
                                    </CCol><hr />
                                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                                        <CCol lg="3" className="text-muted" >
                                            Content
                                        </CCol>
                                        <CCol className="font-weight-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                        </CCol>
                                    </CCol><hr />
                                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                                        <CCol lg="3" className="text-muted" >
                                            Image
                                        </CCol>
                                        <CCol className="font-weight-bold">
                                            <CImg src={Imagedemo} height="80" width="80" className="rounded" />
                                        </CCol>
                                    </CCol><hr />
                                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                                        <CCol lg="3" className="text-muted" >
                                            Launch URL
                                        </CCol>
                                        <CCol className="font-weight-bold" style={{ cursor: 'pointer', color: '#007BFF' }}>https://fontawesome.com/icons?d=gallery&p=2&q=send</CCol>
                                    </CCol>
                                </CCol>
                            </CCol>
                            <CCol className="p-0">
                                <CLabel><h4>Schedule</h4></CLabel>
                                <CCol className="border rounded p-0 py-4">
                                    <CCol className="d-flex flex-lg-row flex-md-row flex-column p-0">
                                        <CCol lg="3" className="text-muted" >
                                            Start sending
                    </CCol>
                                        <CCol className="font-weight-bold">
                                            Friday, April 16, 2021 12:20 AM UTC+07:00 (in 6 days)
                    </CCol>
                                    </CCol>
                                </CCol>
                            </CCol>
                        </CCol>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="outline" onClick={() => setLarge(!large)}>
                            Make changes
            </CButton>{" "}
                        <CLink to="/messages/MessagesReport">
                            <CButton color="primary">Send Message</CButton>
                        </CLink>
                    </CModalFooter>
                </CModal>
            </CCol>
        </>
    );
};

export default ReviewMsg;
