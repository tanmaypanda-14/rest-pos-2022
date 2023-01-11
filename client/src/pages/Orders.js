import React, { useEffect } from 'react'
import DLayout from '../components/DLayout'
import { useDispatch } from 'react-redux';
import { Button, Table, Modal, message, Form, Input, Select } from 'antd'
import { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Orders() {
  const [subTotalAll, setsubTotalAll] = useState(0)
  const [ordersData, setOrdersData] = React.useState([]);
  const [tableNo, setTableNo] = useState(1)
  const [orderDetailModalVisibilty, setOrderDetailModalVisibilty] = useState(false);
  const [orderTableModalVisibilty, setOrderTableModalVisibilty] = useState(false);
  const [genBillModalVisibilty, setGenBillModalVisibilty] = useState(false);
  const [selectOrder, setSelectOrder] = useState(null);
  const [tableOrder, setTableOrder] = useState(null)
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
      dataIndex: "quantity",
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
  useEffect(() => {
    console.log(tableOrder); // eslint-disable-next-line
  }, [tableOrder]);

  const handleSelect = (values) => {
    setTableNo(values);
  }

  useEffect(() => {
    console.log(tableNo);
  }, [tableNo])

  const onFinish = (values) => {
    const reqObject = {
      ...values,
      cartItems: tableOrder,
      tableNumber: tableNo,
      subTotal: subTotalAll,
      tax: Number(((subTotalAll / 100) * 18).toFixed(2)),
      totalAmount: Number(
        subTotalAll + Number(((subTotalAll / 100) * 18).toFixed(2))
      ),
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

    const tableN = {
      tableNumber: tableNo
    }
    axios
      .post("/api/orders/delete-order-table/", tableN)
      .then(() => {
        getAllOrders(); // eslint-disable-next-line
      })
      .catch(() => {
        message.success("Something went wrong");
      });
  };

  // const onSplit = (values) => {
  //   const reqObject = {
  //     ...values,
  //     cartItems: selectOrder.cartItems,
  //     tableNumber: selectOrder.tableNumber,
  //     subTotal: selectOrder.subTotal,
  //     tax: selectOrder.tax,
  //     totalAmount: selectOrder.totalAmount,
  //     userId: JSON.parse(localStorage.getItem("rest-user"))._id,
  //   };
  //   console.log(reqObject);
  //   axios
  //     .post("/api/bills/charge-bill", reqObject)
  //     .then(() => {
  //       message.success("Bill Charged Successfully");
  //       navigate('/bills')
  //     })
  //     .catch(() => {
  //       message.success("Something went wrong");
  //     });
  // };

  return (
    <DLayout>
      <h3>Orders</h3>
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
          <div className="flex justify-end">
            <Button htmlType="submit" type="primary">
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
              SubTotal : <b>{subTotalAll}</b>
            </h5>
            <h5>
              Tax : <b>{Number(((subTotalAll / 100) * 18).toFixed(2))}</b>
            </h5>
            <hr />
            <h2>
              Grand Total : <b>{Number(
                subTotalAll + Number(((subTotalAll / 100) * 18).toFixed(2))
              )}</b>
            </h2>
          </div>

          <div className="flex justify-end">
            <Button htmlType="submit" type="primary">
              GENERATE BILL
            </Button>
          </div>
        </Form>{" "}
      </Modal>
      <Form layout='vertical'>
        <Form.Item name="tableSelect" label="Select a Table">
          <Select onChange={handleSelect} defaultValue='1'>
            <Select.Option value="1">Table 1</Select.Option>
            <Select.Option value="2">Table 2</Select.Option>
            <Select.Option value="3">Table 3</Select.Option>
            <Select.Option value="4">Table 4</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Button htmlType="submit" type="primary" onClick={() => {
        const newArray = ordersData.filter(item => item.tableNumber === parseInt(tableNo))
        var newArray2 = []
        var subTotalAll2 = 0; // eslint-disable-next-line
        const newArray3 = newArray.map(item => {
          subTotalAll2 = subTotalAll2 + parseInt(item.subTotal)
          setsubTotalAll(subTotalAll2)
          console.log(subTotalAll2);
          item.cartItems.map(item2 => (
            newArray2.push(item2)
          ))
        })
        setTableOrder(newArray2)
        // console.log(record)
        setOrderTableModalVisibilty(true)
      }}>
        GENERATE BILL
      </Button>
      <Modal title="Generate Bill 2"
        open={orderTableModalVisibilty}
        onCancel={() => setOrderTableModalVisibilty(false)}
        width={800}
        footer={null}>
        <div className="flex justify-between">
          <h4>Table Number: {tableNo}</h4>
        </div>
        <Table
          columns={cartcolumns}
          dataSource={tableOrder}
          bordered
        />
        <div className="d-flex justify-content-end">
          <Button htmlType="submit" type="primary" onClick={() => setGenBillModalVisibilty(true)}>
            GENERATE BILL
          </Button>
        </div>
      </Modal>
    </DLayout>
  )
}

export default Orders