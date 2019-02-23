/**
 * @Description: 友商服务详情页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/30 23:26
 */
import React from 'react';
import {connect} from "dva";
import Modal from "./component/modal";
import {equalResultStatus, pathMatchRegexp} from "../../utils";
import {serviceDeclare, serviceQueryMeeting} from "../../services/service";
import {message} from "antd";

const Detail = ({detail, modalVisible, dispatch, location,}) => {
  console.log(location)
  const onBtnClick = () => {
    dispatch({
      type: 'service/updateState',
      payload: {
        modalVisible: true
      }
    })
  };

  const onCancel = () => {
    dispatch({
      type: 'service/updateState',
      payload: {
        modalVisible: false
      }
    })
  };
  const onOk = (data) => {
    const match = pathMatchRegexp('/service/:id/detail', location.pathname);
    const params = data;
    params.serviceId = match[1];
    serviceDeclare(params).then(({data}) => {
      if(equalResultStatus(data)){
        message.success('申请成功');
        dispatch({
          type: 'service/updateState',
          payload: {
            modalVisible: false
          }
        })
      }else{
        message.error(data.message);
      }
    });
  };
  const modalProps = {
    visible: modalVisible,
    onOk,
    onCancel
  };

  return (
    <div className='second-bg'>
      <div className="w">
        <div className="card service-detail-card">
          <img src={detail.img} alt=""/>
          <div className="right">
            <h1>中信银行<span>{detail.service}</span></h1>
            <div className='btn' onClick={onBtnClick}>申请服务</div>
            <Modal {...modalProps}/>
          </div>
        </div>
        <div className='competition-detail mt38' dangerouslySetInnerHTML={{__html: detail.content}} />
      </div>
    </div>
  );
};

export default connect(({service}) => (service))(Detail);
