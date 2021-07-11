import React from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import {Layout, Avatar, Menu, Dropdown} from "antd";
import {
    MehOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    InfoCircleOutlined,
    UserOutlined
} from '@ant-design/icons'

const {Header} = Layout
const TopHeader = (props) => {
    const users = JSON.parse(localStorage.getItem('token')) || {}

    let menu = (
        <Menu>
            <Menu.Item key='role' icon={<UserOutlined />}>{users?.role?.name}</Menu.Item>
            <Menu.Item key='info' icon={<InfoCircleOutlined/>}>用户资料</Menu.Item>
            <Menu.Item key='logout' danger icon={<LogoutOutlined/>} onClick={logOut}>退出</Menu.Item>
        </Menu>
    )

    function toggle() {
        props.changeCollapsed(!props.isCollapsed)
    }

    function logOut() {
        localStorage.removeItem('token')
        setTimeout(() => props.history.replace('/login'))
    }

    return (
        <Header className="site-layout-background" style={{padding: '0 10px'}}>
            {
                React.createElement(props.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle
                })
            }
            <div style={{float: 'right'}}>
                <Dropdown overlay={menu}>
                    <div style={{cursor: 'pointer'}}>
                        <Avatar size={34} icon={<MehOutlined/>}
                                style={{backgroundColor: '#00a2ae', verticalAlign: 'middle', marginRight: 5}}/>
                        <span>{users.userName}</span>
                    </div>
                </Dropdown>
            </div>
        </Header>
    )
}

// 组件接受props
function mapStateToProps({CollapsedReducer:{isCollapsed}}){
    return {isCollapsed}
}

export default connect(mapStateToProps,{
    changeCollapsed:(data)=>({type:'change_collapsed',data})
})(withRouter(TopHeader))
