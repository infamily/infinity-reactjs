import React from 'react';
import PropTypes from 'prop-types';

export default function TopicSectionView({ topic }) {
  return <h2 className="topic_list__title">{` ${topic.title}`}</h2>;
}

TopicSectionView.propTypes = { topic: PropTypes.object.isRequired };
