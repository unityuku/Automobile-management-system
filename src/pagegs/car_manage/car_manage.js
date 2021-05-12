import React, { useEffect, useState } from 'react';
// import { Route } from 'react-dom'
// import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, Button, Modal, Form, Input, DatePicker, message, Image } from 'antd';
import axios from '../../api/axios'
// import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


const Carmanage = (props) => {
    const [carList, setCarList] = useState([])
    useEffect(() => {
        axios.get('/carlist').then(({ data }) => {
            // console.log(data);
            setCarList(data)

        })
    }, [])
    const [tests, settests] = useState([0, 0, 0, 0, 0])
    const test = (test) => {
        console.log(test);


    }
    return (
        <div>

            {
                carList.map((item, index) => (
                    <Image src={item.image} alt="" style={{ width: "100px" }} onClick={() => { test(tests, settests) }} />
                ))
            }
        </div>
    )
}


export default Carmanage;