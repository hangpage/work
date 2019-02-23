/**
 * @Description: 申请离园
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import Home from './index';
import {DatePicker, Form, Input, message, Radio} from "antd";
import Const from "../../utils/Const";
import {equalResultStatus} from "../../utils";
import {userFeedBack, userLeavePark} from "../../services/user";


const Leave = ({form}) => {
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

  const RULE = {
    rules: [{
      required: true, message: '必填!',
    }],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        userFeedBack(values).then(({data}) => {
          if(equalResultStatus(data)){
            message.success('申请成功');
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
        <div className="title-card"><span>意见反馈</span></div>
        <Form>
          <Form.Item
            {...formItemLayout}
            label="联系人"
          >
            {getFieldDecorator('name', RULE)(
              <Input placeholder='请输入联系人姓名'/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="联系方式"
          >
            {getFieldDecorator('phone', RULE)(
              <Input placeholder='请输入联系方式'/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="问题建议"
          >
            {getFieldDecorator('content', {
              RULE
            })(
              <Input.TextArea placeholder='请输入您宝贵的问题与建议...' style={{height: 360}}/>
            )}
          </Form.Item>
        </Form>
        <div className='text-align'>
          <div className="main-button" style={{width: 360}} onClick={handleSubmit}>提交</div>
        </div>
      </div>
    </Home>
  );
}

export default Form.create()(Leave);
