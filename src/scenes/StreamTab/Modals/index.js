import React from 'react';
import Default from './Default';
import HalfBakery from './HalfBakery';

export default (rest) => {
  switch (rest.schema) {
    case 'halfbakery.com/ideas':
      return <HalfBakery {...rest} />;
    default:
      return <Default {...rest} />;
  }
};