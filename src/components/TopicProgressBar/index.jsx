import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './TopicProgressBar.css';

export default ({ comment, invest }) => {
  const { claimed_hours, assumed_hours, matched, donated, remains } = comment;

  if (!remains) return null;

  const total_time = parseFloat(claimed_hours) + parseFloat(assumed_hours);
  const total_money = matched + donated;

  const countTotal = () => {
    if (invest && invest >= 0) return invest + total_money;
    return total_money;
  };

  const total = countTotal();
  const need = total_time - total;
  const _claimed = need - parseFloat(assumed_hours);
  const _assumed = parseFloat(assumed_hours);
  const claimed = _claimed >= 0 ? _claimed : 0;
  const assumed = need < _assumed ? need : _assumed;

  const all = total > total_time ? total : total_time;
  const overpay = total > total_time ? total - total_time : 0;
  const pay = total - overpay;

  return (
    <ProgressBar className="progress_bar">
      <ProgressBar
        bsStyle="success"
        now={pay}
        label={`${pay}$h  ${<FormattedMessage {...messages.invested} />}`}
        key={1}
        max={all}
      />
      <ProgressBar
        bsStyle="warning"
        now={claimed}
        label={`${claimed.toFixed(2)}h  ${(
          <FormattedMessage {...messages.claimed} />
        )}`}
        key={2}
        max={all}
      />
      <ProgressBar
        className="progress_bar__assumed"
        now={assumed}
        label={`${assumed.toFixed(2)}h  ${(
          <FormattedMessage {...messages.assumed} />
        )}`}
        key={3}
        max={all}
      />
      <ProgressBar
        className="progress_bar__over"
        now={overpay}
        label={`${overpay.toFixed(2)}$h  ${(
          <FormattedMessage {...messages.overpay} />
        )}`}
        key={4}
        max={all}
      />
    </ProgressBar>
  );
};
