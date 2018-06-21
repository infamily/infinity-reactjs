import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TopicFundData from 'components/TopicFundData';
import { makeHtml } from 'services/common.services';
import messages from 'scenes/Topic/messages';
import configs from 'configs';

const ShowCaseTopicBody = ({ topic, user, updateTopic }) => {
  if (!topic.title) return null;
  const isOwner = user && topic.owner.id === user.id;
  const EditTopic = ({ isOwner, id }) => {
    if (!isOwner) return null;
    return (
      <Link
        to={`${configs.linkBase()}/split/edit/${id}/`}
        className="show_case__edit"
      >
        <Button>
          <FormattedMessage {...messages.edit} />
        </Button>
      </Link>
    );
  };

  return (
    <div className="show_case__container">
      <EditTopic isOwner={isOwner} id={topic.id} />
      <h1 className="show_case__title">{topic.title}</h1>
      <div className="show_case__body">{makeHtml(topic.body)}</div>
      <div className="show_case__bottom">
        <div>
          <span>{topic.owner.username}</span>
        </div>
        <div>
          <TopicFundData topic={topic} updateData={updateTopic} />
        </div>
      </div>
    </div>
  );
};

ShowCaseTopicBody.propTypes = {
  topic: PropTypes.object.isRequired,
  updateTopic: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default ShowCaseTopicBody;
