import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import './TopicProgressBar.css';

export default ({ topic }) => {
  const { matched, declared } = topic;

  if (!declared) return null;

  const remains = declared - matched;
  const all = declared;

  return (
    <ProgressBar className="progress_bar progress_bar__preview">
      <ProgressBar
        bsStyle="success"
        now={matched}
        label={`${matched}$h INVESTED`}
        key={1}
        max={all}
      />
      <ProgressBar
        bsStyle="warning"
        now={remains}
        label={`${remains.toFixed(2)}h CLAIMED`}
        key={2}
        max={all}
      />
    </ProgressBar>
  );
};
