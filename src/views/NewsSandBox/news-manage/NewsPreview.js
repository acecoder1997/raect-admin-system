import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import style from './NewsPreview.module.css'
import moment from 'moment'
import {getAction} from "../../../api";
import {PageHeader, Descriptions} from 'antd'

function NewsPreview(props) {
    const [currentNew, setCurrentNew] = useState({})

    const fetchNew = (id) => {
        getAction(`/news?id=${id}&_expand=type`).then(res => {
            if (res.length) setCurrentNew(res[0])
        })
    }

    const dateFormat = (date) => {
        return date ? moment(date).format('YYYY-MM-DD HH:MM:SS') : ""
    }

    useEffect(() => {
        const {params} = props.match
        fetchNew(params.id)
    }, [props.match.params.id])

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={currentNew.title}
                subTitle={currentNew.type?.label}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="作者">{currentNew.author}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{dateFormat(currentNew.createTime)}</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{dateFormat(currentNew.publishTime)}</Descriptions.Item>
                    <Descriptions.Item label="区域">{currentNew.region}</Descriptions.Item>
                    <Descriptions.Item label="审核状态">
                        <span
                            className={currentNew.auditState ? 'green' : 'red'}>{currentNew.auditState ? '已审核' : '未审核'}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="发布状态">
                        <span
                            className={currentNew.publishState ? 'green' : 'red'}>{currentNew.publishState ? '已发布' : '未发布'}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="访问数量"><span className='green'>{currentNew.view}</span></Descriptions.Item>
                    <Descriptions.Item label="点赞数量"><span className='green'>{currentNew.star}</span></Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <div className={style.previewContentBox} dangerouslySetInnerHTML={{
                __html: currentNew.content
            }}></div>
        </div>
    )
}

export default NewsPreview
