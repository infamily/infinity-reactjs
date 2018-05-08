import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
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
    <div
      className="category_select__option category_select__sub_option"
      data-tip={definition}
      data-for={value}
    >
      <option onClick={handleMouseDown} value={value}>
        {label}
      </option>
      <ReactTooltip id={value} />
    </div>
  );
};

class SelectOption extends Component {
  constructor() {
    super();
    this.state = { subCatigories: [], showSubs: true, loading: false };
  }

  expandSubs = async () => {
    const { option } = this.props;
    const { url } = option;
    const id = getTypeId(url);
    this.setState({
      loading: true
    });
    const subs = await topicViewService.getSubCategoriesById(id);
    const subCatigories = [option].concat(parseCategories(subs));
    this.setState({
      subCatigories,
      loading: false
    });
  };

  render() {
    const { option } = this.props;
    const { subCatigories, showSubs, loading } = this.state;
    const { value, label, definition } = option;

    return (
      <div>
        <div
          className="category_select__option"
          data-tip={definition}
          data-for={value}
        >
          <option onClick={this.expandSubs} value={value}>
            {label}
          </option>
          <ReactTooltip id={value} />
        </div>
        {loading && <LoadingElements size={42} />}
        {showSubs &&
          subCatigories.map(item => (
            <SelectOptionItem option={item} onSelect={this.props.onSelect} />
          ))}
      </div>
    );
  }
}

SelectOption.propsTypes = {
  option: PropTypes.objectOf({
    value: PropTypes.string.isRequired,
    object: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired
  }),
  onSelect: PropTypes.func.isRequired
};

export default SelectOption;
