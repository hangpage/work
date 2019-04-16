import {equalResultStatus, isLogin, pathMatchRegexp} from "../utils";
import {userGetInfo} from "../services/user";
import {message} from 'antd';
import {articleFindList} from "../services/article";
import {activityFindList} from "../services/activity";
import {routerRedux} from "dva/router";
import {tutorGetInfo} from "../services/tutor";
import {findNewMessage} from "../services/notice";

export default {

  namespace: 'app',

  state: {
    headerMenuSelectedKeys: ['1'],
    user: {},
    searchParams: {},
    showSearch: false,
    isTutor: false,
    newMessage: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        switch (location.pathname) {
          case '/index':
            dispatch({ type: 'updateState', payload: { headerMenuSelectedKeys: ['0']} });
            if(isLogin()){
              dispatch({ type: 'tutorGetInfo' });
              dispatch({ type: 'findNewMessage' });
            }
            break;
          case '/competition':
            dispatch({ type: 'updateState', payload: { headerMenuSelectedKeys: ['1']} });
            break;
          case '/find':
            dispatch({ type: 'updateState', payload: { headerMenuSelectedKeys: ['2']} });
            break;
          case '/service':
            dispatch({ type: 'updateState', payload: { headerMenuSelectedKeys: ['3']} });
            break;
        }
        if(sessionStorage.getItem('token')){
          if(pathMatchRegexp('/index', location.pathname)){
            dispatch({type: 'query'})
          }else{//防止在其他页面刷新丢失app model 导致用户头像不显示
            if(location.pathname.indexOf('login') === -1){
              dispatch({type: 'ifUserInfoExist'})
            }
          }
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const {data} = yield call(userGetInfo);
      if(equalResultStatus(data)){
        sessionStorage.setItem('user', JSON.stringify(data.data));
        yield put({
          type: 'updateState',
          payload: {
            user: data.data,
          }
        });
        if(!data.data.age){
          yield put(routerRedux.push({
            pathname: '/home/profile'
          }));
          return message.warning('请先完善个人信息');
        }
      }else{
        message.error(data.message);
      }
    },
    *ifUserInfoExist({ payload }, { call, put, select }) {
      const app = yield select(state => state.app);
      if(!Object.keys(app.user).length){
        yield put({
          type: 'query'
        })
      }
    },
    *search({payload}, { call, put, select }){
      const article = yield call(articleFindList).data;
      if(equalResultStatus(article)){
        yield put({
          type: 'updateState',
          payload: {
            articleFindList: article.data,
          }
        })
      }else{
        message.error(article.message)
      }
      const activity = yield call(activityFindList).data;
      if(equalResultStatus(activity)){
        yield put({
          type: 'updateState',
          payload: {
            activityFindList: activity.data,
          }
        })
      }else{
        message.error(article.message)
      }
    },
    *tutorGetInfo({ payload }, { call, put }){
      const {data} = yield call(tutorGetInfo, payload);
      if(data.code === 1){
        sessionStorage.setItem('apply_tutor', '1');
        if(String(data.data.status) === '1'){
          message.success('您是导师身份');
          yield put({
            type: 'updateState',
            payload: {
              isTutor: true
            }
          })
        }
      }else{
        sessionStorage.setItem('apply_tutor', '2'); //设置成不是导师状态
      }
    },
    *findNewMessage({ payload }, { call, put }){
      const {data} = yield call(findNewMessage, payload);
      if(data.code === 1){
        yield put({
          type: 'updateState',
          payload: {
            newMessage: true
          }
        })
      }
    },
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
