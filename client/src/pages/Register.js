import React, { useEffect } from 'react'
import { Button, Col, Form, Input, Select, message, Row } from "antd";
import '../styles/authentication.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish=(values)=>{
         dispatch({type:'showLoading'})
         axios.post('/api/users/register' , values).then((res)=>{
          dispatch({type:'hideLoading'})
           message.success('Registration successfull , please wait for verification')
         }).catch(()=>{
          dispatch({type:'hideLoading'})
           message.error('Something went wrong')
         })
  }
  useEffect(() => {
    if(localStorage.getItem('rest-user'))
    navigate('/home') //eslint-disable-next-line
}, [])
  return (
    <div className='authentication'>
        <Row>
          <Col lg={8} xs={22}>
          <Form
            layout="vertical"
            onFinish={onFinish}
          >
            <h1><b>REST-2022</b></h1>
            <hr />
            <h3>Register</h3>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="roles" label="Role">
              <Select>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="user">User</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type='password'/>
            </Form.Item>
            <div className="flex justify-between items-center">
              <Link to='/login'>Login</Link>
              <Button htmlType="submit" type="primary">
                Register
              </Button>
            </div>
          </Form>
          </Col>
        </Row>
    </div>
  )
}

export default Register