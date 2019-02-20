/**
 * @Description: 个人中心团队信息
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Form, message, Row} from 'antd';
import {equalResultStatus, getParams} from "../../../utils";
import {parkResidentTeam} from "../../../services/park";
import TeamInfo from "../../../components/TeamInfo/TeamInfo";


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
    params.token = sessionStorage.getItem('token');
    params.rtId = getParams(location.search).rtId;
    let formData = new FormData();
    Object.keys(params).forEach((item) => {
      formData.append(item, params[item]);
    });
    parkResidentTeam(formData).then(({data}) => {
      if (equalResultStatus(data)) {
        message.success('保存成功');
        history.push({
          pathname: '/index',
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
