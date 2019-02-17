/**
 * @Description: 公告详情/文章详情
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/12 17:58
 */
import React from 'react';
import {connect} from "dva";
import {Input} from 'antd';
import FabulousButton from "../../components/Button/FabulousButton";

const Detail = ({data}) => {
  const onClick = () => {
    console.log('----------------点赞功能')
  }
  return (
    <div className='second-bg'>
        <div className="w">
          <div className="article-box mt39">
            <p>{data.title}</p>
            <div className="info">
              <span>{data.createTime}</span>
              <span className='ml38 mr38'>|</span>
              <span>{data.pageViews}人阅读</span>
            </div>
            <div className="dash-line-gray mt27" />
            <div className='content' dangerouslySetInnerHTML={{__html: data.content}} />
            <div style={{textAlign: 'center'}}>
              <FabulousButton onClick={onClick}/>
            </div>
          </div>
          <div className="solid-line6 mt40 mb40" />
          <Input.TextArea style={{height: 180}} className='bl-input' placeholder='请输入评论内容...'/>
          <div className="main-button mt40" style={{width: 146, borderRadius: 25}}>评论</div>
        </div>
    </div>
  );
};

export default connect(({notice}) => (notice))(Detail);
