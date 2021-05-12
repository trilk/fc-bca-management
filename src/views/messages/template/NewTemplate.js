import React, { useState } from "react";

import {
  CButton,
  CCol,
  CLabel,
  CInputFile,
  CTextarea,
  CCard,
  CCardBody,
  CFormGroup,
  CInput,
  CRow,
  CLink,
  CCardHeader,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import FileInput from "../../../containers/FileInput";

//upload
import UploadService from "../../../services/upload.service";

//template
import { templateImage, templateText } from "./templateData";

const NewTemplate = () => {
  const [template, setTemplate] = useState({
    type: "text",
    templateTitle: "",
    title: "",
    content: "",
    image: {
      image1: {
        fileName: "",
        filePath: "",
      },
      image2: {
        fileName: "",
        filePath: "",
      },
      image3: {
        fileName: "",
        filePath: "",
      },
      image4: {
        fileName: "",
        filePath: "",
      },
      image5: {
        fileName: "",
        filePath: "",
      },
    },
    url: {
      url1: "",
      url2: "",
      url3: "",
      url4: "",
      url5: "",
    },
    htmlFormat: {},
  });
  const onValueChange = async (e) => {
    const target = e.target;
    const name = target.name;
    setTemplate({
      ...template,
      [name]: target.value,
    });
    if (target.files && target.files[0]) {
      const formData = new FormData();
      formData.append("picture", target.files[0], target.files[0].name);
      const response = await UploadService.uploadFile(formData);
      if (response.data.status === "OKE") {
        setTemplate({
          ...template,
          image: {
            ...template.image,
            [name]: {
              filePath: response.data.filePath,
              fileName: target.files[0].name,
            },
          },
        });
      }
    }
  };
  const onSubmit = async () => {
    if (template.type === "text") {
      await setTemplate({
        ...template,
        htmlFormat: templateText(111, template.content),
      });
    }
    if (template.type === "image") {
      await setTemplate({
        ...template,
        htmlFormat: templateImage(),
      });
    }
    console.log(template);
  };
  return (
    <>
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
            {/* template type  */}
            <CCol xl="6" lg="6" md="12" sm="12">
              <CRow className="mt-2">
                <CCol xl="8" lg="8" md="12" sm="12">
                  <CLabel htmlFor="">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>
                      Template Type<span className="danger-color pl-1">*</span>
                    </span>
                  </CLabel>
                  <CSelect
                    custom
                    name="type"
                    onChange={(value) => onValueChange(value)}
                  >
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="list">List</option>
                  </CSelect>
                </CCol>
              </CRow>

              {/* tempalte title */}
              <CRow className="mt-2">
                <CCol xl="10" lg="10" md="12" sm="12">
                  <CLabel htmlFor="">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>
                      Template Title<span className="danger-color pl-1">*</span>
                    </span>
                  </CLabel>
                  <CInput
                    name="templateTitle"
                    placeholder="Tempalte Title"
                    required
                    autoComplete="off"
                    onChange={(value) => onValueChange(value)}
                  />
                </CCol>
              </CRow>

              {/* message title */}
              <CRow className="mt-2">
                <CCol xl="10" lg="10" md="12" sm="12">
                  <CLabel htmlFor="">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>
                      Message Title<span className="danger-color pl-1">*</span>
                    </span>
                  </CLabel>
                  <CInput
                    name="title"
                    placeholder="Message Title"
                    required
                    autoComplete="off"
                    onChange={(value) => onValueChange(value)}
                  />
                </CCol>
              </CRow>
              {/* tempalte title */}
              <CRow className="mt-2">
                <CCol xl="10" lg="10" md="12" sm="12">
                  <CLabel htmlFor="">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>
                      Message Content
                      <span className="danger-color pl-1">*</span>
                    </span>
                  </CLabel>
                  <CTextarea
                    name="content"
                    id="textarea-input"
                    rows="4"
                    placeholder="Content..."
                    maxLength="1000"
                    onChange={(value) => onValueChange(value)}
                  />
                </CCol>
              </CRow>
              {/* input file image 1 */}
              {(template.type === "list" || template.type === "image") && (
                <CRow className="mt-2">
                  <CCol xl="5" lg="5" md="12" sm="12">
                    <CLabel>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>
                        Image 1<span className="danger-color pl-1">*</span>
                      </span>
                    </CLabel>
                    <FileInput
                      name="image1"
                      onChange={(value) => onValueChange(value)}
                      defaultValue={template.image.image1.fileName}
                    />
                  </CCol>
                  <CCol xl="5" lg="5" md="12" sm="12">
                    <CLabel className="mb-1">
                      <span style={{ fontWeight: 600, fontSize: 14 }}>
                        Url 1<span className="danger-color pl-1">*</span>
                      </span>
                    </CLabel>
                    <CInput
                      name="url1"
                      placeholder="Url 1"
                      autoComplete="off"
                      onChange={(value) => onValueChange(value)}
                      defaultValue={template.url.url1}
                    />
                  </CCol>
                </CRow>
              )}
              {/* image 2 */}
              {template.type === "list" && (
                <>
                  <CRow className="mt-2">
                    <CCol xl="5" lg="5" md="12" sm="12">
                      <CLabel>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Image 2<span className="danger-color pl-1">*</span>
                        </span>
                      </CLabel>
                      <FileInput
                        name="image2"
                        onChange={(value) => onValueChange(value)}
                        defaultValue={template.image.image2.fileName}
                      />
                    </CCol>
                    <CCol xl="5" lg="5" md="12" sm="12">
                      <CLabel className="mb-1">
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Url 2<span className="danger-color pl-1">*</span>
                        </span>
                      </CLabel>
                      <CInput
                        name="url2"
                        placeholder="Url 2"
                        autoComplete="off"
                        onChange={(value) => onValueChange(value)}
                        defaultValue={template.url.url2}
                      />
                    </CCol>
                  </CRow>

                  {/* image 3 */}
                  <CRow className="mt-2">
                    <CCol xl="5" lg="5" md="12" sm="12">
                      <CLabel>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Image 3<span className="danger-color pl-1">*</span>
                        </span>
                      </CLabel>
                      <FileInput
                        name="image3"
                        onChange={(value) => onValueChange(value)}
                        defaultValue={template.image.image3.fileName}
                      />
                    </CCol>
                    <CCol xl="5" lg="5" md="12" sm="12">
                      <CLabel className="mb-1">
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Url 3<span className="danger-color pl-1">*</span>
                        </span>
                      </CLabel>
                      <CInput
                        name="url3"
                        placeholder="Url 3"
                        autoComplete="off"
                        onChange={(value) => onValueChange(value)}
                      />
                    </CCol>
                  </CRow>

                  {/* image 4 */}
                  <CRow className="mt-2">
                    <CCol xl="5" lg="5" md="12" sm="12">
                      <CLabel>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Image 4<span className="danger-color pl-1">*</span>
                        </span>
                      </CLabel>
                      <FileInput
                        name="image4"
                        defaultValue={template.image.image4.fileName}
                        onChange={(value) => onValueChange(value)}
                      />
                    </CCol>
                    <CCol xl="5" lg="5" md="12" sm="12">
                      <CLabel className="mb-1">
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Url 4<span className="danger-color pl-1">*</span>
                        </span>
                      </CLabel>
                      <CInput
                        name="url4"
                        placeholder="Url 4"
                        autoComplete="off"
                        onChange={(value) => onValueChange(value)}
                      />
                    </CCol>
                  </CRow>
                  {/* image 5 */}
                  <CRow className="mt-2">
                    <CCol xl="5" lg="5" md="12" sm="12">
                      <CLabel>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Image 5<span className="danger-color pl-1">*</span>
                        </span>
                      </CLabel>
                      <FileInput
                        name="image5"
                        defaultValue={template.image.image5.fileName}
                        onChange={(value) => onValueChange(value)}
                      />
                    </CCol>
                    <CCol xl="5" lg="5" md="12" sm="12">
                      <CLabel className="mb-1">
                        <span style={{ fontWeight: 600, fontSize: 14 }}>
                          Url 5<span className="danger-color pl-1">*</span>
                        </span>
                      </CLabel>
                      <CInput
                        name="url5"
                        placeholder="Url 5"
                        autoComplete="off"
                        onChange={(value) => onValueChange(value)}
                      />
                    </CCol>
                  </CRow>
                </>
              )}
            </CCol>

            {/* hinh dien thoai preview */}
            <CCol xl="6" lg="6" md="12" sm="12">
              <CRow className="mt-4 d-flex justify-content-center">
                <CIcon name="phonePreview" width="70%" alt="phonePreview" />
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CLink>
        <CButton size="lg" color="primary" onClick={onSubmit}>
          Save
        </CButton>
      </CLink>
    </>
  );
};

export default NewTemplate;
