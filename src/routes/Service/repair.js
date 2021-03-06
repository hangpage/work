/**
 * @Description: 报修
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 13:40
 */
import React from 'react';
import {Form, Input, message, Row} from "antd";
import {equalResultStatus} from "../../utils";
import {repairApply} from "../../services/service";
import BackButton from "../../components/BackButton/BackButton";
import ImageUpload from "../../components/FileUpload/ImageUpload";


const Repair = ({form, history}) => {
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
        values.token = sessionStorage.getItem('token');
        let formData = new FormData();
        Object.keys(values).forEach((item) => {
          formData.append(item, values[item]);
        });
        repairApply(formData).then(({data}) => {
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
    label: '房间号',
    field: 'roomNum'
  }, {
    label: '故障位置',
    field: 'position'
  }];

  return (
    <div className='second-bg'>
      <div className="w service-form-wrapper form-bl">
        <Form layout='horizontal'>
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
          <Form.Item
            {...formItemLayout}
            label="故障描述"
          >
            {getFieldDecorator('content', RULE)(
              <Input.TextArea className='bg-gray' placeholder='请简要的描述一下故障...' style={{height: 360}}/>
            )}
          </Form.Item>
          <Form.Item
            label="故障图片"
            labelCol={{span: 8}}
            wrapperCol={{span: 8}}
            colon={false}
          >
            {getFieldDecorator('pic', RULE)(
              <ImageUpload/>
            )}
          </Form.Item>
        </Form>
        <Row type='flex' justify='space-around'>
          <BackButton/>
          <div className='main-button' onClick={submit}>提交</div>
        </Row>
      </div>
    </div>
  );
}

export default Form.create()(Repair);
