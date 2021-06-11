import React, { useEffect, useState, useCallback } from 'react';
import axios from '../../api/axios'
import { Form, Input, Button, message, Modal } from 'antd';
import { TwitterOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import moment from 'moment'
import { connect } from 'react-redux'
import './login.css'
const Login = (props) => {
    // const { users } = props

    const [dataSourceUser, setDataSourceUser] = useState([])
    const [dataSourceAdmin, setDataSourceAdmin] = useState([])
    const [admin, setAdmin] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        axios.get('/list').then(({ data }) => {
            setDataSourceUser(data)
        })
        axios.get('/getadminlist').then(({ data }) => {
            setDataSourceAdmin(data)
        })
        if (localStorage.getItem('userif')) {
            props.history.push('/home/main')
        }
    }, [])
    const onFinish = (values) => {

        console.log('Received values of form: ', values);
        const { password, username } = values
        console.log(values);
        if (admin) {
            var res = dataSourceAdmin.some(item => {
                if (item.username === username && item.password === password) {
                    // axios.post(`/detail/${id}`).then(({ data }) => {   
                    // })
                    localStorage.setItem('userif', item.id)
                    localStorage.setItem('permission', "admin")
                    return true
                }
            })
        } else {
            var res = dataSourceUser.some(item => {
                if (item.username === username && item.password === password) {
                    // axios.post(`/detail/${id}`).then(({ data }) => {   
                    // })
                    localStorage.setItem('userif', item.id)
                    localStorage.setItem('permission', "user")
                    return true
                }
            })
        }
        if (res && admin) {
            message.success("登录成功")
            props.history.push('/home/main')
        } else if (res && !admin) {
            message.success("登录成功")
            props.history.push('/home/carmanage')
        } else {
            message.error("登录失败")
        }
    };

    const todoSE = () => {
        console.log('tst');
    }

    const showModal = (index) => {
        setIsModalVisible(true);

    }
    const handleOk = () => {
        setIsModalVisible(false);
        todoSE()
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinish1 = (values) => {
        console.log('Success:', values);
        const { username } = values
        var res = dataSourceUser.some(item => {
            if (item.username === username) {
                console.log('1');
                return true
            }

        })
        console.log(res);
        if (!res) {
            values.id = dataSourceUser.length
            values.message = moment(new Date()).format("YYYY-MM-DD")
            axios.post('/adduser', values).then(({ data }) => {
                console.log(data);

                if (data) {
                    message.success('注册成功')
                    setTimeout(() => {
                        props.history.go(0)
                    }, 1200);
                }
                else {
                    message.error('注册失败')
                }
            })
        } else {
            message.error('已经有过一个相同的账号了,请换一个哦')
        }


    };
    return (
        <div className="content" style={{ margin: "0 auto", height: "100%" }}>

            <div className="login_box">

                <div class="line"></div>
                <div class="line1"></div>
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
                            <div >
                                {
                                    admin ?
                                        <h1 style={{ color: "skyblue" }}>管理员登陆</h1>
                                        :
                                        <h1 style={{ color: "skyblue" }}>用户登陆</h1>
                                }

                            </div>
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
                                <div style={{ display: "flex" }}>
                                    <div ><a onClick={showModal} style={{ color: "skyblue" }}>立即注册</a></div>

                                 Or
                                 {
                                        admin ?
                                            <div ><a style={{ color: "skyblue" }} onClick={() => { setAdmin(!admin) }}>切换用户登陆</a></div>
                                            :
                                            <div><a style={{ color: "skyblue" }} onClick={() => { setAdmin(!admin) }}>切换管理员登陆</a></div>
                                    }
                                </div>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
            <Modal title="请添加以下信息" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish1}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="请输入账号"
                        name="username"
                        rules={[{ required: false, message: '请输入账号' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                    </Form.Item>

                    <Form.Item
                        label="请输入密码"
                        name="password"
                        rules={[{ required: false, message: '请输入密码' }]}

                    >
                        <Input type="password"
                            prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" />
                    </Form.Item>

                    {/* <Form.Item
                        label="请选择租赁时间"
                        name="time"
                    >
                        <DatePicker.RangePicker disabledDate={disabledDate} format="YYYY-MM-DD" />
                    </Form.Item> */}
                    <Form.Item >
                        <Button type="primary" htmlType="submit" onClick={() => { handleOk() }}>
                            提交
                     </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.login.user
    }
}

export default connect(mapStateToProps)(Login)