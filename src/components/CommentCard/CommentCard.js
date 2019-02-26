/**
 * @Description: 评价卡片
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/26 23:45
 */
import React from 'react';
import styles from './CommentCard.less'
import Avatar from "antd/es/avatar";

const CommentCard = ({userImg, nickName, osNickName, osImg, content, time, action}) => {
  return (
    <div className={styles.card}>
        <Avatar src={userImg} size={50}/>
        <div className={styles.box}>
          <div className={styles.nickname}>{nickName}</div>
          <div className={styles.time}>{time}</div>
          <div className={styles.action}>{action}</div>
          <div className={styles.child}>
            <Avatar size={49}/>
            <div className={styles.childContent}>
              <div className={styles.osNickname}>{osNickName}</div>
              <div className={styles.osComment}>{content}</div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CommentCard;
