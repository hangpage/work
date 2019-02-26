/**
 * @Description: 赞通知
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/26 18:33
 */
import React from 'react';
import {connect} from "dva";
import {Empty} from "antd";
import CommentCard from "../../../components/CommentCard/CommentCard";

const Comment = ({comment}) => {
  return (
    <div style={{padding: '0 20px'}}>
      {comment.length ? comment.map((item, key) =>
        <CommentCard time={item.createTime} action={item.osContent} key={key} userImg={item.userImg} content={item.content} nickName={item.nickName} osImg={item.osImg} osNickName={item.osNickName}/>
      ) : <Empty/>}
    </div>
  );
};

export default connect(({home}) => home)(Comment);
