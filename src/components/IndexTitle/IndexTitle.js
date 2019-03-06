/**
 * @Description: 
 * @Author: zzhihang@hotmail.com
 * @date: 2019/1/23 23:31
 */
import React from 'react';
import icon from '../../assets/index/jiantou.png';
import styles from './IndexTitle.less';
import {Link} from "dva/router";

const IndexTitle = ({title, alias, moreLink}) => {
  return (
    <div style={{textAlign: 'center', marginBottom: 50, marginTop: 79}}>
      <div style={{position: 'relative'}}>
        <h6 className={styles.title}>{title}</h6>
        <Link className={styles.more} to={moreLink}>
          <span>更多</span>
        </Link>
      </div>
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
