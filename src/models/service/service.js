import {equalResultStatus, getParams, pathMatchRegexp} from "../../utils";
import {carLicenseGet, findService, findType, serviceGet} from "../../services/service";
import {message} from "antd";

export default {

  namespace: 'service',

  state: {
    list: [],
    detail: {},
    modalVisible: false,
    count: 0,
    serviceTypeCount: 3,
    parkRecordList: [],
    serviceTypeList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(pathMatchRegexp('/service', location.pathname)){
          dispatch({
            type: 'queryServiceTypeList',
            payload: {
              pageNo: 1,
              pageSize: 4
            }
          })
        }else if(pathMatchRegexp('/service/:id', location.pathname)){
          const match = pathMatchRegexp('/service/:id', location.pathname);
          if (match) {
            dispatch({ type: 'queryServiceList', payload: { type: match[1], pageNo: 1, pageSize: 12} })
          }
        }else if (pathMatchRegexp('/service/:id/detail', location.pathname)) {
          const id = getParams(location.search).id;
          const match = pathMatchRegexp('/service/:id/detail', location.pathname);
          if (match) {
            dispatch({type: 'get', payload: {id: id, token: sessionStorage.getItem('token')}})
          }
        }else if (pathMatchRegexp('/service/type/parking/record', location.pathname)) {
          dispatch({type: 'queryParkingRecord'})
        }
      })
    },
  },

  effects: {
    *queryServiceTypeList({ payload }, { call, put }) {
      const {data} = yield call(findType, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            serviceTypeList: data.data,
            serviceTypeCount: data.data.count,
          }
        });
      }
    },
    *queryServiceList({ payload }, { call, put }) {
      const {data} = yield call(findService, payload);
      if(data){
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
