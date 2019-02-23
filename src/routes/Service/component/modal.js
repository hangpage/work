import {Col, Form, Input, Modal, Row} from "antd";
import React from "react";

@Form.create()
class AddModal extends React.Component{
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
    const { form, ...modalProps} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        title="申请服务"
        centered
        width={700}
        {...modalProps}
        onOk={this.handleOk}
      >
        <Form className='form-bl'>
          <Row>
            <Col span={24}>
              <Form.Item
                label='联系人'
              >
                {getFieldDecorator('name', {
                  rules: [{
                    required: true, message: '请输入联系人姓名'
                  }]
                })(
                  <Input placeholder='请输入联系人姓名'/>
                )}
              </Form.Item>
              <Form.Item
                label='联系电话'
              >
                {getFieldDecorator('phone', {
                  rules: [{
                    required: true, message: '请输入联系人电话'
                  }]
                })(
                  <Input placeholder='请输入联系人电话'/>
                )}
              </Form.Item>
              <Form.Item
                label='服务内容'
              >
                {getFieldDecorator('note', {
                  rules: [{
                    required: true, message: '请输入请输入服务内容'
                  }]
                })(
                  <Input placeholder='请输入服务内容...'/>
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
