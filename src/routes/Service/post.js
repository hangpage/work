/**
 * @Description: 报修
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import {Form, Input, message, Row} from "antd";
import {equalResultStatus} from "../../utils";
import {serviceDeclare} from "../../services/service";
import BackButton from "../../components/BackButton/BackButton";
import {MOBILE_VALIDATE} from "../../utils/validate";


const Post = ({form, history}) => {
  const {getFieldDecorator} = form;
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 8},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 16},
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
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        serviceDeclare(values).then(({data}) => {
          if (equalResultStatus(data)) {
            message.success('申请成功');
            history.push('/service')
          } else {
            message.error(data.message);
          }
        });
      }
    });
  };

  const INPUT_LIST = [{
    label: '联系人',
    field: 'name',
    validate: {}
  }, {
    label: '联系电话',
    field: 'phone',
    validate: MOBILE_VALIDATE
  }];

  return (
    <div className='second-bg'>
      <div className="w service-form-wrapper form-bl">
        <Form>
          {INPUT_LIST.map((item, index) => {
            return (
              <Form.Item
                {...formItemLayout}
                label={item.label}
                key={index}
              >
                {getFieldDecorator(`${item.field}`, {
                  rules: [{required: true, message: '必填项'}, item.validate || {}],
                })(
                  <Input placeholder={`请输入${item.label}`}/>
                )}
              </Form.Item>
            )
          })}
          <Form.Item
            {...formItemLayout}
            label="服务内容"
          >
            {getFieldDecorator('note', RULE)(
              <Input.TextArea placeholder='请输入服务内容...' style={{height: 360}}/>
            )}
          </Form.Item>
        </Form>
        <Row type='flex' justify='space-around'>
          <BackButton />
          <div className='main-button' onClick={submit}>提交</div>
        </Row>
      </div>
    </div>
  );
}

export default Form.create()(Post);
