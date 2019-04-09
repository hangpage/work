/**
 * @Description: 比赛报名
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/3 12:53
 */
import React from 'react';
import {Col, DatePicker, Form, Input, Radio, Row, Select} from 'antd';
import ComboBox from "../../components/ComboBox";
import Const from "../../utils/Const";
import {checkId, getParams, isEnd, reFormatParams, testId} from "../../utils";
import ImageUpload from "../../components/FileUpload/ImageUpload";
import DynamicFieldSet from "../DynamicFieldSet/DynamicFieldSet";
import moment from "moment";
import {isEqual} from "lodash";
import {NUMBER_VALIDATE, validateNoChinese} from "../../utils/validate";

const {TextArea} = Input;


class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistRequired: false,
      isOnSchoolRequired: false,
      formDisabledStatus: false
    }
  }

  getTeamInfoData = () => {
    const {form} = this.props;
    const {validateFieldsAndScroll} = form;
    let params = {};
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        params = reFormatParams(values);
        params.admissionTime = params.admissionTime + ' 00:00:00';
      }
    });
    return params;
  };

  componentDidMount() {
    const cInfo = sessionStorage.getItem('cInfo');
    if (cInfo) {
      const data = JSON.parse(cInfo);
      data.birth = moment(data.birth);
      data.admissionTime = moment(data.admissionTime);
      this.props.form.setFieldsValue(data);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.teamMatchDetail && !sessionStorage.getItem('cInfo')){
      if(!isEqual(this.props.teamMatchDetail, nextProps.teamMatchDetail)){
        const data = nextProps.teamMatchDetail.team;
        if(data){
          data.birth = moment(data.birth);
          data.admissionTime = moment(data.admissionTime);
          this.props.form.setFieldsValue(data);
        }
      }
    }
    this.setState({
      formDisabledStatus: decodeURIComponent(nextProps.editBtnText) === '查看比赛报名信息'
    })
  }

  handleIsRegistChange = (e) => {
    this.setState({
      isRegistRequired: e.target.value === '1'
    })
  };

  handleIsOnSchoolChange = (e) => {
    if(e){
      this.setState({
        isOnSchoolRequired: !isEnd(e.format('YYYY-MM-DD'))
      })
    }
  };

  render() {
    const {form, matchId = '', initialValueMap = {}} = this.props;
    const {getFieldDecorator} = form;
    const {formDisabledStatus} = this.state;
    return (
      <div>
        <div className="form-content">
          <div className="text-align">
            <span className="form-name">企业信息</span>
          </div>
          <Form>
            <Row gutter={138}>
              <Col span={12}>
                <Form.Item
                  label="公司/团队名称"
                >
                  {getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入公司/团队名称'}],
                    initialValue: initialValueMap.name
                  })(
                    <Input placeholder='请输入公司/团队名称' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="团队人数"
                >
                  {getFieldDecorator('employees', {
                    rules: [{required: true, message: '请输入团队人数'}, NUMBER_VALIDATE],
                    initialValue: initialValueMap.employees
                  })(
                    <Input placeholder='请输入团队人数' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="办公面积(㎡)"
                >
                  {getFieldDecorator('area', {
                    rules: [{required: true, message: '请输入办公面积'}, NUMBER_VALIDATE],
                    initialValue: initialValueMap.area
                  })(
                    <Input placeholder='请输入办公面积' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="近一年流水(w)"
                >
                  {getFieldDecorator('income', {
                    rules: [{required: true, message: '请输入近一年流水'}, NUMBER_VALIDATE],
                    initialValue: initialValueMap.income
                  })(
                    <Input placeholder='请输入近一年流水' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="税收(w)"
                >
                  {getFieldDecorator('tax', {
                    rules: [{required: true, message: '请输入税收金额'}, NUMBER_VALIDATE],
                    initialValue: initialValueMap.tax
                  })(
                    <Input placeholder='请输入税收金额' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="所属行业"
                >
                  {getFieldDecorator('industry', {
                    rules: [{required: true, message: '请选择所属行业'}],
                    initialValue: initialValueMap.industry
                  })(
                    <ComboBox placeholder='请选择所属行业' url='/dict/findType?type=industry' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="办公地址"
                >
                  {getFieldDecorator('address', {
                    rules: [{required: true, message: '请填写办公地址'}],
                    initialValue: initialValueMap.address
                  })(
                    <Input placeholder='请填写办公地址' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="是否注册"
                >
                  {getFieldDecorator('isRegist', {
                    rules: [{required: true, message: '请选择'}],
                    initialValue: initialValueMap.isRegist
                  })(
                    <Radio.Group onChange={this.handleIsRegistChange} disabled={formDisabledStatus}>
                      <Radio value={Const.Yes}>是</Radio>
                      <Radio value={Const.No}>否</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="注册资金(w)"
                >
                  {getFieldDecorator('registeredCapital', {
                    rules: [{required: this.state.isRegistRequired, message: '请填写'}],
                    initialValue: initialValueMap.registeredCapital,
                    getValueFromEvent: (event) => {
                        return event.target.value.replace(/\D/g, '')
                    },
                  })(
                    <Input placeholder='请输入注册资金' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="申请人所占注册资金比例"
                >
                  {getFieldDecorator('proportionOfFunds', {
                    rules: [{required: this.state.isRegistRequired, message: '请填写'}],
                    initialValue: initialValueMap.proportionOfFunds,
                    getValueFromEvent: (event) => {
                      return event.target.value.replace(/\D/g, '')
                    },
                  })(
                    <Input placeholder='请输入所占注册资金比例' addonAfter={'%'} disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="是否位于高校创业园内"
                >
                  {getFieldDecorator('isOnPark', {
                    rules: [{required: true, message: '请选择'}],
                    initialValue: initialValueMap.isOnPark
                  })(
                    <Radio.Group disabled={formDisabledStatus}>
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
                initialValue: initialValueMap.intro
              })(
                <TextArea placeholder='请输入团队简要介绍...' style={{height: 240}} disabled={formDisabledStatus}/>
              )}
            </Form.Item>
            <Form.Item
              label="主营业务"
              labelCol={{span: 12}}
              wrapperCol={{span: 24}}
            >
              {getFieldDecorator('business', {
                rules: [{required: true, message: '请填写'}],
                initialValue: initialValueMap.business
              })(
                <TextArea placeholder='请输入团队主营业务...' style={{height: 240}} disabled={formDisabledStatus}/>
              )}
            </Form.Item>
            <Form.Item
              label="工商注册情况"
              labelCol={{span: 12}}
              wrapperCol={{span: 24}}
            >
              {getFieldDecorator('businessRegistration', {
                rules: [{required: this.state.isRegistRequired, message: '请填写'}],
                initialValue: initialValueMap.businessRegistration
              })(
                <TextArea placeholder='请输入团队工商注册情况...' style={{height: 240}} disabled={formDisabledStatus}/>
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
                    initialValue: initialValueMap.pic
                  })(
                    <ImageUpload disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="姓名"
                >
                  {getFieldDecorator('principal', {
                    rules: [{required: true, message: '请输入姓名'}, {validator: validateNoChinese,}],
                    initialValue: initialValueMap.principal
                  })(
                    <Input placeholder='请输入姓名' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="身份证号"
                >
                  {getFieldDecorator('idCard', {
                    rules: [{required: true, message: '请输入'}, {validator: checkId}],
                    initialValue: initialValueMap.idCard
                  })(
                    <Input placeholder='请输入身份证号' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="户籍地"
                >
                  {getFieldDecorator('householdRegistration', {
                    rules: [{required: true, message: '请输入'}],
                    initialValue: initialValueMap.householdRegistration
                  })(
                    <Input placeholder='请输入户籍所在地' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="学历"
                >
                  {getFieldDecorator('educations', {
                    rules: [{required: true, message: '请选择'}],
                    initialValue: initialValueMap.educations
                  })(
                    <Select placeholder={'请选择学历'} disabled={formDisabledStatus}>
                      {Const.EDUCATION_LIST.map((item, index) => <Select.Option key={index} value={item.value}>{item.value}</Select.Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="专业"
                >
                  {getFieldDecorator('profession', {
                    rules: [{required: true, message: '请选择'}, {validator: validateNoChinese,}],
                    initialValue: initialValueMap.profession
                  })(
                    <Input placeholder='请输入专业' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="报名学校"
                >
                  {getFieldDecorator('matchSchoolId', {
                    rules: [{required: true, message: '请选择'}],
                    initialValue: initialValueMap.matchSchoolId
                  })(
                    <ComboBox nameProp='name' valueProp='id' placeholder='请选择报名学校'
                              url={`/team/findMatchSchool?mId=${matchId}`} disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="最高学历院校"
                >
                  {getFieldDecorator('education', {
                    rules: [{required: true, message: '请选择'}, {validator: validateNoChinese,}],
                    initialValue: initialValueMap.education
                  })(
                    <Input placeholder='请输入最高学历院校' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="请选择最高学历是否为全日制"
                >
                  {getFieldDecorator('isOnSchool', {
                    rules: [{required: true, message: '请选择'}],
                    initialValue: initialValueMap.isOnSchool
                  })(
                    <Radio.Group disabled={formDisabledStatus}>
                      <Radio value={Const.Yes}>是</Radio>
                      <Radio value={Const.No}>否</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="毕业时间"
                >
                  {getFieldDecorator('admissionTime', {
                    rules: [{required: true, message: '请选择'}],
                    initialValue: initialValueMap.admissionTime
                  })(
                    <DatePicker onChange={this.handleIsOnSchoolChange} disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="学生证"
                >
                  {getFieldDecorator('diploma', {
                    rules: [{required: this.state.isOnSchoolRequired, message: '请上传'}],
                    initialValue: initialValueMap.diploma
                  })(
                    <ImageUpload disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="核心成员"
                >
                  {getFieldDecorator('coreMembers', {
                    rules: [{required: true, message: '请添加'}],
                  })(
                    <DynamicFieldSet maxNum={6} name='coreMembers' fieldText='核心团队成员' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="指导教师"
                >
                  {getFieldDecorator('guidanceTeacher', {
                    rules: [{required: true, message: '请添加'}],
                  })(
                    <DynamicFieldSet maxNum={3} name='guidanceTeacher' fieldText='指导教师' disabled={formDisabledStatus}/>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
};

export default Form.create()(CompanyInfo);
