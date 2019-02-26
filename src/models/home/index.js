import {equalResultStatus, pathMatchRegexp} from "../../utils";
import {message} from "antd";
import {
  queryResidentTeamInfo, userFindAwesome, userFindComment,
  userFindEntering, userFindServiceAppli,
  userFindSignActivity,
  userFineMeetingRoom,
  userGetInfo, userLockers, userRepair
} from "../../services/user";
import {noticeFindList} from "../../services/notice";

export default {

  namespace: 'home',

  state: {
    data: {}, //用户信息
    enterData: [],
    activityData: [],
    teamInfo: {},
    modalVisible: false,
    service: [],
    repair: [],
    room: [],
    locker: [],
    system: [],
    awesome: [],
    comment: []
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
        }else if(pathMatchRegexp('/home/service', location.pathname)){
          dispatch({type: 'userFineMeetingRoom'});
          dispatch({type: 'userLockers'});
          dispatch({type: 'userRepair'});
          dispatch({type: 'userFindServiceAppli'})
        }else if(pathMatchRegexp('/home/message', location.pathname)){
          dispatch({type: 'userFindSystem'});
          dispatch({type: 'userFindComment'});
          dispatch({type: 'userFindAwesome'});
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
            teamInfo: data.data[0]
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *userFineMeetingRoom({ payload }, { call, put }) {
      const {data} = yield call(userFineMeetingRoom, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            room: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *userLockers({ payload }, { call, put }) {
      const {data} = yield call(userLockers, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            locker: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *userRepair({ payload }, { call, put }) {
      const {data} = yield call(userRepair, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            repair: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *userFindServiceAppli({ payload }, { call, put }) {
      const {data} = yield call(userFindServiceAppli, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            service: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *userFindComment({ payload }, { call, put }) {
      const {data} = yield call(userFindComment, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            comment: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *userFindSystem({ payload }, { call, put }) {
      const {data} = yield call(noticeFindList, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            system: data.data.list
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *userFindAwesome({ payload }, { call, put }) {
      const {data} = yield call(userFindAwesome, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            awesome: data.data
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
