/**
 * @Description: 比赛报名
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
import {insertTeam} from "../../services/competition";

const {TextArea} = Input;


const TeamInfoWrite = ({form, history, location}) => {
  const {getFieldDecorator, validateFields} = form;
  const submit = () => {
    validateFields((err, values) => {
      if (!err) {
        let params = values;
        params.token = sessionStorage.getItem('token');
        params.mId = getParams(location.search).mId;
        insertTeam(reFormatParams(values)).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success(data.message);
            history.push({
              pathname: '/project_info_write?mId=' + params.mId,
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
              <Row gutter={138}>
                <Col span={12}>
                  <Form.Item
                    label="公司名称"
                  >
                    {getFieldDecorator('name', {
                      rules: [{message: '请输入公司名称'}],
                    })(
                      <Input placeholder='请输入公司名称'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="职工人数"
                  >
                    {getFieldDecorator('employees', {
                      rules: [{message: '请输入职工人数'}],
                    })(
                      <Input placeholder='请输入职工人数'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="办公面积(㎡)"
                  >
                    {getFieldDecorator('area', {
                      rules: [{message: '请输入办公面积'}],
                    })(
                      <Input placeholder='请输入办公面积'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="年收入(w)"
                  >
                    {getFieldDecorator('income', {
                      rules: [{message: '请输入年收入'}],
                    })(
                      <Input placeholder='请输入年收入'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="税收(w)"
                  >
                    {getFieldDecorator('tax', {
                      rules: [{message: '请输入税收金额'}],
                    })(
                      <Input placeholder='请输入税收金额'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="所属行业"
                  >
                    {getFieldDecorator('industry')(
                      <ComboBox placeholder='请选择所属行业' url='/dict/findType?type=industry'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="地址"
                  >
                    {getFieldDecorator('address')(
                      <ComboBox placeholder='请选择地址' url='/dict/findType?type=industry'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="注册资金(w)"
                  >
                    {getFieldDecorator('registeredCapital')(
                      <Input placeholder='请输入注册资金'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="申请人所占注册资金比例"
                  >
                    {getFieldDecorator('proportionOfFunds')(
                      <Input placeholder='请输入所占注册资金比例'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="是否位于高校创业园内"
                  >
                    {getFieldDecorator('isOnPark')(
                      <Radio.Group>
                        <Radio value={Const.Yes}>是</Radio>
                        <Radio value={Const.No}>否</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="团队介绍"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('intro',)(
                  <TextArea placeholder='请输入团队简要介绍...' style={{height: 240}}/>
                )}
              </Form.Item>
              <Form.Item
                label="主营业务"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('business')(
                  <TextArea placeholder='请输入团队主营业务...' style={{height: 240}}/>
                )}
              </Form.Item>
              <Form.Item
                label="工商注册情况"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('businessRegistration')(
                  <TextArea placeholder='请输入团队工商注册情况...' style={{height: 240}}/>
                )}
              </Form.Item>
              <div className="text-align">
                <span className="form-name">负责人信息</span>
              </div>
              <Form.Item
                label="照片"
                labelCol={{span: 12}}
                wrapperCol={{span: 6}}
              >
                {getFieldDecorator('pic')(
                  <Upload.Dragger name="pic">
                    <p className="ant-upload-drag-icon">
                      <Icon type="camera"/>
                    </p>
                    <p className="ant-upload-text">点击上传图片</p>
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
                    label="出生年月"
                  >
                    {getFieldDecorator('birth')(
                      <DatePicker/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="身份证号"
                  >
                    {getFieldDecorator('idCard')(
                      <Input placeholder='请输入身份证号'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="户籍地"
                  >
                    {getFieldDecorator('householdRegistration')(
                      <Input placeholder='请输入户籍所在地'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="学历"
                  >
                    {getFieldDecorator('educations')(
                      <Input placeholder='请输入学历'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="专业"
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
                    {getFieldDecorator('education')(
                      <ComboBox placeholder='请选择最高学历院校' url='/dict/findType?type=education'/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="是否在校生"
                  >
                    {getFieldDecorator('isOnSchool')(
                      <Radio.Group>
                        <Radio value={Const.Yes}>是</Radio>
                        <Radio value={Const.No}>否</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="入学时间"
                  >
                    {getFieldDecorator('admissionTime')(
                      <DatePicker/>
                    )}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="学生证或身份证"
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
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <Row type='flex' justify='space-around' gutter={360}>
          <BackButton text='取消'/>
          <div className='main-button' onClick={submit}>下一步</div>
        </Row>
      </div>
    </div>
  );
};

export default Form.create()(TeamInfoWrite);
