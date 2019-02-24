/**
 * @Description: 
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/24 13:50
 */
import React from 'react';
import {Avatar} from "antd";
import styles from './Comment.less';
import moment from 'moment';

const Comment = ({nickName, awesomeCount, replyToWhom, type, content, createTime, isAwesome, onReplyClick, onCommentDetailClick, onReportClick, commentCount, userImg, onAwesomeClick}) => {
  createTime = moment(createTime).format('YYYY/MM/DD HH:MM:ss');
  awesomeCount = awesomeCount || 0;
  const style = type === 'child' ? {paddingRight: 0, marginRight: 0, borderRight: 'none'} : {};
  const cls = isAwesome === '1' ? 'icon-pressed-dianzan' : 'icon-default-dianzan';
  return (
    <div className={styles.card}>
      <Avatar size={49} src={userImg}/>
      <div className={styles.detail}>
        <div className={styles.action}>
          <span className={styles.name}>{nickName}</span>
          {replyToWhom && <span className={styles.replyText}>回复</span>}
          {replyToWhom && <span className={styles.name}>{replyToWhom}</span>}
          <span className={styles.reply} onClick={onReplyClick}>回复</span>
          <div className={styles.actionBox}>
            {type !== 'child' &&
            <span className={styles.actionBtn} style={style} onClick={onCommentDetailClick}><i className='icon-comment mr10'
                                                                                 style={{verticalAlign: 'middle'}}/>{commentCount}</span>
            }
            <span className={styles.actionBtn} style={style}  onClick={onAwesomeClick}><i className={`${cls} mr10`} style={{verticalAlign: 'middle', marginBottom: 4}}/>{awesomeCount}</span>
            {type !== 'child' &&
              <span className={styles.report} onClick={onReportClick}>举报</span>}
          </div>
        </div>
        <div className={styles.time}>{createTime}</div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

export default Comment;
