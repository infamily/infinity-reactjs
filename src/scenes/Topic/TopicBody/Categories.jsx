import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Categories = ({ categories }) => {
  if (!categories[0]) return null;

  return (
    <p>
      {categories.map(item => (
        <span className="topic__category" key={item.id}>
          <Link to={'/types/' + item.id}>{item.name}</Link>
        </span>
      ))}
    </p>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default Categories;
