import {equalResultStatus, pathMatchRegexp} from "../utils";
import {userGetInfo} from "../services/user";
import {message} from 'antd';

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
            dispatch({ type: 'save', payload: { headerMenuSelectedKeys: ['0']} });
            break;
          case '/find':
            dispatch({ type: 'save', payload: { headerMenuSelectedKeys: ['1']} });
            break;
          case '/service':
            dispatch({ type: 'save', payload: { headerMenuSelectedKeys: ['2']} });
            break;
        }
        if(pathMatchRegexp('/index', location.pathname)){
          dispatch({
            type: 'query'
          })
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
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
