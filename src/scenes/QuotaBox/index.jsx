import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Modal from 'components/Modal';
import PayCheckout from 'components/PayCheckout';
import { Button, ListGroupItem, ListGroup } from 'react-bootstrap';
import { getHistory } from './services';
import messages from './messages';

import './QuotaBox.css';

class QuotaBox extends Component {
  constructor() {
    super();
    this.state = {
      history: []
    };
  }

  static propTypes = {
    handleOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    hours: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  };

  async componentWillMount() {
    await this.updateQuotaBox();
  }

  updateData = async () => {
    await this.updateQuotaBox();
  };

  updateQuotaBox = async () => {
    const { id } = this.props;
    const history = await getHistory(id);

    this.setState({
      history
    });
  };

  render() {
    const { hours, isOpen, handleOpen } = this.props;
    const { history } = this.state;
    const hoursNum = parseFloat(hours);

    const History = () => (
      <div className="quota_box__history">
        <p>
          <strong>
            <FormattedMessage {...messages.history} />
          </strong>
        </p>
        <div className="quota_box__history_list">
          <ListGroup>
            {history.map(item => (
              <ListGroupItem key={item.id}>
                {item.hours}{' '}
                <FormattedMessage
                  {...messages.countableHours}
                  values={{ count: item.hours }}
                />
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    );

    return (
      <Modal isOpen={isOpen} close={handleOpen}>
        <div className="quota_box">
          <p className="quota_box__text">
            <FormattedMessage {...messages.yourQuota} />
          </p>
          <h1 className="quota_box__header">
            {hoursNum}{' '}
            <FormattedMessage
              {...messages.countableHours}
              values={{ count: hoursNum }}
            />
          </h1>
          <p className="quota_box__description">
            <FormattedMessage {...messages.quotaDescription} />
          </p>
          {history[0] && <History />}
        </div>
        <PayCheckout
          updateOuterData={this.updateData}
          ButtonComponent={() => (
            <Button
              className="quota_box__button"
              bsStyle="success"
              bsSize="large"
              block
            >
              <FormattedMessage {...messages.buy} />
            </Button>
          )}
        />
      </Modal>
    );
  }
}

export default QuotaBox;
