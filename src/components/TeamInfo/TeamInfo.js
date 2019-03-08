/**
 * @Description: 园区入驻第一步
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Col, DatePicker, Form, Input, Radio, Row} from 'antd';
import {reFormatParams} from "../../utils";
import Const from "../../utils/Const";
import ComboBox from "../../components/ComboBox";
import Modal from './component/step3Modal';
import {cloneDeep} from 'lodash';
import ImageUpload from "../../components/FileUpload/ImageUpload";
import moment from "moment";


class TeamInfo extends React.Component {
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


  getTeamInfoData = () => {
    const {form} = this.props;
    const {validateFields} = form;
    let params = {};
    const {membersStr} = this.state;
    validateFields((err, values) => {
      if (!err) {
        params = reFormatParams(values);
        let array = [];
        if (membersStr.length) {
          membersStr.forEach((item) => {
            array.push(item.name + ',' + item.gendar + ','
              + item.studySchool + ',' + item.studyProfession
              + ',' + item.studyDate+ ',' + item.studyEdu+ ',' + item.phone);
          })
        }
        params.membersStr = array.join(';');
      }
    });
    return params;
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
    const item = cloneDeep(membersStr[index]);
    item.studyDate = moment(item.studyDate);
    this.setState({
      membersStr,
      modalItem: item,
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
    const list1 = [{
      label: '姓名',
      field: 'name',
    }, {
      label: '性别',
      field: 'gendar',
      type: 'radio',
      options: Const.GENDAR_OPTIONS,
    }, {
      label: '学校',
      field: 'studySchool',
    }, {
      label: '专业',
      field: 'studyProfession',
    }, {
      label: '学历',
      field: 'education',
    }, {
      label: '毕业时间',
      field: 'graduationTime',
      type: 'datepicker',
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
      field: 'weixin',
    }, {
      label: 'QQ',
      field: 'QQ',
    }, {
      label: '邮箱',
      field: 'email',
    },];
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
      <div className="form-content">
        <div className='subheading'>项目负责人信息</div>
        {modalVisible && <Modal {...modalProps}/>}
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
    );
  }
}

export default Form.create()(TeamInfo);
