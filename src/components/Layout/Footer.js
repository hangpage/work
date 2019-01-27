import React from "react";
import {Layout} from 'antd';
import logo from './imgs/logo.png';
import Const from "../../utils/Const"


const Footer = () => {
  return (
    <div className='footer'>
      <Layout.Footer>
        <div className='w' style={{position: 'relative'}}>
          <img className='logo' src={logo} alt=""/>
          <p>联系地址：{Const.COMPANY_ADDRESS}</p>
          <p>联系电话：{Const.COMPANY_CONTACT}</p>
          <p>{Const.COMPANY_COPYRIGHT}</p>
        </div>
      </Layout.Footer>
    </div>
  )
};

export default Footer;
