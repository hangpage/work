import {Button, Icon, Upload,} from 'antd';
import React from "react";
import config from "../../utils/config";

class Demo extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };

  handleChange = (info) => {
    if (info.file.response) {
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
    const {fileList} = this.state;
    const props = {
      beforeUpload: (value) => {
        this.setState({
          fileList: [value],
        });
      },
      fileList,
    };


    return (
      <div>
        <Upload {...props} action={config.UPLOAD_URL} onChange={this.handleChange}>
          <Button>
            <Icon type="upload"/> 如有附件，请上传
          </Button>
        </Upload>
      </div>
    );
  }
}

export default Demo;
