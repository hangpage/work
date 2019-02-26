/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/26 18:17
 */
import React from 'react';
import styles from './SystemMessage.less'

const SystemMessage = ({title, time}) => {
  return (
    <div className={styles.card}>
      <i className='icon-message'/>
      <div className={styles.box}>
        <div className={styles.message}>
          {title}
        </div>
        <div className={styles.time}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default SystemMessage;
