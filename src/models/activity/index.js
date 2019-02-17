import {model} from "../../utils/model";
import modelExtend from 'dva-model-extend'
import {equalResultStatus, getParams, pathMatchRegexp} from "../../utils";
import {activityFindList, activityGet} from "../../services/activity";
import {message} from "antd";

export default modelExtend(model, {

  namespace: 'activity',

  state: {
    list: [],
    data: {
      signMembers: []
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(pathMatchRegexp('/activity', location.pathname)){
          dispatch({
            type: 'queryList'
          })
        }else if(pathMatchRegexp('/activity/:id', location.pathname)){
          const match = pathMatchRegexp('/activity/:id', location.pathname);
          if (match) {
            dispatch({ type: 'get', payload: { id: match[1], token: sessionStorage.getItem('token'), park: getParams(location.search).park } })
          }
        }
      })
    },
  },

  effects: {
    *queryList({ payload }, { call, put }) {
      const {data} = yield call(activityFindList);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            list: data.data.list,
            count: data.data.count,
            pageSize: data.data.pageSize,
            pageNo: data.data.pageNo
          }
        });
      }else{
        message.error(data.message);
      }
    },
    *get({ payload }, { call, put }) {
      const {data} = yield call(activityGet, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'save',
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
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

})
