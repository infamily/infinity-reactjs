import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { badgeStyle } from '../helpers/badge';
import configs from 'configs';
import './tags.css';


const Tag = ({ topic }) => (
  <Link to={`${configs.linkBase()}/topic/${topic.id}`} key={topic.title} className="tags__item">
    <Badge className="tags__badge" style={badgeStyle(topic.type)}>{' '}</Badge>
    {' ' + topic.title}
  </Link>
);

Tag.propTypes = {
  topic: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
};

const Tags = ({ title, items }) => items[0]
  ? <div className="tags__tag-box">
    <span className="tags__title">{title}</span>
    {items.map(topic => <Tag topic={topic} key={topic.id} />)}
  </div>
  : null;

Tags.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default Tags;
