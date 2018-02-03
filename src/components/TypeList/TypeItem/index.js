
import React from 'react';
import PropTypes from 'prop-types';

const TopicItem = ({ type }) => (
  <section className="types__item">
    <h2>{type.name}</h2>
    <p>{type.definition}</p>
  </section>
);

TopicItem.propTypes = {
  type: PropTypes.object.isRequired,
};

export default TopicItem;
