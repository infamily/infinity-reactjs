import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner as createCellPositioner,
  Masonry,
  WindowScroller,
  AutoSizer
} from 'react-virtualized';
import 'react-virtualized/styles.css';

export default class VirtualizedGrid extends PureComponent {
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
      gutterSize: 10,
      overscanByPixels: 0
    };
  }

  static defaultProps = { children: null };
  static propTypes = { children: PropTypes.array };

  calculateColumnCount = () => {
    const { columnWidth, gutterSize } = this.state;

    this.columnCount = Math.floor(this.width / (columnWidth + gutterSize));
  };

  cellRenderer = ({ index, key, parent, style }) => {
    const list = this.props.children;
    const { columnWidth } = this.state;
    const datum = list[index];

    return (
      <CellMeasurer cache={this.cache} index={index} key={key} parent={parent}>
        <div style={{ ...style, width: columnWidth }}>{datum}</div>
      </CellMeasurer>
    );
  };

  initCellPositioner = () => {
    if (typeof this.cellPositioner === 'undefined') {
      const { columnWidth, gutterSize } = this.state;

      this.cellPositioner = createCellPositioner({
        cellMeasurerCache: this.cache,
        columnCount: this.columnCount,
        columnWidth,
        spacer: gutterSize
      });
    }
  };

  onResize = ({ width }) => {
    this.width = width;

    this.columnHeights = {};
    this.calculateColumnCount();
    this.resetCellPositioner();
    this.masonry.recomputeCellPositions();
  };

  renderAutoSizer = ({ height, scrollTop, isScrolling, onChildScroll }) => {
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
  };

  renderMasonry = ({ width }) => {
    this.width = width;

    this.calculateColumnCount();
    this.initCellPositioner();

    const { overscanByPixels } = this.state;
    const { children } = this.props;

    return (
      <Masonry
        autoHeight
        cellCount={children.length}
        cellMeasurerCache={this.cache}
        cellPositioner={this.cellPositioner}
        cellRenderer={this.cellRenderer}
        height={this.height}
        overscanByPixels={overscanByPixels}
        ref={this.setMasonryRef}
        scrollTop={this.scrollTop}
        isScrolling={this.isScrolling}
        onScroll={this.onChildScroll}
        width={width}
      />
    );
  };

  resetCellPositioner = () => {
    const { columnWidth, gutterSize } = this.state;

    this.cellPositioner.reset({
      columnCount: this.columnCount,
      columnWidth,
      spacer: gutterSize
    });
  };

  setMasonryRef = ref => {
    this.masonry = ref;
  };

  render() {
    const { overscanByPixels } = this.state;

    return (
      <WindowScroller overscanByPixels={overscanByPixels}>
        {this.renderAutoSizer}
      </WindowScroller>
    );
  }
}
