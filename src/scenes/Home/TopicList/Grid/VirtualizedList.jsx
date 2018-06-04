import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  InfiniteLoader,
  WindowScroller,
  List,
  AutoSizer
} from 'react-virtualized';
import LoadingElements from 'components/Loading/LoadingElements';
import 'react-virtualized/styles.css';
import './Grid.css';
import { log } from 'util';

const styles = {};
const ITEM_SIZE = 265; // width and height of the card
const OVERSCAN = 0;

// InfiniteLoader constants
const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

const getMaxCardWidth = width => {
  // card per row
  if (width >= ITEM_SIZE * 4) return width / 4;
  if (width >= ITEM_SIZE * 3) return width / 3;
  if (width >= ITEM_SIZE * 2) return width / 2;
  return width;
};

export default class VirtualizedList extends Component {
  constructor() {
    super();
    this.state = {
      loadedRowCount: 0,
      loadedRowsMap: null,
      loadingRowCount: 0,
      scrollToIndex: -1,
      showHeaderText: true
    };
  }

  static propTypes = {
    children: PropTypes.array,
    count: PropTypes.number.isRequired,
    loadMore: PropTypes.func.isRequired
  };

  setWidth = width => {
    const rowWidth = ITEM_SIZE * 5 - 10; // max row width for 4 cards
    return width > rowWidth ? rowWidth : width;
  };

  onResize = ({ width }) => {
    this.width = this.setWidth(width);
    this.setRowsMap();
    this.forceUpdate();
  };

  render() {
    const { scrollToIndex } = this.state;

    return (
      <div>
        <WindowScroller ref={this.setRef} scrollElement={window}>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <div className={styles.WindowScrollerWrapper}>
              <AutoSizer disableHeight onResize={this.onResize}>
                {({ width }) => {
                  this.width = this.setWidth(width);
                  return (
                    <div>
                      {width &&
                        this.renderLoader(
                          ({ onRowsRendered, registerChild }) => (
                            <List
                              ref={registerChild}
                              autoHeight
                              className="gird__masonry"
                              height={height}
                              isScrolling={isScrolling}
                              onScroll={onChildScroll}
                              overscanRowCount={OVERSCAN}
                              rowCount={this.countCardRowNumber(
                                this.props.count
                              )}
                              rowHeight={ITEM_SIZE}
                              rowRenderer={this.cardRowRenderer}
                              scrollToIndex={scrollToIndex}
                              scrollTop={scrollTop}
                              width={this.width}
                              onRowsRendered={onRowsRendered}
                            />
                          )
                        )}
                    </div>
                  );
                }}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
      </div>
    );
  }

  isRowLoaded = ({ index }) => !!this.loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED

  setRowsMap = (forceUpdate = null) => {
    if (!forceUpdate && this.loadedRowsMap) return;

    const loadedCount = this.countCardRowNumber();
    const availableRowCount = this.countCardRowNumber(this.props.count);

    const loadedRowsMap = {};
    for (let i = 0; i < availableRowCount; i += 1) {
      if (i < loadedCount) loadedRowsMap[i] = STATUS_LOADED;
      else loadedRowsMap[i] = 0;
    }
    console.log('loadedRowsMap');
    console.log(loadedRowsMap);

    this.loadedRowsMap = loadedRowsMap;
  };

  loaderHandler = async ({ startIndex, stopIndex }) => {
    const loadedCount = this.countCardRowNumber();

    const loadedRowsMap = { ...this.loadedRowsMap };
    for (let i = startIndex; i <= stopIndex; i += 1) {
      loadedRowsMap[i] = STATUS_LOADING;
    }
    this.loadedRowsMap = loadedRowsMap;

    if (loadedCount <= stopIndex) {
      await this.props.loadMore();
      this.setRowsMap('forceUpdate');
      this.forceUpdate();
    }
  };

  renderLoader = renderList => {
    this.setRowsMap();
    const availableRowCount = this.countCardRowNumber(this.props.count);

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loaderHandler}
        rowCount={availableRowCount}
      >
        {renderList}
      </InfiniteLoader>
    );
  };

  hideHeader = () => {
    const { showHeaderText } = this.state;

    this.setState(
      {
        showHeaderText: !showHeaderText
      },
      () => {
        if (this.windowScroller) {
          this.windowScroller.updatePosition();
        }
      }
    );
  };

  countCardRowNumber = (count = null) => {
    if (this.width === 0) return 0;
    const ITEMS_COUNT = count || this.props.children.length;
    const itemsPerRow = Math.floor(this.width / ITEM_SIZE);
    const rowCount = Math.ceil(ITEMS_COUNT / itemsPerRow);
    return rowCount;
  };

  cardRowRenderer = ({ index, key, style }) => {
    const { children } = this.props;
    const ITEMS_COUNT = children.length;

    const itemsPerRow = Math.floor(this.width / ITEM_SIZE);

    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, ITEMS_COUNT);

    const cardStyle = { maxWidth: getMaxCardWidth(this.width) };

    for (let i = fromIndex; i < toIndex; i += 1) {
      const item =
        this.loadedRowsMap[index] === STATUS_LOADED ? (
          <div className="grid__row_item" key={i} style={cardStyle}>
            {children[i]}
          </div>
        ) : (
          <div className="grid__row_item" key={i} style={cardStyle}>
            <LoadingElements />
          </div>
        );
      items.push(item);
    }

    return (
      <div className="grid__row" key={key} style={style}>
        {items}
      </div>
    );
  };

  setRef = windowScroller => {
    this.windowScroller = windowScroller;
  };

  onCheckboxChange = event => {
    this.context.setScrollingCustomElement(event.target.checked);
  };

  onScrollToRowChange = event => {
    const { children } = this.props;
    const list = children;

    let scrollToIndex = Math.min(
      list.length - 1,
      parseInt(event.target.value, 10)
    );

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }

    setTimeout(() => {
      this.setState({ scrollToIndex });
    }, 0);
  };
}
