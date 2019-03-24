/**
 * @Description: 申请离园
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import {Form, Input, message} from "antd";
import {equalResultStatus} from "../../utils";
import {userFeedBack} from "../../services/user";
import {MOBILE_VALIDATE, TWO_20, TWO_50} from "../../utils/validate";


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
      <div>
        <div className="title-card"><span>意见反馈</span></div>
        <Form className='pt40'>
          <Form.Item
            {...formItemLayout}
            label="联系人"
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '必填!',
                TWO_20
              }],
            })(
              <Input placeholder='请输入联系人姓名'/>
            )}
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="联系方式"
          >
            {getFieldDecorator('phone', {
              rules: [{
                required: true, message: '必填!',
                MOBILE_VALIDATE
              }],
            })(
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
              <Input.TextArea placeholder='请输入您宝贵的问题与建议...' style={{height: 210}}/>
            )}
          </Form.Item>
        </Form>
        <div className='text-align'>
          <div className="main-button" style={{width: 330}} onClick={handleSubmit}>提交</div>
        </div>
      </div>
  );
}

export default Form.create()(Leave);
