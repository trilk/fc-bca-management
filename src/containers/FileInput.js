import React from "react";
import { CCol, CLabel, CInputFile } from "@coreui/react";
const FileInput = ({ name, onChange, defaultValue }) => {
  return (
    <>
      <CCol col="12">
        <CInputFile
          id="file-multiple-input"
          name={name}
          custom
          onChange={onChange}
        />
        <CLabel
          htmlFor="file-multiple-input"
          variant="custom-file"
          data-browse="Upload"
        >
          {defaultValue ? defaultValue : "Choose file..."}
        </CLabel>
      </CCol>
    </>
  );
};

export default FileInput;
