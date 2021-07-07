import React from 'react'
import {Form, Button, Input} from 'antd'
import './index.css'
import {getAction} from '../../api'
import {withRouter} from 'react-router-dom'
import {message} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import Particles from 'react-particles-js';

function Login(props) {

    const onFinish = (values) => {
        getAction(`http://localhost:5000/users?userName=${values.userName}&password=${values.password}&active=1&_expand=role`).then(res => {
            if (res.length) {
                message.success('欢迎回来！')
                setTimeout(() => {
                    localStorage.setItem('token', JSON.stringify(res[0]))
                    props.history.replace('/home')
                }, 1000)
            } else {
                message.error('用户名或密码不匹配！')
            }
        })
    }

    return (
        <div className="login">
            <Particles className='particles'/>
            <div className="login-card">
                <h2 className="login-card-title">阿测后台系统</h2>
                <Form onFinish={onFinish}>
                    <Form.Item name="userName" rules={[{required: true, message: '用户名不能为空！'}]}>
                        <Input prefix={<UserOutlined/>} placeholder='用户名' allowClear/>
                    </Form.Item>
                    <Form.Item name="password" rules={[{required: true, message: '密码不能为空！'}]}>
                        <Input.Password prefix={<LockOutlined/>} placeholder='密码' allowClear/>
                    </Form.Item>
                    <Form.Item>
                        <Button className="login-btn" type="primary" htmlType="submit">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(Login)
