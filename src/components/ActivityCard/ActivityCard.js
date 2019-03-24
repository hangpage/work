import React from 'react';
import styles from './ActivityCard.less';
import {Typography} from 'antd';
import isEnd from "../../utils";


const ActivityCard = ({img, title, time, read, size='', style, endTime}) => {
  return (
    <div style={style} className={styles[`${size}card`]}>
      <img src={img} alt=""/>
      <div className={styles.desc}>
        {endTime && <span className={styles.status}>{isEnd(endTime) ? '已结束' : '报名中'}</span>}
        <Typography.Text className={styles.title} ellipsis={{ rows: 2}}>{title}</Typography.Text>
        <p style={{marginTop: 7}}>
          <span className={styles.time}>{time}</span>
          <span className={styles.read}>阅读量：<span className={'deep-gray'}>{read || 0}</span></span>
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
