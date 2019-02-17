/**
 * @Description: 比赛卡片
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/27 14:00
 */
import React from 'react';
import styles from "./Competition.less";

const CompetitionCard = ({img, title, time, read}) => {
  return (
    <div>
      <div className={styles.card}>
        <img src={img} alt=""/>
        <div className={styles.desc}>
          <span className={styles.status}>报名中</span>
          <p className={styles.title}>{title}</p>
          <p>
            <span className={styles.time}>{time}</span>
            <span className={styles.read}>已报名：<span className="deep-gray">{read}</span></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;
