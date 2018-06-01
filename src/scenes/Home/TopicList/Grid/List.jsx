import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner as createCellPositioner,
  List,
  WindowScroller,
  recomputeCellPositions,
  AutoSizer
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import './Grid.css';

export default class CardGrid extends PureComponent {
  render() {
    const { children } = this.props;

    const ITEMS_COUNT = children.length;
    const ITEM_SIZE = 250;

    return (
      <AutoSizer>
        {({ height, width }) => {
          const itemsPerRow = Math.floor(width / ITEM_SIZE);
          const rowCount = Math.ceil(ITEMS_COUNT / itemsPerRow);

          const cardRenderer = () => ({ index, key, style }) => {
            const items = [];
            const fromIndex = index * itemsPerRow;
            const toIndex = Math.min(fromIndex + itemsPerRow, ITEMS_COUNT);

            for (let i = fromIndex; i < toIndex; i += 1) {
              items.push(
                <div className="Item" key={i}>
                  {children[i]}
                </div>
              );
            }

            return (
              <div className="Row" key={key} style={style}>
                {items}
              </div>
            );
          };

          return (
            <List
              width={width}
              height={height}
              rowCount={rowCount}
              rowHeight={ITEM_SIZE}
              rowRenderer={cardRenderer}
            />
          );
        }}
      </AutoSizer>
    );
  }
}
