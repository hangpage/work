/**
 * @Description: 车位申请
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import {Form, Input, message, Row} from "antd";
import {equalResultStatus} from "../../utils";
import {parkingApply} from "../../services/service";
import BackButton from "../../components/BackButton/BackButton";


const Parking = ({form}) => {
  const {getFieldDecorator} = form;
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    colon: false
  };

  const RULE = {
    rules: [{
      required: true, message: '必填!',
    }],
  };

  const submit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        parkingApply(values).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('申请成功');
          } else {
            message.error(data.message);
          }
        });
      }
    });
  };

  const INPUT_LIST = [{
    label: '姓名',
    field: 'name'
  }, {
    label: '联系方式',
    field: 'phone'
  }, {
    label: '车型',
    field: 'phone'
  }, {
    label: '车牌号',
    field: 'phone'
  }];

  return (
    <div className='second-bg'>
      <div className="w bg-white br6 mt39 mb80 pb60 pt60">
        <Form>
          {INPUT_LIST.map((item, index) => {
            return (
              <Form.Item
                {...formItemLayout}
                label={item.label}
                key={index}
              >
                {getFieldDecorator(`${item.field}`, RULE)(
                  <Input placeholder={`请输入${item.label}`}/>
                )}
              </Form.Item>
            )
          })}
        </Form>
        <Row type='flex' justify='space-around'>
          <BackButton text='取消'/>
          <div className='main-button' onClick={submit}>提交</div>
        </Row>
      </div>
    </div>
  );
}

export default Form.create()(Parking);
