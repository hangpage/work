/**
 * @Description: 报名导师
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/3 12:53
 */
import React from 'react';
import {
  Form, Input, Button,
  Upload, Row, Col, Radio, DatePicker, message
} from 'antd';
import BackButton from "../../components/BackButton/BackButton";
import ComboBox from "../../components/ComboBox";
import Const from "../../utils/Const";
import Icon from "antd/es/icon";
import {equalResultStatus, getParams, reFormatParams} from "../../utils";
import {tutorDeclare} from "../../services/tutor";

const {TextArea} = Input;


const TeamInfoWrite = ({form, history, location}) => {
  const {getFieldDecorator, validateFields} = form;
  const submit = () => {
    validateFields((err, values) => {
      if (!err) {
        let params = values;
        params.token = sessionStorage.getItem('token');
        params.mId = getParams(location.search).mId;
        tutorDeclare(reFormatParams(values)).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success(data.message);
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
            <div className="text-align">
              <span className="form-name">公司信息</span>
            </div>
            <Form>
              <Form.Item
                label="学生证或身份证"
                labelCol={{span: 12}}
                wrapperCol={{span: 6}}
              >
                {getFieldDecorator('diploma')(
                  <Upload.Dragger name="diploma">
                    <p className="ant-upload-drag-icon">
                      <Icon type="camera"/>
                    </p>
                    <p className="ant-upload-text">点击上传</p>
                  </Upload.Dragger>
                )}
              </Form.Item>
              <Row gutter={138}>
                <Col span={12}>
                  <Form.Item
                    label="姓名"
                  >
                    {getFieldDecorator('principal')(
                      <Input placeholder='请输入姓名'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="性别"
                  >
                    {getFieldDecorator('gendar')(
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
                    {getFieldDecorator('phone')(
                      <Input placeholder='请输入手机号码'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="教育背景(专业)"
                  >
                    {getFieldDecorator('profession')(
                      <ComboBox placeholder='请选择所学专业' url='/dict/findType?type=profession'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="最高学历院校"
                  >
                    {getFieldDecorator('educations')(
                      <Input placeholder='请输入最高学历院校'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="职称"
                  >
                    {getFieldDecorator('jobTitle')(
                      <Input placeholder='请输入职称'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="职业资格"
                  >
                    {getFieldDecorator('professional')(
                      <Input placeholder='请输入职业资格'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="现在任职单位"
                  >
                    {getFieldDecorator('education')(
                      <ComboBox placeholder='请输入现在任职单位' url='/dict/findType?type=education'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="学校"
                  >
                    {getFieldDecorator('professional')(
                      <ComboBox placeholder='请选择学校' url='/dict/findType?type=school'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="行业"
                  >
                    {getFieldDecorator('professional')(
                      <ComboBox placeholder='请选择行业' url='/dict/findType?type=industry'/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="主要经历"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('financing', {
                  rules: [{message: '请输入主要经历...'}],
                })(
                  <TextArea placeholder='请输入主要经历...' style={{height: 240}}/>
                )}
              </Form.Item>
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
