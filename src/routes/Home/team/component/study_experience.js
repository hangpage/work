import {Col, DatePicker, Form, Input, Modal, Radio, Row} from "antd";
import React from "react";
import ComboBox from "../../../../components/ComboBox";
import Const from "../../../../utils/Const";
import moment from "moment";


const {RangePicker} = DatePicker;


@Form.create()
class StudyExperience extends React.Component{
  handleOk = () => {
    const { onOk, form, itemKey } = this.props;
    const { validateFields, getFieldsValue } = form;
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = getFieldsValue();
      data.f2 = moment(data.f2[0]).format('YYYY-MM-DD') + '~' + moment(data.f2[1]).format('YYYY-MM-DD');
      if(itemKey){
        data.itemKey = itemKey;
      }
      onOk(data)
    })
  };
  render() {
    const { form, modalItem, ...modalProps} = this.props;
    const {getFieldDecorator} = form;

    const list1 = [{
      label: '阶段',
      field: 'f1',
      initialValue: modalItem.f1
    }, {
      label: '时间',
      field: 'f2',
      type: 'rangepicker',
      initialValue: modalItem.f2
    }, {
      label: '学校',
      field: 'f3',
      initialValue: modalItem.f3
    }, {
      label: '专业',
      field: 'f4',
      initialValue: modalItem.f4
    },{
      label: '学习形式',
      field: 'f5',
      initialValue: modalItem.f5
    }, {
      label: '学历',
      field: 'f6',
      initialValue: modalItem.f6
    }, {
      label: '证明人及电话',
      field: 'f7',
      initialValue: modalItem.f7
    }];
    return (
      <Modal
        title="添加学习经历"
        centered
        width={600}
        {...modalProps}
        onOk={this.handleOk}
      >
        <Form>
          <Row>
            {list1.map((item, index) => {
              var comp = <Input placeholder={`请输入${item.label}`}/>;
              if (item.type === 'select') {
                comp = <ComboBox placeholder={`请选择${item.label}`} url={item.url || ''}/>;
              } else if (item.type === 'datepicker') {
                comp = <DatePicker placeholder={`请选择${item.label}`}/>;
              } else if(item.type === 'rangepicker'){
                  comp = <RangePicker/>
              }else if (item.type === 'radio') {
                comp =
                  (<Radio.Group>
                    {item.options.map((option, oindex) => <Radio key={oindex}
                                                                 value={option.value}>{option.text}</Radio>)}
                  </Radio.Group>)
              }
              return (
                <Col span={24} key={index}>
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
      </Modal>
    )
  }
}

export default StudyExperience;
