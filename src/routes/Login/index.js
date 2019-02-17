/**
 * @Description: 注册登录
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/10 15:44
 */
import React from 'react';

import {
  Form, Icon, Input, Button, Checkbox,
  message
} from 'antd';

import img from '../../assets/login/img.png';
import logo from '../../assets/login/logo.png';
import mobile from '../../assets/icon/icon-shouji.png';
import code from '../../assets/icon/icon-yanzhengma.png';
import CountDown from "../../components/CountDown";
import {getValidateCode, login} from "../../services/login";
import {equalResultStatus} from "../../utils";

class NormalLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.ref = null;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        login(values).then(({data}) => {
          if(equalResultStatus(data)){
            message.success('登录成功');
            this.props.history.push({
              pathname: '/index',
            });
            //sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('token', '3b23e376ec432158a77f2e88396a98eb716ad086');
          }else{
            message.error(data.message);
          }
        });
      }
    });
  };

  startTimer(){
    if(!this.ref.state.couldSend){
      return;
    }
    const value = this.props.form.getFieldsValue();
    if(!value.phone || value.phone.replace(/\s/g, '').length < 11){
      return message.error('请输入正确的手机号码', 1);
    }
    getValidateCode(value.phone.replace(/\s/g, '')).then(({data}) => {
      if(data.statusMsg === 'success'){
        message.success('发送成功', 1);
      }
    });
    this.ref.startTimer();
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='login-form-box'>
        <div className="login-form-wrapper">
          <div className="login-left">
              <h1>欢迎登录</h1>
              <h6>北京高校大学生创新创业服务平台</h6>
            <img src={img} alt=""/>
          </div>
          <div className="login-right">
            <img src={logo} alt=""/>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [{required: true, message: '请输入手机号!'}],
                })(
                  <Input prefix={<img src={mobile} alt=""/>} placeholder="请输入手机号"/>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('code', {
                  rules: [{required: true, message: '请输入验证码!'}],
                })(
                  <Input prefix={<img src={code} alt=""/>}
                         placeholder="请输入验证码"/>
                )}
                <CountDown onClick={() => {this.startTimer()}} count={60} ref={(span) => {this.ref = span}}/>
              </Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form>
          </div>
        </div>
      </div>

    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
