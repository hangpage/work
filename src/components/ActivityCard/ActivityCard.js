import React from 'react';
import styles from './ActivityCard.less';

const ActivityCard = ({img, title, time, read}) => {
  return (
    <div className={styles.card}>
      <img src={img} alt=""/>
      <div className={styles.desc}>
        <p className={styles.title}>{title}</p>
        <p>
          <span className={styles.time}>{time}</span>
          <span className={styles.read}>阅读量：{read}</span>
        </p>
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
};

export default ActivityCard;
