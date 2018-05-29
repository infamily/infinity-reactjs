import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner as createCellPositioner,
  Masonry,
  WindowScroller,
  AutoSizer
} from 'react-virtualized';
import 'react-virtualized/styles.css';

import { List } from 'react-virtualized';

class GridExample extends PureComponent {
  constructor(props) {
    super(props);

    this.columnCount = 0;

    this.cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 250,
      fixedWidth: true
    });

    this.columnHeights = {};

    this.state = {
      columnWidth: 250,
      height: 300,
      gutterSize: 10,
      overscanByPixels: 0,
      windowScrollerEnabled: true
    };

    this.cellRenderer = this.cellRenderer.bind(this);
    this.onResize = this.onResize.bind(this);
    this.renderAutoSizer = this.renderAutoSizer.bind(this);
    this.renderMasonry = this.renderMasonry.bind(this);
    this.renderMasonry2 = this.renderMasonry2.bind(this);
    this.setMasonryRef = this.setMasonryRef.bind(this);
  }

  calculateColumnCount() {
    const { columnWidth, gutterSize } = this.state;

    this.columnCount = Math.floor(this.width / (columnWidth + gutterSize));
  }

  cellRenderer({ index, key, parent, style }) {
    const list = this.props.children;
    const { columnWidth } = this.state;
    // const datum = list.get(index % list.size);
    const datum = list[index];

    return (
      <CellMeasurer cache={this.cache} index={index} key={key} parent={parent}>
        <div
          style={
            { ...style, width: columnWidth } // className={styles.Cell}
          }
        >
          {datum}
        </div>
      </CellMeasurer>
    );
  }

  initCellPositioner() {
    if (typeof this.cellPositioner === 'undefined') {
      const { columnWidth, gutterSize } = this.state;

      this.cellPositioner = createCellPositioner({
        cellMeasurerCache: this.cache,
        columnCount: this.columnCount,
        columnWidth,
        spacer: gutterSize
      });
    }
  }

  onResize({ width }) {
    this.width = width;

    this.columnHeights = {};
    this.calculateColumnCount();
    this.resetCellPositioner();
    this.masonry.recomputeCellPositions();
  }

  renderAutoSizer({ height, scrollTop, isScrolling, onChildScroll }) {
    this.height = height;
    this.scrollTop = scrollTop;
    this.isScrolling = isScrolling;
    this.onChildScroll = onChildScroll;

    const { overscanByPixels } = this.state;

    return (
      <AutoSizer
        disableHeight
        height={height}
        onResize={this.onResize}
        overscanByPixels={overscanByPixels}
        scrollTop={this.scrollTop}
      >
        {this.renderMasonry}
      </AutoSizer>
    );
  }

  renderMasonry({ width }) {
    this.width = width;

    this.calculateColumnCount();
    this.initCellPositioner();

    const { height, overscanByPixels, windowScrollerEnabled } = this.state;
    const { children } = this.props;

    return (
      <Masonry
        autoHeight={windowScrollerEnabled}
        cellCount={children.length}
        cellMeasurerCache={this.cache}
        cellPositioner={this.cellPositioner}
        cellRenderer={this.cellRenderer}
        height={windowScrollerEnabled ? this.height : height}
        overscanByPixels={overscanByPixels}
        ref={this.setMasonryRef}
        scrollTop={this.scrollTop}
        isScrolling={this.isScrolling}
        onScroll={this.onChildScroll}
        width={width}
      />
    );
  }

  renderMasonry2({ height, scrollTop, isScrolling, onChildScroll }) {
    // this.width = width;

    this.calculateColumnCount();
    this.initCellPositioner();

    const { overscanByPixels, windowScrollerEnabled } = this.state;
    const { children } = this.props;

    return (
      <Masonry
        autoHeight={windowScrollerEnabled}
        cellCount={children.length}
        cellMeasurerCache={this.cache}
        cellPositioner={this.cellPositioner}
        cellRenderer={this.cellRenderer}
        height={height}
        overscanByPixels={overscanByPixels}
        ref={this.setMasonryRef}
        scrollTop={scrollTop}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        width={700}
      />
    );
  }

  // to simulate newly loaded cells
  resetList = () => {
    this.cache.clearAll();
    this.resetCellPositioner();
    this.masonry.clearCellPositions();
  };

  resetCellPositioner() {
    const { columnWidth, gutterSize } = this.state;

    this.cellPositioner.reset({
      columnCount: this.columnCount,
      columnWidth,
      spacer: gutterSize
    });
  }

  setMasonryRef(ref) {
    this.masonry = ref;
  }

  render() {
    const {
      columnWidth,
      height,
      gutterSize,
      overscanByPixels,
      windowScrollerEnabled
    } = this.state;

    let child;

    if (windowScrollerEnabled) {
      child = (
        <WindowScroller
          scrollElement={window}
          overscanByPixels={overscanByPixels}
        >
          {this.renderMasonry2}
        </WindowScroller>
      );
    } else {
      child = this.renderAutoSizer({ height });
    }

    return <div className="full_height">{child}</div>;
  }
}

export default class Table extends PureComponent {
  constructor() {
    super();
    this.cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 250,
      fixedWidth: true
    });
  }
  cellRenderer = ({ index, key, parent, style }) => {
    const list = this.props.children;
    // const { columnWidth } = this.state;
    // const datum = list.get(index % list.size);
    const datum = list[index];

    return (
      <CellMeasurer cache={this.cache} index={index} key={key} parent={parent}>
        <div
          style={
            { ...style, width: 250 } // className={styles.Cell}
          }
        >
          {datum}
        </div>
      </CellMeasurer>
    );
  };

  render() {
    return (
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <List
            autoHeight
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            rowCount={100}
            rowHeight={300}
            rowRenderer={this.cellRenderer}
            scrollTop={scrollTop}
            width={600}
          />
        )}
      </WindowScroller>
    );
  }
}
