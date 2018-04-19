import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { badgeStyle } from '../helpers/badge';
import NewButton from './NewButton';
import Categories from './Categories';
import Tags from '../tags';
import Balance from 'components/Balance/Balance';
import UserBalance from 'components/Balance/UserBalance';
import { makeHtml } from 'services/common.services';
import configs from 'configs';

const TopicBody = ({ topic, children, parents, user, categories }) => {
  if (!topic.title) return null;
  const isOwner = user && (topic.owner.id === user.id);
  
  const getChild = (type_id) => {
    const child_type = type_id + 1;
    const type = child_type < configs.topic_types.length ? child_type : type_id;
    return configs.topic_types[type];
  }

  const child = getChild(topic.type);

  const EditTopic = ({ isOwner, id }) => {
    if (!isOwner) return null;
    return <Link to={configs.linkBase() + '/split/edit/' + id + '/'} className="topic__edit"> <Button>Edit</Button></Link>;
  }

  const isSplit = window.location.href.includes('/split');
  const DraftTag = () => topic.is_draft ? <i>:draft</i> : '';

  return (
    <div className="topic__container">

      <EditTopic isOwner={isOwner} id={topic.id} />
      
      <h1>
        {isSplit
          ? <Link to={configs.linkBase() + '/topic/' + topic.id}>
            {topic.title}
          </Link>
          : <span>{topic.title}</span>}
        <span className="topic__type" style={badgeStyle(topic.type)}>
          {configs.topic_types[topic.type]}
          <DraftTag />
        </span>
      </h1>
      <Categories categories={categories} />
     
      <p className="topic__impact">
        Community contribution<span className="topic__match">{topic.matched}h</span>
      </p>
      
      <Tags title="Parents" items={parents} />
      <div className="topic__body">{makeHtml(topic.body)}</div>
      <Tags title="Children" items={children} />
      
      <div className="topic__bottom">
        <div>
          <span>{topic.owner.username}</span>
          {isOwner
            ? <UserBalance id={topic.owner.id} showQuota={false}/>
            : <Balance id={topic.owner.id}/>}
        </div>
        <NewButton to={"/add-child/" + topic.id} title={'+ ' + child} />
      </div>
    </div>
  );
};

TopicBody.propTypes = {
  topic: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  user: PropTypes.object,
};

export default TopicBody;
