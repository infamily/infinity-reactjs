import React from 'react';
import PropTypes from 'prop-types';
import { makeHtml } from 'services/common.services';
import PreviewTopicBar from 'components/TopicProgressBar/PreviewTopicBar';
import { Link } from 'react-router-dom';
import configs from 'configs';
// import TopicEditButton from '../TopicEditButton';
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
const makeGradient = hex =>
  `linear-gradient(to bottom, ${hex} 90%, rgba(255,0,0,0))`;
const getTitleStyle = color => ({
  background: makeGradient(makeHexDim(color, 35))
});

export default function TopicCard({ topic }) {
  const { title, body, id, type } = topic;
  const color = getColor(type);
  const time = 'Feb 15, 2018';

  return (
    <div className="card__item">
      <div className="card__title" style={getTitleStyle(color)}>
        <Link to={getTopicLink(id)}>
          <h4>{title}</h4>
        </Link>
      </div>
      <div className="card__description">
        <div className="card__text">{makeHtml(body)}</div>
        <small>{time}</small>
      </div>
      <PreviewTopicBar topic={topic} />
    </div>
  );
}

TopicCard.propTypes = {
  topic: PropTypes.object.isRequired
};
