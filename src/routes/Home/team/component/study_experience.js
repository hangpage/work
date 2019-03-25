import {Col, DatePicker, Form, Input, Modal, Radio, Row} from "antd";
import React from "react";
import ComboBox from "../../../../components/ComboBox";
import Const from "../../../../utils/Const";
import {convertStringToRangeDate} from "../../../../utils";


const {RangePicker} = DatePicker;

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

@Form.create()
class StudyExperience extends React.Component{
  handleOk = () => {
    const { onOk, form, itemKey } = this.props;
    const { validateFieldsAndScroll, getFieldsValue } = form;
    validateFieldsAndScroll(errors => {
      if (errors) {
        return
      }
      const data = getFieldsValue();
      data.itemKey = itemKey;
      onOk(data)
    })
  };
  render() {
    const { form, modalItem, ...modalProps} = this.props;
    const {getFieldDecorator} = form;
    modalItem && modalItem.date && (modalItem.date = convertStringToRangeDate(modalItem.date));
    const list1 = [{
      label: '阶段',
      field: 'state',
      initialValue: modalItem.state
    }, {
      label: '时间',
      field: 'date',
      type: 'rangepicker',
      initialValue: modalItem.date
    }, {
      label: '学校',
      field: 'school',
      initialValue: modalItem.school
    }, {
      label: '专业',
      field: 'profession',
      initialValue: modalItem.profession
    },{
      label: '学习形式',
      field: 'learningForm',
      initialValue: modalItem.learningForm
    }, {
      label: '学历',
      field: 'education',
      initialValue: modalItem.education
    }, {
      label: '证明人及电话',
      field: 'witness',
      initialValue: modalItem.witness
    }];
    return (
      <Modal
        title="添加学习经历"
        centered
        width={600}
        {...modalProps}
        onOk={this.handleOk}
      >
        <div style={{transform: 'translateY(-40px)'}}>
        <div style={{lineHeight: '57px', textAlign: 'center', fontSize: 18, color: '#333'}}>添加三个阶段</div>
        <div className="height4line mb39" style={{marginLeft: '-30px', marginRight: '-30px'}}/>
        <Form layout='horizontal' className='form-bl'>
          <Row>
            <Col span={24}>
            {list1.map((item, index) => {
              var comp = <Input placeholder={`请输入${item.label}`}/>;
              if (item.type === 'select') {
                comp = <ComboBox placeholder={`请选择${item.label}`} url={item.url || ''}/>;
              } else if (item.type === 'datepicker') {
                comp = <DatePicker placeholder={`请选择${item.label}`}/>;
              } else if(item.type === 'rangepicker'){
                  comp = <RangePicker/>
              }else if (item.type === 'radio') {
                comp =
                  (<Radio.Group>
                    {item.options.map((option, oindex) => <Radio key={oindex}
                                                                 value={option.value}>{option.text}</Radio>)}
                  </Radio.Group>)
              }
              return (
                  <Form.Item
                    label={item.label}
                    {...formItemLayout}
                    key={index}
                  >
                    {getFieldDecorator(`${item.field}`, {
                      rules: [{
                        required: true, message: '此处为必填项!',
                      }],
                      initialValue: item.initialValue,
                    })(
                      comp
                    )}
                  </Form.Item>
              )
            })}
            </Col>
          </Row>
        </Form>
      </div>
      </Modal>
    )
  }
}

export default StudyExperience;
