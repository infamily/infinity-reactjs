import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Categories = ({ categories }) => {
  if (!categories[0]) return null;

  return (
    <div className="topic__categories">
      {categories.map(item => (
        <span className="topic__draft topic__category" key={item.id}>
          <Link to={`/types/${item.id}`}>{item.name}</Link>
        </span>
      ))}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

export default Categories;
