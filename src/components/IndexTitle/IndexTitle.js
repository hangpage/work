/**
 * @Description: 
 * @Author: zzhihang@hotmail.com
 * @date: 2019/1/23 23:31
 */
import React from 'react';
import icon from '../../assets/index/jiantou.png';

const IndexTitle = ({title, alias}) => {
  return (
    <div style={{textAlign: 'center', marginBottom: 60}}>
      <h6 style={{fontSize:'30px', fontWeight: 'bold', color:'rgba(102,102,102,1)', marginBottom: '4px'}}>{title}</h6>
      <p style={{color:'rgba(153,153,144,1)', letterSpacing: '5px', marginBottom: 5}}>{alias}</p>
      <img src={icon} alt=""/>
    </div>
  );
};

export default IndexTitle;
