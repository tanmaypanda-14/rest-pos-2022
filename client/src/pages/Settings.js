import React from 'react'
import DLayout from '../components/DLayout'
import { Table, message, Modal, Form, Select, Button, Input } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

function Settings() {
    const [usersData, setUsersData] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editingUserModalVisibilty, setEditingUserModalVisibilty] = useState(false);
    const dispatch = useDispatch();
    const getAllUsers = () => {
        dispatch({ type: 'showLoading' });
        axios
            .get('/api/users/get-all-users')
            .then((response) => {
                dispatch({ type: 'hideLoading' });
                setUsersData(response.data);
            }).catch((error) => {
                dispatch({ type: 'hideLoading' });
                console.log(error);
            });
    };

    useEffect(() => {
        getAllUsers();// eslint-disable-next-line
    }, []);

    const deleteItem = (record) => {
        axios
            .post('/api/users/delete-user', { userId: record._id })
            .then((response) => {
                getAllUsers();
                message.success('User deleted successfully');
            }
            ).catch((error) => {
                message.error('Something went wrong');
            }
            );
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'userId',
            dataIndex: 'userId',
        },
        {
            title: 'password',
            dataIndex: 'password',
        },
        {
            title: 'roles',
            dataIndex: 'roles',
        },
        {
            title: 'verified',
            dataIndex: 'verified',
            render: (value) => <span>{value.toString()}</span>
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            render: (value) => <span>{value.toString().substring(0, 10)}</span>
        },
        {
            title: 'updatedAt',
            dataIndex: 'updatedAt',
            render: (value) => <span>{value.toString().substring(0, 10)}</span>
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (id, record) =>
                <div className='d-flex'>
                    <EditOutlined className='mx-2' onClick={() => {
                        setEditingUser(record);
                        setEditingUserModalVisibilty(true);
                    }} />
                    <DeleteOutlined className='mx-2s' onClick={() => deleteItem(record)} />
                </div>
        }

    ]

    const onFinish = (values) => {
        dispatch({ type: 'showLoading' });
        axios
            .post('/api/users/edit-user', {
                ...values,
                usermodelId: editingUser._id
            })
            .then((response) => {
                dispatch({ type: 'hideLoading' });
                message.success(`User ${values.name} updated successfully`);
                setEditingUserModalVisibilty(false);
                getAllUsers();
            }
            ).catch((error) => {
                dispatch({ type: 'hideLoading' });
                message.error('Something went wrong');
            }
            );
    }
    return (
        <DLayout>
            <h3>User Management</h3>
            <Table columns={columns} dataSource={usersData} />
            {editingUserModalVisibilty &&
                <Modal
                    title="Edit User"
                    open={editingUserModalVisibilty}
                    onCancel={() => setEditingUserModalVisibilty(false)}
                    footer={null}
                >
                    <Form initialValues={editingUser} onFinish={onFinish}>
                        <Form.Item name='name' label='Name'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='userId' label='userId'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='password' label='password'>
                            <Input />
                        </Form.Item>
                        <Form.Item name='roles' label='roles'>
                            <Select>
                                <Select.Option value='admin'>Admin</Select.Option>
                                <Select.Option value='user'>User</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name='verified' label='verified'>
                            <Select>
                                <Select.Option value={true}>True</Select.Option>
                                <Select.Option value={false}>False</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>Update</Button>
                        </Form.Item>
                    </Form>
                </Modal>              

            }
        </DLayout>
    )
}

            export default Settings