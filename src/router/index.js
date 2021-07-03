import React, {lazy, Suspense} from 'react'
import {HashRouter, Route, Switch} from "react-router-dom";
import {Spin} from "antd";

const Login = lazy(() => import('../views/Login/index'))
const NewsSandBox = lazy(() => import('../views/NewsSandBox/index'))

export default function IndexRouter() {
    return (
        <HashRouter>
            <Suspense fallback={<Spin tip="Loading..."/>}>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={NewsSandBox}></Route>
                </Switch>
            </Suspense>
        </HashRouter>
    )
}
