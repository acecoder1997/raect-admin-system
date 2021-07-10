import React, {useState, useEffect} from 'react'
import {Table, message, Tag, Button, Tooltip, Modal} from 'antd'
import {deleteAction, getAction, patchAction} from "../../../api";
import {withRouter} from 'react-router-dom'
import {DeleteOutlined, EditOutlined, CloudUploadOutlined} from '@ant-design/icons';

function NewsDraft(props) {
    const [columns] = useState([{
        title: '新闻标题',
        dataIndex: 'title',
        ellipsis: true,
        render: (val, item) => (<a href={`#/news-manage/preview/${item.id}`}>{val}</a>)
    }, {
        title: '新闻分类',
        dataIndex: 'type',
        render: (item) => (<Tag color="blue">{item.label}</Tag>)
    }, {
        title: '作者',
        dataIndex: 'author'
    }, {
        title: '操作',
        key: 'operation',
        render: (item) => (
            <>
                <Tooltip title="删除">
                    <Button type="danger" shape="circle" icon={<DeleteOutlined/>}
                            onClick={() => onConfirm(item)}/>
                </Tooltip>
                <Tooltip title="编辑">
                    <Button type="primary" shape="circle" icon={<EditOutlined/>} onClick={() => {
                        props.history.push(`/news-manage/update/${item.id}`)
                    }} style={{margin: '0 5px'}}/>
                </Tooltip>
                <Tooltip title="提交审核">
                    <Button type="primary" shape="circle" icon={<CloudUploadOutlined/>} onClick={() => onAudit(item)}/>
                </Tooltip>
            </>
        )
    }])
    const [dataSource, setDataSource] = useState([])
    const url = {
        list: '/news',
    }

    const fetchList = async () => {
        try {
            const res = await getAction(`${url.list}?auditState=0&_expand=type`)
            setDataSource(res)
        } catch (e) {
            message.error(`获取数据失败：${e.message}`)
        }
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
        deleteAction(`/news/${id}`).then(res => {
            fetchList()
        })
    }

    const onAudit = (item) => {
        patchAction(`/news/${item.id}`, {auditState: 1}).then(res => {
            props.history.push('/audit-manage/list')
        })
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div>
            <Table rowKey='id' columns={columns} dataSource={dataSource}></Table>
        </div>
    )
}

export default withRouter(NewsDraft)
