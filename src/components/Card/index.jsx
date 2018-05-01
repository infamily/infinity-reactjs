import React from 'react';
import PropTypes from 'prop-types';
import { makeHtml } from 'services/common.services';
import PreviewTopicBar from 'components/TopicProgressBar/PreviewTopicBar';
import './Card.css';

const makeHexDim = (inputHex, opacity) => {
  const hex = inputHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const result = `rgba(${r},${g},${b},${opacity / 100})`;
  return result;
};

const formatText = text =>
  text.length > 75
    ? text
        .substring(0, 100)
        .trim()
        .concat('...')
    : text;

export const CardItem = ({ title, body, time, color, topic }) => (
  <div className="col-sm-6 col-md-6 col-lg-6 mt-4 mb-6">
    <div className="card__item card card-inverse card-info">
      <div
        className="card__title"
        style={{ backgroundColor: makeHexDim(color, 30) }}
      >
        <h4>{title}</h4>
      </div>
      <PreviewTopicBar topic={topic} />
      <div className="card__description">
        <div className="card-block">
          <div className="card__text card-text">{makeHtml(body)}</div>
        </div>
        <div className="card-footer">
          <small>{time}</small>
        </div>
      </div>
    </div>
  </div>
);

CardItem.defaultProps = {
  title: 'AAron Pol',
  time: 'Feb 15, 2018',
  body: 'A.P is a web designer living in London.',
  color: ''
};

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string,
  body: PropTypes.string,
  color: PropTypes.string
};

export default function Card() {
  return (
    <div>
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem description="A.P is a web designer living in London.A.P is a web designer living in London.A.P is a web designer living in London.A.P is a web designer living in London.A.P is a web designer living in London.A.P is a web designer living in London." />
      <CardItem />
      <CardItem />
    </div>
  );
}

Card.propTypes = {
  topic: PropTypes.object
};
