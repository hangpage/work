/**
 * @Description: 赞通知
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/26 18:33
 */
import React from 'react';
import {connect} from "dva";
import {Empty} from "antd";
import CommentCard from "../../../components/CommentCard/CommentCard";

const Awesome = ({awesome}) => {
  return (
    <div style={{padding: '0 20px'}}>
      {awesome.length ? awesome.map((item, key) =>
        <CommentCard time={item.createTime} action='赞了这条动态' key={key} userImg={item.img} content={item.content} nickName={item.nickName} osImg={item.osImg} osNickName={item.osNickName}/>
      ) : <Empty/>}
    </div>
  );
};

export default connect(({home}) => home)(Awesome);
