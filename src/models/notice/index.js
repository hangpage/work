import {equalResultStatus, getParams, pathMatchRegexp} from "../../utils";
import {noticeFindList, noticeGet} from "../../services/notice";
import {activityGet} from "../../services/activity";
import {message} from "antd";

export default {

  namespace: 'notice',

  state: {
    list: [],
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
        if (pathMatchRegexp('/notice', location.pathname)) {
          dispatch({
            type: 'noticeFindList'
          })
        } else if (pathMatchRegexp('/notice/:id', location.pathname)) {
          const match = pathMatchRegexp('/notice/:id', location.pathname);
          if (match) {
            dispatch({type: 'get', payload: {id: match[1], token: sessionStorage.getItem('token')}})
          }
        }
      })
    },
  },

  effects: {
    * noticeFindList({payload}, {call, put}) {
      const {data} = yield call(noticeFindList);
      if (data) {
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
    *get({ payload }, { call, put }) {
      const {data} = yield call(noticeGet, payload);
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
