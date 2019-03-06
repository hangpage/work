/**
 * @Description: 比赛报名
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/3 12:53
 */
import React from 'react';
import {Form, Input, message, Row} from 'antd';
import BackButton from "../../components/BackButton/BackButton";
import {equalResultStatus, getParams, reFormatParams} from "../../utils";
import {insertProject} from "../../services/competition";
import FileUpload from "../../components/FileUpload/FileUpload";

const {TextArea} = Input;

const TeamInfoWrite = ({form, history, location}) => {
  const {getFieldDecorator, validateFields} = form;

  const submit = () => {
    validateFields((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        params.mId = getParams(location.search).mId;
        let formData = new FormData();
        Object.keys(params).forEach((item) => {
          formData.append(item, params[item]);
        });
        insertProject(formData).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('保存成功');
            history.push({
              pathname: '/index',
            });
          } else {
            message.error(data.message);
          }
        })
      }
    });
  };

  return (
    <div style={{background: '#FAFAFA', paddingBottom: 60}}>
      <div className='w mt39 bg-white pb80'>
        <div className='bl-form'>
          <div className='form-title'>报名</div>
          <div className="form-content">
            <div className="text-align">
              <span className="form-name">项目信息</span>
            </div>
            <Form>
              <Form.Item
                label="项目名称"
                labelCol={{span: 24}}
                wrapperCol={{span: 12}}
              >
                {getFieldDecorator('projectName', {
                  rules: [{required: true, message: '请输入项目名称'}],
                })(
                  <Input placeholder='请输入项目名称'/>
                )}
              </Form.Item>
              <Form.Item
                label="市场分析"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('marketAnalysis', {
                  rules: [{required: true,message: '请输入项目市场分析'}],
                })(
                  <TextArea placeholder='请输入项目市场分析...' style={{height: 240}}/>
                )}
              </Form.Item>
              <Form.Item
                label="项目营销策略"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('marketingStrategy', {
                  rules: [{required: true,message: '请输入项目营销策略..'}],
                })(
                  <TextArea placeholder='请输入项目营销策略..' style={{height: 240}}/>
                )}
              </Form.Item>
              <Form.Item
                label="风险分析与控制"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('riskAnalysis', {
                  rules: [{required: true,message: '请输入项目分析与控制...'}],
                })(
                  <TextArea placeholder='请输入项目分析与控制...' style={{height: 240}}/>
                )}
              </Form.Item>
              <Form.Item
                label="项目三年规划"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('plan', {
                  rules: [{required: true,message: '请输入项目三年规划..'}],
                })(
                  <TextArea placeholder='请输入项目三年规划..' style={{height: 240}}/>
                )}
              </Form.Item>
              <Form.Item
                label="项目资金筹措与使用"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('financing', {
                  rules: [{required: true,message: '请输入项目资金筹措与使用..'}],
                })(
                  <TextArea placeholder='请输入项目资金筹措与使用..' style={{height: 240}}/>
                )}
              </Form.Item>
              <Form.Item
                label="项目财务分析"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('financialAnalysis', {
                  rules: [{required: true,message: '请输入项目财务分析...'}],
                })(
                  <TextArea placeholder='请输入项目财务分析...' style={{height: 240}}/>
                )}
              </Form.Item>
              <Form.Item
                label="网站介绍"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('webIntro', {
                  rules: [{required: true,message: '请输入项目网站介绍...'}],
                })(
                  <TextArea placeholder='请输入项目网站介绍...' style={{height: 240}}/>
                )}
              </Form.Item>
              <Form.Item
                label="其他"
                labelCol={{span: 12}}
                wrapperCol={{span: 24}}
              >
                {getFieldDecorator('other', {
                  rules: [{required: true,message: '请填写'}],
                })(
                  <TextArea placeholder='可输入项目其他相关内容...' style={{height: 240}}/>
                )}
              </Form.Item>
              <Form.Item
                label="附件"
                labelCol={{span: 24}}
                wrapperCol={{span: 6}}
              >
                {getFieldDecorator('file')(
                  <FileUpload/>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
        <Row type='flex' justify='space-around' gutter={360}>
          <BackButton/>
          <div className='main-button' onClick={submit}>提交</div>
        </Row>
      </div>
    </div>
  );
};

export default Form.create()(TeamInfoWrite);
