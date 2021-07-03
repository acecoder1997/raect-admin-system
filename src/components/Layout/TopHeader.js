import React, {useState} from 'react'
import {Layout, Avatar, Menu, Dropdown} from "antd";
import {
    MehOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons'

const {Header} = Layout
export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false)

    let menu = (
        <Menu>
            <Menu.ItemGroup title="Group title">
                <Menu.Item key={1}>1st menu item</Menu.Item>
                <Menu.Item key={2}>2nd menu item</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    )

    function toggle() {
        setCollapsed(!collapsed)
    }

    return (
        <Header className="site-layout-background" style={{padding: '0 10px'}}>
            {
                React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle
                })
            }
            <div style={{float: 'right'}}>
                <Dropdown overlay={menu}>
                    <div style={{cursor: 'pointer'}}>
                        <Avatar size={34} icon={<MehOutlined/>}
                                style={{backgroundColor: '#00a2ae', verticalAlign: 'middle', marginRight: 5}}/>
                        <span>阿测</span>
                    </div>
                </Dropdown>
            </div>
        </Header>
    )
}
