import React, {useEffect, useState, useRef} from 'react'
import {Button, Modal, Switch, Table, Divider, Tooltip} from 'antd'
import UserForm from "./UserForm";
import {deleteAction, getAction, patchAction, postAction} from "../../../api";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

export default function UserList() {
    const formRef = useRef(null)
    const [isModalShow, setIsModalShow] = useState(false)
    const [currUser, setCurrUser] = useState({})
    const [regions, setRegions] = useState([])
    const [roles, setRoles] = useState([])
    const [dataSource, setDataSource] = useState([])
    const columns = [{
        title: '地区',
        dataIndex: 'region',
        render: (region) => <span style={{fontWeight: 'bold'}}>{region}</span>
    }, {
        title: '用户名',
        dataIndex: 'userName'
    }, {
        title: '角色名称',
        dataIndex: 'role',
        render: (role) => role.name
    }, {
        title: '用户状态',
        dataIndex: 'active',
        render: (val, item) => <Switch checked={val} onChange={() => switchActive(item)}
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
                    <Button type="primary" shape="circle" icon={<EditOutlined/>} onClick={() => {
                        setCurrUser(item)
                        setIsModalShow(true)
                    }}/>
                </Tooltip>
            </>
        ),
    }]

    useEffect(() => {
        fetchUserList()
        fetchRoleList()
        fetchRegionList()
    }, [])

    const fetchUserList = () => {
        getAction('http://localhost:5000/users?_expand=role').then(res => {
            setDataSource(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const fetchRoleList = () => {
        getAction('http://localhost:5000/roles').then(res => {
            res.forEach(r => {
                r.label = r.name
                r.value = r.id
            })
            setRoles(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const fetchRegionList = () => {
        getAction('http://localhost:5000/regions').then(res => {
            res.forEach(r => {
                r.label = r.name
                r.value = r.name
            })
            setRegions(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const onConfirm = (item) => {
        Modal.confirm({
            title: `你确定要删除 "${item.title}" 吗？`,
            onOk() {
                deleteItem(item.id)
            }
        })
    }
    const deleteItem = (id) => {
        deleteAction(`http://localhost:5000/users/${id}`)
    }

    const switchActive = () => {

    }

    const handleOk = () => {
        formRef.current.validateFields().then(value => {
            postAction('http://localhost:5000/users', {...value, active: 1}).then(res => {
                setIsModalShow(false)
                fetchUserList()
            })
        }).catch(err => {
            console.log(err);
        })
    }

    const handleCancel = () => {
        setIsModalShow(false)
    }
    const addUser = () => {
        setIsModalShow(true)
    }
    return (
        <div>
            <Button type="primary" onClick={addUser}>添加用户</Button>
            <Divider></Divider>
            <Table rowKey='id' columns={columns} dataSource={dataSource}></Table>
            <Modal title="添加用户" destroyOnClose visible={isModalShow} onOk={handleOk} onCancel={handleCancel}>
                <UserForm ref={formRef} regions={regions} roles={roles}/>
            </Modal>
        </div>
    )
}
