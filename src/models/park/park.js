import {pathMatchRegexp} from "../../utils";
import {parkFindList} from "../../services/park";

export default {

  namespace: 'park',

  state: {
    list: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if(pathMatchRegexp('/park', location.pathname)){
          dispatch({
            type: 'parkFindList'
          })
        }
      })
    },
  },

  effects: {
    *parkFindList({ payload }, { call, put }) {
      const {data} = yield call(parkFindList);
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            list: data.data.list,
            count: data.data.count,
            pageSize: data.data.pageSize,
            pageNo: data.data.pageNo
          }
        });
      }
    },
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
