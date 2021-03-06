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
            message.success('ε½θΏζε')
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
                            <p>η§θ΅ζΆι΄ θ΅·:{item.timefrom.slice(0, 10)}</p>
                            <p>η§θ΅ζΆι΄ ζͺζ­’:{item.timeto.slice(0, 10)}</p>
                            <img src={item.image} style={{ width: 300 }} />

                            <div style={{ display: "flex", justifyContent: "center" }}>

                                <Popconfirm
                                    title="ζ―ε¦ε½θΏ"
                                    visible={visible}
                                    onConfirm={() => { handleOk(index) }}
                                    okButtonProps={{ loading: confirmLoading }}
                                    onCancel={handleCancel}
                                    okText="ζ―"
                                    cancelText="ε¦"
                                >
                                    <Button type="primary" onClick={showPopconfirm}>
                                        ε½θΏ
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
                δΈδΈι‘΅
            </div> */}

        </div>
    )
}


export default CarReturn;