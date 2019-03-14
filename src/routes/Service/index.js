/**
 * @Description: 服务主页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/11 21:46
 */
import React from 'react';
import banner from "../../assets/banner/banner-fuwu.png";
import {Col, Pagination, Row, Modal} from "antd";
import {connect} from "dva";
import config from '../../utils/config';
import {validateIsResident} from "../../utils";

const LIST = [{
  img: require('../../assets/service/img-yuyuehuiyishi.png'),
  icon: require('../../assets/service/icon-yuyuehuiyishi.png'),
  text: '预约会议室',
  link: '/service/type/meeting'
}, {
  img: require('../../assets/service/img2.png'),
  icon: require('../../assets/service/icon-chuwuguishiyong.png'),
  text: '储物柜使用',
  link: '/service/type/lockers'
}, {
  img: require('../../assets/service/img3.png'),
  icon: require('../../assets/service/icon-baoxiu.png'),
  text: '报修',
  link: '/service/type/repair'
}, {
  img: require('../../assets/service/img4.png'),
  icon: require('../../assets/service/icon-tijiaofuwu.png'),
  text: '提交服务',
  link: '/service/type/post'
}, {
  img: require('../../assets/service/img4.png'),
  icon: require('../../assets/service/icon-cheweishenqing.png'),
  text: '车位申请',
  link: '/service/type/parking'
}];


const Index = ({serviceTypeList, serviceTypeCount, dispatch, history}) => {
  const onPageChange = (pageNo, pageSize) => {
    dispatch({
      type: 'service/queryServiceTypeList',
      payload: {pageNo, pageSize}
    })
  };

  const doLink = (link) => {
      if(validateIsResident()){
        history.push(link)
      }else{
        Modal.warning({
          title: '您还未入驻！',
          content: '该功能只对已入驻成员开放，请您先入入驻或选择加入已入驻的团队！',
          centered: true
        });
      }
  };

  return (
    <div className='bg-white pb80'>
      <div style={{width: '100%'}}>
        <img style={{width: '100%'}} src={banner} alt=""/>
      </div>
      <div className='w mt60'>
        <Row type='flex'>
          {LIST.map((item, index) => {
            return (
              <Col key={index}>
                <div className="service-card" style={{backgroundImage: `url(${item.img})`}} onClick={() => {doLink(item.link)}}>
                  <div className="mask">
                    {/*<img className='img' src={item.img} alt=""/>*/}
                    <img className='icon' src={item.icon} alt=""/>
                    <p>{item.text}</p>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
        <Row gutter={60} className='mt10'>
          {serviceTypeList.map((item, index) => {
            return (
              <Col span={12} key={index}>
                <div className="service-type mt50" onClick={() => {doLink(`/service/${item.id}`)}}
                     style={{background: `url(${config.URL}${item.pic})}`}}>
                  <img src={`${config.URL}${item.pic}`} alt=""/>
                  <div className="img-box">
                    {item.name}
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
        <Pagination total={serviceTypeCount} className='mt60' defaultCurrent={1} onChange={onPageChange} pageSize={4}/>
      </div>
    </div>

  );
};

export default connect(({service}) => (service))(Index);
