/**
 * @Description: 服务主页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/11 21:46
 */
import React from 'react';
import banner from "../../assets/banner/banner-fuwu.png";
import {Col, Pagination, Row} from "antd";
import {connect} from "dva";
import config from '../../utils/config';
import {Link} from "dva/router";

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


const Index = ({list, count}) => {
  return (
    <div>
      <div style={{width: '100%'}}>
        <img style={{width: '100%'}} src={banner} alt=""/>
      </div>
      <div className='w mt60'>
        <Row type='flex'>
          {LIST.map((item, index) => {
            return (
              <Col key={index}>
                <Link to={item.link}>
                  <div className="service-card" style={{backgroundImage: `url(${item.img})`}}>
                    <div className="mask">
                      {/*<img className='img' src={item.img} alt=""/>*/}
                      <img className='icon' src={item.icon} alt=""/>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </Link>
              </Col>
            )
          })}
        </Row>
        <Row gutter={60} className='mt10'>
          {list.map((item, index) => {
            return (
              <Col span={12} key={index}>
                <Link to={`/service/${item.id}`}>
                  <div className="service-type mt50"
                       style={{background: `url(${config.URL}${item.pic})}`}}>
                    <img src={`${config.URL}${item.pic}`} alt=""/>
                    <div className="img-box">
                      {item.name}
                    </div>
                  </div>
                </Link>
              </Col>
            )
          })}
        </Row>
        <Pagination total={count} className='mt60 mb80'/>
      </div>
    </div>

  );
};

export default connect(({service}) => (service))(Index);
