/**
 * @Description: 公告详情/文章详情
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/12 17:58
 */
import React from 'react';
import {connect} from "dva";
import {Input, message} from 'antd';
import FabulousButton from "../../components/Button/FabulousButton";
import {dynamicAwesome, dynamicComment, dynamicReport} from "../../services/dynamic";
import {equalResultStatus, pathMatchRegexp} from "../../utils";
import Comment from "../../components/Commet/Comment";
import Modal from '../Article/component/Modal';
import {cloneDeep} from "lodash";

const Detail = ({data, location, placeHolder, commentShowChildrenList, comment, commentList, dispatch, modalVisible, modalTitle, currentMsgId, replyWho}) => {
  const hideModal = () => {
    dispatch({type: 'notice/updateState', payload: {modalVisible: false}})
  };
  const getArticleDetail = () => {
    dispatch({type: 'notice/get', payload: {id: pathMatchRegexp('/notice/:id', location.pathname)[1]}})
  };

  const onAwesomeClick = () => {
    const match = pathMatchRegexp('/notice/:id', location.pathname);
    dynamicAwesome({
      msgId: match[1],
      type: '5',
    }).then(({data}) => {
      if (equalResultStatus(data)) {
        getArticleDetail();
        message.success('点赞成功');
      } else {
        message.error(data.message);
      }
    })
  };

  const onCommentAwesomeClick = (e, id) => {
    dynamicAwesome({
      msgId: id,
      type: '4',
    }).then(({data}) => {
      if (equalResultStatus(data)) {
        getArticleDetail();
        message.success('点赞成功');
      } else {
        message.error(data.message);
      }
    })
  };

  const onCommentDetailClick = (e, id) => {
    const list = cloneDeep(commentShowChildrenList);
    if (list.indexOf(id) !== -1) {
      list.splice(list.indexOf(id), 1);
    } else {
      list.push(id);
    }
    dispatch({
      type: 'notice/updateState',
      payload: {
        commentShowChildrenList: list
      }
    })
  };

  const onCommentClick = () => {
    const match = pathMatchRegexp('/notice/:id', location.pathname);
    if (!comment) {
      return message.error('请输入评论内容');
    }
    dynamicComment({
      msgId: match[1],
      type: '5',
      content: comment
    }).then(({data}) => {
      if (equalResultStatus(data)) {
        message.success('评论成功');
        dispatch({
          type: 'notice/updateState',
          payload: {
            comment: ''
          }
        });
        getArticleDetail();
      } else {
        message.error(data.message);
      }
    })
  };

  const onReportClick = (e, id) => {
    dispatch({
      type: 'notice/updateState',
      payload: {
        modalVisible: true,
        currentMsgId: id,
        modalTitle: '举报',
        placeHolder: '输入您的举报理由...'
      }
    })
  };

  const onTextareaChange = (e) => {
    const value = e.currentTarget.value;
    dispatch({
      type: 'notice/updateState',
      payload: {
        comment: value
      }
    })
  };

  const onReplyClick = (e, id, replyWho) => {
    dispatch({
      type: 'notice/updateState',
      payload: {
        modalVisible: true,
        replyWho: replyWho,
        placeHolder: `回复${replyWho}...`,
        currentMsgId: id,
        modalTitle: '回复'
      }
    })
  };

  const onOk = (params) => {
    if (!params.content) {
      return message.error(`请输入${modalTitle}内容`);
    }
    params.msgId = currentMsgId;
    params.type = '4';
    if (modalTitle === '回复') {
      dynamicComment(params).then(({data}) => {
        if (equalResultStatus(data)) {
          message.success('评论成功');
          hideModal();
          getArticleDetail();
        } else {
          message.error(data.message);
        }
      })
    } else {
      dynamicReport(params).then(({data}) => {
        if (equalResultStatus(data)) {
          message.success('举报成功');
          hideModal();
          getArticleDetail();
        } else {
          message.error(data.message);
        }
      })
    }
  };

  const onCancel = (e) => {
    hideModal();
  };

  const modalProps = {
    visible: modalVisible,
    title: modalTitle,
    onOk,
    onCancel
  };
  return (
    <div className='second-bg'>
      <div className="w">
        <div className="article-box mt39">
          <p>{data.title}</p>
          <div className="info">
            <span>{data.createTime}</span>
            <span className='ml38 mr38'>|</span>
            <span>{data.pageViews || 0}人阅读</span>
          </div>
          <div className="dash-line-gray mt27"/>
          <div className='content' dangerouslySetInnerHTML={{__html: data.content}}/>
          <div style={{textAlign: 'center'}}>
            <FabulousButton onClick={onAwesomeClick} isAwesome={data.isAwesome}/>
          </div>
        </div>
        <div className="solid-line6 mt40 mb40"/>
        <Input.TextArea onChange={onTextareaChange} style={{height: 180}} value={comment} className='bl-input'
                        placeholder='请输入评论内容...'/>
        <div className="main-button mt40 mb59" onClick={onCommentClick} style={{width: 146, borderRadius: 25}}>评论</div>
        <div className='comment-list'>
          {commentList.map((item, index) => {
              return (
                <div>
                  <Comment key={index}
                           nickName={item.nickName}
                           createTime={item.createTime}
                           awesomeCount={item.awesomeCount}
                           onReplyClick={(e) => onReplyClick(e, item.id, item.nickName)}
                           commentCount={item.commontList.length}
                           onReportClick={(e) => {
                             onReportClick(e, item.id)
                           }}
                           onAwesomeClick={(e) => {
                             onCommentAwesomeClick(e, item.id)
                           }}
                           userImg={item.userImg}
                           content={item.content}
                           onCommentDetailClick={(e) => {
                             onCommentDetailClick(e, item.id)
                           }}
                  />
                  {commentShowChildrenList.indexOf(item.id) !== -1 && item.commontList.length ?
                    <div className='ml84 mr20' style={{background: '#F3F3F3'}}>
                      {
                        item.commontList.map((c, i) => (
                          <Comment key={i}
                                   nickName={c.nickName}
                                   createTime={c.createTime}
                                   awesomeCount={c.awesomeCount}
                                   onReplyClick={(e) => onReplyClick(e, c.id, c.nickName)}
                                   onReportClick={(e) => {
                                     onReportClick(e, c.id)
                                   }}
                                   onAwesomeClick={(e) => {
                                     onCommentAwesomeClick(e, c.id)
                                   }}
                                   userImg={c.userImg}
                                   content={c.content}
                                   replyToWhom={item.nickName}
                                   type='child'
                          />
                        ))
                      }
                    </div> : ''}
                </div>
              )
            }
          )}
          {modalVisible && <Modal {...modalProps} replyWho={replyWho} placeHolder={placeHolder}/>}
        </div>
      </div>
    </div>
  );
};

export default connect(({notice}) => (notice))(Detail);
