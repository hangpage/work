import {equalResultStatus, getParams, pathMatchRegexp} from "../../utils";
import {noticeFindList, noticeGet} from "../../services/notice";
import {activityGet} from "../../services/activity";
import {message} from "antd";
import {userGetInfo} from "../../services/user";

export default {

  namespace: 'home',

  state: {
    data: {}
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if(location.pathname.indexOf('/home') !== -1){
          dispatch({
            type: 'query'
          })
        }
        if (pathMatchRegexp('/home/:type', location.pathname)) {
          const match = pathMatchRegexp('/notice/:id', location.pathname);
          if (match) {
            dispatch({type: 'get', payload: {id: match[1], token: sessionStorage.getItem('token')}})
          }
        }
      })
    },
  },

  effects: {
    * query({payload}, {call, put}) {
      const {data} = yield call(userGetInfo);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            data: data.data,
          }
        });
      }
    },
    *get({ payload }, { call, put }) {
      const {data} = yield call(noticeGet, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            data: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
  },

  reducers: {
    updateState(state, action) {
      return {...state, ...action.payload};
    },
  },

};
