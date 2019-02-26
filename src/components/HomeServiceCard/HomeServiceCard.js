/**
 * @Description: 个人中心服务卡片
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/26 16:35
 */
import React from 'react';
import styles from './HomeServiceCard.less';
import Const from '../../utils/Const';

const HomeServiceCard = ({status, time, name, phone, content}) => {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className="colorblue">{Const.SERVICE_STATUS[status]}</span>
        <span className={styles.time}>{time}</span>
      </div>
      <div className={styles.middle}>
        <span className={styles.name}>联系人：{name}</span>
        <span className={styles.phone}>联系方式：{phone}</span>
      </div>
      <div className={styles.bottom}>
        <div className={styles.title}>服务内容：</div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

export default HomeServiceCard;
