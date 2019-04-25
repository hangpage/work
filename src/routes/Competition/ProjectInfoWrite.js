/**
 * @Description: 比赛报名
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/3 12:53
 */
import React from 'react';
import {Form, Input, message, Row} from 'antd';
import BackButton from "../../components/BackButton/BackButton";
import {equalResultStatus, getParams, reFormatParams} from "../../utils";
import {insertProject, insertTeam, updateTeam} from "../../services/competition";
import qs from "qs";
import ImageUpload from "../../components/FileUpload/ImageUpload";
import {connect} from "dva";
import {isEqual} from "lodash";
import {Link} from "dva/router";

const {TextArea} = Input;

class TeamInfoWrite extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isRegistRequired: false,
      formDisabledStatus: false
    }
  }
  submit = () => {
    const {form, history, location} = this.props;
    const {validateFieldsAndScroll} = form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = reFormatParams(values);
        params.token = sessionStorage.getItem('token');
        params.mId = getParams(location.search).mId;
        let formData = new FormData();
        Object.keys(params).forEach((item) => {
          formData.append(item, params[item]);
        });
        const subData = qs.parse(location.search.split('?')[1]);
        delete subData.egistrationNotice;
        delete subData.editBtnText;
        if(this.props.teamMatchDetail.team){
          subData.id = this.props.teamMatchDetail.team.id;
        }

        const fun = this.props.teamMatchDetail.team ? updateTeam : insertTeam;
        fun(subData).then(({data}) => {
          if(equalResultStatus(data)){
            insertProject(formData).then(({data}) => {
              if (equalResultStatus(data)) {
                message.success('保存成功');
                sessionStorage.removeItem('cInfo');
                history.push({
                  pathname: '/index',
                });
              } else {
                message.error(data.message);
              }
            })
          }else{
            message.error(data.message);
          }
        });
      }
    });
  };

  componentWillMount() {
    const {location} = this.props;
    const isRegist = getParams(location.search).isRegist;
    this.setState({
      isRegistRequired: isRegist === '1'
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(!isEqual(this.props.teamMatchDetail.team, nextProps.teamMatchDetail.team)){
      const data = nextProps.teamMatchDetail.team;
      this.props.form.setFieldsValue(data);
    }
    this.setState({
      formDisabledStatus: decodeURIComponent(getParams(this.props.location.search).editBtnText) === '查看比赛报名信息'
    })
  }

  render(){
      const {form, location} = this.props;
      const {getFieldDecorator} = form;
      const {formDisabledStatus} = this.state;
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
                      <Input placeholder='请输入项目名称' disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="项目概况(评分满分为15分)"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('generalization', {
                      rules: [{required: true,message: '请输入项目概况'}],
                    })(
                      <TextArea placeholder='请输入项目概况...' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="产品与服务(评分满分为35分)"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('service', {
                      rules: [{required: true,message: '请输入产品与服务'}],
                    })(
                      <TextArea placeholder='请输入产品与服务...' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="市场分析(评分满分为20分)"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('marketAnalysis', {
                      rules: [{required: true,message: '请输入项目市场分析'}],
                    })(
                      <TextArea placeholder='请输入项目市场分析...' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="项目营销策略(评分满分为5分)"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('marketingStrategy', {
                      rules: [{required: true,message: '请输入项目营销策略..'}],
                    })(
                      <TextArea placeholder='请输入项目营销策略..' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="风险分析与控制(评分满分为10分)"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('riskAnalysis', {
                      rules: [{required: true,message: '请输入项目分析与控制...'}],
                    })(
                      <TextArea placeholder='请输入项目分析与控制...' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="项目三年规划(评分满分为5分)"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('plan', {
                      rules: [{required: true,message: '请输入项目三年规划..'}],
                    })(
                      <TextArea placeholder='请输入项目三年规划..' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="项目资金筹措与使用(评分满分为5分)"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('financing', {
                      rules: [{required: true,message: '请输入项目资金筹措与使用..'}],
                    })(
                      <TextArea placeholder='请输入项目资金筹措与使用..' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="项目财务分析(评分满分为5分)"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('financialAnalysis', {
                      rules: [{required: true,message: '请输入项目财务分析...'}],
                    })(
                      <TextArea placeholder='请输入项目财务分析...' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="网站介绍"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('webIntro')(
                      <TextArea placeholder='请输入项目网站介绍...' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="组织结构"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('organizationStructure')(
                      <TextArea placeholder='请输入组织结构...' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  {/*<Form.Item*/}
                    {/*label="核心团队介绍"*/}
                    {/*labelCol={{span: 12}}*/}
                    {/*wrapperCol={{span: 24}}*/}
                  {/*>*/}
                    {/*{getFieldDecorator('teamIntroduction', {*/}
                      {/*rules: [{required: true,message: '请填写'}],*/}
                    {/*})(*/}
                      {/*<TextArea placeholder='请输入核心团队介绍...' style={{height: 240}}/>*/}
                    {/*)}*/}
                  {/*</Form.Item>*/}
                  <Form.Item
                    label="其他"
                    labelCol={{span: 12}}
                    wrapperCol={{span: 24}}
                  >
                    {getFieldDecorator('other')(
                      <TextArea placeholder='可输入项目其他相关内容...' style={{height: 240}} disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                  {/*<Form.Item*/}
                    {/*label="附件一：填写《北京地区高校大学生优秀创业团队评选活动申请表》，打印好，到学校就业服务中心盖章，然后将扫描件上传"*/}
                    {/*labelCol={{span: 24}}*/}
                    {/*wrapperCol={{span: 6}}*/}
                  {/*>*/}
                    {/*{getFieldDecorator('file')(*/}
                      {/*<ImageUpload/>*/}
                    {/*)}*/}
                  {/*</Form.Item>*/}
                  <Form.Item
                    label="附件一：团队负责人（企业法人）身份证扫描件"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 12}}
                    className='row-upload'
                  >
                    {getFieldDecorator('principalCardFront', {
                      rules: [{required: true, message: '请上传'}],
                    })(
                      <ImageUpload uploadText='身份证正面' disabled={formDisabledStatus}/>
                    )}
                    <Form.Item
                      wrapperCol={{span: 9}}
                      className='row-upload'
                    >
                      {getFieldDecorator('principalCardReverse', {
                        rules: [{required: true, message: '请上传'}],
                      })(
                        <ImageUpload uploadText={'身份证反面'} disabled={formDisabledStatus}/>
                      )}
                    </Form.Item>
                  </Form.Item>
                  <Form.Item
                    label="附件二：已注册企业需准备《营业执照》扫描件"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 6}}
                  >
                    {getFieldDecorator('businessLicense', {
                      rules: [{required: this.state.isRegistRequired, message: '请上传'}],
                    })(
                      <ImageUpload disabled={formDisabledStatus}/>
                    )}
                  </Form.Item>
                </Form>
              </div>
            </div>
            <Row type='flex' justify='space-around' gutter={360}>
              <BackButton/>
              {formDisabledStatus && <Link to={'/index'}><div className='main-button'>返回主页</div></Link>}
              {!formDisabledStatus && <div className='main-button' onClick={this.submit}>提交</div>}
            </Row>
          </div>
          <div className='app_notes'>
            <h6 className=''>报名须知：</h6>
            <div className='competition-detail' dangerouslySetInnerHTML={{__html: decodeURIComponent(getParams(location.search).egistrationNotice)}}/>
          </div>
        </div>
      );
    }
}

export default connect(({competition}) => competition)(Form.create()(TeamInfoWrite));
