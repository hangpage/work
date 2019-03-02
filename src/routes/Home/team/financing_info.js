/**
 * @Description: 更新团队融资信息
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Form, message, Row} from 'antd';
import {equalResultStatus, reFormatParams} from "../../../utils";
import FinancingInfo from "../../../components/FinancingInfo/FinancingInfo";
import {connect} from "dva";
import {parkResidentTeam} from "../../../services/park";

class ParkStep2 extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  submit = () => {
    const params = this.ref.getTeamInfoData();
    if(!Object.keys(params).length){
      return message.error('请填写必填项！');
    }
    params.token = sessionStorage.getItem('token');
    params.id = this.props.teamInfo.id;
    parkResidentTeam(reFormatParams(params)).then(({data}) => {
      if (equalResultStatus(data)) {
        message.success('保存成功');
      } else {
        message.error(data.message);
      }
    })
  };

  componentDidMount() {
    this.ref.props.form.setFieldsValue(this.props.teamInfo)
  }

  render() {
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w bg-white pb80'>
          <div className='bl-form'>
            <div className="text-align mt40">
              <span className="form-name">融资情况</span>
            </div>
            <FinancingInfo wrappedComponentRef={(form) => this.ref = form}/>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>保存</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(({home}) => (home))(Form.create()(ParkStep2));
