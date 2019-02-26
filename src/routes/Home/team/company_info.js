/**
 * @Description: 比赛报名
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/3 12:53
 */
import React from 'react';
import {message, Row} from 'antd';
import {equalResultStatus} from "../../../utils";
import InfoForm from '../../../components/CompanyInfo/CompanyInfo'
import {insertTeam} from "../../../services/competition";


class CompanyInfo extends React.Component {
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
    params.id = this.props.teamInfo.id;
    params.token = sessionStorage.getItem('token');
    insertTeam(params).then(({data}) => {
      if (equalResultStatus(data)) {
        message.success('保存成功');
        history.push({
          pathname: '/project_info_write?mId=' + params.mId,
        });
      } else {
        message.error(data.message);
      }
    })
  };

  render() {
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w bg-white pb80'>
          <div className='bl-form'>
            <InfoForm matchId='' initialValueMap={this.props.teamInfo}  wrappedComponentRef={(form) => this.ref = form}/>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>保存</div>
          </Row>
        </div>
      </div>
    );
  }
};

export default CompanyInfo;
