import React from 'react';
import {Modal, Upload} from "antd";
import config from "../../utils/config";


class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      multiFiles: []
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };


  componentWillReceiveProps(nextProps, nextContext) {
    const fileList = [];
    if(nextProps.max){
      const arr = nextProps.value.split('|');
      arr.forEach((item, index) => {
          fileList.push({url: item, status: 'done', uid: index})
      });
      console.log(fileList)
      this.setState({fileList})
    }else{
      console.log(fileList)
      this.setState({
        fileList: [{url: nextProps.value, uid: 1, status: 'done',}]
      })
    }
  }

  handleChange = (info) => {
    this.setState({
      fileList: info.fileList
    });
    if(info.file.response){
      const value = info.file.response.file;
      const onChange = this.props.onChange;
      if(this.props.max){
          const files = this.state.multiFiles;
          if(info.file.status === 'removed'){
            files.splice(files.indexOf(value), 1);
          }else{
            files.push(value);
          }
          this.setState({multiFiles: files}, () => {
            if(onChange){
              onChange(this.state.multiFiles.join('|'));
            }
          });
      }else{
        if (onChange) {
          onChange(value);
        }
      }
      this.setState({
        fileList: info.fileList
      });
    }
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const {max=1} = this.props;
    const uploadButton = (
      <div>
        <i className='icon-camera'/>
        <div className="ant-upload-text">点击上传图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={config.UPLOAD_URL}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= max ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default ImageUpload;
