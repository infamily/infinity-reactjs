import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

import FormSelect from '../../components/FormSelect';
import fullIcon from '../../img/fullscreen.svg';
import Instance from './Instance';

import { getSchemas, getInstances } from './services';
import { transitionStyles } from './style';
import './StreamTab.css';


export default class StreamTab extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      instances: [],
      schemas: [],
      activeSchema: 'null',
      fullWidth: false,
    }
  }

  async componentWillMount() {
    const schemas = await getSchemas();
    const instances = await getInstances();
    
    this.setState({
      schemas,
      instances,
    });
  }

  toggleFullScreen = () => {
    this.setState((prevState => (
      { fullWidth: !prevState.fullWidth }
    )));
  }

  open = () => {
    this.setState({ isOpen: true });
  }

  close = () => {
    this.setState({ isOpen: false });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { isOpen, schemas, instances, activeSchema, fullWidth } = this.state;
    const fullStyle = fullWidth ? ' stream_tab--full' : '';

    const TabToggle = () => ( !isOpen &&
      <div className="stream_tab__toggle" onClick={this.open}>
        Stream
      </div>
    );
    
    const schemaData = instances.filter(item => item.schema === activeSchema);
    
    return (
      <div>
        <TabToggle />
        <Transition in={isOpen} timeout={0}>
          {(state) => (
            <div className="tab_container" style={{
              ...transitionStyles[state]
            }}>
              <div className={"stream_tab" + fullStyle} style={{
                ...transitionStyles[state]
              }}>
                <span onClick={this.close} className="stream_tab__close"></span>
                <div onClick={this.toggleFullScreen} className="stream_tab__full_icon">
                  <img src={fullIcon} alt=""/>
                </div>
                <div className="stream_tab__header">
                  <FormSelect
                    name="activeSchema"
                    label="Schema"
                    action={this.handleChange}
                    value={activeSchema}
                    className="stream_tab__select">
                    {schemas.map(
                      (item) => <option value={item.url} key={item.url}>{item.name}</option>
                    )}
                  </FormSelect>
                </div>
                <div className="stream_tab__container">
                  {schemaData.map((item) => <Instance data={item} key={item.url} />)}
                </div>
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}
