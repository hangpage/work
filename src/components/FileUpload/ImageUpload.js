import React from 'react';
import {Upload} from "antd";
import Icon from "antd/es/icon";


class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }

  componentDidMount(){

  }

  handleChange = (info) => {
    if(info.file.response){
      const value = info.file.response.file;
      const onChange = this.props.onChange;
      if (onChange) {
        onChange(value);
      }
      this.setState({
        url: value
      });
    }
  };

  render() {
    return (
      <Upload.Dragger action='/api/upload/uploadFile' onChange={this.handleChange} showUploadList={false}>
        <p className="ant-upload-drag-icon">
          {!this.state.url && <Icon type="camera"/>}
          <img style={{width: '100%'}} src={this.state.url} alt=""/>
        </p>
        <p className="ant-upload-text">点击上传</p>
      </Upload.Dragger>
    )
  }
}

export default ImageUpload;
