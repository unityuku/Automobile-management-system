import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, Table, Modal, Form, Input, DatePicker, message, Image } from 'antd'
// import { Icon } from '@ant-design/icons';
import moment from 'moment';
import axios from '../../api/axios'

const AdminList = (props) => {
    // const { dataSource, getUserDispatch } = props
    const [dataSource, setDataSource] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        axios.get('/getadminlist').then(({ data }) => {
            setDataSource(data)
        })
    }, [])


    const columns = [
        {
            title: '管理员账号',
            // dataINdex 对应上面数组的名字
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '管理员密码',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '管理员信息',
            dataIndex: 'message',
            key: 'message',
        },
        {
            render: (text, record, index) =>
                <div>
                    <Button type="primary" onClick={() => { showModal(index) }} style={{ margin: "auto 5px" }}>
                        添加
        </Button>
                    <Button type="primary" onClick={() => { deteleUsers(index) }}>
                        删除
        </Button>
                </div>
        }
    ]

    const title = '管理员信息'
    // card 右侧
    // useEffect(() => {

    //     getUserDispatch('test')
    // }, [])
    // const addUsers = (id) => {
    //     console.log(dataSource[id].id);

    // }
    const deteleUsers = (id) => {
        console.log(dataSource[id].id);
        id = dataSource[id].id
        axios.post(`/deleteadmin/${id}`).then(({ data }) => {
            console.log(data);
            if (data) {
                props.history.go(0)
            }
        })


    }
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
        values.id = dataSource.length
        values.message = moment(new Date()).format("YYYY-MM-DD")
        axios.post('/addadmin', values).then(({ data }) => {
            console.log(data);

            if (data) {
                props.history.go(0)
                message.success('提交成功')
            }
            else {
                message.err('提交失败')
            }
        })


    };
    return (
        <div>
            <Card title={title} >
                <Table
                    rowkey=""
                    dataSource={dataSource}
                    columns={columns}
                >
                    <Table.Column>
                        hello
                    </Table.Column>
                </Table>
            </Card>
            <Modal title="请添加以下信息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="请输入账号"
                        name="username"
                        rules={[{ required: true, message: '请输入账号' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="请输入密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {/* <Form.Item
                        label="请输入价格"
                        name="price"
                        rules={[{ required: true, message: '请输入价格' }]}
                    >
                        <Input />
                    </Form.Item> */}
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
    );
}
export default AdminList
