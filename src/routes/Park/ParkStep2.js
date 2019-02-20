/**
 * @Description: 园区入驻第2步
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Col, DatePicker, Form, Input, message, Radio, Row} from 'antd';
import {equalResultStatus, getParams, reFormatParams} from "../../utils";
import Const from "../../utils/Const";
import ComboBox from "../../components/ComboBox";
import {parkSavePrincipal} from "../../services/park";


const list1 = [{
  label: '是否获得融资',
  field: 'isFinancing',
  type: 'radio',
  options: Const.YesOrNoOptions
}, {
  label: '融资金额（w）',
  field: 'financingFunds'
}, {
  label: '自有资金（w）',
  field: 'privateCapital'
}, {
  label: '民间借贷（w）',
  field: 'privateLending'
}, {
  label: '风险投资（w）',
  field: 'ventureVapital'
}, {
  label: '银行借贷（w）',
  field: 'bankLending'
},{
  label: '种子资金（w）',
  field: 'seedFunding'
}, {
  label: '天使投资金额（w）',
  field: 'angelInvestment'
}, {
  label: 'A轮融资金额（w）',
  field: 'A'
}, {
  label: 'B轮融资金额（w）',
  field: 'B'
}, {
  label: 'C轮融资金额（w）',
  field: 'C'
}, {
  label: '其他融资金额（w）',
  field: 'other'
},{
  label: '出让股权',
  field: 'equity'
},];

class ParkStep2 extends React.Component {
  constructor(props) {
    super(props);
  }


  submit = () => {
    const {form, history, location} = this.props;
    const {validateFields} = form;
    validateFields((err, values) => {
      if (!err) {
        let params = values;
        params.token = sessionStorage.getItem('token');
        params.rtId = getParams(location.search).rtId;
        parkSavePrincipal(reFormatParams(params)).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('保存成功');
            history.push({
              pathname: '/park/parkStep2?rtId=' + params.rtId,
            });
          } else {
            message.error(data.message);
          }
        })
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div style={{background: '#FAFAFA', paddingBottom: 60}}>
        <div className='w mt39 bg-white pb80'>
          <div className='bl-form'>
            <div className='form-title'>填写公司与项目信息</div>
            <div className="text-align mt40">
              <span className="form-name">融资情况</span>
            </div>
            <div className="form-content">
              <Form>
                <Row gutter={138}>
                  {list1.map((item, index) => {
                    var comp = <Input placeholder={`请输入${item.label.replace('（w）', '')}`}/>;
                    if (item.type === 'select') {
                      comp = <ComboBox placeholder={`请选择${item.label}`} url={item.url || ''}/>;
                    } else if (item.type === 'datepicker') {
                      comp = <DatePicker placeholder={`请选择${item.label}`}/>;
                    } else if (item.type === 'radio') {
                      comp =
                        (<Radio.Group>
                          {item.options.map((option, oindex) => <Radio key={oindex}
                                                                       value={option.value}>{option.text}</Radio>)}
                        </Radio.Group>)
                    }
                    return (
                      <Col span={12} key={index}>
                        <Form.Item
                          label={item.label}
                        >
                          {getFieldDecorator(`${item.field}`, Const.RULE)(
                            comp
                          )}
                        </Form.Item>
                      </Col>
                    )
                  })}
                </Row>
              </Form>
            </div>
          </div>
          <Row type='flex' justify='space-around' gutter={360}>
            <div className='main-button' onClick={this.submit} style={{width: 600}}>下一步</div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Form.create()(ParkStep2);
