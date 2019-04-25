/**
 * @Description: 比赛报名
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/3 12:53
 */
import React from 'react';
import {Col, DatePicker, Form, Input, message, Radio, Row} from 'antd';
import {deleteQualificationOption, equalResultStatus, reFormatParams} from "../../../utils";
import {cloneDeep, isEqual} from "lodash";
import ComboBox from "../../../components/ComboBox";
import Const from "../../../utils/Const";
import Modal from './component/prize_situation';
import moment from "moment";
import {connect} from "dva";
import {parkResidentTeam} from "../../../services/park";
import ExhibitionModal from "../../Park/component/ExhibitionModal";
import {Select} from "antd";
import ImageUpload from "../../../components/FileUpload/ImageUpload";
import {NUMBER_VALIDATE} from "../../../utils/validate";

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
},{
  label: '流水（w）',
  field: 'flow',
},{
  label: '净利润（w）',
  field: 'profit',
}, {
  label: '缴税额度（w）',
  field: 'tax',
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

const TextArea = Input.TextArea;


class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalVisible2: false,
      grandPrize: [],
      exhibition: [],
      modalItem: {},
      modalItem2: {},
      otherQualificationShow: false
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!isEqual(this.props.teamInfo, nextProps.teamInfo)) {
      const data = cloneDeep(nextProps.teamInfo);
      data.registeredTime = moment(moment(data.registeredTime).format('YYYY-MM-DD'));
      if (data.grandPrize) {
        const array = data.grandPrize.split(';');
        const grandPrize = [];
        array.forEach((item) => {
          const _array = item.split(',');
          if(_array[0]){
            grandPrize.push({
              match: _array[0],
              rate: _array[1],
              level: _array[2],
              date: _array[3],
              price: _array[4],
            })
          }
        });
        data.isJudge = '1';
        this.setState({
          grandPrize,
        })
      } else {
        data.isJudge = '0';
      }
      if(data.exhibition){
        const array1 = data.exhibition.split(';');
        const exhibition = [];
        array1.forEach((item) => {
          const _array = item.split(',');
          if(_array[0]){
            exhibition.push({
              name: _array[0],
              date: _array[1],
            })
          }
        });
        this.setState({
          exhibition
        })
      }
      if(data.qualification){
        data.qualification = data.qualification.split('、');
        const other = cloneDeep(data.qualification);
        deleteQualificationOption(other);
        console.log(other)
        if(other[0]){
          data.otherQualification = other.join('、');
          other.forEach((item) => {
            data.qualification.indexOf(item) && data.qualification.splice(data.qualification.indexOf(item),1);
          });
          this.setState({
            otherQualificationShow: true
          })
        }
      }
      this.props.form.setFieldsValue(data)
    }
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
      modalItem: []
    })
  };

  showModal2 = () => {
    this.setState({
      modalVisible2: true,
      modalItem2: []
    })
  };
  submit = () => {
    const {form} = this.props;
    const {validateFieldsAndScroll} = form;
    const {grandPrize, exhibition} = this.state;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.id = this.props.teamInfo.id;
        params.token = sessionStorage.getItem('token');
        params.registeredTime = params.registeredTime + ' 00:00:00';
        params.qualification.splice(params.qualification.indexOf('其他'), 1);
        if(this.state.otherQualificationShow){
          params.qualification = params.qualification.join('、') + '、' + params.otherQualification;
          delete params.otherQualification;
        }else{
          params.qualification = params.qualification.join('、');
        }
        const array = [];
        const array2 = [];
        if (grandPrize.length) {
          grandPrize.forEach((item) => {
            array.push(item.match + ',' + item.rate + ',' + item.level + ',' + item.date + ',' + item.price);
          })
        }
        if(exhibition.length){
          exhibition.forEach((item) => {
            array2.push(item.name + ',' + item.date);
          })
        }
        params.grandPrize = array.join(';');
        params.exhibition = array2.join(';');
        parkResidentTeam(params).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('保存成功');
          } else {
            message.error(data.message);
          }
        })
      }
    });
  };
  onDel = (e, index) => {
    let grandPrize = cloneDeep(this.state.grandPrize);
    grandPrize.splice(index, 1);
    this.setState({
      grandPrize,
      modalVisible: false
    })
  };

  onDel2 = (e, index) => {
    let exhibition = cloneDeep(this.state.exhibition);
    exhibition.splice(index, 1);
    this.setState({
      exhibition,
      modalVisible2: false
    })
  };

  onQualificationChange = (e) => {
    this.setState({
      otherQualificationShow: e.indexOf('其他') !== -1
    })
  };


  onCancel = () => {
    this.setState({
      modalVisible: false
    })
  };

  onCancel2 = () => {
    this.setState({
      modalVisible2: false
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

  onEdit2 = (e, index) => {
    let exhibition = cloneDeep(this.state.exhibition);
    let item = cloneDeep(exhibition[index]);
    item.date = moment(item.date);
    this.setState({
      exhibition,
      modalItem2: item,
      modalVisible2: true,
      itemKey2: index
    })
  };

  onOk = (data) => {
    let grandPrize = cloneDeep(this.state.grandPrize);
    data.date = data.date.format('YYYY-MM-DD');
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

  onOk2 = (data) => {
    let exhibition = cloneDeep(this.state.exhibition);
    data.date = data.date.format('YYYY-MM-DD');
    if(data.itemKey2 >= 0){
      exhibition[data.itemKey2] = data;
    }else{
      exhibition.push(data);
    }
    this.setState({
      exhibition,
      modalVisible2: false
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
    const modalProps2 = {
      visible: this.state.modalVisible2,
      modalItem: this.state.modalItem2,
      itemKey: this.state.itemKey2,
      onCancel: this.onCancel2,
      onOk: this.onOk2
    };
    const {modalVisible, modalVisible2, grandPrize, exhibition} = this.state;
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
                          {getFieldDecorator(`${item.field}`, {
                            rules: item.validate ? [{required: item.required !== false, message: '必填项'}, item.validate] :
                              [{required: item.required !== false, message: '必填项'}]
                          })(
                            comp
                          )}
                        </Form.Item>
                      </Col>
                    )
                  })}

                  <Col span={12}>
                    <Form.Item
                      label='产品介绍图片'
                      labelCol={{span: 24}}
                      wrapperCol={{span: 24}}
                    >
                      {getFieldDecorator('productIntro', Const.RULE)(
                        <ImageUpload max={5}/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="产品介绍文字描述"
                      labelCol={{span: 24}}
                      wrapperCol={{span: 24}}
                    >
                      {getFieldDecorator('productText', Const.RULE)(
                        <TextArea placeholder='请输入产品介绍..' style={{height: 240}}/>
                      )}
                    </Form.Item>
                  </Col>
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
                          <span className="reward">{item.level}</span>
                          <span className="reward">{item.date}</span>
                          <span className="reward">{item.price}</span>
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
                  <Col span={24}>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label htmlFor="" style={{float: 'left'}}>参加展会名称及时间</label>
                      <span onClick={this.showModal2} className='fr icon-add-box'><i
                        className='icon-add'/><span>添加</span></span>
                    </div>
                    {exhibition.map((item, index) => {
                      return (
                        <div className='self-add' key={index}>
                          <span className="title">{item.name}</span>
                          <span className="reward">{item.date}</span>
                          <div className='fr' onClick={(e) => {this.onDel2(e, index)}}>
                            <i className="icon-del"/>
                            <span className="edit">删除</span>
                          </div>
                          <i className="split fr"/>
                          <div className='fr' onClick={(e) => {this.onEdit2(e, index)}}>
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
                      {getFieldDecorator('patentNumber', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
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
                      {getFieldDecorator('student', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
                        <Input placeholder='请输入在校生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='毕业生'
                    >
                      {getFieldDecorator('graduate', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
                        <Input placeholder='请输入毕业生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='全职'
                    >
                      {getFieldDecorator('fullTime', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
                        <Input placeholder='请输入全职数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='兼职'
                    >
                      {getFieldDecorator('partTime', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
                        <Input placeholder='请输入兼职数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='总人数'
                    >
                      {getFieldDecorator('peopleCount', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
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
                      {getFieldDecorator('doctor', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
                        <Input placeholder='请输入博士生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='硕士生'
                    >
                      {getFieldDecorator('master', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
                        <Input placeholder='请输入硕士生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='本科生'
                    >
                      {getFieldDecorator('bachelor', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
                        <Input placeholder='请输入本科生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='专科生'
                    >
                      {getFieldDecorator('specialist', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
                        <Input placeholder='请输入专科生数量'/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='总人数'
                    >
                      {getFieldDecorator('count', {
                        rules: [{required: true, message: '必填项'}, NUMBER_VALIDATE],
                      })(
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
                    <Select placeholder={'请填写企业资质'} onChange={this.onQualificationChange} mode="multiple">
                      {Const.QUALIFICATION_LIST.map((item, index) => <Select.Option key={index} value={item.value}>{item.value}</Select.Option>)}
                    </Select>
                  )}
                  {getFieldDecorator('otherQualification')(
                    <Input placeholder={'按顿号分割填写其他企业资质'} className={'mt10'} style={{display: this.state.otherQualificationShow ? 'block' : 'none'}}/>
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
            <div className='main-button' onClick={this.submit} style={{width: 600}}>保存</div>
          </Row>
          {modalVisible && <Modal {...modalProps}/>}
          {modalVisible2 && <ExhibitionModal {...modalProps2}/>}
        </div>
      </div>
    );
  }
};

export default connect(({home}) => (home))(Form.create()(CompanyInfo));
