import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import configs from 'configs';
import FormSelect from 'components/FormSelect';
import TabDataField from 'components/TabDataField';
import Instance from './Widgets';
import InstanceModal from './Modals';
import { getSchemas, getInstances } from './services';
import { transitionStyles } from './transition';
import fullIcon from 'images/fullscreen.svg';
import './StreamTab.css';

export default class StreamTab extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      instances: [],
      instanceData: null,
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

  componentDidMount() {
    this.open();    
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
    setTimeout(() => this.props.history.push(configs.linkBase() + '/'), 500);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  showInstance = (data) => {
    this.setState({ instanceData: data });
  }

  closeInstance = () => {
    this.setState({ instanceData: null });
  }

  render() {
    const { 
      isOpen,
      schemas,
      instances,
      activeSchema,
      instanceData,
      fullWidth } = this.state;
    const fullStyle = fullWidth ? ' stream_tab--full' : '';

    const ControlButtons = () => (
      <div className="stream_tab__buttons">
        <span onClick={this.toggleFullScreen} className="stream_tab__full_icon">
          <img src={fullIcon} alt="" />
        </span>
        <span onClick={this.close} className="stream_tab__close"></span>
      </div>
    );
    
    const schemaData = instances ? instances.filter(item => item.schema === activeSchema) : [];
    const schemaName = schemas && schemas.find(item => item.url === activeSchema);
    
    return (
      <div>
        <Transition in={isOpen} timeout={0}>
          {(state) => (
            <div className="tab_container" style={{
              ...transitionStyles[state]
            }}>
              <div className={"stream_tab" + fullStyle} style={{
                ...transitionStyles[state]
              }}>
                <div className="stream_tab__header">
                  {isOpen && <ControlButtons />}                
                  <div className="stream_tab__select">
                    <FormSelect
                      name="activeSchema"
                      label="Schema"
                      action={this.handleChange}
                      value={activeSchema}
                      >
                      {schemas ? schemas.map(
                        (item) => <option value={item.url} key={item.url}>{item.name}</option>
                      ) : []}
                    </FormSelect>
                  </div>
                </div>
                <div className="stream_tab__scrollable">
                  <div className="stream_tab__container">
                    {schemaName && schemaData.map((item) => (
                      <Instance 
                        data={item} 
                        key={item.url} 
                        showInstance={this.showInstance}
                        schema={schemaName.name}
                      />
                    ))}
                  </div>
                </div>
                <TabDataField />
              </div>
            </div>
          )}
        </Transition>
        {schemaName && 
          <InstanceModal 
            data={instanceData} 
            show={!!instanceData} 
            schema={schemaName.name} 
            onHide={this.closeInstance} 
          />}
      </div>
    );
  }
}
