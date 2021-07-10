import React, {useState, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AceLayout} from '../../components'

import Home from './home'
import UserList from './user-manage/list'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NewsAdd from './news-manage/NewsAdd'
import NewsDraft from './news-manage/NewsDraft'
import NewsCategory from './news-manage/NewsCategory'
import NewsPreview from './news-manage/NewsPreview'
import NewsUpdate from './news-manage/NewsUpdate'
import AuditList from './audit-manage/AuditList'
import AuditNews from './audit-manage/AuditNews'
import NotFound404 from './error-page/404'
import {getAction} from "../../api";

const localRoutes = {
    '/home': Home,
    '/user-manage/list': UserList,
    '/right-manage/role-list': RoleList,
    '/right-manage/right-list': RightList,
    '/news-manage/add': NewsAdd,
    '/news-manage/draft': NewsDraft,
    '/news-manage/category': NewsCategory,
    '/news-manage/preview/:id': NewsPreview,
    '/news-manage/update/:id': NewsUpdate,
    '/audit-manage/audit': AuditNews,
    '/audit-manage/list': AuditList,
    // '/publish-manage/published': Published,
    // '/publish-manage/sunset': Sunset
}
const users = JSON.parse(localStorage.getItem('token'))
export default function NewsSandBox() {
    const [routeList, setRouteList] = useState([])

    useEffect(() => {
        const rights = getAction('http://localhost:5000/rights')
        const children = getAction('http://localhost:5000/children')
        Promise.all([rights, children]).then(res => {
            setRouteList([...res[0], ...res[1]])
        })
    }, [])

    return (
        <AceLayout>
            <Switch>
                {
                    routeList.map(route => {
                        const component = localRoutes[route.key]
                        if ((route.permission || route.routerPermission) && component && users.role.rights.includes(route.key)) {
                            return <Route path={route.key} component={component} key={route.key} exact></Route>
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
