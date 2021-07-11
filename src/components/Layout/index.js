import React, {useEffect} from 'react'
import SideMenu from "./SideMenu";
import TopHeader from "./TopHeader";
import {Layout} from "antd";
import './index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { withRouter } from 'react-router-dom';

const {Content} = Layout
 function AceLayout(props) {
    NProgress.start()

    const checkToken = ()=>{
        const token = localStorage.getItem('token')
        if(!token){
            NProgress.done()
            props.history.push('/login')
        }
    }
    checkToken()
    useEffect(() => {
        NProgress.done()
    })

    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content className='site-layout-background' style={{
                    margin: '10px',
                    padding: 10,
                    minHeight: 280
                }}>{props.children}</Content>
            </Layout>
        </Layout>
    )
}

export default withRouter(AceLayout)
