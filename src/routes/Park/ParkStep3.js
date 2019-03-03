/**
 * @Description: 园区入驻第3步
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Form, message, Row} from 'antd';
import {equalResultStatus, getParams} from "../../utils";
import {parkResidentTeam, parkSavePrincipal} from "../../services/park";
import TeamInfo from "../../components/TeamInfo/TeamInfo";


class ParkStep3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  submit = () => {
    const {history, location} = this.props;
    const params = this.ref.getTeamInfoData();
    if (!Object.keys(params).length) {
      return message.error('请填写必填项！');
    }
    const principalStr = [];
    const array = Object.keys(params);
    array.forEach((item) => {
      if(item !== 'memberStr'){
        principalStr.push(params[item]);
      }
    });
    const subData = {};
    subData.token = sessionStorage.getItem('token');
    subData.id = getParams(location.search).rtId;
    subData.principalStr = principalStr.join(',');
    subData.memberStr = params.membersStr;
    parkResidentTeam(subData).then(({data}) => {
      if (equalResultStatus(data)) {
        message.success('入驻成功');
        history.push('/index');
      } else {
        message.error(data.message);
      }
    })
  };

  render() {
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w mt39 bg-white pb80'>
          <div className='bl-form'>
            <div className='form-title'>填写公司与项目信息</div>
            <div className="text-align mt40">
              <span className="form-name">团队情况</span>
            </div>
            <TeamInfo wrappedComponentRef={(form) => this.ref = form}/>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>提交</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(ParkStep3);
