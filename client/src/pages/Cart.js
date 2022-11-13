import { Table } from 'antd'
import React from 'react'
import DLayout from '../components/DLayout.js'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'

function Cart() {
  const { cartItems } = useSelector(state => state.rootReducer)
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
          <MinusCircleOutlined className='mx-3' onClick={()=> decreaseQuantity(record)}/>
          <b>{record.quantity}</b>
          <PlusCircleOutlined className='mx-3' onClick={() => increaseQuantity(record)} />
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (id, record) => <DeleteOutlined onClick={()=> deleteItem(record)}/>,
    },
  ]
  return (
    <DLayout>
      <Table columns={columns} dataSource={cartItems} bordered />
    </DLayout>
  )
}

export default Cart