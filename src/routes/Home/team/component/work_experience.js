import {Col, DatePicker, Form, Input, Modal, Radio, Row} from "antd";
import React from "react";
import ComboBox from "../../../../components/ComboBox";
import Const from "../../../../utils/Const";


const {RangePicker} = DatePicker;

const list1 = [{
  label: '起止年月',
  field: 'f1',
  type: 'rangepicker',
},  {
  label: '单位/项目',
  field: 'f2'
}, {
  label: '担任职务',
  field: 'f3'
}];

@Form.create()
class WorkExperience extends React.Component{
  handleOk = () => {
    const { onOk, form, itemKey } = this.props;
    const { validateFields, getFieldsValue } = form;
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = getFieldsValue();
      if(itemKey){
        data.itemKey = itemKey;
      }
      onOk(data)
    })
  };
  render() {
    const { form, modalItem, ...modalProps} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        title="添加工作经历"
        centered
        width={600}
        {...modalProps}
        onOk={this.handleOk}
      >
        <Form layout='horizontal'>
          <Row>
            {list1.map((item, index) => {
              var comp = <Input placeholder={`请输入${item.label}`}/>;
              if (item.type === 'select') {
                comp = <ComboBox placeholder={`请选择${item.label}`} url={item.url || ''}/>;
              } else if (item.type === 'datepicker') {
                comp = <DatePicker placeholder={`请选择${item.label}`}/>;
              } else if(item.type === 'rangepicker'){
                comp = <RangePicker placeholder={`请选择${item.label}`}/>
              }else if (item.type === 'radio') {
                comp =
                  (<Radio.Group>
                    {item.options.map((option, oindex) => <Radio key={oindex}
                                                                 value={option.value}>{option.text}</Radio>)}
                  </Radio.Group>)
              }
              return (
                <Col span={24} key={index}>
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
            <Form.Item
              label="主要工作"
              wrapperCol={{span: 24}}
            >
              {getFieldDecorator('businessModel', {
                rules: [{message: '请输入主要工作'}],
              })(
                <Input.TextArea placeholder='请输入主要工作' style={{height: 240}}
                          maxLength={200}/>
              )}
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default WorkExperience;
