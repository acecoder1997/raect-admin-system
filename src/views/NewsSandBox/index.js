import React, {useState, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AceLayout} from '../../components'
import {Layout} from "antd";

import Home from './home'
import UserList from './user-manage/list'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NotFound404 from './error-page/404'
import {getAction} from "../../api";

const localRoutes = {
    '/home': Home,
    '/user-manage/list': UserList,
    '/right-manage/role-list': RoleList,
    '/right-manage/right-list': RightList,
    // '/news-manage/add': NewsAdd,
    // '/news-manage/draft': NewsDraft,
    // '/news-manage/category': NewCategory,
    // '/audit-manage/audit': Audit,
    // '/audit-manage/list': AuditList,
    // '/publish-manage/published': Published,
    // '/publish-manage/sunset': Sunset
}

export default function NewsSandBox() {
    const [routeList, setRouteList] = useState([])
    const users = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        const rights = getAction('http://localhost:5000/rights')
        const children = getAction('http://localhost:5000/children')
        Promise.all([rights, children]).then(res => {
            setRouteList([...res[0], ...res[1]])
            console.log([...res[0], ...res[1]]);
        })
    }, [])

    return (
        <AceLayout>
            <Switch>
                {
                    routeList.map(route => {
                        const component = localRoutes[route.key]
                        if (route.permission && component && users.role.rights.includes(route.path)) {
                            return <Route path={route.key} component={component} exact></Route>
                        }
                    })
                }
                <Redirect from='/' to='/home' exact></Redirect>
                {
                    routeList.length && <Route path='*' component={NotFound404}></Route>
                }
            </Switch>
        </AceLayout>
    )
}
