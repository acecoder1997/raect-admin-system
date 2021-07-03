import React, {useState, useEffect} from 'react'
import {Table, Tag, Modal, Button, Switch, Tooltip} from 'antd'
import {getAction, deleteAction, patchAction} from "../../../api";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

export default function RightList() {
    const [dataSource, setDataSource] = useState([])
    const columns = [{
        title: '菜单名称',
        key: 'title',
        dataIndex: 'title',
    }, {
        title: '路径',
        key: 'path',
        dataIndex: 'path',
        render: path => <Tag color='orange'>{path}</Tag>
    }, {
        title: '启用',
        key: 'path',
        dataIndex: 'permission',
        render: (val, item) => <Switch checked={val} onChange={() => switchEnabled(item)}
                                       loading={item.loading}></Switch>
    }, {
        title: '操作',
        key: 'operation',
        render: (item) => (
            <>
                <Tooltip title="删除">
                    <Button type="danger" shape="circle" icon={<DeleteOutlined/>} style={{marginRight: '5px'}}
                            onClick={() => onConfirm(item)}/>
                </Tooltip>
                <Tooltip title="编辑">
                    <Button type="primary" shape="circle" icon={<EditOutlined/>}/>
                </Tooltip>
            </>
        ),
    }]

    useEffect(() => {
        getAction('http://localhost:5000/rights?_embed=children').then(res => {
            res.forEach(r => !r.children.length && delete r.children)
            setDataSource(res)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const switchEnabled = (item) => {
        item.loading = true
        const permission = item.permission ? 0 : 1
        item.permission = permission
        setDataSource([...dataSource])
        const api = item.rightId ? 'childrens' : 'rights'
        patchAction(`http://localhost:5000/${api}/${item.id}`, {permission}).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            item.loading = false
            console.log(item.loading);
            setDataSource([...dataSource])
        })
    }

    const onConfirm = (item) => {
        Modal.confirm({
            title: `你确定要删除 "${item.title}" 吗？`,
            onOk() {
                item.rightId ? deleteItemChildren(item.rightId, item.id) : deleteItem(item.id)
            }
        })
    }

    const deleteItem = (id) => {
        deleteAction(`http://localhost:5000/rights/${id}`)
    }

    const deleteItemChildren = (fid, id) => {
        dataSource.find(d => {
            if (d.id === fid) {
                if (d.children) {
                    const children = d.children.filter(c => c.id !== id)
                    d.children = children.length ? children : undefined
                }
            }
        })
        setDataSource([...dataSource])
    }

    return (
        <div>
            <Table rowKey="id" columns={columns} dataSource={dataSource}></Table>
        </div>
    )
}
