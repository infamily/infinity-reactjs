import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormSelect from 'components/FormSelect';
import TabDataField from 'components/TabDataField';
import Instance from './Widgets';
import InstanceModal from './Modals';
import { getSchemas, getInstances } from './services';
import fullIcon from 'images/fullscreen.svg';
import './StreamTab.css';

export default class StreamTab extends Component {
  constructor() {
    super();
    this.state = {
      instances: [],
      instanceData: null,
      schemas: [],
      activeSchema: 'null',
    }
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    toggleFullScreen: PropTypes.func.isRequired,
  }

  async componentWillMount() {
    const schemas = await getSchemas();
    const instances = await getInstances();
    
    this.setState({
      schemas,
      instances,
    });
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
    } = this.state;

    const ControlButtons = () => (
      <div className="stream_tab__buttons">
        <span onClick={this.props.toggleFullScreen} className="stream_tab__full_icon">
          <img src={fullIcon} alt="" />
        </span>
        <span onClick={this.props.close} className="stream_tab__close"></span>
      </div>
    );
    
    const schemaData = instances ? instances.filter(item => item.schema === activeSchema) : [];
    const schemaName = schemas && schemas.find(item => item.url === activeSchema);
    
    const TabPanelContent = () => (
      <div>
        <div className="stream_tab__header">
          <ControlButtons />               
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
          {schemaName && 
          <InstanceModal 
            data={instanceData} 
            show={!!instanceData} 
            schema={schemaName.name} 
            onHide={this.closeInstance} 
          />}
      </div>
    );

    return (
      <div>
        <TabPanelContent />
      </div>
    );
  }
}
