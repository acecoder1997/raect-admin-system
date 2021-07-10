import React, {useState, useEffect} from 'react'
import {Table, message, Tag, Button, Tooltip, Modal} from 'antd'
import {deleteAction, getAction} from "../../../api";
import {CheckOutlined, CloseOutlined} from '@ant-design/icons';

export default function AuditNews() {
    const auditStateList = ['创建', '审核中', '已审核', '未通过']
    const auditStateColor = ['blue', 'orange', 'green', 'red']
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
                <Tooltip title="通过">
                    <Button type="primary" shape="circle" icon={<CheckOutlined/>} onClick={() => {
                    }} style={{margin: '0 5px'}}/>
                </Tooltip>
                <Tooltip title="不通过">
                    <Button type="danger" shape="circle" icon={<CloseOutlined/>} onClick={() => {
                    }} style={{margin: '0 5px'}}/>
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
            const res = await getAction(`${url.list}?auditState=1&_expand=type`)
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


    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div>
            <Table rowKey='id' columns={columns} dataSource={dataSource}></Table>
        </div>
    )
}
