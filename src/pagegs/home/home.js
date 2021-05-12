import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import carList from '../carList/carList'
import userList from '../userList/user'
import Carmanage from '../car_manage/car_manage.js'
import { getNowDate } from './timeuntl'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Home extends React.Component {
    state = {
        collapsed: false,
        currentTime: getNowDate(Date.now())
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed, currentTime } = this.state;
        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<PieChartOutlined />}>
                                主页
                            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                                <Link to="/home/carList">
                                    租赁车辆
                                </Link>
                            </Menu.Item>
                            <SubMenu key="sub1" icon={<UserOutlined />} title="用户">
                                <Menu.Item key="3">
                                    <Link to="/home/userList">
                                        用户账号信息
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">用户租赁信息</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                                <Menu.Item key="6">
                                    <Link to="/home/carmanage">
                                        汽车管理
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="8">汽车</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9" icon={<FileOutlined />}>
                                Files
                        </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }} >
                            <h2 style={{ fontWeight: "bold", fontSize: "25px", color: "#fff", textAlign: "center" }}>汽车租赁系统</h2>
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