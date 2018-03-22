import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TooltipOverlay from 'components/TooltipOverlay';
import QuotaBox from 'scenes/QuotaBox';
import { get } from './services';
import './balance.css';

class Balance extends Component {
  constructor() {
    super();
    this.state = {
      hours: null,
      isOpenQuotaBox: false,
    };
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  async componentWillMount() {
    await this.updateBalanceState();
  }
  
  updateData = async () => {
    await this.updateBalanceState();
  }

  async updateBalanceState() {
    const { id } = this.props;
    const data = await get(id);
    const isData = data !== undefined;
    const balance = isData ? data.balance : -1;
    const quota = isData ? data.credit : -1;
    const parse = (data) => parseFloat(data).toFixed(2);

    this.setState({ 
      hours: parse(balance),
      quota: parse(quota),
     });
  }

  handleOpen = () => {
    this.setState((prevState) => ({
      isOpenQuotaBox: !prevState.isOpenQuotaBox,
    }))
  }

  render() {
    const { hours, quota, isOpenQuotaBox } = this.state;
    const { id, showQuota } = this.props;

    if (!hours || hours < 0) return null;

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
            updateData={this.updateData}
            isOpen={isOpenQuotaBox}
            id={id}
            hours={quota}
          />}
      </div>
      
    );
  }
};

export default Balance;
