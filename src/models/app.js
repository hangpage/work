import {equalResultStatus, pathMatchRegexp} from "../utils";
import {userGetInfo} from "../services/user";
import {message} from 'antd';
import {articleFindList} from "../services/article";
import {activityFindList} from "../services/activity";

export default {

  namespace: 'app',

  state: {
    headerMenuSelectedKeys: ['0'],
    user: {},
    showSearch: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        switch (location.pathname) {
          case '/index':
            dispatch({ type: 'updateState', payload: { headerMenuSelectedKeys: ['0']} });
            break;
          case '/find':
            dispatch({ type: 'updateState', payload: { headerMenuSelectedKeys: ['1']} });
            break;
          case '/service':
            dispatch({ type: 'updateState', payload: { headerMenuSelectedKeys: ['2']} });
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
    }
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
