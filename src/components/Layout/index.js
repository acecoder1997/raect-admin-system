import React from 'react'
import SideMenu from "./SideMenu";
import TopHeader from "./TopHeader";
import {Layout} from "antd";
import './index.css'

const {Content} = Layout
export default function AceLayout(props) {
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
