/**
 * @Description: 个人资料
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import Home from './index';
import {Form, Input, message, Radio} from "antd";
import Const from "../../utils/Const";
import {connect} from "dva";
import {equalResultStatus} from "../../utils";
import {userUpdateInfo} from "../../services/user";


const Profile = ({form, data}) => {
  const {getFieldDecorator} = form;
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    colon: false
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        userUpdateInfo(values).then(({data}) => {
          if(equalResultStatus(data)){
            message.success('保存成功');
          }else{
            message.error(data.message);
          }
        });
      }
    });
  };

  return (
    <Home>
      <div>
        <div className="title-card"><span>个人资料</span></div>
        <Form>
          <Form.Item
            {...formItemLayout}
            label="姓名"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入姓名!',
              }],
              initialValue: data.name
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="昵称"
          >
            {getFieldDecorator('nickName', {
              rules: [{
                required: true, message: '请输入昵称!',
              }],
              initialValue: data.nickName
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="年龄"
          >
            {getFieldDecorator('age', {
              rules: [{
                required: true, message: '请输入年龄!',
              }],
              initialValue: data.age
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="性别"
          >
            {getFieldDecorator('gendar', {
              rules: [{
                required: true, message: '前选择性别!',
              }],
              initialValue: data.gendar
            })(
              <Radio.Group>
                <Radio value={Const.Man}>男</Radio>
                <Radio value={Const.Woman}>女</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="公司"
          >
            {getFieldDecorator('company', {
              rules: [{
                required: true, message: '请输入公司!',
              }],
              initialValue: data.company
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="职位"
          >
            {getFieldDecorator('position', {
              rules: [{
                required: true, message: '请输入职位!',
              }],
              initialValue: data.position
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="简介"
          >
            {getFieldDecorator('remarks', {
              initialValue: data.remarks
            })(
              <Input.TextArea placeholder='输入您的简介...'/>
            )}
          </Form.Item>
        </Form>
        <div className='text-align'>
          <div className="main-button" style={{width: 360}} onClick={handleSubmit}>保存</div>
        </div>
      </div>
    </Home>
  );
}

export default connect(({home}) => (home))(Form.create()(Profile));
