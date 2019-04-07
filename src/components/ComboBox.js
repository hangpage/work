import React from 'react';
import {Select} from 'antd';
import request from "../utils/request";

const Option = Select.Option;

class ComboBox extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource: [],
        value: ''
      }
  }

  getOptions(options) {
    const ops = [];
    const {valueProp, nameProp} = this.props;
    for (let i = 0; i < options.length; i++) {
      ops.push(<Option key={i} value={options[i][valueProp] || options[i]['value']}>{options[i][nameProp] || options[i]['label']}</Option>)
    }
    return ops;
  }

  componentDidMount(){
    if(this.props.url){
        this.promise = request(`/api/${this.props.url}`,{
          method: 'POST',
        }).then(({data}) => {
          this.setState({
            dataSource: data.data
          })
        })
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      value: nextProps.value
    })
  }

  handleChange = (value) => {
    const onChange = this.props.onChange;
    this.setState({
      value: value
    });
    if (onChange) {
      onChange(value);
    }
  };

  filterOption = (input, option) => {
    return option.props.children.indexOf(input) !== -1;
  };

  render() {
    const style = Object.assign({}, {minWidth: '100px'}, this.props.style);
    return (
      <div style={style}>
          <Select onChange={this.handleChange}
                  allowClear={this.props.allowClear || true}
                  showSearch={this.props.showSearch || true}
                  filterOption={this.filterOption}
                  value={this.state.value}
                  style={{width: '100%'}}
                  placeholder={this.props.placeholder || '请选择'}
                  disabled={this.props.disabled}
                  dropdownMatchSelectWidth={true}>
            {this.getOptions(this.state.dataSource)}
          </Select>
      </div>
    )
  }
}

export default ComboBox;
