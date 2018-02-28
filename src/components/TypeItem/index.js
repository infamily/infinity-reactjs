
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopicItem = ({ type }) => (
  <Link to={'/types/' + type.id}>
    <section>
      <h2>{type.name}</h2>
      <p>{type.definition}</p>
    </section>
  </Link>
);

TopicItem.propTypes = {
  type: PropTypes.object.isRequired,
};

export default TopicItem;
