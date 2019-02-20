/**
 * @Description: 园区入驻第一步
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Col, DatePicker, Form, Input, message, Radio, Row} from 'antd';
import {equalResultStatus, getParams, reFormatParams} from "../../../utils";
import {cloneDeep} from 'lodash';
import {parkResidentTeam} from "../../../services/park";
import ImageUpload from "../../../components/FileUpload/ImageUpload";
import ComboBox from "../../../components/ComboBox";
import Const from "../../../utils/Const";


const list1 = [{
  label: '姓名',
  field: 'principalStr'
}, {
  label: '工卡号',
  field: 'studySchool'
}, {
  label: '性别',
  field: 'gendar',
  type: 'radio',
  options: Const.GENDAR_OPTIONS
}, {
  label: '职务',
  field: 'education'
}, {
  label: '籍贯',
  field: 'graduationTime',
  type: 'datepicker'
}, {
  label: '电话',
  field: 'householdRegistration',
}, {
  label: '政治面貌',
  field: 'QQ',
},{
  label: 'QQ/微信',
  field: 'QQ',
}, {
  label: '身份证号',
  field: 'phone',
}, {
  label: '邮箱',
  field: 'QQ',
}];

const list2 = [{
  label: '姓名',
  field: 'QQ',
}, {
  label: '关系',
  field: 'QQ',
}, {
  label: '电话',
  field: 'QQ',
}];

const list3 = [{
  label: '学校',
  field: 'QQ',
}, {
  label: '专业',
  field: 'QQ',
}, {
  label: '毕业时间',
  field: 'QQ',
  type: 'datepicker'
}, {
  label: '学历',
  field: 'QQ',
  type: 'datepicker'
}, {
  label: '户籍地址',
  field: 'QQ',
  type: 'datepicker'
}, {
  label: '常用地址',
  field: 'QQ',
  type: 'datepicker'
}];

class ParkStep3 extends React.Component {
  constructor(props) {
    super(props);
  }


  submit = () => {
    const {form, history, location} = this.props;
    const {validateFields} = form;
    const {membersStr} = this.state;
    validateFields((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        params.rtId = getParams(location.search).rtId;
        parkResidentTeam(params).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('保存成功');
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


  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w bg-white pb80'>
          <div className='bl-form'>
            <div className="form-content">
              <div className='subheading'>身份（成员）</div>
              <Form>
                <Row gutter={138}>
                  {list1.map((item, index) => {
                    var comp = <Input placeholder={`请输入${item.label}`}/>;
                    if (item.type === 'select') {
                      comp = <ComboBox placeholder={`请选择${item.label}`} url={item.url || ''}/>;
                    } else if (item.type === 'datepicker') {
                      comp = <DatePicker placeholder={`请选择${item.label}`}/>;
                    } else if (item.type === 'radio') {
                      comp =
                        (<Radio.Group>
                          {item.options.map((option, oindex) => <Radio key={oindex}
                                                                       value={option.value}>{option.text}</Radio>)}
                        </Radio.Group>)
                    }
                    return (
                      <Col span={12} key={index}>
                        <Form.Item
                          label={item.label}
                        >
                          {getFieldDecorator(`${item.field}`, Const.RULE)(
                            comp
                          )}
                        </Form.Item>
                      </Col>
                    )
                  })}
                </Row>
              </Form>
              <div className="height6line mt17 mb49"/>
              <div className='subheading'>紧急联系人</div>
              <Form>
                <Row gutter={138}>
                  {list2.map((item, index) => {
                      return (
                        <Col span={12} key={index}>
                          <Form.Item
                            label={item.label}
                          >
                            {getFieldDecorator(`${item.field}`, Const.RULE)(
                              <Input placeholder={`请输入${item.label}`}/>
                            )}
                          </Form.Item>
                        </Col>
                      )
                  })}
                </Row>
              </Form>
              <div className="height6line mt17 mb49"/>
              <div className='subheading'>学习经历</div>
              <Form>
                <Row gutter={138}>
                  {list3.map((item, index) => {
                    var comp = <Input placeholder={`请输入${item.label}`}/>;
                    if (item.type === 'select') {
                      comp = <ComboBox placeholder={`请选择${item.label}`} url={item.url || ''}/>;
                    } else if (item.type === 'datepicker') {
                      comp = <DatePicker placeholder={`请选择${item.label}`}/>;
                    } else if (item.type === 'radio') {
                      comp =
                        (<Radio.Group>
                          {item.options.map((option, oindex) => <Radio key={oindex}
                                                                       value={option.value}>{option.text}</Radio>)}
                        </Radio.Group>)
                    }
                    return (
                      <Col span={12} key={index}>
                        <Form.Item
                          label={item.label}
                        >
                          {getFieldDecorator(`${item.field}`, Const.RULE)(
                            comp
                          )}
                        </Form.Item>
                      </Col>
                    )
                  })}
                </Row>
              </Form>
              <div className="height12line mt17 mb49"/>
              <Row gutter={138}>
                <Col span={12}>
                  <Form.Item
                    label='照片'
                    labelCol={{span: 24}}
                    wrapperCol={{span: 6}}
                  >
                    {getFieldDecorator('file', Const.RULE)(
                      <ImageUpload />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='文件上传'
                    labelCol={{span: 24}}
                    wrapperCol={{span: 6}}
                  >
                    {getFieldDecorator('file', Const.RULE)(
                      <ImageUpload />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>提交</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(ParkStep3);
