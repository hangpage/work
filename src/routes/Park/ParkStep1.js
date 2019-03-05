/**
 * @Description: 园区入驻第一步
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Col, DatePicker, Form, Input, message, Radio, Row} from 'antd';
import {equalResultStatus, getParams, reFormatParams} from "../../utils";
import Const from "../../utils/Const";
import ComboBox from "../../components/ComboBox";
import Modal from './component/modal';
import {cloneDeep} from 'lodash';
import {parkResidentTeam} from "../../services/park";

const {TextArea} = Input;


const list1 = [{
  label: '项目名称',
  field: 'projectName'
}, {
  label: '门牌名称',
  field: 'houseNumber'
}, {
  label: '公司名称',
  field: 'companyName'
}, {
  label: '注册时间',
  field: 'registeredTime',
  type: 'datepicker'
}, {
  label: '注册地址',
  field: 'registeredAddress'
}, {
  label: '注册资金（w）',
  field: 'registeredFunds'
}, {
  label: '项目所属行业',
  type: 'select',
  field: 'industry',
  url: '/dict/findType?type=industry'
}, {
  label: '项目所处阶段',
  type: 'select',
  field: 'stage',
  url: '/dict/findType?type=stage'
}, {
  label: '项目是否参加过省级及以上大学生创新创业大赛并获奖',
  type: 'radio',
  field: 'isJudge',
  options: Const.YesOrNoOptions
}];

class ParkStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      grandPrize: [],
      modalItem: {}
    }
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
      modalItem: []
    })
  };


  submit = () => {
    const {form, history, location} = this.props;
    const {validateFields} = form;
    const {grandPrize} = this.state;
    validateFields((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        params.park = getParams(location.search).id;
        params.inType = '1';//直接入驻
        let array = [];
        if(grandPrize.length){
          grandPrize.forEach((item) => {
            array.push(item.match + ',' + item.rate);
          })
        }
        params.grandPrize = array.join(';');
        params.registeredTime = params.registeredTime + ' 00:00:00';
        parkResidentTeam(params).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('保存成功');
            history.push('/park/parkStep2?rtId=' + data.data);
          } else {
            message.error(data.message);
          }
        })
      }
    });
  };

  onCancel = () => {
    this.setState({
      modalVisible: false
    })
  };

  onDel = (e, index) => {
    let grandPrize = cloneDeep(this.state.grandPrize);
    grandPrize.splice(index, 1);
    this.setState({
      grandPrize,
      modalVisible: false
    })
  };

  onEdit = (e, index) => {
    let grandPrize = cloneDeep(this.state.grandPrize);
    this.setState({
      grandPrize,
      modalItem: grandPrize[index],
      modalVisible: true,
      itemKey: index
    })
  };

  onOk = (data) => {
    let grandPrize = cloneDeep(this.state.grandPrize);
    if(data.itemKey >= 0){
      grandPrize[data.itemKey] = data;
    }else{
      grandPrize.push(data);
    }
    this.setState({
      grandPrize,
      modalVisible: false
    })
  };

  render() {
    const modalProps = {
      visible: this.state.modalVisible,
      modalItem: this.state.modalItem,
      itemKey: this.state.itemKey,
      onCancel: this.onCancel,
      onOk: this.onOk
    };
    const {modalVisible, grandPrize} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w mt39 bg-white pb80'>
          <div className='bl-form'>
            <div className='form-title'>填写公司与项目信息</div>
            <div className="form-content">
              <Form>
                <Row gutter={136}>
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
                  <Col span={24}>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label htmlFor="" style={{float: 'left'}}>大赛名称及获奖等级情况</label>
                      <span onClick={this.showModal} className='fr icon-add-box'><i
                        className='icon-add'/><span>添加</span></span>
                    </div>
                    {grandPrize.map((item, index) => {
                      return (
                        <div className='self-add' key={index}>
                          <span className="title">{item.match}</span>
                          <span className="reward">{item.rate}</span>
                          <div className='fr' onClick={(e) => {this.onDel(e, index)}}>
                            <i className="icon-del"/>
                            <span className="edit">删除</span>
                          </div>
                          <i className="split fr"/>
                          <div className='fr' onClick={(e) => {this.onEdit(e, index)}}>
                            <i className="icon-edit"/>
                            <span className="edit">编辑</span>
                          </div>
                        </div>
                      )
                    })}

                  </Col>
                </Row>
                <div className="text-align mt80 mb58">
                  <span className="form-name">专利获取情况</span>
                </div>
                <Row gutter={138}>
                  <Col span={12}>
                    <Form.Item
                      label='申请专利'
                    >
                      {getFieldDecorator('patentNumber', Const.RULE)(
                        <Input placeholder='请输入申请专利数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='申请著作权'
                    >
                      {getFieldDecorator('patentCopyright', Const.RULE)(
                        <Radio.Group>
                          {Const.YesOrNoOptions.map((option, oindex) => <Radio key={oindex}
                                                                               value={option.value}>{option.text}</Radio>)}
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='申请商标'
                    >
                      {getFieldDecorator('patentTrademark', Const.RULE)(
                        <Radio.Group>
                          {Const.YesOrNoOptions.map((option, oindex) => <Radio key={oindex}
                                                                               value={option.value}>{option.text}</Radio>)}
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <div className="text-align mt80 mb58">
                  <span className="form-name">入驻园区人员数量</span>
                </div>
                <Row gutter={138}>
                  <Col span={12}>
                    <Form.Item
                      label='在校生'
                    >
                      {getFieldDecorator('student', Const.RULE)(
                        <Input placeholder='请输入在校生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='毕业生'
                    >
                      {getFieldDecorator('graduate', Const.RULE)(
                        <Input placeholder='请输入毕业生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='全职'
                    >
                      {getFieldDecorator('fullTime', Const.RULE)(
                        <Input placeholder='请输入全职数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='兼职'
                    >
                      {getFieldDecorator('partTime', Const.RULE)(
                        <Input placeholder='请输入兼职数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='总人数'
                    >
                      {getFieldDecorator('peopleCount', Const.RULE)(
                        <Input placeholder='请输入总人数'/>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <div className="text-align mt80 mb58">
                  <span className="form-name">企业人员构成</span>
                </div>
                <Row gutter={138}>
                  <Col span={12}>
                    <Form.Item
                      label='博士生'
                    >
                      {getFieldDecorator('doctor', Const.RULE)(
                        <Input placeholder='请输入博士生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='硕士生'
                    >
                      {getFieldDecorator('master', Const.RULE)(
                        <Input placeholder='请输入硕士生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='本科生'
                    >
                      {getFieldDecorator('bachelor', Const.RULE)(
                        <Input placeholder='请输入本科生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='专科生'
                    >
                      {getFieldDecorator('specialist', Const.RULE)(
                        <Input placeholder='请输入专科生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='总人数'
                    >
                      {getFieldDecorator('count', Const.RULE)(
                        <Input placeholder='请输入总人数'/>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="企业资质"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('qualification',  Const.RULE)(
                    <TextArea placeholder='请输入企业资质...' style={{height: 240}}/>
                  )}
                </Form.Item>
                <Form.Item
                  label="经营范围"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('businnessScope',  Const.RULE)(
                    <TextArea placeholder='请输入经营范围...' style={{height: 240}}/>
                  )}
                </Form.Item>
                <Form.Item
                  label="项目简介"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('projectIntro',  Const.RULE)(
                    <TextArea placeholder='成立时间、主营业务、主要产品和服务用途、特点及研发进度；项目运营情况，营业额及盈利情况，限200字' style={{height: 240}}
                              maxLength={200}/>
                  )}
                </Form.Item>
                <Form.Item
                  label="商业模式"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('businessModel',  Const.RULE)(
                    <TextArea placeholder='包括产品定位、目标群体、盈利模式、商业壁垒、内容资源、渠道资源、技术资源和客户资源等，限200字' style={{height: 240}}
                              maxLength={200}/>
                  )}
                </Form.Item>
                <Form.Item
                  label="入驻需求"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('wants',  Const.RULE)(
                    <TextArea placeholder='申请工位数量、融资、培训等特殊需求说明，限100字' style={{height: 240}} maxLength={100}/>
                  )}
                </Form.Item>
              </Form>
            </div>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>下一步</div>
          </Row>
          {modalVisible && <Modal {...modalProps}/>}
        </div>
      </div>
    );
  }
}

export default Form.create()(ParkStep1);
