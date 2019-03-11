/**
 * @Description: 公告列表
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/12 16:01
 */
import React from 'react';
import {Col, Row} from "antd";
import {connect} from "dva";
import {Link} from "dva/router";

const Index = ({list}) => {
  return (
    <div className='second-bg pt38'>
      <div className="w bg-white">
        <div className="notice-box">
          <Row gutter={83} type='flex'>
            {list.map((item, index) => {
              return (
                <Col span={12} key={index}>
                  <Link to={`/notice/${item.id}`}>
                    <div className="notice">
                      <p>{item.title}</p>
                      <div>
                        <span className='time'>{item.createTime}</span>
                        <span className='ml30'>{item.pageViews || 0}人阅读</span>
                      </div>
                    </div>
                  </Link>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default connect(({notice}) => (notice))(Index);
