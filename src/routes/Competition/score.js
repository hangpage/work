/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/27 21:41
 */
import React from 'react';
import {Form, Input, message} from "antd";
import {connect} from "dva";
import {equalResultStatus, getParams} from "../../utils";
import {reservationPark} from "../../services/service";
import {saveScore} from "../../services/competition";


const List = [{
  title: '产品与服务',
  field: 'service',
}, {
  title: '市场分析',
  field: 'marketAnalysis',
}, {
  title: '营销策略',
  field: 'marketingStrategy',
}, {
  title: '风险分析与控制',
  field: 'riskAnalysis',
}, {
  title: '项目三年规划',
  field: 'plan',
}, {
  title: '项目筹措与使用',
  field: 'financing',
}, {
  title: '项目财务分析',
  field: 'financialAnalysis',
}, {
  title: '网站介绍',
  field: 'webIntro',
}, {
  title: '其他',
  field: 'other',
}];

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    }
  }

  submit = () => {
    const {form, teamDetail, history} = this.props;
    const {validateFields} = form;
    validateFields((err, values) => {
      if (!err) {
        let params = values;
        params.token = sessionStorage.getItem('token');
        params.teamId = teamDetail.teamId;
        saveScore(values).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('评分成功！');
            history.push('/home/match');
          } else {
            message.error(data.message);
          }
        })
      }
    });
  };

  handleChange = () => {
    const {form} = this.props;
    const scores = form.getFieldsValue();
    let total = 0;
    Object.keys(scores).forEach((item) => {
      total += Number(scores[item] || 0);
    });
    this.setState({total});
  };


  render() {
    const {form, teamDetail} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div className="second-bg">
        <div className='w'>
          <div className="pb60 score mt80 mb80 ">
            <div className="top">
              <h1>北京理工大学国防科技园项目创新大赛</h1>
              <h2>项目名称：大气环保监测</h2>
            </div>
            {List.map((item, index) => {
              return (
                <div className="score-card" key={index}>
                  <h4>{item.title}</h4>
                  <p className='content'>
                    {teamDetail[item.field]}
                  </p>
                  <div className="bottom">
                    <span className='pingfen'>评分</span>
                    {getFieldDecorator(item.field, {
                      rules: [{required: true, message: '请评分!'}],
                      getValueFromEvent: (event) => {
                        return event.target.value.replace(/\D/g, '')
                      },
                      trigger: 'onInput'
                    })(
                      <Input onChange={this.handleChange}/>
                    )}
                  </div>
                </div>
              )
            })}
            <div className="height12line mt50"/>
            <div className="total-score">
              <div className="score-form" style={{borderRadius: 4}}>
                <div className="bottom" style={{height: 'auto'}}>
                  <div className="pingfen">总分</div>
                  <Input value={this.state.total}/>
                </div>
                <div className="bottom" style={{height: 'auto', marginTop: 40}}>
                  <div className="pingfen" style={{alignSelf: 'flex-start'}}>评价</div>
                  {getFieldDecorator('evaluation')(
                    <Input.TextArea style={{height: 275}}/>
                  )}
                </div>
              </div>
            </div>
            <div className="text-align">
              <div className="main-button" style={{width: 600}} onClick={this.submit}>提交</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}


export default connect(({competition}) => competition)(Form.create()(Score));
