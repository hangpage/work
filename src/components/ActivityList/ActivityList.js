import React, {Component} from 'react';
import {Col, Pagination, Row} from "antd";
import {Link} from "dva/router";
import ActivityCard from "../ActivityCard/ActivityCard";
import config from "../../utils/config";
import {equalResultStatus} from "../../utils";
import request from "../../utils/request";

class ActivityList extends Component {
  constructor(props){
    super(props);
    this.state ={
      list: [],
      count: 0,
      pageSize: 1,
      pageNo: 30
    }
  }
  componentDidMount() {
    const {url} = this.props;
    if(url){
      request(url).then(({data}) => {
        if(equalResultStatus(data)){
          this.setState({
            list: data.data.list,
            count: data.data.count,
            pageSize: data.data.pageSize,
            pageNo: data.data.pageNo
          })
        }
      })
    }
  }

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
        <Pagination total={count} className='mt60'/>
      </div>
    );
  }
}


export default ActivityList;
