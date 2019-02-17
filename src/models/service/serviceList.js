import {pathMatchRegexp} from "../../utils";
import {findService} from "../../services/service";

export default {

  namespace: 'serviceList',

  state: {
    list: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        const match = pathMatchRegexp('/service/:id', pathname);
        if (match) {
          dispatch({ type: 'queryServiceList', payload: { type: match[1]} })
        }
      })
    },
  },

  effects: {
    *queryServiceList({ payload }, { call, put }) {
      const {data} = yield call(findService, payload);
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            list: data.data,
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
