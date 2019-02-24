import {equalResultStatus, pathMatchRegexp} from "../../utils";
import {message} from "antd";
import {queryResidentTeamInfo, userFindEntering, userFindSignActivity, userGetInfo} from "../../services/user";

export default {

  namespace: 'home',

  state: {
    data: {}, //用户信息
    enterData: [],
    activityData: [],
    teamInfo: {},
    modalVisible: false
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
          switch (location.pathname) {
            case '/home/enter':
              dispatch({
                type: 'findEntering'
              });
              break;
            case '/home/match':
              dispatch({
                type: 'findActivity'
              });
              break;
          }
        }
        if(pathMatchRegexp('/home/team', location.pathname)){
          dispatch({
            type: 'queryTeamInfo'
          })
        }
      })
    },
  },

  effects: {
    *query({payload}, {call, put}) {
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
    *findEntering({ payload }, { call, put }) {
      const {data} = yield call(userFindEntering, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            enterData: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *findActivity({ payload }, { call, put }) {
      const {data} = yield call(userFindSignActivity, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            activityData: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *queryTeamInfo({ payload }, { call, put }) {
      const {data} = yield call(queryResidentTeamInfo, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            teamInfo: data.data
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
