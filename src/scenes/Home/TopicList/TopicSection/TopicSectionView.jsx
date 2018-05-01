import React from 'react';
import PropTypes from 'prop-types';
// import { CardItem } from 'components/Card';
import configs from 'configs';

export const getColor = type => configs.colors[type];

export default function TopicSectionView({ topic }) {
  // const { title, body } = topic;
  // const color = getColor(topic.type);
  // return <CardItem title={title} body={body} color={color} topic={topic} />;
  return <h2 className="topic_list__title">{` ${topic.title}`}</h2>;
}

TopicSectionView.propTypes = { topic: PropTypes.object.isRequired };
