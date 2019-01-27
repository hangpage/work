/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/1/22 23:42
 */
import React from 'react';
import {Link} from 'dva/router'
import {Menu, Layout} from "antd";

const Header = () => {
  return (
    <Layout.Header style={{height: 90, background: 'rgba(243,243,243,1)', padding:0}}>
     <div className="w">
       <Menu
         theme="dark"
         mode="horizontal"
         defaultSelectedKeys={['1']}
         style={{lineHeight: '90px', height: '90px', background:'transparent'}}
       >
         <Menu.Item key="1"><Link to="/index">首页</Link></Menu.Item>
         <Menu.Item key="2"><Link to="/find">发现</Link></Menu.Item>
         <Menu.Item key="3"><Link to="/service">服务</Link></Menu.Item>
       </Menu>
     </div>
    </Layout.Header>
  );
};

export default Header;
