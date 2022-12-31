import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import DLayout from '../components/DLayout.js'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const { cartItems } = useSelector(state => state.rootReducer)
  const [billChargeModal, setBillChargeModal] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const increaseQuantity = (record) => {
    dispatch({
      type: 'updateCart',
      payload: { ...record, quantity: record.quantity + 1 }
    })
  }
  const decreaseQuantity = (record) => {
    dispatch({
      type: 'updateCart',
      payload: { ...record, quantity: record.quantity === 1 ? 1 : record.quantity - 1 }
    })
  }
  const deleteItem = (record) => {
    dispatch({
      type: 'deleteItem',
      payload: record
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => <img src={image} alt={record.name} height='60' width='60' />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (quantity, record) => (
        <div>
          <MinusCircleOutlined className='mx-3' onClick={() => decreaseQuantity(record)} />
          <b>{record.quantity}</b>
          <PlusCircleOutlined className='mx-3' onClick={() => increaseQuantity(record)} />
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (id, record) => <DeleteOutlined onClick={() => deleteItem(record)} />,
    },
  ]

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price * item.quantity;
    });
    setSubTotal(temp);
  }, [cartItems]);

  const onFinish = (values) => {
    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      tax: Number(((subTotal / 100) * 18).toFixed(2)),
      totalAmount: Number(
        subTotal + Number(((subTotal / 100) * 18).toFixed(2))
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
  };

  return (
    <DLayout>
      <Table columns={columns} dataSource={cartItems} bordered />
      <hr />
      <div className='d-flex justify-content-end flex-column align-items-end'>
        <div className='mr-3'>
          <h3>Subtotal: <b>₹{subTotal}/-</b></h3>
        </div>
        <Button type="primary" onClick={() => setBillChargeModal(true)}>ChargeBill</Button>
      </div>
      <Modal
        title="Charge Bill"
        open={billChargeModal}
        footer={false}
        onCancel={() => setBillChargeModal(false)}
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
              SubTotal : <b>{subTotal}</b>
            </h5>
            <h5>
              Tax : <b>{((subTotal / 100) * 18).toFixed(2)}</b>
            </h5>
            <hr />
            <h2>
              Grand Total : <b>{subTotal + (subTotal / 100) * 18}</b>
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

export default Cart