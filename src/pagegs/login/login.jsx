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
            message.success("????????????")
            props.history.push('/home/main')
        } else if (res && !admin) {
            message.success("????????????")
            props.history.push('/home/carmanage')
        } else {
            message.error("????????????")
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
                    message.success('????????????')
                    setTimeout(() => {
                        props.history.go(0)
                    }, 1200);
                }
                else {
                    message.error('????????????')
                }
            })
        } else {
            message.error('????????????????????????????????????,???????????????')
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
                                        <h1 style={{ color: "skyblue" }}>???????????????</h1>
                                        :
                                        <h1 style={{ color: "skyblue" }}>????????????</h1>
                                }

                            </div>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '?????????????????????!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="??????" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '?????????????????????!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="??????"
                                />
                            </Form.Item>
                            <Form.Item>
                                <div style={{ display: "flex" }}>
                                    <div ><a onClick={showModal} style={{ color: "skyblue" }}>????????????</a></div>

                                 Or
                                 {
                                        admin ?
                                            <div ><a style={{ color: "skyblue" }} onClick={() => { setAdmin(!admin) }}>??????????????????</a></div>
                                            :
                                            <div><a style={{ color: "skyblue" }} onClick={() => { setAdmin(!admin) }}>?????????????????????</a></div>
                                    }
                                </div>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    ??????
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
            <Modal title="?????????????????????" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish1}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="???????????????"
                        name="username"
                        rules={[{ required: false, message: '???????????????' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="??????" />
                    </Form.Item>

                    <Form.Item
                        label="???????????????"
                        name="password"
                        rules={[{ required: false, message: '???????????????' }]}

                    >
                        <Input type="password"
                            prefix={<LockOutlined className="site-form-item-icon" />} placeholder="??????" />
                    </Form.Item>

                    {/* <Form.Item
                        label="?????????????????????"
                        name="time"
                    >
                        <DatePicker.RangePicker disabledDate={disabledDate} format="YYYY-MM-DD" />
                    </Form.Item> */}
                    <Form.Item >
                        <Button type="primary" htmlType="submit" onClick={() => { handleOk() }}>
                            ??????
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