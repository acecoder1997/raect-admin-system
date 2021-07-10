import React, {useState, useEffect} from 'react'
import {Table, message, Tag, Button} from 'antd'
import {getAction, patchAction} from "../../../api";
import {withRouter} from 'react-router-dom'

function AuditList(props) {
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
        title: '新闻状态',
        dataIndex: 'auditState',
        render: (val) => <Tag color={auditStateColor[val]}>{auditStateList[val]}</Tag>
    }, {
        title: '操作',
        key: 'operation',
        render: (item) => (
            <>
                {
                    item.auditState === 1 &&
                    <Button type="primary" onClick={() => handleStateChange(item)}
                            style={{margin: '0 5px'}}>撤销</Button>
                }
                {
                    item.auditState === 2 &&
                    <Button type="primary" onClick={() => handlePublish( item)}
                            style={{margin: '0 5px'}}>发布</Button>
                }
                {
                    item.auditState === 3 && <Button type="primary" onClick={() => {
                        props.history.push(`/news-manage/update/${item.id}`)
                    }} style={{margin: '0 5px'}}>修改</Button>
                }
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

    const handleStateChange = ( item) => {
        patchAction(`/news/${item.id}`, {auditState: 0}).then(res => {
            console.log(res);
        })
    }
    const handlePublish = (item) => {
        patchAction(`/news/${item.id}`, {publishState: 2}).then(res => {
            console.log(res);
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

export default withRouter(AuditList)
