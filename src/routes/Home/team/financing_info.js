/**
 * @Description: 园区入驻第2步
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Form, message, Row} from 'antd';
import {equalResultStatus, getParams, reFormatParams} from "../../../utils";
import {parkResidentTeam, parkSavePrincipal} from "../../../services/park";
import FinancingInfo from "../../../components/FinancingInfo/FinancingInfo";
import TeamInfo from "../../../components/TeamInfo/TeamInfo";

class ParkStep2 extends React.Component {
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
    params.token = sessionStorage.getItem('token');
    params.id = this.props.teamInfo.id;
    parkResidentTeam(reFormatParams(params)).then(({data}) => {
      if (equalResultStatus(data)) {
        message.success('保存成功');
        history.push({
          pathname: '/park/parkStep2?rtId=' + params.rtId,
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
            <div className="text-align mt40">
              <span className="form-name">融资情况</span>
            </div>
            <FinancingInfo initialValueMap={this.props.teamInfo} wrappedComponentRef={(form) => this.ref = form}/>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>保存</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(ParkStep2);
