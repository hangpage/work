/**
 * @Description: 园区入驻第2步
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 20:12
 */
import React from 'react';
import {Col, DatePicker, Form, Input, Radio, Row} from 'antd';
import {reFormatParams} from "../../utils";
import Const from "../../utils/Const";
import ComboBox from "../../components/ComboBox";


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

class FinancingInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  getTeamInfoData = () => {
    const {form} = this.props;
    const {validateFields} = form;
    let params = {};
    validateFields((err, values) => {
      if (!err) {
        params = reFormatParams(values);
      }
    });
    return params;
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
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
    );
  }
}

export default Form.create()(FinancingInfo);
