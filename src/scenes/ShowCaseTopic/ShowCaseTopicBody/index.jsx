import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import TopicFundData from 'components/TopicFundData';
import Typist from 'react-typist';
import { NextButton } from 'scenes/Topic/IconButtons';
import { makeHtml } from 'services/common.services';
import messages from 'scenes/Topic/messages';
import configs from 'configs';
import TopicType from './TopicType';
import Categories from './Categories';
import { getColor } from '../helpers';

const ShowCaseTopicBody = ({
  topic,
  children,
  parents,
  user,
  categories,
  history,
  updateTopic,
  intl
}) => {
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

  const updateListFilterByType = () => {
    history.push(
      `${configs.linkBase()}/split/topic/${topic.id}?flag=${topic.type}`
    );
  };

  return (
    <div className="show_case__container">
      <EditTopic isOwner={isOwner} id={topic.id} />
      <Typist>
        <h1 className="show_case__title">{topic.title}</h1>
      </Typist>
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
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  updateTopic: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default injectIntl(ShowCaseTopicBody);
