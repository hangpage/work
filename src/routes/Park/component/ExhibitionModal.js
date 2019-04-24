/**
* @Description: 展会modal
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2019/4/23 18:49
*/
import {Col, DatePicker, Form, Input, Modal, Row, Select} from "antd";
import React from "react";


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
class ExhibitionModal extends React.Component{
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
    const { form, modalItem, ...modalProps} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        title="参加展会名称及时间"
        centered
        width={600}
        {...modalProps}
        onOk={this.handleOk}
      >
        <Form layout='horizontal' className='form-bl'>
          <Row>
            <Col span={24}>
              <Form.Item
                label='展会名称'
                {...formItemLayout}
              >
                {getFieldDecorator('name', {
                  initialValue: modalItem.name,
                  rules: [{
                    required: true
                  }]
                })(
                  <Input placeholder='请输入展会名称'/>
                )}
              </Form.Item>
              <Form.Item
                label='参加时间'
                {...formItemLayout}
              >
                {getFieldDecorator('date', {
                  initialValue: modalItem.date,
                  rules: [{
                    required: true
                  }]
                })(
                  <DatePicker placeholder={'请选择参加时间'}/>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default ExhibitionModal;
