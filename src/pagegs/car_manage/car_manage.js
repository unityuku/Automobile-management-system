import React, { useEffect, useState } from 'react';

import moment from 'moment';
// import { Route } from 'react-dom'
// import { NavLink } from 'react-router-dom'
import { Card, Button, Modal, Form, Input, DatePicker, message, Image, List } from 'antd';

import axios from '../../api/axios'

import { MessageOutlined, LikeOutlined, StarOutlined, DownOutlined } from '@ant-design/icons';


const CarManage = (props) => {
    // const { listData, getCarListDispatch } = props
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sindex, setsindex] = useState(0)
    const [list, setList] = useState([])
    useEffect(() => {
        // getCarListDispatch()
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
        // console.log('Success:', values);
        const { time } = values
        // message.success('提交成功')
        let time1 = moment(time[0]._d).format('YYYY-MM-DD')
        let time2 = moment(time[1]._d).format('YYYY-MM-DD')

        let id = list[sindex].id
        let image = list[sindex].image
        let params = {
            id: parseInt(localStorage.getItem('userif')),
            carid: id,
            timefrom: time1,
            timeto: time2,
            image: image
        }
        axios.post('/addorder', params).then(({ data }) => {
            console.log(data);
            if (data.status == 500) {
                message.error("提交错误")
            } else {
                message.success("订单提交成功")
                axios.post('/updatacar', { id: id, islease: 1 })
                props.history.go(0)
            }
        })
        console.log(moment(time[1]._d).format('YYYY-MM-DD'));
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
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            {
                                item.islease ?
                                    ""
                                    : <Button type="primary" danger style={{ width: "70px", margin: "10px" }} onClick={() => { showModal(index) }} >租赁</Button>
                            }

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
                    {/* <Form.Item
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
                    </Form.Item> */}
                    <Form.Item
                        label="请选择租赁时间"
                        name="time"
                    >
                        <DatePicker.RangePicker disabledDate={disabledDate} format="YYYY-MM-DD" />
                    </Form.Item>
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



export default CarManage;

