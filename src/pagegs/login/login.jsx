import React, { useEffect, useState } from 'react';
import axios from '../../api/axios'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import './login.css'
const Login = (props) => {
    const { users } = props
    const id = '1'

    useEffect(() => {
        console.log('hello');
        if (localStorage.getItem('userif')) {
            props.history.push('/home')
        }
    }, [])
    const onFinish = (values) => {

        console.log('Received values of form: ', values);
        const { password, username } = values
        console.log(values);
        var res = users.some(item => {
            if (item.username === username && item.password === password) {
                axios.post(`/detail/${id}`).then(({ data }) => {
                    localStorage.setItem('userif', data)
                })

                return true
            }
        })
        if (res && localStorage.getItem('userif')) {
            message.success("登录成功")
            props.history.push('/home')
        } else {
            message.error("登录失败")
        }
    };


    return (
        <div className="content" style={{ margin: "0 auto", height: "100%" }}>
            <div className="login_box">
                <div className="form_text">
                    <div className="form_cas">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入你的账号!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入你的密码!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                {/* name="remember" */}
                                <Form.Item valuePropName="checked" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    忘记密码
                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                </Button>
                Or <a href="">现在注册!</a>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.login.user
    }
}

export default connect(mapStateToProps)(Login)