import {Col, Form, Input, Modal, Row} from "antd";
import React from "react";

@Form.create()
class AddModal extends React.Component{
  handleOk = () => {
    const { onOk, form } = this.props;
    const { validateFields, getFieldsValue } = form;
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = getFieldsValue();
      onOk(data)
    })
  };
  render() {
    const { form, replyWho, placeHolder, ...modalProps } = this.props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        centered
        width={600}
        {...modalProps}
        onOk={this.handleOk}
        placeHolder=''
      >
        <Form>
          <Row>
            <Col span={24}>
              <Form.Item
              >
                {getFieldDecorator('content')(
                  <Input.TextArea placeholder={placeHolder} style={{height: 180}}/>
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
