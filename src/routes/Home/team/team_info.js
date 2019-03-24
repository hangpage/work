/**
 * @Description: 个人中心团队信息
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Col, DatePicker, Form, Input, message, Popconfirm, Radio, Row} from 'antd';
import {equalResultStatus, reFormatParams} from "../../../utils";
import {parkDeleteMember, parkSaveMembers} from "../../../services/park";
import ComboBox from "../../../components/ComboBox";
import Const from "../../../utils/Const";
import {cloneDeep, isEqual} from "lodash";
import Modal from './component/step3Modal';
import {connect} from "dva";
import moment from "moment";


class Team extends React.Component {
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


  onCancel = () => {
    this.setState({
      modalVisible: false
    })
  };

  onDelConfirm = (e, index) => {
    const {dispatch} = this.props;
    let membersStr = cloneDeep(this.state.membersStr);
    parkDeleteMember({id: membersStr[index].id}).then(({data}) => {
      if (equalResultStatus(data)) {
        message.success('删除成功');
        dispatch({type: 'home/queryTeamInfo'})
      } else {
        message.error(data.message);
      }
    });
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
    const {dispatch} = this.props;
    const {modalItem} = this.state;
    let params = reFormatParams(data);
    params.token = sessionStorage.getItem('token');
    params.rtId = this.props.teamInfo.id;
    params.id = modalItem.id;
    parkSaveMembers(params).then(({data}) => {
      if (equalResultStatus(data)) {
        message.success('修改成功');
        this.setState({modalVisible: false});
        dispatch({type: 'home/queryTeamInfo'})
      } else {
        message.error(data.message);
      }
    });
  };

  submit = () => {
    const {form, dispatch} = this.props;
    const {validateFields, resetFields} = form;
    validateFields((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        params.rtId = this.props.teamInfo.id;
        parkSaveMembers(params).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('保存成功');
            resetFields();
            dispatch({
              type: 'home/queryTeamInfo'
            })
          } else {
            message.error(data.message);
          }
        })
      }
    });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if(!isEqual(this.props.teamInfo.members, nextProps.teamInfo.members)){
      this.setState({
        membersStr: nextProps.teamInfo.members
      })
    }
  }

  componentDidMount() {
     const data = cloneDeep(this.props.teamInfo);
    // data.birth = data.birth ? moment(data.birth) : '';
    // data.date = data.date ? moment(data.date) : '';
    // this.props.form.setFieldsValue(data);
    this.setState({
      membersStr: data.members || []
    })
  }

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
      label: '所在院校',
      field: 'studySchool',
    }, {
      label: '所学专业',
      field: 'studyProfession',
    }, {
      label: '毕业时间',
      field: 'studyDate',
      type: 'datepicker'
    }, {
      label: '学历',
      field: 'studyEdu',
    },{
      label: '联系电话',
      field: 'phone',
    }];
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
        <div className='w bg-white pb80'>
          <div className='bl-form'>
            <div className="form-content">
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
                </Row>
                <Row type='flex' justify='space-around' gutter={360}>
                  <div className='main-button' onClick={this.submit} style={{width: 600}}>保存</div>
                </Row>
                <Row gutter={138}>
                  <Col span={24}>
                    <div className="ant-form-item-label" style={{width: '100%'}}>
                      <label className='subheading'>团队成员</label>
                      {/*<span onClick={this.showModal} className='fr icon-add-box'><i*/}
                      {/*className='icon-add'/><span>添加</span></span>*/}
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
                          <div className='fr'>
                            <i className="icon-del"/>
                            <Popconfirm title="确认删除该成员吗？" onConfirm={(e) => {
                              this.onDelConfirm(e, index)
                            }} okText="确认" cancelText="取消">
                              <span className="edit">删除</span>
                            </Popconfirm>,
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
        </div>
      </div>
    );
  }
}

export default connect(({home}) => (home))(Form.create()(Team));
