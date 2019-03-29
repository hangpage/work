/**
 * @Description: 比赛报名
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/3 12:53
 */
import React from 'react';
import {message, Row} from 'antd';
import BackButton from "../../components/BackButton/BackButton";
import {getParams} from "../../utils";
import CompanyInfo from "../../components/CompanyInfo/CompanyInfo";
import qs from 'qs';
import {connect} from "dva";


class TeamInfoWrite extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      teamMatchDetail: {},
    }
  }

  submit = () => {
    const {history, location} = this.props;
    const params = this.ref.getTeamInfoData();
    if(!Object.keys(params).length){
      return message.error('请填写必填项！');
    }
    if(params.birth.split(' ')[0].replace(/-/g,'') !== String(params.idCard).substring(6, 14)){
      return message.error('身份证和出生日期不匹配！');
    }
    params.mId = getParams(location.search).mId;
    sessionStorage.setItem('cInfo', JSON.stringify(params));
    history.push(`/competition/${params.mId}/project_info_write?egistrationNotice=${getParams(location.search).egistrationNotice}&${qs.stringify(params)}`);
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      teamMatchDetail: nextProps.teamMatchDetail
    })
  }

  render() {
    const {location} = this.props;
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w mt39 bg-white pb80'>
          <div className='bl-form'>
            <div className='form-title'>报名</div>
            <CompanyInfo teamMatchDetail={this.state.teamMatchDetail} matchId={getParams(location.search).mId} wrappedComponentRef={(form) => this.ref = form}/>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <BackButton text='取消'/>
            <div className='main-button' onClick={this.submit}>下一步</div>
          </Row>
        </div>
        <div className='app_notes'>
          <h6 className=''>报名须知：</h6>
          <div className='competition-detail' dangerouslySetInnerHTML={{__html: decodeURIComponent(getParams(location.search).egistrationNotice)}}/>
        </div>
      </div>
    );
  }
};

export default connect(({competition}) => competition)(TeamInfoWrite);
