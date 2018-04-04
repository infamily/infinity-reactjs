import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import PayCheckout from 'components/PayCheckout';
import { Button, ListGroupItem, ListGroup } from 'react-bootstrap';
import { getHistory } from './services';

import './QuotaBox.css';

class QuotaBox extends Component {
  constructor() {
    super();
    this.state = {
      history: [],
    };
  }

  static propTypes = {
    handleOpen: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    hours: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }

  async componentWillMount() {
   await this.updateQuotaBox();
  }
  
  updateData = async () => {
    await this.updateQuotaBox();
  }

  updateQuotaBox = async () => {
    const { id } = this.props;
    const history = await getHistory(id);
    
    this.setState({ 
      history,
    });
  }

  render() {
    const { hours, isOpen, handleOpen } = this.props;
    const { history } = this.state;
    const hoursText = hours === 1 ? 'hour' : 'hours';
    const quotaDescription = 'Review the topics and support authors you like.';

    const History = () => (
      <div className="quota_box__history">
        <p><strong>Payment History</strong></p>
        <div className="quota_box__history_list">
          <ListGroup>
            {history.map(item => (
              <ListGroupItem key={item.id}>{item.hours} hours</ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    );

    return (
      <Modal isOpen={isOpen} close={handleOpen}>
        <div className="quota_box">
          <p className="quota_box__text"> Your quota is </p>
          <h1 className="quota_box__header">{hours} {hoursText}</h1>
          <p className="quota_box__description" >{quotaDescription}</p>
          {history[0] && <History />}
        </div>
        <PayCheckout
          updateOuterData={this.updateData}
          ButtonComponent={() => (
            <Button className="quota_box__button" bsStyle="success" bsSize="large" block>
              Buy credit with card
            </Button>
          )}
        />
      </Modal>
    );
  }
};

export default QuotaBox;
