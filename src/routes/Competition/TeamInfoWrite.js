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
import {equalResultStatus, getParams, reFormatParams} from "../../utils";
import {insertTeam} from "../../services/competition";
import ImageUpload from "../../components/FileUpload/ImageUpload";

const {TextArea} = Input;


class TeamInfoWrite extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      diploma: [],
      pic: []
    }
  }
  submit = () => {
    const {form, history, location} = this.props;
    const {validateFields} = form;
    validateFields((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        params.mId = getParams(location.search).mId;
        let formData = new FormData();
        Object.keys(params).forEach((item) => {
          formData.append(item, params[item]);
        });
        insertTeam(formData).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('保存成功');
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
  render() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
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
                        rules: [{required: true, message: '请输入公司名称'}],
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
                        rules: [{required: true, message: '请输入职工人数'}],
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
                        rules: [{required: true, message: '请输入办公面积'}],
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
                        rules: [{required: true, message: '请输入年收入'}],
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
                        rules: [{required: true, message: '请输入税收金额'}],
                      })(
                        <Input placeholder='请输入税收金额'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="所属行业"
                    >
                      {getFieldDecorator('industry', {
                        rules: [{required: true, message: '请选择所属行业'}],
                      })(
                        <ComboBox placeholder='请选择所属行业' url='/dict/findType?type=industry'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="地址"
                    >
                      {getFieldDecorator('address', {
                        rules: [{required: true, message: '请填写地址'}],
                      })(
                        <Input placeholder='请填写地址' />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="注册资金(w)"
                    >
                      {getFieldDecorator('registeredCapital', {
                        rules: [{required: true, message: '请填写'}],
                      })(
                        <Input placeholder='请输入注册资金'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="申请人所占注册资金比例"
                    >
                      {getFieldDecorator('proportionOfFunds', {
                        rules: [{required: true, message: '请填写'}],
                      })(
                        <Input placeholder='请输入所占注册资金比例'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="是否位于高校创业园内"
                    >
                      {getFieldDecorator('isOnPark', {
                        rules: [{required: true, message: '请选择'}],
                      })(
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
                  {getFieldDecorator('intro', {
                    rules: [{required: true, message: '请填写'}],
                  })(
                    <TextArea placeholder='请输入团队简要介绍...' style={{height: 240}}/>
                  )}
                </Form.Item>
                <Form.Item
                  label="主营业务"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('business', {
                    rules: [{required: true, message: '请填写'}],
                  })(
                    <TextArea placeholder='请输入团队主营业务...' style={{height: 240}}/>
                  )}
                </Form.Item>
                <Form.Item
                  label="工商注册情况"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('businessRegistration', {
                    rules: [{required: true, message: '请填写'}],
                  })(
                    <TextArea placeholder='请输入团队工商注册情况...' style={{height: 240}}/>
                  )}
                </Form.Item>
                <div className="text-align">
                  <span className="form-name">负责人信息</span>
                </div>
                <Row gutter={138}>
                  <Col span={24}>
                    <Form.Item
                      label="照片"
                      labelCol={{span: 24}}
                      wrapperCol={{span: 6}}
                    >
                      {getFieldDecorator('pic', {
                        rules: [{required: true, message: '请上传照片'}],
                      })(
                        <ImageUpload />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="姓名"
                    >
                      {getFieldDecorator('principal', {
                        rules: [{required: true, message: '请输入姓名'}],
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
                        rules: [{required: true, message: '请选择'}],
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
                      label="出生年月"
                    >
                      {getFieldDecorator('birth', {
                        rules: [{required: true, message: '请选择'}],
                      })(
                        <DatePicker/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="身份证号"
                    >
                      {getFieldDecorator('idCard', {
                        rules: [{required: true, message: '请输入'}],
                      })(
                        <Input placeholder='请输入身份证号'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="户籍地"
                    >
                      {getFieldDecorator('householdRegistration', {
                        rules: [{required: true, message: '请输入'}],
                      })(
                        <Input placeholder='请输入户籍所在地'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="学历"
                    >
                      {getFieldDecorator('educations', {
                        rules: [{required: true, message: '请输入'}],
                      })(
                        <Input placeholder='请输入学历'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="专业"
                    >
                      {getFieldDecorator('profession', {
                        rules: [{required: true, message: '请选择'}],
                      })(
                        <ComboBox placeholder='请选择所学专业' url='/dict/findType?type=profession'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="最高学历院校"
                    >
                      {getFieldDecorator('education', {
                        rules: [{required: true, message: '请选择'}],
                      })(
                        <Input placeholder='请输入最高学历院校'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="是否在校生"
                    >
                      {getFieldDecorator('isOnSchool', {
                        rules: [{required: true, message: '请选择'}],
                      })(
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
                      {getFieldDecorator('admissionTime', {
                        rules: [{required: true, message: '请选择'}],
                      })(
                        <DatePicker/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="学生证或身份证"
                    >
                      {getFieldDecorator('diploma', {
                        rules: [{required: true, message: '请上传'}],
                      })(
                        <ImageUpload />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <BackButton text='取消'/>
            <div className='main-button' onClick={this.submit}>下一步</div>
          </Row>
        </div>
      </div>
    );
  }
};

export default Form.create()(TeamInfoWrite);
