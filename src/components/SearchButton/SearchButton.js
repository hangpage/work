import React from "react";
import searchIcon from "../../assets/icon/icon-search.png";
import styles from './SearchButton.less'
import {Icon, Input} from "antd";

class SearchButton extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {onCloseClick, onSearchClick} = this.props;
    return (
      <div className={styles.searchInput}>
        <Icon type="close" className={styles.close} width={16} height={16} onClick={onCloseClick}/>
        <img className='icon' src={searchIcon} alt="" onClick={onSearchClick}/>
        <Input placeholder='请输入内容' autoFocus={true}/>
      </div>
    );
  }
}


export default SearchButton;
