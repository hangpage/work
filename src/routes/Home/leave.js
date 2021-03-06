/**
 * @Description: 申请离园
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import {Col, DatePicker, Form, Input, message, Radio, Row} from "antd";
import Const from "../../utils/Const";
import {equalResultStatus, reFormatParams} from "../../utils";
import {userLeavePark} from "../../services/user";
import {validateNoChinese} from "../../utils/validate";

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
  colon: false
};

const RULE = {
  rules: [{
    required: true, message: '必填!',
  }],
};


const Leave = ({form}) => {
  const {getFieldDecorator} = form;
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = reFormatParams(values);
        params.inTime = params.inTime + ' 00:00:00';
        userLeavePark(params).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('申请成功');
          } else {
            message.error(data.message);
          }
        });
      }
    });
  };

  return (
      <div>
        <div className="title-card"><span>申请离园</span></div>
        <Form layout='horizontal' className='form-bl pt40' style={{paddingLeft: 120}}>
          <Row>
            <Col span={24}>
              <div className="subheading mb39">项目情况</div>
              <Form.Item
                {...formItemLayout}
                label="公司名称"
              >
                {getFieldDecorator('companyName',{
                  rules: [{
                    required: true, message: '必填!',
                  }],
                })(
                  <Input placeholder='请输入公司名称'/>
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="入孵时间"
              >
                {getFieldDecorator('inTime', RULE)(
                  <DatePicker format="YYYY-MM-DD"/>
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="出孵类型"
              >
                {getFieldDecorator('type', RULE)(
                  <Radio.Group>
                    <Radio value={Const.ZHENG_CHANG_CHU_FU}>正常出孵</Radio>
                    <Radio value={Const.TI_QIAN_CHU_FU}>提前出孵</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="出孵去向"
              >
                {getFieldDecorator('go', {
                  rules: [{
                    required: true, message: '必填!',
                  },{
                    validator: validateNoChinese
                  }],
                })(
                  <Input placeholder='请输入出孵去向'/>
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="备注"
              >
                {getFieldDecorator('otherNote', {
                  RULE
                })(
                  <Input.TextArea placeholder='输入您的备注...' style={{height: 161}}/>
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="出孵原因"
              >
                {getFieldDecorator('reason', {
                  RULE
                })(
                  <Input.TextArea placeholder='请输入出孵原因...' style={{height: 161}}/>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className='text-align'>
          <div className="main-button" style={{width: 360}} onClick={handleSubmit}>申请</div>
        </div>
      </div>
  );
};

export default Form.create()(Leave);
