import React, { useEffect, useState } from 'react'
import DLayout from '../components/DLayout.js'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Select, Modal, Table } from 'antd';


function Items() {
  const [itemsData, setItemsData] = useState([]);
  const [addEditModalVisibility, setAddEditModalVisibilty] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const dispatch = useDispatch();
  const getAllItems = () => {
    dispatch({ type: 'showLoading' });
    axios
      .get('/api/items/get-all-items')
      .then((response) => {
        dispatch({ type: 'hideLoading' });
        setItemsData(response.data);
      }).catch((error) => {
        dispatch({ type: 'hideLoading' });
        console.log(error);
      });
  };

  useEffect(() => {
    getAllItems();// eslint-disable-next-line
  }, []);

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
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      render: (id, record) =>
        <div className='d-flex'>
          <EditOutlined className='mx-2' onClick={() => {
            setEditingItem(record);
            setAddEditModalVisibilty(true);
          }} />
          <DeleteOutlined className='mx-2' />
        </div>
    },
  ]

  const onFinish = (values) => {
    dispatch({ type: 'showLoading' });
    if (editingItem===null) {
      axios
        .post('/api/items/add-item', values)
        .then((response) => {
          dispatch({ type: 'hideLoading' });
          message.success("Item added successfully");
          setAddEditModalVisibilty(false);
          getAllItems();
        }).catch((error) => {
          dispatch({ type: 'hideLoading' });
          console.log(error);
          message.error("Something went wrong");
        });
    } else {
      axios
        .post('/api/items/edit-item', { ...values, itemId: editingItem._id })
        .then((response) => {
          dispatch({ type: 'hideLoading' });
          message.success("Item Edited successfully");
          setEditingItem(null);
          setAddEditModalVisibilty(false);
          getAllItems();
        }).catch((error) => {
          dispatch({ type: 'hideLoading' });
          console.log(error);
          message.error("Something went wrong");
        });
    }
  }

  return (
    <DLayout>
      <div className='d-flex justify-content-between'>
        <h1>Items</h1>
        <Button type='primary' onClick={() => setAddEditModalVisibilty(true)}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />

      {addEditModalVisibility && (
        <Modal
          open={addEditModalVisibility}
          title={`${editingItem !== null ? 'Edit' : 'Add'} Item`}
          footer={false}
          onCancel={() => {
            setEditingItem(null)
            setAddEditModalVisibilty(false)
          }}>
          <Form initialValues={editingItem} layout='vertical' onFinish={onFinish}>
            <Form.Item name='name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='price' label='Price'>
              <Input />
            </Form.Item>
            <Form.Item name='image' label='Image URL'>
              <Input />
            </Form.Item>
            <Form.Item name='category' label='Category'>
              <Select>
                <Select.Option value='appetizers'>Appetizers</Select.Option>
                <Select.Option value='fries'>Fries</Select.Option>
                <Select.Option value='rolls'>Rolls</Select.Option>
              </Select>
            </Form.Item>

            <div className='d-flex justify-content-end' >
              <Button htmlType="submit" type='primary'>Save</Button>
            </div>

          </Form>
        </Modal>

      )}
    </DLayout>
  );
}

export default Items