
import React, { useState } from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,

    LogoutOutlined

} from '@ant-design/icons';
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import carList from '../carList/carList'
import userList from '../userList/user'
import Carmanage from '../car_manage/car_manage.js'
import { getNowDate } from './timeuntl'
import EchartsTest from '../../components/echarts/e.js'
import CarReturn from '../car_return/index.js'
import AdminList from '../adminList/index.js'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends React.Component {


    constructor(props) {
        super(props)
    }
    state = {
        collapsed: false,
        isuser: localStorage.getItem('permission')
    };
    componentDidMount() {
        if (!localStorage.getItem('userif')) {
            this.props.history.push('/')
        }
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };


    loginout = () => {
        localStorage.removeItem('userif')
        this.props.history.push('/')
    }
    render() {
        const { collapsed, isuser } = this.state;

        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />

                        {
                            isuser === "admin" ?
                                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                                        <Link to="/home/main">
                                            主页
                                </Link>

                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                                        <Link to="/home/carList">
                                            车辆信息
                                </Link>
                                    </Menu.Item>
                                    <SubMenu key="sub1" icon={<UserOutlined />} title="用户">
                                        <Menu.Item key="3">
                                            <Link to="/home/userList">
                                                用户账号信息
                                    </Link>
                                        </Menu.Item>
                                        <Menu.Item key="4">
                                            <Link to="/home/adminlist">
                                                用户租赁信息
                                </Link>
                                        </Menu.Item>
                                    </SubMenu>

                                    <SubMenu key="sub2" icon={<TeamOutlined />} title="汽车租赁">
                                        <Menu.Item key="6">
                                            <Link to="/home/carmanage">
                                                租赁汽车
                                    </Link>
                                        </Menu.Item>
                                        <Menu.Item key="8">
                                            <Link to="/home/carreturn">
                                                汽车归还
                                        </Link>
                                        </Menu.Item>
                                    </SubMenu>

                                </Menu>


                                :


                                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                    <SubMenu key="sub2" icon={<TeamOutlined />} title="汽车租赁">
                                        <Menu.Item key="6">
                                            <Link to="/home/carmanage">
                                                租赁汽车
                                        </Link>
                                        </Menu.Item>
                                        <Menu.Item key="8">
                                            <Link to="/home/carreturn">
                                                汽车归还
                                        </Link>

                                        </Menu.Item>
                                    </SubMenu>

                                </Menu>
                        }
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }} >
                            <div>
                                <h2 style={{ fontWeight: "bold", fontSize: "25px", color: "#fff", textAlign: "center" }}>汽车租赁系统
                                <LogoutOutlined style={{ position: 'fixed', top: "20px", right: "100px" }}
                                        onClick={this.loginout} />
                                </h2>

                            </div>


                        </Header>
                        {/* <Content >

                            <div className="line">{currentTime}</div>
                        </Content> */}
                        <Content style={{ margin: '20px  50px', backgroundColor: "#fff" }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>
                                    <Switch>
                                        <Route path="/home/carList" component={carList} />
                                        <Route path="/home/userList" component={userList} />
                                        <Route path="/home/carmanage" component={Carmanage} />
                                        <Route path="/home/main" component={EchartsTest} />
                                        <Route path="/home/adminlist" component={AdminList} />
                                        <Route path="/home/carreturn" component={CarReturn} />

                                    </Switch>
                                </Breadcrumb.Item>
                                {/* <Breadcrumb.Item>
                                    Bill
                            </Breadcrumb.Item> */}
                            </Breadcrumb>
                            {/* <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                                Bill is a cat.
                         </div> */}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
export default Home