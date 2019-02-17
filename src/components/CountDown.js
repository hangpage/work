/**
 * @Description:
 * @Author: zzhihang@hotmail.com
 * @Date: 2019/1/25 15:00
 */
import React from 'react';

class CountDown extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: this.props.count || 60,
      couldSend: true
    }
  }
  startTimer() {
    this.timer = setInterval(() => {
        let {count} = this.state;
        if(count < 1){
          this.setState({
            couldSend: true,
            count: this.props.count
          }, () => {
            clearInterval(this.timer);
          })
        }else{
          count -= 1;
          this.setState({
            count,
            couldSend: false
          })
        }
    }, 1000);
  }

  UNSAFE_componentWillMount() {
    clearInterval(this.timer);
  }

  render() {
    const {count, couldSend} = this.state;
    const {onClick} = this.props;
    let text = couldSend ? '获取验证码' : `${count}秒后重发`;
    return (
      <div className='count-down'>
        <span onClick={onClick}>
          {text}
        </span>
      </div>
    );
  }
}

export default CountDown;
