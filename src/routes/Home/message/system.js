/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/26 18:12
 */
import React from 'react';
import {connect} from "dva";
import {Link} from 'dva/router';
import SystemMessage from "../../../components/SystemMessage/SystemMessage";
import {Empty, Pagination} from "antd";

const System = ({system, systemNoticeCount, dispatch}) => {
  const onPageChange = (pageNo, pageSize) => {
    dispatch({
      type: 'notice/findMessageList',
      payload: {
        pageNo,
        pageSize
      }
    })
  };
  return (
    <div style={{padding: '59px 20px 68px'}}>
      {system.length ? system.map((item, key) =>
        <SystemMessage time={item.createTime} title={item.content} key={key}/>
      ) : <Empty/>}
      <Pagination total={systemNoticeCount} onChange={onPageChange} pageSize={4} className='mt30'/>
    </div>
  );
};

export default connect(({home}) => home)(System);
