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
import Modal from './component/step3Modal';
import {cloneDeep} from 'lodash';
import {parkResidentTeam} from "../../services/park";
import ImageUpload from "../../components/FileUpload/ImageUpload";


const list1 = [{
  label: '姓名',
  field: 'principalStr'
}, {
  label: '性别',
  field: 'gendar',
  type: 'radio',
  options: Const.GENDAR_OPTIONS
}, {
  label: '学校',
  field: 'studySchool'
}, {
  label: '专业',
  field: 'studyProfession'
}, {
  label: '学历',
  field: 'education'
}, {
  label: '毕业时间',
  field: 'graduationTime',
  type: 'datepicker'
}, {
  label: '生源地',
  field: 'householdRegistration',
}, {
  label: '政治面貌',
  field: 'politicalStatus',
}, {
  label: '联系电话',
  field: 'phone',
}, {
  label: '微信',
  field: 'QQ',
}, {
  label: 'QQ',
  field: 'QQ',
}, {
  label: '邮箱',
  field: 'email',
},];

class ParkStep3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      membersStr: [],
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
    const {membersStr} = this.state;
    validateFields((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        params.rtId = getParams(location.search).rtId;
        let array = [];
        if (membersStr.length) {
          membersStr.forEach((item) => {
            array.push(item.name + ',' + item.gendar + ','
              + item.studySchool + ',' + item.studyProfession
              + ',' + item.studyDate+ ',' + item.studyEdu+ ',' + item.phone);
          })
        }
        params.membersStr = array.join(';');
        let formData = new FormData();
        Object.keys(params).forEach((item) => {
          formData.append(item, params[item]);
        });
        parkResidentTeam(formData).then(({data}) => {
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

  onCancel = () => {
    this.setState({
      modalVisible: false
    })
  };

  onDel = (e, index) => {
    let membersStr = cloneDeep(this.state.membersStr);
    membersStr.splice(index, 1);
    this.setState({
      membersStr,
      modalVisible: false
    })
  };

  onEdit = (e, index) => {
    let membersStr = cloneDeep(this.state.membersStr);
    this.setState({
      membersStr,
      modalItem: membersStr[index],
      modalVisible: true,
      itemKey: index
    })
  };

  onOk = (data) => {
    let membersStr = cloneDeep(this.state.membersStr);
    if (data.itemKey >= 0) {
      membersStr[data.itemKey] = reFormatParams(data);
    } else {
      membersStr.push(reFormatParams(data));
    }
    this.setState({
      membersStr,
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
    const {modalVisible, membersStr} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w mt39 bg-white pb80'>
          <div className='bl-form'>
            <div className='form-title'>填写公司与项目信息</div>
            <div className="form-content">
              <div className='subheading'>项目负责人信息</div>
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
                  <Col span={24}>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label className='subheading'>团队成员</label>
                      <span onClick={this.showModal} className='fr icon-add-box'><i
                        className='icon-add'/><span>添加</span></span>
                    </div>
                    {membersStr.map((item, index) => {
                      return (
                        <div className='self-add' key={index}>
                          <span className="item">{item.name}</span>
                          <span className="item">{item.gendar}</span>
                          <span className="item">{item.studySchool}</span>
                          <span className="item">{item.studyProfession}</span>
                          <span className="item">{`${item.studyDate}毕业`}</span>
                          <span className="item">{item.studyEdu}</span>
                          <span className="item">{item.phone}</span>
                          <div className='fr' onClick={(e) => {
                            this.onDel(e, index)
                          }}>
                            <i className="icon-del"/>
                            <span className="edit">删除</span>
                          </div>
                          <i className="split fr"/>
                          <div className='fr' onClick={(e) => {
                            this.onEdit(e, index)
                          }}>
                            <i className="icon-edit"/>
                            <span className="edit">编辑</span>
                          </div>
                        </div>
                      )
                    })}
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>提交</div>
          </Row>
          {modalVisible && <Modal {...modalProps}/>}
        </div>
      </div>
    );
  }
}

export default Form.create()(ParkStep3);
