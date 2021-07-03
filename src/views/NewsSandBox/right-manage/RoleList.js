import React, {useState, useEffect} from 'react'
import {Button, Modal, Table, Tooltip, Tree} from 'antd'
import {DeleteOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {deleteAction, getAction, patchAction} from "../../../api";

export default function RoleList() {
    const [isRoleModalShow, setIsRoleModalShow] = useState(false)
    const [currRole, setCurrRole] = useState({rights: []})
    const [rightList, setRightList] = useState([])
    const [dataSource, setDataSource] = useState([])
    const columns = [{
        title: '角色名称',
        dataIndex: 'name'
    }, {
        title: '操作',
        key: 'operation',
        render: (item) => (
            <>
                <Tooltip title="删除">
                    <Button type="danger" shape="circle" icon={<DeleteOutlined/>} style={{marginRight: '5px'}}
                            onChange={() => onConfirm(item)}/>
                </Tooltip>
                <Tooltip title="编辑">
                    <Button type="primary" shape="circle" icon={<UnorderedListOutlined/>}
                            onClick={() => {
                                setCurrRole(item)
                                setIsRoleModalShow(true)
                            }}/>
                </Tooltip>
            </>
        ),
    }]

    useEffect(() => {
        fetchRoleList()
        fetchRightList()
    }, [])

    const fetchRoleList = () => {
        getAction('http://localhost:5000/roles').then(res => {
            setDataSource(res)
        })
    }
    const fetchRightList = () => {
        getAction('http://localhost:5000/rights?_embed=children').then(res => {
            const setKey = (list) => {
                list.forEach(l => {
                    l.key = l.path
                    if (l.children) setKey(l.children)
                })
            }
            setKey(res)
            setRightList(res)
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
        deleteAction(`http://localhost:5000/roles/${id}`)
    }

    const handleOk = () => {
        patchAction(`http://localhost:5000/roles/${currRole.id}`, {rights: currRole.rights}).then(res => {
            setIsRoleModalShow(false)
            fetchRoleList()
        })

    }

    const handleCancel = () => {
        setIsRoleModalShow(false)
    }
    const handleCheck = (checkedKeys) => {
        setCurrRole(Object.assign({}, currRole, {rights: checkedKeys}))
    }

    return (
        <div>
            <Table rowKey='id' columns={columns} dataSource={dataSource}></Table>
            <Modal title="权限分配" destroyOnClose visible={isRoleModalShow} onOk={handleOk} onCancel={handleCancel}>
                <Tree checkable checkedKeys={currRole.rights} treeData={rightList} onCheck={handleCheck}></Tree>
            </Modal>
        </div>
    )
}
