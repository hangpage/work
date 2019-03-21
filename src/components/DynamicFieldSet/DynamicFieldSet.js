import React from 'react';
import {
  Form, Input, Icon, Button,
  message
} from 'antd';

let id = 0;

class DynamicFieldSet extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keys: [],
      value: []
    }
  }
  remove = (k) => {
    const {keys, value} = this.state;
    if (keys.length === 1) {
      return;
    }
    value.splice(k, 1);
    this.setState({
      keys: keys.filter(key => key !== k),
      value: value
    });
    const { onChange } = this.props;
    if (onChange) {
      onChange(value.join(','));
    }
  };

  add = () => {
    const { maxNum, fieldText } = this.props;
    const keys = this.state.keys;
    if(keys.length === maxNum){
      return message.error(`最多添加${maxNum}个${fieldText}`);
    }
    const nextKeys = keys.concat(id++);
    this.setState({
      keys: nextKeys,
    });
  };

  handleInputChange = (e, index) => {
    const { onChange } = this.props;
    const value = this.state.value || [];
    value[index] = e.currentTarget.value.replace(/[^\u4e00-\u9fa5\da-zA-Z]+/g, '');
    if (onChange) {
      onChange(value.join(','));
    }
    this.setState({
      value: value
    });
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const value = [];
    const keys = [];
    if(nextProps.value){
      const arr = nextProps.value.split(',');
      arr.forEach((item, index) => {
        value.push(item);
        keys.push(index);
      });
      this.setState({value, keys})
    }
  }

  render() {
    const {fieldText} = this.props;
    const {keys, value} = this.state;
    const formItems = keys.map((k, index) => (
      <Form.Item
        required={false}
        key={index}
      >
        <Input
          onChange={(e) => {this.handleInputChange(e, index)}}
          value={value[index]}
          placeholder={`${fieldText}姓名`}
          maxLength={10}
          style={{ width: '60%', marginRight: 8 }} />
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
        <div>
          {formItems}
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加
          </Button>
        </div>
    );
  }
}

export default DynamicFieldSet;
