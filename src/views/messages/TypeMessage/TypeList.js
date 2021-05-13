import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPlusCircle,
    faTimes,
    faChartPie,
    faUpload,
    faFileImage,
    faFileImport,
    faTimesCircle,
    faTrash,
    faPen,
} from "@fortawesome/free-solid-svg-icons";
import {
    CButton,
    CCol,
    CLabel,
    CTextarea,
    CInput,
    CImg,
} from "@coreui/react";
import "../messages.scss";

const ListMsgType = () => {
    const [list, setList] = useState(false)

    //upload image
    const [image, setImage] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader()

            reader.onload = function (e) {
                setImage(e.target.result)
                setIsUploaded(true)
            }
            reader.readAsDataURL(e.target.files[0])

        }
    }
    return (
        <>
            <CCol className="p-0">
                <CLabel>
                    <h6 className="font-weight-bold mb-0">Tin nhắn dạng danh dách</h6>
                    <small className="text-muted">Tin nhắn này sẽ hiện cho người nhận dạng danh sách bao gồm nội dung và hình ảnh
                    </small>
                </CLabel>
                <hr className="mt-0" />
                {/* Box content vs images */}
                <CCol className="border rounded bg-light p-3 mt-4">
                    <CCol className="p-0">
                        <CLabel style={{ fontWeight: 600, fontSize: 14 }}>
                            Hình ảnh
                            </CLabel>
                        <div className="Upload__img">
                            {
                                !isUploaded ? (
                                    <>
                                        <CLabel htmlFor="img-upload" className="mb-0 d-flex flex-row align-items-center upload" block>
                                            {/* <div className=""> */}
                                            <FontAwesomeIcon icon={faFileImport} className="ml-3" size="lg"/>
                                            <div className="d-flex flex-column pl-2">
                                                {/* <h6 className="mb-0 font-weight-bold">Drop file here or click to upload</h6> */}
                                                <span>Click to upload image</span>
                                            </div>
                                            {/* </div> */}
                                        </CLabel>
                                        <input
                                            accept=".jpg, .png, .jpeg, .gif, "
                                            id="img-upload"
                                            type="file"
                                            className="d-none"
                                            onChange={handleImageChange} />
                                    </>
                                ) : (
                                    <div className="bg__uploaded">
                                        <CImg src={image} className="image__uploaded " />
                                        <span color="ghost"
                                            onClick={() => {
                                                setIsUploaded(false)
                                                setImage(true)
                                            }}>Gỡ hình</span>
                                    </div>
                                )}
                        </div>
                    </CCol>
                    <CCol className="p-0 pt-3">
                        <CLabel>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>
                                Noi dung
                            </span>
                        </CLabel>
                        <CTextarea rows="2" className="bg-white border" placeholder="Nhap noi dung" />
                    </CCol>
                    <CCol className="p-0 pt-3">
                        <CLabel>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>
                                Đường dẫn
                            </span>
                        </CLabel>
                        <CInput className="bg-white border" placeholder="http://Ott@.com.vn" />
                    </CCol>
                    <CCol className="p-0 pt-3 d-flex justify-content-end">
                        <CButton color="primary" size="sm" onClick={() => setList()}>
                            <span className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faPlus} size="xs" className="mr-1" />
                        Tạo</span>
                        </CButton>
                    </CCol>
                </CCol>
                {/* End */}
                {/* list when created */}
                <CCol className="d-flex flex-column pt-3 p-0">
                    <div className="d-flex flex-row align-items-center py-2">
                        <CLabel className="font-weight-bold">List 1</CLabel>
                        <div className="ml-auto">
                            <CButton color="secondary" size="sm" className="mr-2">
                                <FontAwesomeIcon icon={faPen} className="mx-1" />
                            </CButton>
                            <CButton color="secondary" size="sm" >
                                <FontAwesomeIcon icon={faTrash} className="mx-1" />
                            </CButton>
                        </div>
                    </div>
                    <CCol className="d-flex flex-row border rounded py-3">
                        <div className="bg__img">
                            <CImg src={image} className="img" />
                        </div>
                        <div className="d-flex flex-column pl-3">
                            <span className="d-flex flex-wrap">
                                This is the first item's accordion body.It is hidden by default, until the collapse plugin adds the appropriate
                        </span>
                            <small className="primary-color"><u>http://ABC####.com.vn</u></small>
                        </div>
                    </CCol>
                </CCol>
                <CCol className="d-flex flex-column pt-3 p-0">
                    <div className="d-flex flex-row align-items-center py-2">
                        <CLabel className="font-weight-bold">List 2</CLabel>
                        <div className="ml-auto">
                            <CButton color="secondary" size="sm" className="mr-2">
                                <FontAwesomeIcon icon={faPen} className="mx-1" />
                            </CButton>
                            <CButton color="secondary" size="sm" >
                                <FontAwesomeIcon icon={faTrash} className="mx-1" />
                            </CButton>
                        </div>
                    </div>
                    <CCol className="d-flex flex-row border rounded py-3">
                        <div className="bg__img">
                            <CImg src={image} className="img" />
                        </div>
                        <div className="d-flex flex-column pl-3">
                            <span className="d-flex flex-wrap">
                                This is the first item's accordion body.It is hidden by default, until the collapse plugin adds the appropriate
                        </span>
                            <small className="primary-color"><u>http://ABC####.com.vn</u></small>
                        </div>
                    </CCol>
                </CCol>
            </CCol>
        </>
    )
}

export default ListMsgType
