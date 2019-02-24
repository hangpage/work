import {equalResultStatus, pathMatchRegexp} from "../../utils";
import {articleGet} from "../../services/article";
import {message} from "antd";

export default {

  namespace: 'article',

  state: {
    data: {},
    commentList: [],
    comment: '',
    modalVisible: false,
    modalTitle: '',
    placeHolder: '',
    commentShowChildrenList: []
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (pathMatchRegexp('/article/:id', location.pathname)) {
          const match = pathMatchRegexp('/article/:id', location.pathname);
          if (match) {
            dispatch({type: 'get', payload: {id: match[1]}})
          }
        }
      })
    },
  },

  effects: {
    *get({ payload }, { call, put }) {
      const {data} = yield call(articleGet, payload);
      if(equalResultStatus(data)){
        yield put({
          type: 'updateState',
          payload: {
            data: data.data,
            commentList: data.data.commontList
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
