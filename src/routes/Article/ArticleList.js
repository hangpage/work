/**
 * @Description: 文章列表
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/3/5 14:59
 */
import React from 'react';
import ActivityList from "../../components/ActivityList/ActivityList";

const ArticleList = () => {
  return (
    <div className="bg-white pt39 pb80">
      <div className="w">
        <ActivityList url='/api/article/findList' linkTo='article'/>
      </div>
    </div>
  );
};

export default ArticleList;
