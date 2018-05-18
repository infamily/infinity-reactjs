// component isn't using (wait to be implemented)

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import LoadingElements from 'components/Loading/LoadingElements';
import topicViewService from 'services/topic_view.service';
import { parseCategories, getTypeId } from '../helpers';
import './SelectOptions.css';

const SelectOptionItem = ({ option, onSelect }) => {
  const { value, label, definition } = option;

  const handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(option, event);
  };

  return (
    <div className="category_select__option category_select__sub_option">
      <div className="category_select__option_label">
        <option
          data-tip={definition}
          data-for={value}
          onClick={handleMouseDown}
          value={value}
        >
          {label}
        </option>
      </div>
      <ReactTooltip id={value} />
    </div>
  );
};

const SubCatigoriesList = ({ subCatigories, onSelect }) =>
  subCatigories && subCatigories.length ? (
    subCatigories.map(item => (
      <SelectOptionItem option={item} key={item.url} onSelect={onSelect} />
    ))
  ) : (
    <div className="category_select__no_subs">No more subcategories</div>
  );

class SelectOption extends Component {
  constructor() {
    super();
    this.state = { subCatigories: null, showSubs: false, loading: false };
  }

  static propTypes = {
    option: PropTypes.shape({
      value: PropTypes.string,
      object: PropTypes.string,
      url: PropTypes.string,
      definition: PropTypes.string
    }).isRequired,
    onSelect: PropTypes.func.isRequired
  };

  handleMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
    const { option, onSelect } = this.props;
    onSelect(option, event);
  };

  expandSubs = async () => {
    const { subCatigories } = this.state;

    if (subCatigories) {
      this.setState(prevState => ({
        showSubs: !prevState.showSubs
      }));
      return;
    }

    const { option } = this.props;
    const { url } = option;
    const id = getTypeId(url);
    this.setState({
      loading: true
    });
    const subs = await topicViewService.getSubCategoriesById(id);
    const catigories = parseCategories(subs || []);
    this.setState({
      subCatigories: catigories,
      loading: false,
      showSubs: true
    });
  };

  render() {
    const { option, onSelect } = this.props;
    const { subCatigories, showSubs, loading } = this.state;
    const { value, label, definition } = option;

    return (
      <div>
        <div
          className={classNames('category_select__option', {
            'category_select__option--expanded': showSubs
          })}
        >
          <div
            className="category_select__option_label"
            onClick={this.handleMouseDown}
          >
            <option data-tip={definition} data-for={value} value={value}>
              {label}
            </option>
          </div>
          <div
            className={classNames('category_select__option_more', {
              'category_select__option_more--expanded': showSubs
            })}
            onClick={this.expandSubs}
          >
            more
          </div>
          <ReactTooltip id={value} />
        </div>
        {loading && <LoadingElements size={42} />}
        {showSubs && (
          <SubCatigoriesList
            subCatigories={subCatigories}
            onSelect={onSelect}
          />
        )}
      </div>
    );
  }
}

export default SelectOption;
