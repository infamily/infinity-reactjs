import React, { Component } from 'react';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer
} from 'react-virtualized';
import 'react-virtualized/styles.css';
// Array of images with captions

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: true
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 200,
  spacer: 10
});

export default class VirtGrid extends Component {
  cellRenderer = ({ index, key, parent, style }) => {
    const list = this.props.children;
    const datum = list[index];

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>{datum}</div>
      </CellMeasurer>
    );
  };

  render() {
    const list = this.props.children;

    return (
      <div className="full_height">
        <AutoSizer>
          {({ height, width }) => {
            console.log(height, width);
            return (
              <Masonry
                cellCount={list.length}
                cellMeasurerCache={cache}
                cellPositioner={cellPositioner}
                cellRenderer={this.cellRenderer}
                height={height}
                width={width}
              />
            );
          }}
        </AutoSizer>
      </div>
    );
  }
}
