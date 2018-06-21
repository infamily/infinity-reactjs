import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import configs from 'configs';

export default function TopicEditButton({ topic, user }) {
  const isOwner = user && topic.owner.username === user.username;

  return isOwner ? (
    <div className="topic_list__edit">
      <Link to={`${configs.linkBase()}/split/edit/${topic.id}/`}>
        <div className="topic_list__btn">&#9998;</div>
      </Link>
    </div>
  ) : null;
}

TopicEditButton.propTypes = {
  topic: PropTypes.object.isRequired,
  user: PropTypes.object
};

TopicEditButton.defaultProps = {
  user: null
};
