import React, { useEffect, useState } from 'react';

import moment from 'moment';
// import { Route } from 'react-dom'
// import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Button, Modal, Form, Input, DatePicker, message, Image, List } from 'antd';


import { todogetCars } from './store/actions'
import axios from '../../api/axios'

import './carList.css'

import { MessageOutlined, LikeOutlined, StarOutlined, DownOutlined } from '@ant-design/icons';


const CarList = (props) => {
    const { listData, getCarListDispatch } = props
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sindex, setsindex] = useState(0)
    const [list, setList] = useState([])
    useEffect(() => {
        getCarListDispatch()
        // console.log(listData);
        axios.get('/carlist').then(({ data }) => {
            console.log(data[1]);

            setList(data)
        })
    }, [])

    const todoSE = () => {
        console.log('tst');
    }

    const showModal = (index) => {
        setIsModalVisible(true);
        setsindex(index)

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

        // message.success('提交成功')
        console.log(list[sindex].cid);
        let id = list[sindex].id
        let params = {
            id: id,
            ...values,
            islease: 0

        }
        axios.post('/updatacar', params).then(({ data }) => {
            console.log(data);
            if (data) {
                props.history.go(0)
            }
        })

        console.log(params);
    };
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    const changeone = () => {
        console.log('换一批');
        axios.get('/carlist').then(({ data }) => {

            setList(data)
        })
    }
    const deleteCar = (id) => {
        id = list[id].id
        axios.post(`/deletecar/${id}`).then(({ data }) => {
            console.log(data);
            if (data) {
                props.history.go(0)
            }
        })
    }
    return (
        <div style={{ height: "500px", display: 'flex', flexWrap: "wrap", overflowY: "scroll" }}>
            {
                list.map((item, index) => (
                    // <div key={index} style={{ display: 'flex', flexWrap: "wrap" }}>
                    <Card style={{ width: '340px', margin: "30px", display: 'flex', flexWrap: "wrap", height: "300px" }} >
                        {/* <div style={{ display: 'flex' }}></div> */}
                        <p>{item.message}</p>
                        <Image src={item.image} style={{ width: 300 }} />
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div>￥{item.pirce}/租赁价:￥{parseInt(item.pirce / 700)}/天</div>
                            {
                                item.islease ?
                                    <div style={{ color: "red" }}>已出售</div> :
                                    <div style={{ color: "orange" }}>未出售</div>
                            }
                        </div>
                        <div style={{}}>
                            <Button type="primary" style={{ width: "70px", margin: "10px" }} onClick={() => { showModal(index) }}>增加</Button>
                            <Button type="ghost" danger style={{ width: "70px", margin: "10px" }} onClick={() => { deleteCar(index) }}>删除</Button>
                            <Button type="primary" danger style={{ width: "70px", margin: "10px" }} onClick={() => { showModal(index) }} >修改</Button>
                        </div>
                    </Card>

                    // </div>
                ))
            }
            {/* <div onClick={changeone} style={{ position: "fixed", top: "550px", left: "800px", display: "flex", flexDirection: "column" }}>
                <Button type="ghost" size="large" danger style={{ borderRadius: "100px" }}>
                    <DownOutlined />
                </Button>
                下一页
            </div> */}
            <Modal title="请添加以下信息" visible={isModalVisible} onCancel={handleCancel} footer={null}>

                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item

                        label="请输入车辆信息"
                        name="message"
                        rules={[{ required: false, message: '请输入车辆信息' }]}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item

                        label="请输入图片url"
                        name="image"
                        rules={[{ required: false, message: '请输入图片url' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="请输入价格"
                        name="pirce"
                        rules={[{ required: false, message: '请输入价格' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        label="请选择租赁时间"
                        name="time"
                    >
                        <DatePicker.RangePicker disabledDate={disabledDate} format="YYYY-MM-DD" />
                    </Form.Item> */}

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