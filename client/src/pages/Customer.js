import React, { useEffect, useState } from "react";
import DLayout from "../components/DLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Table } from "antd";
function Customers() {
  const [billsData, setBillsData] = useState([]);

  const dispatch = useDispatch();
  const getAllBills = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/bills/get-all-bills")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data
        data.reverse()
        setBillsData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (value) => <span>{value.toString().substring(0, 10)}</span>
    },


  ];


  useEffect(() => {
    getAllBills(); // eslint-disable-next-line
  }, []);



  return (
    <DLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />


    </DLayout>
  );
}

export default Customers;