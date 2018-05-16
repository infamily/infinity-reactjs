import React from 'react';
import Default from './Default';
import HalfBakery from './HalfBakery';

export default ({ schema, data, showInstance }) => {
  switch (schema) {
    case 'halfbakery.com/ideas':
      return <HalfBakery data={data} showInstance={showInstance} />;
    default:
      return <Default data={data} showInstance={showInstance} />;
  }
};
