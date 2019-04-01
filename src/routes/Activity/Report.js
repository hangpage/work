/**
 * @Description: 报名活动
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/3 12:53
 */
import React from 'react';
import {Col, Form, Input, message, Radio, Row} from 'antd';
import BackButton from "../../components/BackButton/BackButton";
import Const from "../../utils/Const";
import {equalResultStatus, getParams, reFormatParams} from "../../utils";
import {activitySign} from "../../services/activity";
import {MOBILE_VALIDATE, validateNoChinese} from "../../utils/validate";


const TeamInfoWrite = ({form, history, location}) => {
  const {getFieldDecorator, validateFieldsAndScroll} = form;
  const submit = () => {
    if(!JSON.parse(sessionStorage.getItem('user')).name){
      return message.error('请先去个人中心完善您的信息！')
    }
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = values;
        params.token = sessionStorage.getItem('token');
        params.activity = getParams(location.search).id;
        activitySign(reFormatParams(values)).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('报名成功');
            history.push({
              pathname: '/index',
            });
          } else {
            message.error(data.message);
          }
        })
      }
    });
  };

  return (
    <div style={{background: '#FAFAFA', paddingBottom: 60}}>
      <div className='w mt39 bg-white pb80'>
        <div className='bl-form'>
          <div className='form-title'>报名</div>
          <div className="form-content">
            <Form>
              <Row gutter={138}>
                <Col span={12}>
                  <Form.Item
                    label="姓名"
                  >
                    {getFieldDecorator('name', {
                      rules: [{required: true, message: '必填项'},{validator: validateNoChinese}],
                    })(
                      <Input placeholder='请输入姓名'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="性别"
                  >
                    {getFieldDecorator('gendar', Const.RULE)(
                      <Radio.Group>
                        <Radio value={Const.Man}>男</Radio>
                        <Radio value={Const.Woman}>女</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="手机"
                  >
                    {getFieldDecorator('phone', {
                      rules: [{required: true, message: '必填项'}, MOBILE_VALIDATE],
                    })(
                      <Input placeholder='请输入手机号码'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="来源高校"
                  >
                    {getFieldDecorator('school', {
                      rules: [{required: true, message: '必填项'},{validator: validateNoChinese}],
                    })(
                      <Input placeholder='请填写学校'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="团队名称"
                  >
                    {getFieldDecorator('companyName', {
                      rules: [{required: true, message: '必填项'},{validator: validateNoChinese}],
                    })(
                      <Input placeholder='请输入团队名称'/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <Row type='flex' justify='space-around' gutter={360}>
          <BackButton text='取消'/>
          <div className='main-button' onClick={submit}>确认</div>
        </Row>
      </div>
    </div>
  );
};

export default Form.create()(TeamInfoWrite);
