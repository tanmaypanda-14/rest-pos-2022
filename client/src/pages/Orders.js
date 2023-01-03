import React, { useEffect } from 'react'
import DLayout from '../components/DLayout'
import { useDispatch } from 'react-redux';
import { Button, Table, Modal, message, Form, Input, Select } from 'antd'
import { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Orders() {
  const [ordersData, setOrdersData] = React.useState([]);
  const [orderDetailModalVisibilty, setOrderDetailModalVisibilty] = useState(false);
  const [genBillModalVisibilty, setGenBillModalVisibilty] = useState(false);
  const [selectOrder, setSelectOrder] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAllOrders = () => {
    dispatch({ type: "showLoading" });
    axios
      .get("/api/orders/get-all-orders")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        const data = response.data
        data.reverse()
        setOrdersData(data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };
  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
    },
    {
      title: 'Table Number',
      dataIndex: 'tableNumber',
    },
    {
      title: 'Created On',
      dataIndex: 'createdAt',
      render: (value) => <span>{value.toString().substring(0, 10)}</span>
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <EyeOutlined
            className="mx-2"
            onClick={() => {
              setSelectOrder(record);
              setOrderDetailModalVisibilty(true);
            }}
          />
        </div>
      ),
    },
  ]
  const cartcolumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <b>{record.quantity}</b>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAllOrders(); // eslint-disable-next-line
  }, []);

  const onFinish = (values) => {
    const reqObject = {
      ...values,
      cartItems: selectOrder.cartItems,
      tableNumber: selectOrder.tableNumber,
      subTotal: selectOrder.subTotal,
      tax: selectOrder.tax,
      totalAmount: selectOrder.totalAmount,
      userId: JSON.parse(localStorage.getItem("rest-user"))._id,
    };
    console.log(reqObject);
    axios
      .post("/api/bills/charge-bill", reqObject)
      .then(() => {
        message.success("Bill Charged Successfully");
        navigate('/bills')
      })
      .catch(() => {
        message.success("Something went wrong");
      });
  };

  return (
    <DLayout>
      <h1>Orders</h1>
      <Table columns={columns} dataSource={ordersData} bordered />
      {orderDetailModalVisibilty && (
        <Modal
          title="Generate Bill"
          open={orderDetailModalVisibilty}
          onCancel={() => setOrderDetailModalVisibilty(false)}
          width={800}
          footer={null}
        >
          <div className="d-flex justify-content-between">
            <h4>Order ID: {selectOrder && selectOrder._id}</h4>
            <h4>Table Number: {selectOrder && selectOrder.tableNumber}</h4>
          </div>
          <Table
            columns={cartcolumns}
            dataSource={selectOrder && selectOrder.cartItems}
            bordered
          />
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary" onClick={()=> setGenBillModalVisibilty(true)}>
              GENERATE BILL
            </Button>
          </div>
        </Modal>
      )}
      <Modal
        title="Charge Bill"
        open={genBillModalVisibilty}
        footer={false}
        onCancel={() => setGenBillModalVisibilty(false)}
      >
        {" "}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerPhoneNumber" label="Phone Number">
            <Input />
          </Form.Item>

          <Form.Item name="paymentMode" label="Payment Mode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>

          <div className="charge-bill-amount">
            <h5>
              SubTotal : <b>{selectOrder && selectOrder.subTotal}</b>
            </h5>
            <h5>
              Tax : <b>{selectOrder && selectOrder.tax}</b>
            </h5>
            <hr />
            <h2>
              Grand Total : <b>{selectOrder && selectOrder.totalAmount}</b>
            </h2>
          </div>

          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              GENERATE BILL
            </Button>
          </div>
        </Form>{" "}
      </Modal>
    </DLayout>
  )
}

export default Orders