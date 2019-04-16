import React from "react";
import {Layout} from 'antd';
import logo from './imgs/gray-logo.png';
import Const from "../../utils/Const"


const Footer = () => {
  return (
    <div className='footer'>
      <Layout.Footer>
        <div className='w' style={{position: 'relative'}}>
          <img className='logo' src={logo} alt=""/>
          <p>联系地址：{Const.COMPANY_ADDRESS}</p>
          <p>联系电话：{Const.COMPANY_CONTACT}</p>
          <p>Copyright@2000-2017 www.bjbys.net.cn All right reserved 北京高校毕业生就业指导中心 版权所有
            京ICP备05069530号 文保网安备1101080054</p>
        </div>
      </Layout.Footer>
    </div>
  )
};

export default Footer;
