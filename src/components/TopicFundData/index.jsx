import React from 'react';
import PropTypes from 'prop-types';
import PayCheckout from 'components/PayCheckout';
import { Button } from 'components/Layout';
import TooltipOverlay from 'components/TooltipOverlay';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './TopicFundData.css';

const parsePrize = str => {
  try {
    return JSON.parse(str).prize;
  } catch (e) {
    return '';
  }
};

const TopicFundData = ({ topic, updateData }) => {
  const hours = parseFloat(parseFloat(topic.funds).toFixed(2));
  const prize = parsePrize(topic.data);

  if (prize)
    return (
      <div className="topic_fund_data">
        <TooltipOverlay
          text={<FormattedMessage {...messages.topicFundTooltip} />}
          placement="bottom"
        >
          <small className="topic_fund_data__hours">{hours}h</small>
        </TooltipOverlay>
        <PayCheckout
          topicUrl={topic.url}
          updateOuterData={updateData}
          ButtonComponent={() => (
            <Button
              className="topic_fund_data__btn"
              bsStyle="warning"
              bsSize="xsmall"
            >
              <FormattedMessage {...messages.fund} />
            </Button>
          )}
        />
        <TooltipOverlay
          text={<FormattedMessage {...messages.topicPrizeTooltip} />}
          placement="bottom"
        >
          <small className="topic_fund_data__prize">
            {prize} <FormattedMessage {...messages.prize} />
          </small>
        </TooltipOverlay>
      </div>
    );
  else
    return (
      <div className="topic_fund_data">
        <TooltipOverlay
          text={<FormattedMessage {...messages.topicFundTooltip} />}
          placement="bottom"
        >
          <small className="topic_fund_data__hours">{hours}h</small>
        </TooltipOverlay>
        <PayCheckout
          topicUrl={topic.url}
          updateOuterData={updateData}
          ButtonComponent={() => (
            <Button
              className="topic_fund_data__btn"
              bsStyle="warning"
              bsSize="xsmall"
            >
              <FormattedMessage {...messages.fund} />
            </Button>
          )}
        />
      </div>
    );
};

TopicFundData.propTypes = {
  topic: PropTypes.object.isRequired,
  updateData: PropTypes.func
};

TopicFundData.defaultProps = {
  updateData: null
};

export default TopicFundData;
