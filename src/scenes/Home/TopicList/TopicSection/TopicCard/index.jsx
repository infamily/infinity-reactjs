import React from 'react';
import PropTypes from 'prop-types';
import { makePreviewHtml } from 'services/common.services';
import PreviewTopicBar from 'components/TopicProgressBar/PreviewTopicBar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import configs from 'configs';
import './TopicCard.css';

const makeHexDim = (inputHex, opacity) => {
  const hex = inputHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const result = `rgba(${r},${g},${b},${opacity / 100})`;
  return result;
};
const getTopicLink = id => `${configs.linkBase()}/split/topic/${id}`;
const getColor = type => configs.colors[type];
const getTitleStyle = color => ({
  borderLeft: `3px solid ${makeHexDim(color, 85)}`
  // backgroundColor: `${makeHexDim(color, 25)}`
});

export default function TopicCard({ topic }) {
  const { title, body, id, type, created_date } = topic;
  const color = getColor(type);
  const time = moment(created_date).format('MMMM Do YYYY');
  // 'Feb 15, 2018';

  return (
    <Link to={getTopicLink(id)}>
      <div className="card__item" style={getTitleStyle(color)}>
        <div className="card__title">
          <h4 className="card__title-text">{title}</h4>
        </div>
        <div className="card__description">
          <div className="card__text">{makePreviewHtml(body)}</div>
          <br />
          <small>{time}</small>
        </div>
        <PreviewTopicBar topic={topic} />
      </div>
    </Link>
  );
}

TopicCard.propTypes = {
  topic: PropTypes.object.isRequired
};
