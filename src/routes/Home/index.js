/**
 * @Description: 个人中西
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 11:23
 */
import React from 'react';
import {Menu, Layout, Modal} from 'antd';
import IdCard from "../../components/IdCard/IdCard";
import {connect} from "dva";
import {Link, Router, Route} from "dva/router";
import Profile from "./profile";
import createHistory from 'history/createHashHistory';
import Match from "./match";
import Sign from "./sign";
const HomeList = [{
  title: '个人资料',
  icon: require('../../assets/icon/home/icon-default-gerenziliao.png'),
  url: '/profile'
},{
  title: '团队档案',
  icon: require('../../assets/icon/home/icon-default-gerenziliao.png'),
  url: '/team'
},{
  title: '我的比赛',
  icon: require('../../assets/icon/home/icon-default-bisai.png'),
  url: '/match'
},{
  title: '我的服务',
  icon: require('../../assets/icon/home/icon-default-fuwu.png'),
  url: '/service'
},{
  title: '我的消息',
  icon: require('../../assets/icon/home/icon-default-xiaoxi.png'),
  url: '/info'
},{
  title: '浏览历史',
  icon: require('../../assets/icon/home/icon-default-liulanlishi.png'),
  url: '/history'
},{
  title: '申请离园',
  icon: require('../../assets/icon/home/icon-default-shenqingliyuan.png'),
  url: '/leave'
},{
  title: '入驻管理',
  icon: require('../../assets/icon/home/icon-default-ruzhuguanli.png'),
  url: '/enter'
},{
  title: '意见反馈',
  icon: require('../../assets/icon/home/icon-default-yijianfankui.png'),
  url: '/advise'
},{
  title: '关于我们',
  icon: require('../../assets/icon/home/icon-default-guanyuwomen.png'),
  url: '/about'
}];

const Index = ({data, match, children, modalVisible, dispatch}) => {
  const onSignClick = () => {
    dispatch({
      type: 'home/updateState',
      payload: {
        modalVisible: true
      }
    })
  };
  const onCancelClick = () => {
    dispatch({
      type: 'home/updateState',
      payload: {
        modalVisible: false
      }
    })
  };
  return (
    <div className='w bl-home pt40 pb80'>
      <Layout>
        <Layout.Sider width={240} style={{ background: '#fff' }}>
          <IdCard
            photo={data.img}
            name={data.nickName}
            autograph={data.intro}
            onSignClick={onSignClick}
          />
          {modalVisible ? (<Modal visible={modalVisible} title='签到' width={800} footer={null} onCancel={onCancelClick}>
            <Sign />
          </Modal>) : null}
          <Menu
            style={{ width: 240,marginTop: 10 }}
            defaultSelectedKeys={['0']}
          >
            {HomeList.map((item, index) => {
              return (
                <Menu.Item key={index}>
                  <Link to={`/home${item.url}`}>
                    <img src={item.icon} alt="" style={{marginRight: 10}}/>
                    <span>{item.title}</span>
                  </Link>
                </Menu.Item>
              )
            })}
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          {children}
        </Layout.Content>
      </Layout>

    </div>
  );
};

export default connect(({home}) => (home))(Index);
