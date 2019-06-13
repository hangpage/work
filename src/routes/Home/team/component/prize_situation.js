import {Col, DatePicker, Form, Input, Modal, Row} from "antd";
import React from "react";
import {Select} from "antd";
import Const from "../../../../utils/Const";
import {validateNoChinese} from "../../../../utils/validate";


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
class AddModal extends React.Component{
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
    return (
      <Modal
        title="大赛名称及获奖等级情况"
        centered
        width={600}
        {...modalProps}
        onOk={this.handleOk}
      >
        <Form layout='horizontal' className='form-bl'>
          <Row>
            <Col span={24}>
              <Form.Item
                label='大赛名称'
                {...formItemLayout}
              >
                {getFieldDecorator('match', {
                  initialValue: modalItem.match,
                  rules: [{ required: true, message: '此处为必填项!'}]
                })(
                  <Input placeholder='请输入大赛名称'/>
                )}
              </Form.Item>
              <Form.Item
                label='获奖等级'
                {...formItemLayout}
              >
                {getFieldDecorator('rate', {
                  initialValue: modalItem.rate,
                  rules: [{ required: true, message: '此处为必填项!'}]
                })(
                  <Input placeholder='请输入获奖等级'/>
                )}
              </Form.Item>
              <Form.Item
                label='大赛级别'
                {...formItemLayout}
              >
                {getFieldDecorator('level', {
                  initialValue: modalItem.rate,
                  rules: [{ required: true, message: '此处为必填项!'}]
                })(
                  <Select placeholder={'请选择大赛级别'}>
                    {Const.RATE_LIST.map((item, index) => <Select.Option key={index} value={item.value}>{item.value}</Select.Option>)}
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label='获奖日期'
                {...formItemLayout}
              >
                {getFieldDecorator('date', {
                  initialValue: modalItem.date,
                  rules: [{ required: true, message: '此处为必填项!'}]
                })(
                  <DatePicker placeholder={'请选择获奖日期'}/>
                )}
              </Form.Item>
              <Form.Item
                label='获奖金额'
                {...formItemLayout}
              >
                {getFieldDecorator('price', {
                  initialValue: modalItem.price,
                  rules: [{ required: true, message: '此处为必填项!'}]
                })(
                  <Input placeholder={'请输入获奖金额'} addonAfter={'元'}/>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default AddModal;
