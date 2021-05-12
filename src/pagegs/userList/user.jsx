import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Button, Card, Table } from 'antd'
// import { Icon } from '@ant-design/icons';
import { todogetUser } from './store/actions'
// import axios from '../../api/axios'
const UserList = (props) => {
    const { dataSource, getUserDispatch } = props
    const columns = [
        {
            title: '账号',
            // dataINdex 对应上面数组的名字
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '用户信息',
            dataIndex: 'message',
            key: 'message',
        },
        {
            render: () =>
                <div>
                    <Button type="primary" onClick={addUsers} style={{ margin: "auto 5px" }}>
                        添加
        </Button>
                    <Button type="primary" onClick={deteleUsers}>
                        删除
        </Button>
                </div>
        }
    ]

    const title = '用户信息'
    // card 右侧
    useEffect(() => {

        getUserDispatch('test')
    }, [])
    const addUsers = (e) => {
        console.log(e);
    }
    const deteleUsers = () => {

    }
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
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        dataSource: state.userList.dataSource,
        columns: state.userList.columns
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserDispatch(test) {
            dispatch(todogetUser(test))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList)