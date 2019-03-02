/**
 * @Description: 
 * @Author: zzhihang@hotmail.com
 * @date: 2019/1/23 23:31
 */
import React from 'react';
import icon from '../../assets/index/jiantou.png';
import styles from './IndexTitle.less';

const IndexTitle = ({title, alias}) => {
  return (
    <div style={{textAlign: 'center', marginBottom: 50, marginTop: 79}}>
      <h6 className={styles.title}>{title}</h6>
      <p style={{textAlign: 'center', marginBottom: 6, marginTop: 3}}>
        <span className={styles.alias}>
          {alias}
        </span>
      </p>
      <img src={icon} alt=""/>
    </div>
  );
};

export default IndexTitle;
