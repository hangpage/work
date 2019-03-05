import React, {Component} from 'react';
import {Col, Pagination, Row, message} from "antd";
import {Link} from "dva/router";
import ActivityCard from "../ActivityCard/ActivityCard";
import config from "../../utils/config";
import {equalResultStatus} from "../../utils";
import request from "../../utils/request";
import * as qs from "qs";

class ActivityList extends Component {
  constructor(props){
    super(props);
    this.state ={
      list: [],
      count: 0,
      pageNo: 1,
      pageSize: 9
    }
  }

  fetchData = (url, params) => {
    const extraParams = this.props.params;
    params = Object.assign({}, extraParams, params,{pageNo: this.state.pageNo, pageSize: this.state.pageSize});
    return request(`${url}?${qs.stringify(params)}`);
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.fetchData(nextProps.url, nextProps.params).then(({data}) => {
      if(equalResultStatus(data)){
        this.setState({
          list: data.data.list,
          count: data.data.count,
        })
      }else{
        message.error(data.message);
      }
    })
  }

  componentDidMount() {
    const {url} = this.props;
    if(url){
      this.fetchData(url, {pageNo: 1, pageSize: 9}).then(({data}) => {
        if(equalResultStatus(data)){
          this.setState({
            list: data.data.list,
            count: data.data.count,
          })
        }else{
          message.error(data.message);
        }
      })
    }
  }

  onPageChange = (pageNo, pageSize) => {
    this.fetchData(this.props.url, {pageNo, pageSize}).then(({data}) => {
      if(equalResultStatus(data)){
        this.setState({
          list: data.data.list,
          count: data.data.count,
          pageNo: pageNo
        })
      }else{
        message.error(data.message);
      }
    });
  };

  render() {
    const {list, count} = this.state;
    const {linkTo='activity'} = this.props;
    const comps = list.map((item, index) => {
      return (
        <Col span={8} key={index}>
          <Link to={`${linkTo}/${item.id}`}>
            <ActivityCard
              key={index}
              img={`${config.URL}${item.pic}`}
              title={item.title}
              time={item.createTime}
              read={item.pageViews}
              style={{marginBottom: 50}}
            />
          </Link>
        </Col>
      )
    });
    return (
      <div>
        <Row gutter={59}>
          {comps}
        </Row>
        <Pagination total={count} onChange={this.onPageChange} pageSize={9} className='mt10'/>
      </div>
    );
  }
}


export default ActivityList;
