import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { badgeStyle } from '../helpers/badge';
import NewButton from '../NewButton';
import Tags from '../tags';
import Balance from 'components/Balance';
import configs from 'configs';

import ReactHtmlParser from 'react-html-parser';
import showdown from 'showdown';
var mdConverter = new showdown.Converter();


const TopicBody = ({ topic, children, parents, user }) => {
  if (!topic.title) return null;

  const getChild = (type_id) => {
    const child_type = type_id + 1;
    const type = child_type < configs.topic_types.length ? child_type : type_id;
    return configs.topic_types[type];
  }

  const child = getChild(topic.type);

  const EditTopic = ({ owner, id }) => {
    const isOwner = user && (owner === user.username);
    if (!isOwner) return null;
    return <Link to={'/edit/' + id + '/'} className="topic__edit"> <Button>Edit</Button></Link>;
  }

  return (
    <div className="topic__container">

      <EditTopic owner={topic.owner.username} id={topic.id} />
      
      <h1>
        {topic.title}
        <span className="topic__type" style={badgeStyle(topic.type)}>
          {configs.topic_types[topic.type]}
        </span>
      </h1>
      <p className="topic__impact">
        Community contribution<span className="topic__match">{topic.matched}h</span>
      </p>
      <i>{topic.is_draft ? <p>draft</p> : ''}</i>
      
      <Tags title="Parents" items={parents} />
      <div className="topic__body">{ReactHtmlParser(mdConverter.makeHtml(topic.body))}</div>
      <Tags title="Children" items={children} />
      
      <div className="topic__bottom">
        <span>{topic.owner.username}</span>
        <Balance id={topic.owner.id} showQuota={false}/>
        <NewButton to={"/add-child/" + topic.id} title={'+ ' + child} />
      </div>
    </div>
  );
};

TopicBody.propTypes = {
  topic: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  parents: PropTypes.array.isRequired,
  user: PropTypes.object,
};

export default TopicBody;
