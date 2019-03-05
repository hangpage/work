import {equalResultStatus, pathMatchRegexp} from "../../utils";
import {carLicenseGet, findType, serviceGet} from "../../services/service";
import {message} from "antd";

export default {

  namespace: 'service',

  state: {
    list: [],
    detail: {},
    modalVisible: false,
    parkRecordList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(pathMatchRegexp('/service', location.pathname)){
          dispatch({
            type: 'queryServiceList',
            payload: {
              pageNo: 1,
              pageSize: 4
            }
          })
        }else if (pathMatchRegexp('/service/:id/detail', location.pathname)) {
          const match = pathMatchRegexp('/service/:id/detail', location.pathname);
          if (match) {
            dispatch({type: 'get', payload: {id: match[1], token: sessionStorage.getItem('token')}})
          }
        }else if (pathMatchRegexp('/service/type/parking/record', location.pathname)) {
          dispatch({type: 'queryParkingRecord'})
        }
      })
    },
  },

  effects: {
    *queryServiceList({ payload }, { call, put }) {
      const {data} = yield call(findType, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            list: data.data,
            count: data.data.count,
          }
        });
      }
    },
    *queryParkingRecord({ payload }, { call, put }) {
      const {data} = yield call(carLicenseGet);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            parkRecordList: data.data
          }
        });
      }
    },
    *get({ payload }, { call, put }) {
      const {data} = yield call(serviceGet, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            detail: data.data || {}
          }
        })
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
