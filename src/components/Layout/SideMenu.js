import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {getAction} from "../../api";
import {Layout, Menu} from "antd";

const {Sider} = Layout
const {SubMenu} = Menu
// const routes = [{
//     name: 'home',
//     path: '/home',
//     icon: <LaptopOutlined/>,
//     meta: {title: '首页'}
// }, {
//     name: 'user-manage',
//     path: '/user-manage',
//     icon: <GlobalOutlined/>,
//     meta: {title: '用户'},
//     children: [{
//         name: 'list',
//         path: '/list',
//         meta: {title: '用户列表'},
//     }]
// }, {
//     name: 'right-manage',
//     path: '/right-manage',
//     icon: <FolderOpenOutlined/>,
//     meta: {title: '权限'},
//     children: [{
//         name: 'right-list',
//         path: '/right/list',
//         meta: {title: '权限列表'},
//     }, {
//         name: 'role-list',
//         path: '/role/list',
//         meta: {title: '角色列表'},
//     }]
// }]

function SideMenu(props) {
    const [collapsed, setCollapsed] = useState(false)
    const [openKeys, setOpenKeys] = useState([])
    const [routeList, setRouteList] = useState([])

    useEffect(() => {
        setOpenKeys(props.location.pathname.split('/').filter(name => name))
        getAction('http://localhost:5000/rights?_embed=children').then(res => {
            setRouteList(res)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    const renderMenuItems = (routes, parentPath = '', parentName = '') => {
        return routes.map(route => {
            const path = `${parentPath}${route.path}`
            const name = `${parentName}|${route.name}`
            if (!route.permission) return
            if (route.children && route.children.length) {
                return (
                    <SubMenu key={route.name} title={route.title} icon={route.icon} onTitleClick={() => {
                        setOpenKeys(name.split('|').filter(name => name))
                    }}>
                        {renderMenuItems(route.children, path, name)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={route.name} icon={route.icon} onClick={() => {
                        props.history.push(path)
                        setOpenKeys(name.split('|').filter(name => name))
                    }}>
                        {route.title}
                    </Menu.Item>
                )
            }
        })
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" onClick={() => setCollapsed(!collapsed)}>阿测后台系统</div>
            <Menu theme='dark' selectedKeys={openKeys}
                  openKeys={openKeys} mode="inline">{renderMenuItems(routeList)}</Menu>
        </Sider>
    )
}

export default withRouter(SideMenu)
