import React, { useState, useEffect } from "react";
import * as moment from "moment";
import {
  CDataTable, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton, CRow, CCol, CLabel, CSelect, CInput, CFormGroup
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { CATEGORIES, TYPE } from "src/utils/_constants";
import * as fbDb from "src/services/index";

const ExpenseManagement = (props) => {
  const largeScreen = useMediaQuery({
    query: "(min-device-width: 600px)",
  });
  const dispatch = useDispatch();
  const sysUser = useSelector((state) => state.auth.user);
  const eventGroups = useSelector((state) => state.auth.groups);
  const expenseTypes = useSelector((state) => state.auth.exTypes);
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [totalFee, setTotalFee] = useState(0);

  const columns = [
    { key: "pos", label: "#", _classes: "text-center" },
    {
      key: "date",
      label: "Thời gian",
      _classes: largeScreen ? "align-middle" : "d-none",
    },
    { key: "name", label: "Chi phí", _classes: "align-middle" },
    {
      key: "category",
      label: largeScreen ? "Loại" : "",
      _classes: "text-center",
    },
    {
      key: "payBy",
      label: largeScreen ? "Người trả" : "NT",
      _classes: "text-center",
    },
    {
      key: "type",
      label: largeScreen ? "Hình thức" : "",
      _classes: `text-center`,
    },
    {
      key: "totalFee",
      label: largeScreen ? "Số tiền" : "$",
      _classes: "text-right",
    },
  ];

  const onClickExpenseItem = (item) => {
    setShowModal(true);

    let expenseObj = {
        id: '',
        date: '17/07/2022',
        name: 'Phong khach san',
        totalFee: 11000000,
        type: TYPE.PRIVATE,
        category: 'HOTEL',
        payBy: 'GRP02',
        note: 'Note note',
        groups: [
            {id: 'GRP01', count: 1, fee: 3000000},
            {id: 'GRP02', count: 1, fee: 6000000},
        ]
    }

    var response =  fbDb.ExpenseService.updateExpense('vq2022', expenseObj)
    console.log(response);
  };

  const onSelectChanged = (e) => {

  }

  useEffect(() => {
    if (props.expenseData) {
      setExpenses(props.expenseData.data);
      setTotalFee(props.expenseData.totalFee);
    }
  }, [props.expenseData]);

  return (
    <>
      <CRow>
        <CDataTable
          striped
          header={true}
          clickableRows={true}
          items={expenses}
          fields={columns}
          onRowClick={(item) => onClickExpenseItem(item)}
          scopedSlots={{
            pos: (item, index) => (
              <td className="text-center align-middle">{index + 1}</td>
            ),
            date: (item) => (
              <td className="align-middle">
                {moment(item.date).format("DD/MM")}
              </td>
            ),
            category: (item) => (
              <td className="align-middle text-center">
                <CIcon name={item.category.icon} className="mr-2"></CIcon>{" "}
                {item.category.name}
              </td>
            ),
            payBy: (item) => (
              <td className="align-middle text-center">
                <span>{item.payBy ? item.payBy.name : "-"}</span>
              </td>
            ),
            type: (item) => (
              <td className="align-middle text-center">
                {item.type === TYPE.PRIVATE && <span>Riêng</span>}
                {item.type !== TYPE.PRIVATE && (
                  <span>
                    <b>Chung</b>
                  </span>
                )}
              </td>
            ),
            totalFee: (item) => (
              <td className="align-middle text-right">
                <span>{item.totalFee.toLocaleString()}</span>
              </td>
            ),
          }}
        />
      </CRow>
      <CRow>
        <CModal
          scrollable
          show={showModal}
          onClose={() => setShowModal(false)}
          size="lg"
        >
          <CModalHeader>
            <CModalTitle>Thêm sửa chi phí</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
                <CCol md="6" sm="12">
                <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInput id="name" placeholder="Enter your name" required />
                  </CFormGroup>
                </CCol>
                <CCol md="6" sm="12">
                    <CRow>
                        <CCol md="6">Ngày</CCol>
                        <CCol md="6">
                        <CLabel htmlFor="category">Loại</CLabel>
                            <CSelect
                            custom
                            name="category"
                            id="category"
                            onChange={onSelectChanged}
                            >
                            {CATEGORIES.map((type) => (
                                <option key={type.id} value={type.id}>
                                {type.name}
                                </option>
                            ))}
                            </CSelect>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="6" sm="12">
                <CRow>
                        <CCol md="6">Người trả</CCol>
                        <CCol md="6">Tạo payment</CCol>
                    </CRow>                    
                </CCol>
                <CCol md="6" sm="12">
                    <CRow>
                        <CCol md="6">Hình thức</CCol>
                        <CCol md="6">Theo nhà hay người</CCol>
                    </CRow>
                </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Close
            </CButton>
            <CButton color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  );
};

export default React.memo(ExpenseManagement);
