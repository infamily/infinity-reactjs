import React from 'react';
import PropTypes from 'prop-types';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer
} from 'react-virtualized';

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 300,
  fixedWidth: true
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 2,
  columnWidth: 300,
  spacer: 10
});

export default function MasonryComponent(props) {
  // Array of images with captions
  const list = props.children;

  const cellRenderer = ({ index, key, parent, style }) => {
    const datum = list[index];

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>{datum}</div>
      </CellMeasurer>
    );
  };

  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <Masonry
          cellCount={list.length}
          cellMeasurerCache={cache}
          cellPositioner={cellPositioner}
          cellRenderer={cellRenderer}
          height={600}
          width={width}
          {...props}
        />
      )}
    </AutoSizer>
  );
}

MasonryComponent.propTypes = {
  children: PropTypes.array.isRequired
};
