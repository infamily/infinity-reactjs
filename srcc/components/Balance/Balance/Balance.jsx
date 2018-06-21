import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import TooltipOverlay from 'components/TooltipOverlay';
import { getUserBalance } from 'services/user.service';
import messages from '../messages';
import '../balance.css';

class Balance extends Component {
  constructor() {
    super();
    this.state = {
      hours: null,
      isOpenQuotaBox: false
    };
  }

  static propTypes = {
    id: PropTypes.number.isRequired
  };

  async componentWillMount() {
    await this.updateBalanceState();
  }

  async updateBalanceState() {
    const { id } = this.props;
    const { data } = await getUserBalance(id);
    const isData = data && data !== null;
    const balance = isData ? data.balance : -1;
    const parse = data => parseFloat(data).toFixed(2);

    this.setState({
      hours: parse(balance)
    });
  }

  render() {
    const { hours } = this.state;
    const { id } = this.props;

    if (!hours || hours < 0) return null;

    return (
      <div className="balance__hours balance__only">
        <Link to={`/user-investment/${id}`}>
          <TooltipOverlay
            text={<FormattedMessage {...messages.balanceTooltip} />}
            placement="bottom"
          >
            <strong className="balance__counter">
              <FormattedMessage
                id="infinity.common.shortCountableHours.COUNT"
                values={{ count: hours }}
              />
            </strong>
          </TooltipOverlay>
        </Link>
      </div>
    );
  }
}

export default Balance;
