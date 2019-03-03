/**
 * @Description: 会议室申请
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import {DatePicker, Form, message, Radio, Row} from "antd";
import {equalResultStatus} from "../../utils";
import {serviceMeetingAppli, serviceQueryMeeting} from "../../services/service";
import BackButton from "../../components/BackButton/BackButton";
import TimePicker from "antd/es/time-picker";
import moment from "moment";


const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
  colon: false
};

const RULE = {
  rules: [{
    required: true, message: '必填!',
  }],
};
const INPUT_LIST = [{
  label: '日期',
  field: 'busiDate',
}, {
  label: '开始时间',
  field: 'startTime',
  format: 'HH:mm',
  type: 'timepicker'
}, {
  label: '结束时间',
  field: 'endTime',
  format: 'HH:mm',
  type: 'timepicker'
}];

class Lockers extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [],
      busiDate: '',
      startTime: '',
      endTime: ''
    }
  }
  queryMeetingRoom = () => {
    let params = {};
    params.busiDate = this.state.busiDate;
    params.startTime = this.state.startTime;
    params.endTime = this.state.endTime;
    serviceQueryMeeting(params).then(({data}) => {
      if(equalResultStatus(data)){
        this.setState({
          list: data.data
        })
      }else{
        message.error(data.message);
      }
    });
  };

  setChooseTime = (e, field) => {
    let format = 'YYYY-MM-DD';
    if(field.indexOf('Time') !== -1){
      format = 'HH:mm';
    }
    this.setState({
      [field]: moment(e).format(format)
    },(() => {
      this.queryMeetingRoom();
    }))
  };


  submit = (e) => {
    const {form, history} = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        values.token = sessionStorage.getItem('token');
        values.busiDate = moment(values.busiDate).format('YYYY-MM-DD');
        values.startTime = moment(values.startTime).format('HH:mm:ss');
        values.endTime = moment(values.endTime).format('HH:mm:ss');
        values.roomNum = values.roomNum[0];
        serviceMeetingAppli(values).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('申请成功');
            history.push({
              pathname: '/service',
            });
          } else {
            message.error(data.message);
          }
        });
      }
    });
  };

  render(){
    const {list} = this.state;
    const {form} = this.props;
    const {getFieldDecorator} = form;

    return (
      <div className='second-bg'>
        <div className="w form-bl service-form-wrapper">
          <Form layout='horizontal'>
            {INPUT_LIST.map((item, index) => {
              if(item.type === 'timepicker'){
                return (
                  <Form.Item
                    {...formItemLayout}
                    label={item.label}
                    key={index}
                  >
                    {getFieldDecorator(`${item.field}`, RULE)(
                      <TimePicker placeholder={`请选择${item.label}`} format={item.format} onChange={(e) => {this.setChooseTime(e, item.field)}}/>
                    )}
                  </Form.Item>
                )
              }
              return (
                <Form.Item
                  {...formItemLayout}
                  label={item.label}
                  key={index}
                >
                  {getFieldDecorator(`${item.field}`, RULE)(
                    <DatePicker placeholder={`请选择${item.label}`} onChange={(e) => {this.setChooseTime(e, item.field)}}/>
                  )}
                </Form.Item>
              )
            })}
            <Form.Item
              label="选择会议室"
              labelCol={{span: 8}}
              wrapperCol={{span: 8}}
              colon={false}
            >
              {getFieldDecorator('roomNum')(
                <Radio.Group className='bl-label'>
                  {list.map((item, index) => <Radio key={index} value={item.id}>{item.name}</Radio>)}
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
          <Row type='flex' justify='space-around'>
            <BackButton />
            <div className='main-button' onClick={this.submit}>提交</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(Lockers);
