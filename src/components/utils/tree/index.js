import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import * as helpers from './services/helpers';
import './tree.css';

export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: [
        {
          title: props.title,
          expanded: true,
          children: [
            {
              title: 'Parents',
              children: helpers.formatData(props.parents),
            },
            {
              title: 'Children',
              children: helpers.formatData(props.children),
            },
          ]
        },
      ],
    };
  }

  render() {
    const { searchString, searchFocusIndex, searchFoundCount } = this.state;

    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
      });

    return (
      <div>
        <div className="tree__cointainer">
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            searchFocusOffset={searchFocusIndex}
            canDrag={false}
            isVirtualized={false}
            rowHeight={52}
            className="tree"
            searchMethod={customSearchMethod}
            searchQuery={searchString}
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }
          />
        </div>
      </div>
    );
  }
}
