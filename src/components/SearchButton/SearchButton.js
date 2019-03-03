import React from "react";
import searchIcon from "../../assets/icon/icon-search.png";
import styles from './SearchButton.less'
import {Icon, Input} from "antd";

class SearchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  render() {
    const {onCloseClick, onSearchClick} = this.props;
    return (
      <div className={styles.searchInput}>
        <Icon type="close" className={styles.close} width={16} height={16} onClick={onCloseClick}/>
        <img className='icon' src={searchIcon} alt="" onClick={(e) => {onSearchClick(e, this.state.value)}}/>
        <Input placeholder='请输入内容' autoFocus={true} onChange={this.handleChange} value={this.state.value}/>
      </div>
    );
  }
}


export default SearchButton;
