import {Form, Input, Modal} from "antd";
import React from "react";

const layout = {
  labelCol: {
    sm: {span: 8},
  },
  wrapperCol: {
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
        <Form layout='horizontal' className='form-bl'>
          <Form.Item {...layout}
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
          <Form.Item {...layout}
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
          <Form.Item {...layout}
            label='服务内容'
          >
            {getFieldDecorator('note', {
              rules: [{
                required: true, message: '请输入请输入服务内容'
              }]
            })(
              <Input.TextArea className='bg-gray' placeholder='请输入服务内容...' style={{height: 300}}/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default AddModal;
