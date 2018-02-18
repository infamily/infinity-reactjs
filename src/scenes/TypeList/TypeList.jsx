import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
  FormGroup, 
  FormControl, 
  InputGroup,
} from 'react-bootstrap';

import Menu from 'components/Menu';
import Language from 'components/LangSelect';
import Loading from 'components/Loading'; 
import Header from 'components/Header'; 
import TypeItem from 'components/TypeItem'; 

import { getTypes } from './services';
import langService from 'services/lang.service';
import './TypeList.css';

class TypesList extends Component {
  constructor() {
    super();
    this.state = {
      content: langService.homeContent(),
      query: '',
      types: null,
    }
  }

  static propTypes = {
    user: PropTypes.object,
    location: PropTypes.object.isRequired,
  }; 

  async componentWillMount() {
    const { location: { search } } = this.props;
    
    if (search) {
      const query = search && search.match(/type=(.+)/);
      query && this.setState({ query: query[1] });
    }
    
    const types = await getTypes();
    this.setState({ types });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  filterItem(item, query) {
    const string = item.url + item.name + item.definition;
    return string.toLowerCase().includes(query.toLowerCase());
  }

  render() {
    const { title } = this.state.content;
    const { types, query } = this.state;
    const { user } = this.props;

    if (types === null) return <Loading />;

    return (
      <div className="main">
        <Header user={user} title={title}/>
        
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>Types</InputGroup.Addon>
            <FormControl type="search" name="query" value={query} onChange={this.handleChange} />
          </InputGroup>
        </FormGroup>

        <div className="types__content">
          {types
            .filter(item => this.filterItem(item, query))
            .map(item => <TypeItem className="types__item" type={item} key={item.url}/>)}
        </div>
        
        <Menu page='Home'/>
        <Language/>
      </div>
    );
  }
}

export default TypesList;
