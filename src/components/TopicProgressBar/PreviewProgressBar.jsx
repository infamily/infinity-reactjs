import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { ProgressBar } from 'react-bootstrap';
import './TopicProgressBar.css';
import messages from './messages';

const PreviewProgressBar = ({ topic, intl }) => {
  const { matched, declared } = topic;

  if (!declared) return null;

  const remains = declared - matched;
  const all = declared;

  return (
    <ProgressBar className="progress_bar progress_bar__preview">
      <ProgressBar
        bsStyle="success"
        now={matched}
        label={`${matched}$h ${intl.formatMessage({ ...messages.invested })}`}
        key={1}
        max={all}
      />
      <ProgressBar
        bsStyle="warning"
        now={remains}
        label={`${remains.toFixed(2)}h ${intl.formatMessage({
          ...messages.claimed
        })}`}
        key={2}
        max={all}
      />
    </ProgressBar>
  );
};

export default injectIntl(PreviewProgressBar);
