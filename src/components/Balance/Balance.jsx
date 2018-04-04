import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TooltipOverlay from 'components/TooltipOverlay';
import QuotaBox from 'scenes/QuotaBox';
import { getUserBalance } from 'services/user.service';
import './balance.css';

const parseNum = (num) => parseFloat(num).toFixed(2);

class Balance extends Component {
  constructor() {
    super();
    this.state = {
      isOpenQuotaBox: false,
    };
  }

  static propTypes = {
    setBalance: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    balance: PropTypes.object,
  }

  async componentWillMount() {
    const { id, setBalance } = this.props;
    const { data } = await getUserBalance(id);
    setBalance(data);
  }
  
  handleOpen = () => {
    this.setState((prevState) => ({
      isOpenQuotaBox: !prevState.isOpenQuotaBox,
    }))
  }

  render() {
    const { isOpenQuotaBox } = this.state;
    const { user, showQuota, balance, id } = this.props;
    
    if (!balance) return null;
    
    const hours = parseNum(balance.balance);
    const quota = parseNum(balance.credit);

    return (
      <div className="balance__hours">
        <Link to={"/user-investment/" + id}>
          <TooltipOverlay text="Balance" placement="bottom">
            <strong className="balance__counter">{hours}h</strong>
          </TooltipOverlay>
        </Link> 
        {showQuota &&
          <TooltipOverlay 
            text="Remaining quota" 
            placement="bottom" 
            onClick={this.handleOpen}>
            <span 
              onClick={this.handleOpen}            
              className="balance__quota">
              {quota}h
            </span>
          </TooltipOverlay>}
        {showQuota &&
          <QuotaBox
            handleOpen={this.handleOpen}
            isOpen={isOpenQuotaBox}
            id={id}
            hours={quota}
          />}
      </div>
    );
  }
};

export default Balance;