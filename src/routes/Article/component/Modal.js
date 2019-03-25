import {Form, Input, Modal} from "antd";
import React from "react";

@Form.create()
class AddModal extends React.Component{
  handleOk = () => {
    const { onOk, form } = this.props;
    const { validateFieldsAndScroll, getFieldsValue } = form;
    validateFieldsAndScroll(errors => {
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
          {getFieldDecorator('content')(
            <Input.TextArea placeholder={placeHolder} className='bg-gray' style={{height: 180}}/>
          )}
        </Form>
      </Modal>
    )
  }
}

export default AddModal;
