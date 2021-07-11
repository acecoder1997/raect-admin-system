import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {getAction} from "../../api";
import {Layout, Menu} from "antd";
import { connect } from 'react-redux';
const {Sider} = Layout
const {SubMenu} = Menu

function SideMenu(props) {
    const [openKeys, setOpenKeys] = useState([])
    const [routeList, setRouteList] = useState([])
    const [users] = useState(JSON.parse(localStorage.getItem('token')))

    useEffect(() => {
        getAction('http://localhost:5000/rights?_embed=children').then(res => {
            setRouteList(res)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        const defaultOpenKeys = ['/' + props.location.pathname.split('/')[1], props.location.pathname]
        setOpenKeys(defaultOpenKeys)
    }, [props.location.pathname])

    const hasPermission = (route) => {
        return route.permission && users.role.rights.includes(route.key)
    }

    const renderMenuItems = (routes) => {
        return routes.map(route => {
            if (!route.permission) return
            if (route.children?.length > 0 && hasPermission(route)) {
                return (
                    <SubMenu key={route.key} title={route.title} icon={route.icon}>
                        {renderMenuItems(route.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={route.key} icon={route.icon} onClick={() => {
                        props.history.push(route.key)
                    }}>
                        {route.title}
                    </Menu.Item>
                )
            }
        })
    }

    const onOpenChange = (keys) => {
        keys.length && setOpenKeys([keys[keys.length - 1]])
    }

    const selectedKeys = [props.location.pathname]
    return (
        <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
            <div className="logo">阿测后台系统</div>
            <Menu theme='dark' selectedKeys={selectedKeys} openKeys={openKeys} onOpenChange={onOpenChange}
                  mode="inline">
                {renderMenuItems(routeList)}
            </Menu>
        </Sider>
    )
}

export default connect(({CollapsedReducer:{isCollapsed}})=>{
    return {isCollapsed}
})(withRouter(SideMenu))
