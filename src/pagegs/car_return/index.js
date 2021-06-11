import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Card, Button, Modal, Form, Input, DatePicker, message, Image, List, Popconfirm } from 'antd';

import axios from '../../api/axios'

import { MessageOutlined, LikeOutlined, StarOutlined, DownOutlined } from '@ant-design/icons';


const CarReturn = (props) => {
    // const { listData, getCarListDispatch } = props
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sindex, setsindex] = useState(0)
    const [list, setList] = useState([])
    const [orderList, setOrderList] = useState([])
    const [useId, setUserId] = useState("")
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false)
    useEffect(() => {
        // getCarListDispatch()
        // console.log(listData);
        axios.get('/carlist').then(({ data }) => {

            setList(data)
            console.log(data);
        })
        axios.get('/useleaseList').then(({ data }) => {
            setOrderList(data)
            console.log(data);

        })
        setUserId(localStorage.getItem("userif"))

    }, [])

    const showPopconfirm = () => {
        setVisible(true);
    };

    const handleOk = (carid) => {
        console.log(carid);
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
            message.success('归还成功')
        }, 1200);

    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <div style={{ height: "500px", display: 'flex', flexWrap: "wrap", overflowY: "scroll" }}>
            {
                orderList.map((item, index) => (
                    item.id == useId ?
                        <Card style={{ width: '340px', margin: "30px", display: 'flex', flexWrap: "wrap", height: "300px", justifyContent: "space-around" }} >
                            {/* <div style={{ display: 'flex' }}></div> */}
                            <p>租赁时间 起:{item.timefrom.slice(0, 10)}</p>
                            <p>租赁时间 截止:{item.timeto.slice(0, 10)}</p>
                            <img src={item.image} style={{ width: 300 }} />

                            <div style={{ display: "flex", justifyContent: "center" }}>

                                <Popconfirm
                                    title="是否归还"
                                    visible={visible}
                                    onConfirm={() => { handleOk(index) }}
                                    okButtonProps={{ loading: confirmLoading }}
                                    onCancel={handleCancel}
                                    okText="是"
                                    cancelText="否"
                                >
                                    <Button type="primary" onClick={showPopconfirm}>
                                        归还
                                </Button>
                                </Popconfirm>


                            </div>
                        </Card> : ""

                    // </div>
                ))
            }
            {/* <div onClick={changeone} style={{ position: "fixed", top: "550px", left: "800px", display: "flex", flexDirection: "column" }}>
                <Button type="ghost" size="large" danger style={{ borderRadius: "100px" }}>
                    <DownOutlined />
                </Button>
                下一页
            </div> */}

        </div>
    )
}


export default CarReturn;