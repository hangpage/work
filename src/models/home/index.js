import {equalResultStatus, pathMatchRegexp} from "../../utils";
import {message} from "antd";
import {
  aboutUs,
  historyActivity,
  historyArticle,
  queryResidentTeamInfo,
  userFindAwesome,
  userFindComment,
  userFindEntering,
  userFindMatch,
  userFindServiceAppli,
  userFindSignActivity,
  userFineMeetingRoom,
  userGetInfo,
  userLockers,
  userRepair
} from "../../services/user";
import {noticeFindList} from "../../services/notice";
import {queryLeaderAndMemberInfo} from "../../services/park";

export default {

  namespace: 'home',

  state: {
    data: {}, //用户信息
    selectedKeys: ['0'],
    enterData: [],
    activityData: [],
    matchData: [],
    teamInfo: {},
    modalVisible: false,
    service: [],
    repair: [],
    room: [],
    locker: [],
    system: [],
    awesome: [],
    comment: [],
    aboutUs: {},
    leaderAndMemberInfo: {},
    historyArticle: [],
    historyActivity: [],
    historyActivityCount: 0,
    historyArticleCount: 0,
    systemNoticeCount: 0
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if(location.pathname.indexOf('/home') !== -1){
          dispatch({
            type: 'query'
          })
        }
        if(pathMatchRegexp('/home/profile', location.pathname)){
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['0']
            }
          })
        }else if(pathMatchRegexp('/home/team', location.pathname)){
          dispatch({type: 'queryTeamInfo'});
          dispatch({type: 'queryLeaderAndMemberInfo'});
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['1']
            }
          })
        }else if(pathMatchRegexp('/home/match', location.pathname)){
          dispatch({type: 'userFindMatch'});
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['2']
            }
          })
        }else if(pathMatchRegexp('/home/activity', location.pathname)){
          dispatch({type: 'userFindActivity'});
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['3']
            }
          })
        }else if(pathMatchRegexp('/home/service', location.pathname)){
          dispatch({type: 'userFineMeetingRoom'});
          dispatch({type: 'userLockers'});
          dispatch({type: 'userRepair'});
          dispatch({type: 'userFindServiceAppli'});
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['4']
            }
          })
        }else if(pathMatchRegexp('/home/message', location.pathname)){
          dispatch({type: 'userFindSystem', payload: {pageNo: 1, pageSize: 4}});
          dispatch({type: 'userFindComment'});
          dispatch({type: 'userFindAwesome'});
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['5']
            }
          })
        }else if(pathMatchRegexp('/home/about', location.pathname)){
          dispatch({type: 'aboutUs'});
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['10']
            }
          })
        }else if(pathMatchRegexp('/home/history', location.pathname)){
          dispatch({type: 'historyArticle', payload: {pageNo: 1, pageSize: 4}});
          dispatch({type: 'historyActivity', payload: {pageNo: 1, pageSize: 4}});
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['6']
            }
          })
        }else if(pathMatchRegexp('/home/leave', location.pathname)){
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['7']
            }
          })
        }else if(pathMatchRegexp('/home/enter', location.pathname)){
          dispatch({type: 'findEntering'});
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['8']
            }
          })
        }else if(pathMatchRegexp('/home/advise', location.pathname)){
          dispatch({type: 'updateState',
            payload: {
              selectedKeys: ['9']
            }
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
    *userFindMatch({ payload }, { call, put }) {
      const {data} = yield call(userFindMatch, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            matchData: data.data
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *userFindActivity({ payload }, { call, put }) {
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
    *historyActivity({ payload }, { call, put }) {
      const {data} = yield call(historyActivity, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            historyActivity: data.data.list,
            historyActivityCount: data.data.count
          }
        })
      }else{
        message.error(data.message);
      }
    },
    *historyArticle({ payload }, { call, put }) {
      const {data} = yield call(historyArticle, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            historyArticle: data.data.list,
            historyArticleCount: data.data.count
          }
        })
      }else {
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
    *queryLeaderAndMemberInfo({ payload }, { call, put }) {
      const {data} = yield call(queryLeaderAndMemberInfo, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            leaderAndMemberInfo: data.data
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
            system: data.data.list,
            systemNoticeCount: data.data.count
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
    *aboutUs({ payload }, { call, put }) {
      const {data} = yield call(aboutUs, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            aboutUs: data.data
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
