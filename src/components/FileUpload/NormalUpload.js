import React from 'react';
import {Upload} from "antd";


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
    const {text='点击上传'} = this.props;
    return (
      <Upload className='normal-upload' action='/api/upload/uploadFile' onChange={this.handleChange} showUploadList={false}>
        {text}
      </Upload>
    )
  }
}

export default ImageUpload;
