import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AceLayout} from '../../components'
import {Layout} from "antd";

import Home from './home'
import UserList from './user-manage/list'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NotFound404 from './error-page/404'

export default function NewsSandBox() {
    return (
        <AceLayout>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/user-manage/list" component={UserList}></Route>
                <Route path="/right-manage/role-list" component={RoleList}></Route>
                <Route path="/right-manage/right-list" component={RightList}></Route>
                <Redirect from='/' to='/home' exact></Redirect>
                <Route path='*' component={NotFound404}></Route>
            </Switch>
        </AceLayout>
    )
}
