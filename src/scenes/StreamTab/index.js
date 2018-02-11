import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

// import Loading from '../../components/Loading';
import FormSelect from '../../components/FormSelect';
import fullIcon from '../../img/fullscreen.svg';

import { getSchemas } from './services';
import { transitionStyles } from './style';
import './StreamTab.css';


export default class StreamTab extends Component {
  constructor() {
    super();
    this.state = {
      schemas: null,
      isOpen: false,
      activeSchema: '',
      fullWidth: false,
    }
  }

  async componentWillMount() {
    const schemas = await getSchemas();
    const activeSchema = (schemas && schemas[0]) && schemas[0].name;
    
    this.setState({
      schemas,
      activeSchema,
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
    const { isOpen, schemas, activeSchema, fullWidth } = this.state;
    const fullStyle = fullWidth ? ' stream_tab--full' : '';

    const TabToggle = () => ( !isOpen &&
      <div className="stream_tab__toggle" onClick={this.open}>
        Stream
      </div>
    );

    if (!schemas) return null;

    const Schemas = () => schemas && schemas.map(
      (item, i) => <option value={item.name} key={item.url}>{item.name}</option>
    );

    const schemaData = schemas.find(item => item.name === activeSchema);
    
    const Instances = () => schemas && schemaData.specification.map(
      (item, i) => (
        <div className="stream_tab__instance" key={i}>
          <p className="instance__tag">#{i + 1}</p>
          <pre><code className="json">{JSON.stringify(item, null, 2)}</code></pre>
        </div>
      )
    );
    
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
                    <Schemas />
                  </FormSelect>
                </div>
                <div className="stream_tab__container">
                  <Instances />
                </div>
              </div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}
