import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import topicViewService from 'services/topic_view.service';
import LoadingElements from 'components/Loading/LoadingElements';
import 'react-select/dist/react-select.min.css';
import SelectOption from './SelectOption/Option';

const parseCategories = array =>
  !array
    ? []
    : array.map(item => {
        const { name, url, definition } = item;
        return { value: name, label: name, url, definition };
      });

export default class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all_categories: null
    };
  }

  async componentWillMount() {
    const categories = await topicViewService.getCategories();

    this.setState({
      all_categories: categories
    });
  }

  render() {
    const { action, value, placeholder } = this.props;
    const { all_categories } = this.state;

    if (!all_categories) return <LoadingElements size={20} />;

    const categories = parseCategories(all_categories);
    return (
      <Select
        className="topic_view__select"
        clearable={false}
        resetValue={categories[0]}
        options={categories}
        optionRenderer={SelectOption}
        placeholder={placeholder || 'Select...'}
        multi
        value={value}
        onChange={action}
      />
    );
  }
}

CategorySelect.defaultProps = {
  placeholder: null
};

CategorySelect.propTypes = {
  placeholder: PropTypes.string,
  action: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired
};
