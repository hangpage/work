import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class RichInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      readOnly: this.props.disabled
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
      <ReactQuill modules={this.modules} formats={this.formats} value={this.state.value} onChange={this.handleChange}/>
    )
  }
}
