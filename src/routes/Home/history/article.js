/**
 * @Description: 比赛
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 16:58
 */
import React from 'react';
import {connect} from "dva";
import {Link} from "dva/router";
import HorizontalCard from "../../../components/HorizontalCard/HorizontalCard";
import Empty from "antd/es/empty";
import {Pagination} from "antd";

const Article = ({historyArticle, historyArticleCount, dispatch}) => {
  const onPageChange = (pageNo, pageSize) => {
    dispatch({
      type: 'home/historyArticle',
      payload: {
        pageNo,
        pageSize
      }
    })
  };
  return (
    <div className='pl20 pr 20'>
      {historyArticle.length ? historyArticle.map((item, index) => {
        return (
          <Link key={index} to={`/article/${item.id}`}>
            <HorizontalCard style={{marginTop: 40}} img={item.pic} time={item.createTime}
                            title={item.title} count={item.pageViews} desc={item.intro} countDesc='阅读量' status={item.status}/>
          </Link>
        )
      }) : <Empty/>}
      <Pagination total={historyArticleCount} onChange={onPageChange} pageSize={4} className='mt30'/>
    </div>
  );
};

export default connect(({home}) => (home))(Article);
