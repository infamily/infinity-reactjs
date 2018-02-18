import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from 'components/Menu';
import Language from 'components/LangSelect';
import Loading from 'components/Loading'; 
import TypeItem from 'components/TypeItem'; 

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
