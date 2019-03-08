/**
 * @Description: 个人中心团队信息
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Col, DatePicker, Form, Input, message, Radio, Row} from 'antd';
import {equalResultStatus, reFormatParams} from "../../../utils";
import {parkSavePrincipal, saveStudyExperience, saveWorkExperience} from "../../../services/park";
import ComboBox from "../../../components/ComboBox";
import Const from "../../../utils/Const";
import {cloneDeep, isEqual} from "lodash";
import StudyModal from './component/study_experience';
import PrizeModal from './component/prize_situation';
import WorkModal from './component/work_experience';
import moment from "moment";
import {connect} from "dva";
import ImageUpload from "../../../components/FileUpload/ImageUpload";


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
  type: 'datepicker'
},{
  label: 'QQ/微信',
  field: 'qq',
},{
  label: '本人电话',
  field: 'phone',
},{
  label: '紧急联系人',
  field: 'emergencyContact',
},{
  label: '户籍地址',
  field: 'householdAddress',
},{
  label: '在京地址',
  field: 'address',
}];

const list2 = [{
  label: '关系',
  field: 'f2',
  type: 'radio',
  options: Const.FATHER_RELATION,
}, {
  label: '姓名',
  field: 'f1',
}, {
  label: '工作单位',
  field: 'f3',
}, {
  label: '职务',
  field: 'f4',
},{
  label: '目前所在地',
  field: 'f5',
}, {
  label: '联系电话',
  field: 'f6',
},{
  label: '关系',
  field: 'm2',
  type: 'radio',
  options: Const.MOTHER_RELATION,
}, {
  label: '姓名',
  field: 'm1',
}, {
  label: '工作单位',
  field: 'm3',
}, {
  label: '职务',
  field: 'm4',
},{
  label: '目前所在地',
  field: 'm5',
}, {
  label: '联系电话',
  field: 'm6',
}];


class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m1: false,
      m2: false,
      m3: false,
      prize: [],
      studyExperience: [],
      workExperience: [],
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
    let current = {};
    if(modalIndex === 1){
      current = cloneDeep(this.state.studyExperience);
    }else if(modalIndex === 2){
      current = cloneDeep(this.state.prize);
    }else{
      current = cloneDeep(this.state.workExperience);
    }
    current.splice(index, 1);
    if(modalIndex === 1){
      this.setState({
        studyExperience: current,
      });
    }else if(modalIndex === 2){
      this.setState({
        prize: current,
      });
    }else{
      this.setState({
        workExperience: current,
      });
    }

  };

  onEdit = (index, modalIndex) => {
    let current = {};
    if(modalIndex === 1){
      current = cloneDeep(this.state.studyExperience);
    }else if(modalIndex === 2){
      current = cloneDeep(this.state.prize);
    }else{
      current = cloneDeep(this.state.workExperience);
    }
    this.setState({
      modalItem: current[index],
      currentModal: modalIndex,
      ['m' + modalIndex]: true,
      itemKey: index
    })
  };


  componentDidMount() {
    const data = cloneDeep(this.props.leaderAndMemberInfo);
    if(data.familySituation){
      const stringArray = data.familySituation.split(';');
      stringArray[0] && stringArray[0].split(',').forEach((item, index) => {
        data['f' + (index + 1)] = item;
      });
      stringArray[1] && stringArray[0].split(',').forEach((item, index) => {
        data['m' + (index + 1)] = item;
      });
    }
    data.birth = data.birth ? moment(data.birth) : '';
    data.graduationTime = data.graduationTime ? moment(data.graduationTime) : '';
    data.date = data.date ? moment(data.date) : '';
    data.projectName = this.props.teamInfo.projectName;
    this.props.form.setFieldsValue(data);
    this.setState({
      studyExperience: data.study || [],
      workExperience: data.work || []
    })
  }


  onOk = (data) => {
    const params = cloneDeep(data);
    if(this.state.currentModal === 1){
      const studyExperience = cloneDeep(this.state.studyExperience);
      params.date = moment(params.date[0]).format('YYYY-MM-DD') + '~' + moment(params.date[1]).format('YYYY-MM-DD');
      if(data.itemKey >= 0){
        studyExperience[data.itemKey] = params;
      }else{
        studyExperience.push(params);
      }
      this.setState({
        studyExperience,
        m1: false,
        itemKey: undefined
      })
    }else if(this.state.currentModal === 2){
      const prize = cloneDeep(this.state.prize);
      if(data.itemKey >= 0){
        prize[data.itemKey] = params;
      }else{
        prize.push(params);
      }
      this.setState({
        prize,
        m2: false,
        itemKey: undefined
      });
    }
    else if(this.state.currentModal === 3){
      const workExperience = cloneDeep(this.state.workExperience);
      params.date = moment(params.date[0]).format('YYYY-MM-DD') + '~' + moment(params.date[1]).format('YYYY-MM-DD');
      if(data.itemKey >= 0){
        workExperience[data.itemKey] = params;
      }else{
        workExperience.push(params);
      }
      this.setState({
        workExperience,
        m3: false,
        itemKey: undefined
      })
    }
  };

  saveStudyExperience =() => {
    const study = {};
    study.experiences = this.state.studyExperience;
    study.token = sessionStorage.getItem('token');
    study.id = this.props.leaderAndMemberInfo.id;
    saveStudyExperience(JSON.stringify(study)).then(({data}) => {
      if(equalResultStatus(data)){

      }else{
        message.error(data.message);
      }
    });
  };

  saveWorkExperience =() => {
    const work = {};
    work.experiences = this.state.workExperience;
    work.token = sessionStorage.getItem('token');
    work.id = this.props.leaderAndMemberInfo.id;
    saveWorkExperience(JSON.stringify(work)).then(({data}) => {
        if(equalResultStatus(data)){

        }else{
          message.error(data.message);
        }
    });
  };

  submit = () => {
    const {form} = this.props;
    const {validateFields} = form;
    const {prize} = this.state;
    this.saveStudyExperience();
    this.saveWorkExperience();
    validateFields((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        params.id = this.props.leaderAndMemberInfo.id;
        const fArray = [params.f1, params.f2, params.f3, params.f4, params.f5, params.f6];
        const mArray = [params.m1, params.m2, params.m3, params.m4, params.m5, params.m6];
        params.familySituation = fArray.join(',') + ';' + mArray.join(',');
        params.graduationTime = params.graduationTime + ' 00:00:00';
        params.birth = params.birth + ' 00:00:00';
        let array = [];
        if(prize.length){
          prize.forEach((item) => {
            array.push(item.match + ',' + item.rate);
          })
        }
        params.prize = array.join(';');
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
    const modalProps = {
      visible: this.state['m' + this.state.currentModal],
      modalItem: this.state.modalItem,
      itemKey: this.state.itemKey,
      onCancel: this.onCancel,
      onOk: this.onOk
    };
    const {m1, m2, m3, workExperience, studyExperience, prize} = this.state;
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
                  <Col span={24} className='mb60'>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label className='subheading' style={{color: '#333', fontWeight: 'normal', background: 'none'}}>学习经历</label>
                      <span onClick={(e) => {this.showModal(1)}} className='fr icon-add-box'><i
                        className='icon-add'/><span>添加</span></span>
                    </div>
                    {studyExperience.map((item, index) => {
                      return (
                        <div  key={index}>
                          <div className='self-add'>
                            <span className="item">{item.state}</span>
                            <span className="item">{item.date}</span>
                            <span className="item">{item.school}</span>
                            <span className="item">{item.profession}</span>
                            <span className="item">{item.education}</span>
                            <span className="item">{item.learningForm}</span>
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
                            <span className="item">证明人及电话：{item.witness}</span>
                          </div>
                        </div>
                      )
                    })}
                  </Col>
                  <Col span={24} className='mb60'>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label className='subheading' style={{color: '#333', fontWeight: 'normal', background: 'none'}}>获奖情况</label>
                      <span onClick={(e) => {this.showModal(2)}} className='fr icon-add-box'><i
                        className='icon-add'/><span>添加</span></span>
                    </div>
                    {prize.map((item, index) => {
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
                  <Col span={24} className='mb60'>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label className='subheading' style={{color: '#333', fontWeight: 'normal', background: 'none'}}>工作经历</label>
                      <span onClick={(e) => {this.showModal(3)}} className='fr icon-add-box'><i
                        className='icon-add'/><span>添加</span></span>
                    </div>
                    {workExperience.map((item, index) => {
                      return (
                        <div  key={index}>
                          <div className='self-add'>
                            <span className="item">{item.date}</span>
                            <span className="item">{item.unit}</span>
                            <span className="item">{item.position}</span>
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
                            <span className="item">主要工作：{item.content}</span>
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
                    rules: [{required: true, message: '请输入社会关系'}],
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
                    rules: [{required: true, message: '请输入其他能力说明'}],
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
                    rules: [{required: true, message: '请输入创业愿景'}],
                  })(
                    <Input.TextArea placeholder='请输入创业愿景' style={{height: 240}}
                                    maxLength={200}/>
                  )}
                </Form.Item>
              </Form>
                <Form.Item
                  label='照片(一张)'
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('pic', {
                    rules: [{required: true, message: '请上传'}],
                  })(
                    <ImageUpload />
                  )}
                </Form.Item>
                <Form.Item
                  label='照片(学位/学历/学生证，可上传三张)'
                  labelCol={{span: 24}}
                  wrapperCol={{span: 24}}
                >
                  {getFieldDecorator('file', {
                    rules: [{required: true, message: '请上传'}],
                  })(
                    <ImageUpload max={3}/>
                  )}
                </Form.Item>
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
