/**
 * @Description: 签到弹窗
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/2/21 19:35
 */
import React from 'react';
import { Map } from 'react-amap';
import Geolocation from 'react-amap-plugin-geolocation';
import {userSign, userSignList} from "../../services/user";
import {equalResultStatus} from "../../utils";
import config from "../../utils/config";
import {message} from 'antd';


class Sign extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }

  getLocation = () => {
    return this.map.getCenter();
  };

  componentDidMount() {
    userSignList().then(({data}) => {
      this.setState({
        data: data.data
      })
    })
  }

  sign = () => {
    let params = this.getLocation();
    console.log(params);
    delete params.N;
    delete params.Q;
    userSign(params).then(({data}) => {
      if(equalResultStatus(data)){
        message.success('签到成功')
      }else{
        message.error(data.message)
      }
    })
  };

  render() {
    const pluginProps = {
      enableHighAccuracy:true,
      timeout: 10000,
      showButton: true,
      showMarker: true,
      zoomToAccuracy:true,
      panToLocation: true,
    };
    const events = {
      created: (ins) => { this.map = ins },
      click: (e) => { console.log(e) },
    };

    const {data} = this.state;
    return (
      <div className='pb36'>
        <div style={{height: 438}}>
          <Map amapkey={config.MAP_KEY} events={events}>
            <Geolocation {...pluginProps} />
          </Map>
        </div>
        <div className="text-align">
          <div className="main-button" style={{margin: '40px auto', width: 400}} onClick={this.sign}>签到</div>
        </div>
        <div className="height1line"/>
        <div className="sign-list">
          <div className="title">签到记录</div>
          {data.map((item, index) => {
            return (
              <div className="item" key={index}>
                <div className='icon-box'>
                  <i className='icon-qiandao'/>
                  <span className='ml11'>签到</span>
                </div>
                <div>{item}</div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Sign;
