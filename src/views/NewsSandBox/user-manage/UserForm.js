import React, {useState, useEffect, forwardRef} from 'react'
import {Form, Input, Select} from 'antd'

function UserForm(props, ref) {
    const {roles, regions} = props
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        setDisabled(props.isSuperAdmin)
    }, [props.isSuperAdmin])

    const handleRoleChange = (val) => {
        if (val === 1) {
            setDisabled(true)
            ref.current.setFieldsValue({region: ''})
        } else {
            setDisabled(false)
        }
    }

    return (
        <Form ref={ref} labelCol={{span: 4}} wrapperCol={{span: 20}}>
            <Form.Item label="用户名" name="userName" rules={[{required: true, message: '用户名不能为空！'}]}>
                <Input allowClear/>
            </Form.Item>
            <Form.Item label="角色" name="roleId" rules={disabled ? [] : [{required: true, message: '角色不能为空！'}]}>
                <Select allowClear options={roles} placeholder='请选择角色' onChange={handleRoleChange}/>
            </Form.Item>
            <Form.Item label="地区" name="region">
                <Select allowClear options={regions} disabled={disabled} placeholder='请选择地区'/>
            </Form.Item>
        </Form>
    )
}

export default forwardRef(UserForm)
