/**
 * @Description: 个人中西
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/17 11:23
 */
import React from 'react';
import {Layout, Menu, Modal} from 'antd';
import IdCard from "../../components/IdCard/IdCard";
import {connect} from "dva";
import {Link, routerRedux} from "dva/router";
import Sign from "./sign";
import {validateIsResident} from "../../utils";

const Index = ({data, match, children, modalVisible, dispatch, selectedKeys}) => {
  const HomeList = [{
    title: '个人资料',
    icon: require('../../assets/icon/home/icon-default-gerenziliao.png'),
    pressIcon:  require('../../assets/icon/home/icon-pressed-gerenziliao.png'),
    url: '/profile'
  }, {
    title: '我的比赛',
    icon: require('../../assets/icon/home/icon-default-bisai.png'),
    pressIcon:  require('../../assets/icon/home/icon-pressed-bisai.png'),
    url: '/match'
  }, {
    title: '我的活动',
    icon: require('../../assets/icon/home/icon-default-wodehuodong.png'),
    pressIcon:  require('../../assets/icon/home/icon-pressed-wodehuodong.png'),
    url: '/activity'
  }, {
    title: '我的服务',
    icon: require('../../assets/icon/home/icon-default-fuwu.png'),
    pressIcon:  require('../../assets/icon/home/icon-pressed-fuwu.png'),
    url: '/service'
  }, {
    title: '我的消息',
    icon: require('../../assets/icon/home/icon-default-xiaoxi.png'),
    pressIcon:  require('../../assets/icon/home/icon-pressed-xiaoxi.png'),
    url: '/message'
  }, {
    title: '浏览历史',
    icon: require('../../assets/icon/home/icon-default-liulanlishi.png'),
    pressIcon:  require('../../assets/icon/home/icon-pressed-liulanlishi.png'),
    url: '/history'
  }, {
    title: '申请离园',
    icon: require('../../assets/icon/home/icon-default-shenqingliyuan.png'),
    pressIcon:  require('../../assets/icon/home/icon-pressed-shenqingliyuan.png'),
    url: '/leave',
    auth: true
  }, {
    title: '入驻管理',
    icon: require('../../assets/icon/home/icon-default-ruzhuguanli.png'),
    pressIcon:  require('../../assets/icon/home/icon-pressed-ruzhuguanli.png'),
    url: '/enter'
  }, {
    title: '意见反馈',
    icon: require('../../assets/icon/home/icon-default-yijianfankui.png'),
    pressIcon:  require('../../assets/icon/home/icon-pressed-yijianfankui.png'),
    url: '/advise'
  }, {
    title: '关于我们',
    icon: require('../../assets/icon/home/icon-default-guanyuwomen.png'),
    pressIcon:  require('../../assets/icon/home/icon-pressed-guanyuwomen.png'),
    url: '/about'
  }];

  const doLink = (link) => {
    if(validateIsResident()){
      dispatch(routerRedux.push(link));
    }else{
      Modal.warning({
        title: '您还未入驻！',
        content: '该功能只对已入驻成员开放，请您先入入驻或选择加入已入驻的团队！',
        centered: true
      });
    }
  };

  const onSignClick = () => {
    if(validateIsResident()){
      dispatch({
        type: 'home/updateState',
        payload: {
          modalVisible: true
        }
      })
    }else{
      Modal.warning({
        title: '您还未入驻！',
        content: '该功能只对已入驻成员开放，请您先入入驻或选择加入已入驻的团队！',
        centered: true
      });
    }
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

  if(data.residentTeamStatus >= 2){ //判断当前用户是否已经入驻 小于2的是未入驻
    HomeList.splice(1, 0, {
      title: '团队档案',
      icon: require('../../assets/icon/home/icon-default-tuanduidangan.png'),
      pressIcon:  require('../../assets/icon/home/icon-pressed-tuanduidangan.png'),
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
                    {item.auth ?  <div onClick={() => {doLink(`/home${item.url}`)}}>
                      {selectedKeys[0] === String(index) ? <img src={item.pressIcon} alt="" style={{marginRight: 10}}/>
                        : <img src={item.icon} alt="" style={{marginRight: 10}}/>}
                      <span>{item.title}</span>
                    </div> : <Link to={`/home${item.url}`}>
                      {selectedKeys[0] === String(index) ? <img src={item.pressIcon} alt="" style={{marginRight: 10}}/>
                        : <img src={item.icon} alt="" style={{marginRight: 10}}/>}
                      <span>{item.title}</span>
                    </Link>}
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
