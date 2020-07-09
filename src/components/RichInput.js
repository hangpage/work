import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import config from "../utils/config";

export default class RichInput extends React.Component {
  constructor(props) {
    super(props);
    this.reactQuillRef = null;
    this.state = {
      value: '',
      readOnly: this.props.disabled
    }
  }

  //这是点击图片图标触发的事件
  imageHandler() {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.setAttribute('multiple', 'multiple')
    input.click()
    const that = this;
    input.onchange = async () => {
      Array.from(input.files).forEach(item => {
        const formData = new FormData();
        formData.append('file', item);
        fetch('/upload', {
          method: 'post',
          body: formData,
        }).then(response => response.json())
          .then((data) => {debugger
            let quill = that.reactQuillRef.getEditor();//获取到编辑器本身
            const cursorPosition = quill.getSelection().index;//获取当前光标位置
            const link = config.UPLOAD_URL + data.data.url;
            quill.insertEmbed(cursorPosition, "image", link);//插入图片
            quill.setSelection(cursorPosition + 1);//光标位置加1
          });
      })
    }
  }

  modules = {
    toolbar: [
      [{'header': [1, 2, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
    handlers: {
      'image': this.imageHandler.bind(this), //点击图片标志会调用的方法
      'video2': this.showVideoModal.bind(this),
    },
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      value: nextProps.value || ''
    })
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  handleChange = (value) => {
    const onChange = this.props.onChange;
    this.setState({
      value,
    });
    if (onChange) {
      onChange(value);
    }
  };



  render() {
    return (
      <ReactQuill ref={(el) => { this.reactQuillRef = el }} modules={this.modules} formats={this.formats} value={this.state.value} onChange={this.handleChange}/>
    )
  }
}
