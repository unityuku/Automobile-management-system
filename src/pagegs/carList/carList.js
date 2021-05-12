import React, { useEffect, useState } from 'react';
// import { Route } from 'react-dom'
// import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Button, Modal, Form, Input, DatePicker, message, Image } from 'antd';

import { todogetCars } from './store/actions'
import axios from '../../api/axios'

import './carList.css'
// import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


const CarList = (props) => {
    const { carList, getCarListDispatch } = props
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [list, setList] = useState([])
    useEffect(() => {
        getCarListDispatch()
        console.log(carList);
        axios.get('/carlist').then(({ data }) => {
            console.log(data);
            setList(data)
        })
    }, [])

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
    const onFinish = (values) => {
        console.log('Success:', values);
        message.success('提交成功')
    };
    return (
        <div style={{ width: '350px', display: 'flex' }}>
            {
                list.map((item, index) => (
                    <div>
                        <Card style={{ width: '350px', display: 'flex', margin: "30px" }}>
                            <div style={{ display: 'flex' }}></div>
                            <p>{item.message}</p>
                            <Image src={item.image} style={{ width: 300 }} />
                            <div style={{ margin: "10px" }}>￥{item.pirce}/租赁价:￥{parseInt(item.pirce / 700)}/天</div>
                            <div style={{ float: "right", width: "70px", alignItems: "center", justifyContent: "center" }}>
                                <Button type="primary" danger style={{ width: "70px" }} onClick={() => { showModal(index) }}>租赁</Button>
                            </div>
                        </Card>

                    </div>
                ))
            }
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="请选择租赁时间"
                        name="time"
                    >
                        <DatePicker.RangePicker showTime />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" onClick={() => { handleOk() }}>
                            Submit
                     </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        listData: state.carList.listData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCarListDispatch() {
            dispatch(todogetCars())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CarList);