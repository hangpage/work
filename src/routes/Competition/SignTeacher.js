/**
 * @Description: 报名导师
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/3 12:53
 */
import React from 'react';
import {Col, Form, Input, message, Radio, Row} from 'antd';
import BackButton from "../../components/BackButton/BackButton";
import ComboBox from "../../components/ComboBox";
import Const from "../../utils/Const";
import {equalResultStatus, getParams, reFormatParams} from "../../utils";
import {tutorDeclare} from "../../services/tutor";
import ImageUpload from "../../components/FileUpload/ImageUpload";
import {isEqual} from "lodash";
import {connect} from "dva";
import {MOBILE_VALIDATE} from "../../utils/validate";

const {TextArea} = Input;

class SignTeacher extends React.Component{
  constructor(props){
    super(props);
  }
  submit = () => {
    const {form, history} = this.props;
    const {validateFieldsAndScroll} = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        if(this.props.teamMatchDetail.tutor){
          params.id = this.props.teamMatchDetail.tutor.id;
        }
        let formData = new FormData();
        Object.keys(params).forEach((item) => {
          formData.append(item, params[item]);
        });
        tutorDeclare(formData).then(({data}) => {
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

  componentWillReceiveProps(nextProps, nextContext) {
    if(!isEqual(this.props.tutorData, nextProps.tutorData)){
      const data = nextProps.tutorData;
      this.props.form.setFieldsValue(data);
    }
  }

  render() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w mt39 bg-white pb80'>
          <div className='bl-form'>
            <div className='form-title'>成为导师</div>
            <div className="form-content">
              <Form>
                <Form.Item
                  label="照片"
                  labelCol={{span: 24}}
                  wrapperCol={{span: 6}}
                >
                  {getFieldDecorator('pic', {
                    rules: [{required: true, message: '必填项'}],
                  })(
                    <ImageUpload/>
                  )}
                </Form.Item>
                <Row gutter={138}>
                  <Col span={12}>
                    <Form.Item
                      label="姓名"
                    >
                      {getFieldDecorator('name', {
                        rules: [{required: true, message: '必填项'}, {min: 2, max: 20, message: '2-20个汉字'}],
                      })(
                        <Input placeholder='请输入姓名'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="性别"
                    >
                      {getFieldDecorator('gendar', {
                        rules: [{required: true, message: '必填项'}],
                      })(
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
                      label="教育背景(专业)"
                    >
                      {getFieldDecorator('profession', {
                        rules: [{required: true, message: '必填项'}],
                      })(
                        <Input placeholder='请选择教育背景'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="学历"
                    >
                      {getFieldDecorator('educationalBackground', {
                        rules: [{required: true, message: '必填项'}, {min: 2, max: 20, message: '2-20个汉字'}],
                      })(
                        <Input placeholder='请填写学历'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="最高学历院校"
                    >
                      {getFieldDecorator('school', {
                        rules: [{required: true, message: '必填项'}],
                      })(
                        <Input placeholder='请输入最高学历院校'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="职称"
                    >
                      {getFieldDecorator('jobTitle', {
                        rules: [{required: true, message: '必填项'}],
                      })(
                        <Input placeholder='请输入职称'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="职业资格(用英文逗号分割)"
                    >
                      {getFieldDecorator('professional', {
                        rules: [{required: true, message: '必填项'}],
                      })(
                        <Input placeholder='请输入职业资格(用英文逗号分割)'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="现在任职单位"
                    >
                      {getFieldDecorator('unit', {
                        rules: [{required: true, message: '必填项'}, {min: 2, max: 50, message: '2-50个汉字'}],
                      })(
                        <Input placeholder='请输入现在任职单位'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="擅长领域"
                    >
                      {getFieldDecorator('industry', {
                        rules: [{required: true, message: '必填项'}],
                      })(
                        <ComboBox placeholder='请选择擅长领域' url='/dict/findType?type=industry'/>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="主要经历"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('experience', {
                    rules: [{required: true, message: '必填项'}],
                  })(
                    <TextArea placeholder='请输入主要经历...' style={{height: 240}}/>
                  )}
                </Form.Item>
              </Form>
            </div>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <BackButton text='取消'/>
            <div className='main-button' onClick={this.submit}>确认</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(({competition}) => competition)(Form.create()(SignTeacher));
