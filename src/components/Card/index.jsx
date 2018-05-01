import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export const CardItem = ({ title, description, time }) => (
  <div className="col-sm-6 col-md-6 col-lg-6 mt-4 mb-6">
    <div className="card__item card card-inverse card-info">
      <div className="card__title">
        <figure className="profile profile-inline">
          <h4>{title}</h4>
        </figure>
      </div>
      <div className="card__description">
        <div className="card-block">
          <div className="card-text">{description}</div>
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
  time: 'Last updated 3 mins ago',
  description: 'A.P is a web designer living in London.'
};

export default function Card() {
  return (
    <div>
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
    </div>
  );
}

Card.propTypes = {
  topic: PropTypes.object
};
