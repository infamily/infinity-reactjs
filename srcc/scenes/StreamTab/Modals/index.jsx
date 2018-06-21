import React from 'react';
import Default from './Default';
import HalfBakery from './HalfBakery';

export default ({ schema, show, onHide, data }) => {
  switch (schema) {
    case 'halfbakery.com/ideas':
      return <HalfBakery show={show} onHide={onHide} data={data} />;
    default:
      return <Default show={show} onHide={onHide} data={data} />;
  }
};
