/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @date: 2019/1/22 23:42
 */
import React from 'react';
import {Link, routerRedux, withRouter} from 'dva/router'
import {Avatar, Badge, Layout, Menu} from "antd";
import logo from "./imgs/r-logo.png";
import searchIcon from '../../assets/icon/icon-search.png';
import {connect} from "dva";
import SearchButton from "../SearchButton/SearchButton";

const LIST = [{
  text: '首页',
  linkTo: '/index',
  icon: require('../../assets/icon/icon-default-shouye.png'),
  selectIcon: require('../../assets/icon/icon-pressed-shouye.png'),
  extraStyle: {marginBottom: 3}
},{
  text: '创业评选',
  linkTo: '/competition',
  icon: require('../../assets/icon/icon-pingxuan-normal.png'),
  selectIcon: require('../../assets/icon/icon-pingxuan-pressed.png'),
  extraStyle: {marginBottom: 3}
}, {
  text: '发现',
  linkTo: '/find',
  icon: require('../../assets/icon/icon-default-faxian.png'),
  selectIcon: require('../../assets/icon/icon-pressed-faxian.png')
}, {
  text: '服务',
  linkTo: '/service',
  icon: require('../../assets/icon/icon-default-fuwu.png'),
  selectIcon: require('../../assets/icon/icon-pressed-fuwu.png')
}];

const Header = ({headerMenuSelectedKeys, isTutor, user, dispatch, showSearch, newMessage}) => {

  const onMenuItemClick = (e) => {
    dispatch({
      type: 'app/updateState',
      payload: {
        headerMenuSelectedKeys: [e.key]
      }
    })
  };

  const onSearchClick = () => {
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


  const onSearch = (e, value) => {
    dispatch({
      type: 'app/updateState',
      payload: {
        searchParams: {
          title: value,
        },
        showSearch: false
      }
    });
    dispatch(routerRedux.push({
      pathname: '/search'
    }))
  };

  const goToPersonalCenter = () => {
    if (sessionStorage.getItem('token')) {
      if(newMessage){
        dispatch(routerRedux.push({
          pathname: '/home/message'
        }))
      }else{
        dispatch(routerRedux.push({
          pathname: '/home/profile'
        }))
      }
    } else {
      dispatch(routerRedux.push({
        pathname: '/login'
      }))
    }
  };

  const logOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('cInfo');
    sessionStorage.removeItem('apply_tutor');
    dispatch({
      type: 'app/updateState',
      payload: {
        user: {},
        isTutor: false,
        newMessage: false
      }
    });
    dispatch(routerRedux.push({pathname: '/index'}))
  };

  return (
    <Layout.Header style={{height: 90, lineHeight: '90px', background: 'rgba(243,243,243,1)', padding: 0}}>
      <div className="w header-content">
        <Link to='/index'>
          <img className='logo' src={logo} alt="" style={{marginRight: 100}}/>
        </Link>
        {!showSearch && <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={headerMenuSelectedKeys}
          style={{lineHeight: '90px', height: '90px', background: 'transparent'}}
        >
          {LIST.map((item, index) => {
            const style = Object.assign({}, {
              height: 18,
              width: 18,
              marginRight: 9
            }, item.extraStyle);
            if (index === Number(headerMenuSelectedKeys[0])) {
              return <Menu.Item onClick={onMenuItemClick} key={index}><Link to={item.linkTo}><img src={item.selectIcon}
                                                                                                  alt="" style={style}/>{item.text}</Link></Menu.Item>
            }
            return <Menu.Item onClick={onMenuItemClick} key={index}><Link to={item.linkTo}><img src={item.icon} alt=""
                                                                                                style={style}
                                                                                                />{item.text}
            </Link></Menu.Item>
          })}
        </Menu>}
        {!showSearch && <img className='search' src={searchIcon} onClick={onSearchClick} alt=""/>}
        {showSearch && <SearchButton onCloseClick={onCloseClick} onPressEnter={onSearch} onSearchClick={onSearch}/>}
        <div onClick={goToPersonalCenter} className={'header-content-toolbar'}>
          {newMessage ? <Badge dot offset={[-8, 7]}><Avatar size={60} icon="user" src={user.img} style={{marginLeft: 6, marginRight: 9}}/></Badge>
              : <Avatar size={60} icon="user" src={user.img} style={{marginLeft: 6, marginRight: 9}}/>}
          {isTutor && <span className='daoshi-identity'>导师</span>}
          <span className='nickname'>{user.nickName}</span>
        </div>
        {sessionStorage.getItem('token') &&
        <span className='ml15' style={{cursor: 'pointer'}} onClick={logOut}>退出</span>}
      </div>
    </Layout.Header>
  );
};

export default connect(({app}) => (app))(withRouter(Header));
