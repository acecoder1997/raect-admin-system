import React, {useState, useEffect, useRef} from 'react'
import {getAction, postAction, patchAction} from "../../../api";
import {withRouter} from 'react-router-dom'
import {PageHeader, Steps, Button, Form, Input, Select, message} from "antd";
import style from './NewsAdd.module.css'
import {NewsEditor} from '../../../components'

function NewsAdd(props) {
    const newsInfoRef = useRef(null)
    const [newsInfo, setNewsInfo] = useState({})
    const [newsContent, setNewsContent] = useState('')
    const [current, setCurrent] = useState(0)
    const [categories, setCategories] = useState([])
    const user = JSON.parse(localStorage.getItem('token'))

    const onPrevious = () => {
        setCurrent(current - 1)
    }

    const onNext = () => {
        if (current === 0) {
            newsInfoRef.current.validateFields().then(res => {
                console.log(res);
                setNewsInfo(res)
                setCurrent(current + 1)
            }).catch(err => {
                console.log(err);
            })
        } else if (current === 1) {
            if (current === 1 && (!newsContent || newsContent.trim() === '<p></p>')) {
                message.error('新闻内容不能为空！')
            } else {
                setCurrent(current + 1)
            }
        }
    }

    const getContent = (content) => {
        setNewsContent(content)
    }

    const saveDraft = (state) => {
        const {region, userName, roleId} = user
        const postData = {
            ...newsInfo,
            content: newsContent,
            region: region || '全球',
            author: userName,
            roleId,
            auditState: state,
            publishState: 0,
            createTime: Date.now(),
            star: 0,
            view: 0,
            // publishTime: 0
        }
        postAction('/news', postData).then(res => {
            message.success('保存成功！')
            props.history.push(state === 0?'/news-manage/draft':'/audit-manage/list')
        }).catch(err => {
            message.error(`保存失败:${err.message || err.code}`)
        })
    }

    const onAudit = (state) => {
        saveDraft(state)
    }

    useEffect(() => {
        getAction('/types').then(res => setCategories(res))
    }, [])

    return (
        <div>
            <PageHeader title="撰写新闻"></PageHeader>
            <div className={style.actionGroup}>
                {
                    current === 2 && <span>
                        <Button type="primary" onClick={() => saveDraft(0)}>保存草稿箱</Button>
                        <Button type="primary" onClick={() => onAudit(1)}>提交审核</Button>
                    </span>
                }
                {
                    current > 0 && <Button type="primary" onClick={onPrevious}>上一步</Button>
                }
                {
                    current < 2 && <Button type="primary" onClick={onNext}>下一步</Button>
                }
            </div>
            <Steps className={style.steps} current={current}>
                <Steps.Step title="新闻信息" description="第一步"/>
                <Steps.Step title="新闻内容" description="第二步"/>
                <Steps.Step title="提交新闻" description="第三步"/>
            </Steps>
            <div className={current === 0 ? '' : style.hidden}>
                <Form ref={newsInfoRef} labelCol={{span: 3}} wrapperCol={{span: 20}}>
                    <Form.Item label="新闻标题" name="title" rules={[{required: true, message: '新闻标题不能为空！'}]}>
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="新闻分类" name="typeId" rules={[{required: true, message: '角色不能为空！'}]}>
                        <Select allowClear options={categories} placeholder='请选择角色'/>
                    </Form.Item>
                </Form>
            </div>
            <div className={current === 1 ? '' : style.hidden}>
                <NewsEditor getContent={getContent}></NewsEditor>
            </div>
            <div className={current === 2 ? '' : style.hidden}>
                3
            </div>
        </div>
    )
}

export default withRouter(NewsAdd)
