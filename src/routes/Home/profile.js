/**
 * @Description: 个人资料
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import {Avatar, Form, Input, message, Radio} from "antd";
import Const from "../../utils/Const";
import {connect} from "dva";
import {equalResultStatus} from "../../utils";
import {userGetInfo, userUpdateInfo} from "../../services/user";
import NormalUpload from "../../components/FileUpload/NormalUpload";


const Profile = ({form, data, dispatch}) => {
  const {getFieldDecorator} = form;
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12},
    },
    colon: false
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if(!values.img){
          return message.error('请上传一张图片作为您的头像');
        }
        userUpdateInfo(values).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('保存成功');
            dispatch({
              type: 'home/query',
            })
          } else {
            message.error(data.message);
          }
        });
      }
    });
  };

  const avatarChange = (e) => {
    userUpdateInfo({img: e}).then(({data}) => {
      if (equalResultStatus(data)) {
        message.success('修改成功');
        userGetInfo().then(({data}) => {
          dispatch({
            type: 'home/updateState',
            payload: {
              data: data.data
            }
          });
          dispatch({
            type: 'app/updateState',
            payload: {
              user: data.data
            }
          })
        });
      } else {
        message.error(data.message);
      }
    });
  };

  return (
    <div>
      <div className="title-card"><span>个人资料</span></div>
      <Form layout='horizontal' className='form-bl' style={{paddingLeft: 120}}>
        <div className="text-align mt40 mb50">
          {getFieldDecorator('img', {
            rules: [{
              required: true, message: '请上传头像!',
            }],
            initialValue: data.img
          })(
            <div>
              <Avatar size={90} src={data.img}/>
              <NormalUpload text='修改头像' onChange={avatarChange} style={{verticalAlign: 'bottom', marginLeft: 10}}/>
            </div>
          )}
        </div>
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
            initialValue: String(data.gendar)
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
          {getFieldDecorator('intro', {
            initialValue: data.intro
          })(
            <Input.TextArea placeholder='输入您的简介...' maxLength={50}/>
          )}
        </Form.Item>
      </Form>
      <div className='text-align'>
        <div className="main-button" style={{width: 360}} onClick={handleSubmit}>保存</div>
      </div>
    </div>
  );
}

export default connect(({home}) => (home))(Form.create()(Profile));
