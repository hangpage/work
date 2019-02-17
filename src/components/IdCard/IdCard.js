/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 12:56
 */
import React from 'react';
import config from '../../utils/config';

const IdCard = ({photo='', name, autograph}) => {
  return (
    <div className='id-card'>
      <img className='photo' src={config.URL + photo} alt=""/>
      <div className="nick-name">{name}</div>
      <div className="autograph">{autograph}</div>
      <div className="sign">签到</div>
    </div>
  );
};

export default IdCard;
