import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TooltipOverlay from 'components/TooltipOverlay';
import QuotaBox from 'scenes/QuotaBox';
import { getUserBalance } from 'services/user.service';
import serverService from 'services/server.service';
import '../balance.css';

const parseNum = num => parseFloat(num).toFixed(2);

class UserBalance extends Component {
  constructor() {
    super();
    this.state = {
      isOpenQuotaBox: false,
      isPayment: false
    };
  }

  static propTypes = {
    setBalance: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    showQuota: PropTypes.bool.isRequired,
    balance: PropTypes.object
  };

  async componentWillMount() {
    const isPayment = await serverService.getPaymentAuthorization();
    this.setState({ isPayment });

    if (isPayment) {
      const { id, setBalance } = this.props;
      const { data } = await getUserBalance(id);
      setBalance(data);
    }
  }

  handleOpen = () => {
    this.setState(prevState => ({
      isOpenQuotaBox: !prevState.isOpenQuotaBox
    }));
  };

  render() {
    const { isOpenQuotaBox, isPayment } = this.state;
    const { balance, id, showQuota } = this.props;

    if (!balance || !isPayment) return null;

    const hours = parseNum(balance.balance);
    const quota = parseNum(balance.credit);

    return (
      <div className="balance__hours balance__only">
        <Link to={`/user-investment/${id}`}>
          <TooltipOverlay text="Balance" placement="bottom">
            <strong className="balance__counter">{hours}h</strong>
          </TooltipOverlay>
        </Link>
        {showQuota && (
          <TooltipOverlay
            text="Remaining quota"
            placement="bottom"
            onClick={this.handleOpen}
          >
            <span onClick={this.handleOpen} className="balance__quota">
              {quota}h
            </span>
          </TooltipOverlay>
        )}
        {showQuota && (
          <QuotaBox
            handleOpen={this.handleOpen}
            isOpen={isOpenQuotaBox}
            id={id}
            hours={quota}
          />
        )}
      </div>
    );
  }
}

export default UserBalance;
