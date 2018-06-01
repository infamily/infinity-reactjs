import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WindowScroller, List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './Grid.css';

const styles = {};
const ITEM_SIZE = 265;
const OVERSCAN = 0;

export default class WindowScrollerExample extends PureComponent {
  static propTypes = {
    children: PropTypes.array
  };

  state = { scrollToIndex: -1, showHeaderText: true };

  setWidth = width => (width > 1200 ? 1200 : width);

  render() {
    const { scrollToIndex, showHeaderText } = this.state;
    const list = this.props.children;

    return (
      <div>
        <WindowScroller ref={this.setRef} scrollElement={window}>
          {({
            height,
            isScrolling,
            registerChild,
            onChildScroll,
            scrollTop
          }) => (
            <div className={styles.WindowScrollerWrapper}>
              <AutoSizer disableHeight>
                {({ width }) => {
                  this.width = this.setWidth(width);
                  return (
                    <div ref={registerChild}>
                      <List
                        ref={el => {
                          window.listEl = el;
                        }}
                        autoHeight
                        className="gird__masonry"
                        height={height}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        overscanRowCount={OVERSCAN}
                        rowCount={this.countCardRowNumber()}
                        rowHeight={ITEM_SIZE}
                        rowRenderer={this.cardRowRenderer}
                        scrollToIndex={scrollToIndex}
                        scrollTop={scrollTop}
                        width={width}
                      />
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

  countCardRowNumber = () => {
    const ITEMS_COUNT = this.props.children.length;
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

    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
        <div className="grid__row_item" key={i}>
          {children[i]}
        </div>
      );
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
