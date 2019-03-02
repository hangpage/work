import React from 'react';
import styles from './ActivityCard.less';

const ActivityCard = ({img, title, time, read, size=''}) => {
  return (
    <div className={styles[`${size}card`]}>
      <img src={img} alt=""/>
      <div className={styles.desc}>
        <p className={styles.title} style={{"WebkitBoxOrient": "vertical"}}>{title}</p>
        <p style={{marginTop: 7}}>
          <span className={styles.time}>{time}</span>
          <span className={styles.read}>阅读量：<span className={'deep-gray'}>{read}</span></span>
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
