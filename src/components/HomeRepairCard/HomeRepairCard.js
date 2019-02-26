/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/26 17:18
 */
import React from 'react';
import styles from './HomeRepairCard.less'

const HomeRepairCard = ({room, position, desc, pic}) => {
  return (
    <div className={styles.card}>
        <div className={styles.top}>
          <span className={styles.room}>房间号：{room}</span>
          <span>故障位置：{position}</span>
        </div>
        <div className='mt30'>故障描述：{desc}</div>
        <div className='mt17 pl99'>
          {pic.split(',').map((p) => <img className={styles.descImg} src={p} alt=""/>)}
        </div>
    </div>
  );
};

export default HomeRepairCard;
