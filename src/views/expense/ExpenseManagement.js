import React, { useState, useEffect } from "react";
import * as moment from "moment";
import {
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CRow,
  CCol,
  CLabel,
  CSelect,
  CInput,
  CFormGroup,
  CInputCheckbox,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { CATEGORIES, TYPE } from "src/utils/_constants";
import * as fbDb from "src/services/index";
import DatePicker from "react-datepicker";
import NumericInput from "react-numeric-input";

const ExpenseManagement = (props) => {
  const largeScreen = useMediaQuery({
    query: "(min-device-width: 600px)",
  });
  const dispatch = useDispatch();
  const sysUser = useSelector((state) => state.auth.user);
  const eventGroups = useSelector((state) => state.auth.groups);
  const expenseTypes = useSelector((state) => state.auth.exTypes);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({
    date: new Date(),
    name: "",
    totalFee: 0,
    type: TYPE.PRIVATE,
    category: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [totalFee, setTotalFee] = useState(0);

  const types = [
    {id: TYPE.PRIVATE, name: "Riêng từng nhà"},
    {id: TYPE.GROUP_SHARE, name: "Chia theo nhà"},
    {id: TYPE.PERSON_SHARE, name: "Chia theo người"},
  ];

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
    // console.log(item);

    setModalItem({
      ...item,
      date: moment(item.date).format("YYYY-MM-DD"),
      category: item.category.id,
      payBy: item.payBy.id,
    });

    setShowModal(true);

    // fbDb.ExpenseService.getExpenseGroups("vq2022", item.id, eventGroups).then(
    //   (response) => {

    //   }
    // );

    // let expenseObj = {
    //     id: 'o3X5vArEn41z0HImHSjY',
    //     date: '07/19/2022',
    //     name: 'Phong khach san',
    //     totalFee: 0,
    //     type: TYPE.PRIVATE,
    //     category: 'HOTEL',
    //     payBy: 'GRP02',
    //     note: 'Note note',
    //     groups: [
    //         {id: 'GRP01', count: 1, fee: 3000000},
    //         {id: 'GRP02', count: 1, fee: 5000000},
    //     ]
    // }

    // var response =  fbDb.ExpenseService.updateExpense('vq2022', expenseObj)
  };

  const addNewExpense = () => {
    var newItem = {
        date: moment(new Date()).format('YYYY-MM-DD'),
        name: "",
        totalFee: 0,
        category: 'TRANSPORT',
        type: TYPE.PRIVATE,
        note: "",
    }
    eventGroups.forEach(grp => {
        newItem[grp.id] = {
            count: 1,
            fee: 0
        }
    });

    setModalItem(newItem);
    setShowModal(true);
  };

  const onSelectChanged = (e) => {
    setModalItem({ ...modalItem, [e.target.name]: e.target.value });

  };

  const onDateChanged = (e) => {
    setModalItem({ ...modalItem, date: e.target.value });
  };

  const onSaveExpense = () => {
    
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
        <CCol>
        <CButton size="sm" color="primary" onClick={addNewExpense}><CIcon name="cil-plus" /> Thêm mới</CButton>
        </CCol>
    </CRow>
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
            <CModalTitle>Thêm/Sửa chi phí</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol md="6" sm="12">
                <CFormGroup>
                  <CLabel htmlFor="name">Mô tả</CLabel>
                  <CInput
                    id="name"
                    placeholder="Nhập chi phí"
                    value={modalItem.name}
                    required
                  />
                </CFormGroup>
              </CCol>
              <CCol md="6" sm="12">
                <CRow>
                  <CCol md="6">
                    <CLabel htmlFor="date">Ngày</CLabel>
                    <CInput
                      type="date"
                      name="date"
                      value={modalItem.date}
                      onChange={onDateChanged}
                    />
                  </CCol>
                  <CCol md="6">
                    <CLabel htmlFor="category">Loại</CLabel>
                    <CSelect
                      custom
                      name="category"
                      id="category"
                      onChange={onSelectChanged}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}  selected={cat.id === modalItem.category}>
                          {cat.name}
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
                  <CCol md="6">
                    <CLabel htmlFor="group">Người trả</CLabel>
                    <CSelect
                      custom
                      name="group"
                      id="group"
                      onChange={onSelectChanged}
                    >
                      {eventGroups.map((grp) => (
                        <option key={grp.id} value={grp.id} selected={grp.id === modalItem.payBy}>
                          {grp.name}
                        </option>
                      ))}
                    </CSelect>
                  </CCol>
                  <CCol md="6">
                    <CInputCheckbox
                      id="createPayment"
                      name="createPayment"
                      value={false}
                    />
                    <CLabel
                      variant="checkbox"
                      className="form-check-label"
                      htmlFor="createPayment"
                    >
                      Tạo thanh toán
                    </CLabel>
                  </CCol>
                </CRow>
              </CCol>
              <CCol md="6" sm="12">
                <CRow>
                  <CCol md="6">
                    <CLabel htmlFor="type">Hình thức</CLabel>
                    <CSelect
                      custom
                      name="type"
                      id="type"
                      onChange={onSelectChanged}
                    >
                      {types.map((type) => (
                        <option key={type.id} value={type.id} selected={type.id === modalItem.type}>
                          {type.name}
                        </option>
                      ))}
                    </CSelect>
                  </CCol>
                  <CCol md="6">
                    <CLabel htmlFor="name">Tổng tiền (ngàn đồng)</CLabel>
                    <NumericInput
                      className="form-control"
                      step={1}
                      min={0}
                      max={50000}
                      value={modalItem.totalFee}
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CRow className={"header"}>
              <CCol>Nhà</CCol>
              <CCol md="3">Số lượng</CCol>
              <CCol md="3">Tiền</CCol>
            </CRow>
            {eventGroups.map((grp) => (
              <CRow key={grp.id}>
                <CCol>{grp.name}</CCol>
                <CCol md="3">
                  <NumericInput
                    className="form-control"
                    size={"sm"}
                    step={1}
                    min={0}
                    max={10}
                    value={
                      modalItem[grp.id] !== undefined
                        ? modalItem[grp.id].count
                        : 0
                    }
                  />{" "}
                </CCol>
                <CCol md="3">
                  <NumericInput
                    className="form-control"
                    size={"sm"}
                    step={1}
                    min={0}
                    max={50000}
                    value={
                      modalItem[grp.id] !== undefined
                        ? modalItem[grp.id].fee
                        : 0
                    }
                  />{" "}
                </CCol>
              </CRow>
            ))}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={onSaveExpense}>Save changes</CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  );
};

export default React.memo(ExpenseManagement);
