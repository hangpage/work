/**
 * @Description: 个人中心团队信息
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Col, DatePicker, Form, Input, message, Radio, Row} from 'antd';
import {equalResultStatus, reFormatParams} from "../../../utils";
import {parkSavePrincipal} from "../../../services/park";
import ComboBox from "../../../components/ComboBox";
import Const from "../../../utils/Const";
import {cloneDeep, isEqual} from "lodash";
import StudyModal from './component/study_experience';
import PrizeModal from './component/prize_situation';
import WorkModal from './component/work_experience';
import moment from "moment";
import {connect} from "dva";


class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m1: false,
      m2: false,
      m3: false,
      data1: [],
      data2: [],
      data3: [],
      modalItem: {},
      currentModal: null
    }
  }

  showModal = (index) => {
    this.setState({
      ['m' + index]: true,
      modalItem: [],
      currentModal: index
    })
  };


  onCancel = () => {
    const {currentModal} = this.state;
    this.setState({
      ['m' + currentModal]: false
    })
  };

  onDel = (e, index, modalIndex) => {
    let membersStr = cloneDeep(this.state['data' + modalIndex]);
    membersStr.splice(index, 1);
    this.setState({
      ['data' + modalIndex]: membersStr,
    })
  };

  onEdit = (index, modalIndex) => {
    let membersStr = cloneDeep(this.state['data' + modalIndex]);
    this.setState({
      modalItem: membersStr[index],
      currentModal: modalIndex,
      ['m' + modalIndex]: true,
      itemKey: index
    })
  };


  componentDidMount() {
    const data = cloneDeep(this.props.leaderAndMemberINfo);
    data.birth = data.birth ? moment(data.birth) : '';
    data.date = data.date ? moment(data.date) : '';
    this.props.form.setFieldsValue(data);
  }


  onOk = (data) => {
    let membersStr = cloneDeep(this.state['data' + this.state.currentModal]);
    const {currentModal} = this.state;
    if (data.itemKey >= 0) {
      membersStr[data.itemKey] = reFormatParams(data);
    } else {
      membersStr.push(reFormatParams(data));
    }
    this.setState({
      ['data' + this.state.currentModal]: membersStr,
      ['m' + currentModal]: false,
    })
  };

  submit = () => {
    const {form} = this.props;
    const {validateFields} = form;
    const {membersStr} = this.state;
    validateFields((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        params.id = this.props.teamInfo.id;
        let array = [];
        if (membersStr.length) {
          membersStr.forEach((item) => {
            array.push(item.name + ',' + item.gendar + ','
              + item.studySchool + ',' + item.studyProfession
              + ',' + item.studyDate+ ',' + item.studyEdu+ ',' + item.phone);
          })
        }
        params.membersStr = array.join(';');
        parkSavePrincipal(params).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('保存成功');
          } else {
            message.error(data.message);
          }
        })
      }
    });
  };

  render() {
    const list1 = [{
      label: '项目名称',
      field: 'projectName',
    }, {
      label: '姓名',
      field: 'name',
    }, {
      label: '性别',
      field: 'gendar',
      options: Const.GENDAR_OPTIONS,
      type: 'radio',
    },{
      label: '出生日期',
      field: 'birth',
      type: 'datepicker',
    }, {
      label: '民族',
      field: 'nationality',
    },{
      label: '婚姻情况',
      field: 'marriage',
      type: 'radio',
      options: Const.HaveOrNot,
    },{
      label: '政治面貌',
      field: 'politicalStatus',
    },{
      label: '籍贯',
      field: 'birthplace',
    },{
      label: '户籍',
      field: 'householdRegistration',
    },{
      label: '留学经历',
      field: 'studyAbroad',
      type: 'radio',
      options: Const.HaveOrNot,
    },{
      label: '身份证号',
      field: 'idCard',
    },{
      label: '曾用名',
      field: 'usedName',
    },{
      label: '最高学历',
      field: 'education',
    },{
      label: '邮箱',
      field: 'email',
    },{
      label: '常用名',
      field: 'commonName',
    },{
      label: '毕业时间',
      field: 'graduationTime',
    },{
      label: 'QQ/微信',
      field: 'QQ',
    },{
      label: '本人电话',
      field: 'phone',
    },{
      label: '紧急联系人',
      field: 'emergencyContact',
    },{
      label: '户籍地址',
      field: 'household_address',
    },{
      label: '在京地址',
      field: 'address',
    }];

    const list2 = [{
      label: '关系',
      field: 'principalStr',
      type: 'radio',
      options: Const.GENDAR_OPTIONS,
    }, {
      label: '姓名',
      field: 'gendar',
    }, {
      label: '工作单位',
      field: 'studySchool',
    }, {
      label: '职务',
      field: 'studyProfession',
    },{
      label: '目前所在地',
      field: 'education',
    }, {
      label: '联系电话',
      field: 'education',
    },{
      label: '关系',
      field: 'principalStr',
      type: 'radio',
      options: Const.GENDAR_OPTIONS,
    }, {
      label: '姓名',
      field: 'gendar',
    }, {
      label: '工作单位',
      field: 'studySchool',
    }, {
      label: '职务',
      field: 'studyProfession',
    },{
      label: '目前所在地',
      field: 'education',
    }, {
      label: '联系电话',
      field: 'education',
    }];

    const modalProps = {
      visible: this.state['m' + this.state.currentModal],
      modalItem: this.state.modalItem,
      itemKey: this.state.itemKey,
      onCancel: this.onCancel,
      onOk: this.onOk
    };
    const {m1, m2, m3, data1, data2, data3} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w bg-white pb80'>
          <div className='bl-form'>
            <div className="form-content">
              <div className='subheading'>身份：负责人</div>
              {m1 && <StudyModal {...modalProps}/>}
              {m2 && <PrizeModal {...modalProps}/>}
              {m3 && <WorkModal {...modalProps}/>}
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
                  <Col span={24}>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label className='subheading'>学习经历</label>
                      <span onClick={(e) => {this.showModal(1)}} className='fr icon-add-box'><i
                        className='icon-add'/><span>添加</span></span>
                    </div>
                    {data1.map((item, index) => {
                      return (
                        <div  key={index}>
                          <div className='self-add'>
                            <span className="item">{item.f1}</span>
                            <span className="item">{item.f2}</span>
                            <span className="item">{item.f3}</span>
                            <span className="item">{item.f4}</span>
                            <span className="item">{item.f5}</span>
                            <div className='fr' onClick={(e) => {
                              this.onDel(e, index, 1)
                            }}>
                              <i className="icon-del"/>
                              <span className="edit">删除</span>
                            </div>
                            <i className="split fr"/>
                            <div className='fr' onClick={(e) => {
                              this.onEdit(index,1)
                            }}>
                              <i className="icon-edit"/>
                              <span className="edit">编辑</span>
                            </div>
                          </div>
                          <div className='self-add'>
                            <span className="item">{item.f1}</span>
                          </div>
                        </div>
                      )
                    })}
                  </Col>
                  <Col span={24}>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label className='subheading'>获奖情况</label>
                      <span onClick={(e) => {this.showModal(2)}} className='fr icon-add-box'><i
                        className='icon-add'/><span>添加</span></span>
                    </div>
                    {data2.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className='self-add'>
                            <span className="item">{item.match}</span>
                            <span className="item">{item.rate}</span>
                            <div className='fr' onClick={(e) => {
                              this.onDel(e, index, 2)
                            }}>
                              <i className="icon-del"/>
                              <span className="edit">删除</span>
                            </div>
                            <i className="split fr"/>
                            <div className='fr' onClick={(e) => {
                              this.onEdit(index, 2)
                            }}>
                              <i className="icon-edit"/>
                              <span className="edit">编辑</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='证明人及电话'
                    >
                      {getFieldDecorator('prove', Const.RULE)(
                        <Input/>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label className='subheading'>工作经历</label>
                      <span onClick={(e) => {this.showModal(3)}} className='fr icon-add-box'><i
                        className='icon-add'/><span>添加</span></span>
                    </div>
                    {data3.map((item, index) => {
                      return (
                        <div  key={index}>
                          <div className='self-add'>
                            <span className="item">{item.f1}</span>
                            <span className="item">{item.f2}</span>
                            <span className="item">{item.f3}</span>
                            <div className='fr' onClick={(e) => {
                              this.onDel(e, index, 3)
                            }}>
                              <i className="icon-del"/>
                              <span className="edit">删除</span>
                            </div>
                            <i className="split fr"/>
                            <div className='fr' onClick={(e) => {
                              this.onEdit(index,3)
                            }}>
                              <i className="icon-edit"/>
                              <span className="edit">编辑</span>
                            </div>
                          </div>
                          <div className='self-add'>
                            <span className="item">主要工作：{item.f1}</span>
                          </div>
                        </div>
                      )
                    })}
                  </Col>
                </Row>
                <div className='subheading'>家庭情况及社会关系</div>
                <Row gutter={138}>
                  {list2.map((item, index) => {
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
                <Form.Item
                  label="社会关系"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('socialRelationship', {
                    rules: [{message: '请输入社会关系'}],
                  })(
                    <Input.TextArea placeholder='请输入社会关系' style={{height: 240}}
                              maxLength={200}/>
                  )}
                </Form.Item>
                <Form.Item
                  label="其他能力说明"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('other', {
                    rules: [{message: '请输入其他能力说明'}],
                  })(
                    <Input.TextArea placeholder='请输入其他能力说明' style={{height: 240}}
                                    maxLength={200}/>
                  )}
                </Form.Item>
                <Form.Item
                  label="创业愿景"
                  labelCol={{span: 12}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('entrepreneurialVision', {
                    rules: [{message: '请输入创业愿景'}],
                  })(
                    <Input.TextArea placeholder='请输入创业愿景' style={{height: 240}}
                                    maxLength={200}/>
                  )}
                </Form.Item>
              </Form>
            </div>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>保存</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(({home}) => (home))(Form.create()(Team));
