/**
 * @Description: 个人中西
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 11:23
 */
import React from 'react';
import {Layout, Menu, Modal} from 'antd';
import IdCard from "../../components/IdCard/IdCard";
import {connect} from "dva";
import {Link} from "dva/router";
import Sign from "./sign";

const Index = ({data, match, children, modalVisible, dispatch, selectedKeys}) => {
  const HomeList = [{
    title: '个人资料',
    icon: require('../../assets/icon/home/icon-default-gerenziliao.png'),
    url: '/profile'
  },  {
    title: '我的比赛',
    icon: require('../../assets/icon/home/icon-default-bisai.png'),
    url: '/match'
  }, {
    title: '我的活动',
    icon: require('../../assets/icon/home/icon-default-bisai.png'),
    url: '/activity'
  }, {
    title: '我的服务',
    icon: require('../../assets/icon/home/icon-default-fuwu.png'),
    url: '/service'
  }, {
    title: '我的消息',
    icon: require('../../assets/icon/home/icon-default-xiaoxi.png'),
    url: '/message'
  }, {
    title: '浏览历史',
    icon: require('../../assets/icon/home/icon-default-liulanlishi.png'),
    url: '/history'
  }, {
    title: '申请离园',
    icon: require('../../assets/icon/home/icon-default-shenqingliyuan.png'),
    url: '/leave'
  }, {
    title: '入驻管理',
    icon: require('../../assets/icon/home/icon-default-ruzhuguanli.png'),
    url: '/enter'
  }, {
    title: '意见反馈',
    icon: require('../../assets/icon/home/icon-default-yijianfankui.png'),
    url: '/advise'
  }, {
    title: '关于我们',
    icon: require('../../assets/icon/home/icon-default-guanyuwomen.png'),
    url: '/about'
  }];
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

  const onMenuItemClick = (e) => {
    dispatch({
      type: 'home/updateState',
      payload: {
        selectedKeys: [e.key]
      }
    })
  };

  if(data.residentTeamStatus === 1){ //判断当前用户是否已经入驻
    HomeList.splice(1, 0, {
      title: '团队档案',
      icon: require('../../assets/icon/home/icon-default-gerenziliao.png'),
      url: '/team'
    },)
  }

  return (
    <div className="bg-white pt40 pb80">
      <div className='w bl-home'>
        <Layout>
          <Layout.Sider width={240} style={{background: '#fff'}}>
            <IdCard
              photo={data.img}
              name={data.nickName}
              autograph={data.intro}
              onSignClick={onSignClick}
            />
            {modalVisible ? (
              <Modal visible={modalVisible} title='签到' width={800} footer={null} onCancel={onCancelClick}>
                <Sign/>
              </Modal>) : null}
            <Menu
              style={{width: 240, marginTop: 10}}
              selectedKeys={selectedKeys}
              defaultSelectedKeys={['0']}
            >
              {HomeList.map((item, index) => {
                return (
                  <Menu.Item key={index} onClick={onMenuItemClick}>
                    <Link to={`/home${item.url}`}>
                      <img src={item.icon} alt="" style={{marginRight: 10}}/>
                      <span>{item.title}</span>
                    </Link>
                  </Menu.Item>
                )
              })}
            </Menu>
          </Layout.Sider>
          <Layout.Content className='bg-white'>
            {children}
          </Layout.Content>
        </Layout>
      </div>
    </div>
  );
};

export default connect(({home}) => (home))(Index);
