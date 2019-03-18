import React from 'react';
import {
  Form, Input, Icon, Button,
  message
} from 'antd';

let id = 0;

class DynamicFieldSet extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
    this.handleInputChange();
  };

  add = () => {
    const { form, maxNum, fieldText } = this.props;
    const keys = form.getFieldValue('keys');
    if(keys.length === maxNum){
      return message.error(`最多添加${maxNum}个${fieldText}`);
    }
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
    this.handleInputChange();
  };

  handleInputChange = () => {
    const { form, name, onChange } = this.props;
    const values = form.getFieldValue(name) || [];
    const newArr = [];
    values.forEach((item) => {
      if(item){
        newArr.push(item);
      }
    });
    Array.from(values); //防止有empty
    if (onChange) {
      console.log(newArr.join(','));
      onChange(newArr.join(','));
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {fieldText, name} = this.props;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        required={false}
        key={index}
      >
        {getFieldDecorator(`${name}[${k}]`, {
          trigger: 'onInput',
          rules: [{
            required: true,
            whitespace: true,
            message: `请输入${fieldText}`,
          }],
        })(
          <Input onChange={this.handleInputChange} placeholder={`${fieldText}姓名`} style={{ width: '60%', marginRight: 8 }} />
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(DynamicFieldSet);
