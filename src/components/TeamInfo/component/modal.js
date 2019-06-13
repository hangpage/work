import {Col, Form, Input, Modal, Row} from "antd";
import React from "react";

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
        <Form>
          <Row>
            <Col span={24}>
              <Form.Item
                label='大赛名称'
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
              >
                {getFieldDecorator('rate', {
                  initialValue: modalItem.rate,
                  rules: [{ required: true, message: '此处为必填项!'}]
                })(
                  <Input placeholder='请输入获奖等级'/>
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
