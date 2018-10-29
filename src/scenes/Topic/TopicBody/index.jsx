import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Balance from 'components/Balance/Balance';
import UserBalance from 'components/Balance/UserBalance';
import TopicFundData from 'components/TopicFundData';
import { NextButton } from 'scenes/Topic/IconButtons';
import { makeHtml } from 'services/common.services';
import messages from 'scenes/Topic/messages';
import configs from 'configs';
import TopicType from './TopicType';
import Categories from './Categories';
import { getColor } from '../helpers';
import Tags from '../Tags';

const TopicBody = ({
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
        className="topic__edit"
      >
        <Button>
          <FormattedMessage {...messages.edit} />
        </Button>
      </Link>
    );
  };

  const DraftTag = () =>
    topic.is_draft ? (
      <span className="topic__draft">
        <i>
          <FormattedMessage {...messages.draft} />
        </i>
      </span>
    ) : (
      ''
    );

  const BlockchainTag = () =>
    topic.blockchain ? (
      <span className="topic__draft">
        <i>
          <a
            href={`https://${
              process.env.REACT_APP_API_SERVER
            }/topic_snapshots/?topic=${topic.id}`}
            target="__blank"
          >
            <FormattedMessage {...messages.onChain} />
          </a>
        </i>
      </span>
    ) : (
      ''
    );

  const updateListFilterByType = () => {
    history.push(
      `${configs.linkBase()}/split/topic/${topic.id}?flag=${topic.type}`
    );
  };

  const getParents = () => {
    history.push(
      `${configs.linkBase()}/split/topic/${topic.id}?flag=0&parentsById=${
        topic.id
      }`
    );
  };

  const getChildren = () => {
    history.push(
      `${configs.linkBase()}/split/topic/${topic.id}?flag=0&childrenById=${
        topic.id
      }`
    );
  };

  return (
    <div className="topic__container">
      <EditTopic isOwner={isOwner} id={topic.id} />
      <h1>
        {topic.title}
        <Link to={`${configs.linkBase()}/show-case/${topic.id}`}>
          <NextButton />
        </Link>
        <DraftTag />
        <BlockchainTag />
      </h1>
      <div className="topic__tags">
        <TopicType
          type={configs.topic_types[topic.type]}
          color={getColor(topic)}
          onClick={updateListFilterByType}
        />
        <Categories categories={categories} />
      </div>
      <Tags
        title={intl.formatMessage({
          ...messages.parents
        })}
        items={parents}
        onLabelClick={getParents}
      />
      <div className="topic__fund_data">
        <TopicFundData topic={topic} updateData={updateTopic} />
      </div>
      <div className="topic__body">{makeHtml(topic.body)}</div>
      <Tags
        title={intl.formatMessage({
          ...messages.children
        })}
        items={children}
        onLabelClick={getChildren}
      />
      <div className="topic__bottom">
        <div>
          <span>{topic.owner.username}</span>
          {isOwner ? (
            <UserBalance id={topic.owner.id} showQuota={false} />
          ) : (
            <Balance id={topic.owner.id} />
          )}
        </div>
      </div>
    </div>
  );
};

TopicBody.propTypes = {
  topic: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  updateTopic: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default injectIntl(TopicBody);
