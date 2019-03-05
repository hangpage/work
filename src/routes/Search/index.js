/**
 * @Description: 搜索结果页
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/18 1:01
 */
import React from 'react';
import {Input, Tabs} from "antd";
import ActivityList from "../../components/ActivityList/ActivityList";
import {debounce} from 'lodash';
import {connect} from "dva";


class Search extends React.Component{
  constructor(props){
    super(props);
    const {searchParams} = props;
    const title = searchParams.title;
    this.callAjax = debounce(this.callAjax, 300);
    this.state = {
      search: {
        title: title
      }
    }
  }
  callAjax = (value) => {
    this.setState({
      search: {
        title: value,
        pageSize: 9,
        pageNo: 1
      }
    })
  };

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      search: {
        title: nextProps.searchParams.title
      }
    })
  }

  onChange = (e) => {
    e.persist();
    this.callAjax(e.target.value);
  };
  render(){
    return (
      <div>
        <div className='w'>
          <div style={{background: '#fafafa', borderBottom: '1px solid rgba(153, 153, 153, 0.1)'}}>
            <div className="w" style={{minHeight: '88px', lineHeight: '88px',}}>
              <Input className='result-search' onChange={this.onChange} placeholder='输入感兴趣的内容' style={{background: 'transparent', border: 'none'}}/>
            </div>
          </div>
        </div>
        <div className="bg-white pb80">
          <div className="w">
            <Tabs className='font24'>
              <Tabs.TabPane tab='活动' key={1}>
                <ActivityList url={`/api/activity/findList`} params={this.state.search}/>
              </Tabs.TabPane>
              <Tabs.TabPane tab='创业动态' key={2}>
                <ActivityList url={`/api/article/findList`} params={this.state.search}/>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({app}) => app)(Search);
