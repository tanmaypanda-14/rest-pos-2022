import { Button, Form, message, Modal, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import DLayout from '../components/DLayout.js'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const { cartItems } = useSelector(state => state.rootReducer)
  const [placeOrderModal, setPlaceOrderModal] = useState(false);
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

  const clearCart = () => {
    dispatch({
      type: 'clearCart'
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
      .post("/api/orders/place-order", reqObject)
      .then(() => {
        message.success("Order Placed Successfully");
        clearCart();
        navigate('/orders')
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
        {/* <Button type="primary" onClick={() => setBillChargeModal(true)}>ChargeBill</Button> */}
        <Button type="primary" onClick={() => setPlaceOrderModal(true)}>Place Order</Button>
      </div>
      <Modal
        title="Place Order"
        open={placeOrderModal}
        footer={false}
        onCancel={() => setPlaceOrderModal(false)}
      >
        {" "}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="tableNumber" label="Table Number">
            <Select>
              <Select.Option value="1">Table 1</Select.Option>
              <Select.Option value="2">Table 2</Select.Option>
              <Select.Option value="3">Table 3</Select.Option>
              <Select.Option value="4">Table 4</Select.Option>
            </Select>
          </Form.Item>
          <div className="d-flex justify-end-content">
            <Button htmlType="submit" type="primary">
              PLACE ORDER
            </Button>
          </div>
        </Form>
      </Modal>
    </DLayout>
  )
}

export default Cart