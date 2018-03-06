import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TooltipOverlay from 'components/TooltipOverlay';
import { get } from './services';
import './balance.css';

class Balance extends Component {
  constructor() {
    super();
    this.state = {
      hours: null
    };
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  async componentWillMount() {
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

  render() {
    const { hours, quota } = this.state;
    const { id, showQuota } = this.props;

    if (!hours || hours < 0) return null;

    return (
      <Link to={"/user-transactions/" + id}>
        <div className="balance__hours">
        <TooltipOverlay text="Balance" placement="bottom">
          <strong className="balance__counter">{hours}h</strong>
        </TooltipOverlay> 
          {showQuota && 
            <TooltipOverlay text="Remaining quota" placement="bottom">
              <span className="balance__quota">{quota}h</span>
            </TooltipOverlay>
          }
        </div>
      </Link> 
    );
  }
};

export default Balance;
