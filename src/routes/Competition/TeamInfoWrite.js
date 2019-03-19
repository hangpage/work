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


class TeamInfoWrite extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  submit = () => {
    const {history, location} = this.props;
    const params = this.ref.getTeamInfoData();
    if(!Object.keys(params).length){
      return message.error('请填写必填项！');
    }
    params.mId = getParams(location.search).mId;
    sessionStorage.setItem('cInfo', JSON.stringify(params));
    history.push(`/competition/${params.mId}/project_info_write?${qs.stringify(params)}`);
  };

  render() {
    const {location} = this.props;
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w mt39 bg-white pb80'>
          <div className='bl-form'>
            <div className='form-title'>报名</div>
            <CompanyInfo matchId={getParams(location.search).mId} wrappedComponentRef={(form) => this.ref = form}/>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <BackButton text='取消'/>
            <div className='main-button' onClick={this.submit}>下一步</div>
          </Row>
        </div>
      </div>
    );
  }
};

export default TeamInfoWrite;
