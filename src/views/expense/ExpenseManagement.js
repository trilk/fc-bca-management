import React, { useState, useEffect } from 'react'
import { CDataTable } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

const ExpenseManagement = (props) => {    
    const largeScreen = useMediaQuery({
        query: '(min-device-width: 600px)'
    });
    const dispatch = useDispatch()
    const sysUser = useSelector(state => state.auth.user);
    const eventGroups = useSelector(state => state.auth.groups);
    const expenseTypes = useSelector(state => state.auth.exTypes);
    const [expenses, setExpenses] = useState([]);
    const [totalFee, setTotalFee] = useState(0);
 
    const columns = [
        { key: "pos", label: "#", _classes: "text-center" },
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
          key: "isPrivate",
          label: largeScreen ? "Hình thức" : "",
          _classes: `text-center`,
        },        
        {
          key: "totalFee",
          label: largeScreen ? "Số tiền" : "$",
          _classes: "text-center",
        },
      ];

    const onClickExpenseItem = (item) => {
        console.log(item);
    }

    useEffect(() => {
        console.log(props.expenseData);
        if(props.expenseData) {
            setExpenses(props.expenseData.data)
            setTotalFee(props.expenseData.totalFee)
        }
    }, [props.expenseData]);

    return (
        <CDataTable striped
            header={true}
            clickableRows={true}
            items={expenses}
            fields={columns}
            onRowClick={(item) => onClickExpenseItem(item)}
            scopedSlots={{
                pos: (item, index) => (
                    <td className="text-center align-middle">{index + 1}</td>
                    ),                  
                category: (item) => (
                <td className="align-middle text-center">
                    <CIcon
                    name={item.category.icon}
                    className="mr-2"
                    ></CIcon>{" "}
                    {item.category.name}
                </td>
                ),
                payBy: (item) => (
                <td className="align-middle text-center">
                    <span>{item.payBy ? item.payBy.name : '-'}</span>
                </td>
                ),
                isPrivate: (item) => (
                <td className="align-middle text-center">
                    {item.isPrivate && <span>Riêng</span>}
                    {!item.isPrivate && <span><b>Chung</b></span>}
                </td>
                ),
            }}
            />         
    )
}

export default React.memo(ExpenseManagement)
