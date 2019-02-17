/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/1/22 23:42
 */
import React from 'react';
import {Link, routerRedux} from 'dva/router'
import {Menu, Layout} from "antd";
import logo from "./imgs/logo.png";
import config from '../../utils/config';
import searchIcon from '../../assets/icon/icon-search.png';
import {connect} from "dva";
import SearchButton from "../SearchButton/SearchButton";

const LIST = [{
  text: '首页',
  linkTo: '/index',
  icon: require('../../assets/icon/icon-default-shouye.png'),
  selectIcon: require('../../assets/icon/icon-pressed-shouye.png')
},{
  text: '发现',
  linkTo: '/find',
  icon: require('../../assets/icon/icon-default-faxian.png'),
  selectIcon: require('../../assets/icon/icon-pressed-faxian.png')
},{
  text: '服务',
  linkTo: '/service',
  icon: require('../../assets/icon/icon-default-fuwu.png'),
  selectIcon: require('../../assets/icon/icon-pressed-fuwu.png')
}];

const Header = ({headerMenuSelectedKeys, user, dispatch, showSearch}) => {

  const onMenuItemClick = (e) => {
    dispatch({
      type: 'app/updateState',
      payload: {
        headerMenuSelectedKeys: [e.key]
      }
    })
  };

  const onSearchClick = () =>{
    dispatch({
      type: 'app/updateState',
      payload: {
        showSearch: true
      }
    })
  };

  const onCloseClick = () => {
    dispatch({
      type: 'app/updateState',
      payload: {
        showSearch: false
      }
    })
  };


  const onSearch = () => {
      dispatch(routerRedux.push({
        pathname: '/search'
      }))
  };

  return (
    <Layout.Header style={{height: 90, lineHeight: '90px', background: 'rgba(243,243,243,1)', padding:0}}>
     <div className="w" style={{display: 'flex', alignItems: 'center'}}>
       <img className='logo' src={logo} alt="" style={{marginRight: 176}}/>
       {!showSearch && <Menu
         theme="dark"
         mode="horizontal"
         defaultSelectedKeys={headerMenuSelectedKeys}
         style={{lineHeight: '90px', height: '90px', background:'transparent'}}
       >
         {LIST.map((item, index) => {
           if(index === Number(headerMenuSelectedKeys[0])){
             return <Menu.Item onClick={onMenuItemClick} key={index}><Link to={item.linkTo}><img src={item.selectIcon} alt="" style={{height: 18, width: 18, marginRight: 9}}/>{item.text}</Link></Menu.Item>
           }
           return <Menu.Item onClick={onMenuItemClick} key={index}><Link to={item.linkTo}><img src={item.icon} alt="" style={{height: 18, width: 18, marginRight: 9}}/>{item.text}</Link></Menu.Item>
         })}
       </Menu>}
       {!showSearch && <img className='search' src={searchIcon} onClick={onSearchClick} alt=""/>}
       {showSearch && <SearchButton onCloseClick={onCloseClick} onSearchClick={onSearch}/>}
        <Link to='/home/profile'>
          <img className='avatar' src={config.URL + (user.img || '')} alt=""/>
          <span className='nickname'>{user.nickName}</span>
        </Link>
     </div>
    </Layout.Header>
  );
};

export default connect(({app}) => (app))(Header);
