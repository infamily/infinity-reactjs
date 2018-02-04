import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from '../utils/menu';
import Language from '../utils/lang_select';
import Loading from '../utils/Loading'; 
import TypeItem from '../utils/TypeItem'; 

import { getType } from './services';

class TypesList extends Component {
  constructor() {
    super();
    this.state = {
      type: null,
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }; 

  async componentWillMount() {
    const { match: { params } } = this.props;
    
    const type = await getType(params.id);
    this.setState({ type });
  }

  render() {
    const { type } = this.state;

    if (type === null) return <Loading />;

    return (
      <div className="main">
        {type === undefined
          ? <h4>No such type =(</h4>
          : <TypeItem type={type}/>}
        
        <Menu page='Home'/>
        <Language/>
      </div>
    );
  }
}

export default TypesList;
