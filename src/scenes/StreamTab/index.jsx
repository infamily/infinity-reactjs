import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import FormSelect from 'components/FormSelect';
import TabDataField from 'components/TabDataField';
import Loading from 'components/Loading';
import fullIcon from 'images/fullscreen.svg';
import Instance from './Widgets';
import InstanceModal from './Modals';
import { getSchemas, getInstance } from './services';
import messages from './messages';
import './StreamTab.css';

const getId = url => url.match(/schemas\/(\d+)/)[1];

export default class StreamTab extends Component {
  constructor() {
    super();
    this.state = {
      instances: null,
      instanceData: null,
      schemas: null,
      activeSchema: 'null'
    };
  }

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    toggleFullScreen: PropTypes.func.isRequired
  };

  async componentWillMount() {
    const schemas = await getSchemas();
    if (schemas && schemas.length) {
      const id = getId(schemas[0].url);
      const instances = await getInstance(id);

      this.setState({
        schemas,
        instances
      });
    } else {
      this.setState({
        schemas: [],
        instances: []
      });
    }
  }

  loadInstances = async url => {
    const instances = await getInstance(getId(url));
    this.setState({ instances });
  };

  changeSchema = async e => {
    const url = e.target.value;
    this.setState({
      activeSchema: url,
      instances: null
    });
    this.loadInstances(url);
  };

  showInstance = data => {
    this.setState({ instanceData: data });
  };

  closeInstance = () => {
    this.setState({ instanceData: null });
  };

  render() {
    const { schemas, instances, activeSchema, instanceData } = this.state;

    if (!schemas) return <Loading />;

    const ControlButtons = () => (
      <div className="stream_tab__buttons">
        <span
          onClick={this.props.toggleFullScreen}
          className="stream_tab__full_icon"
        >
          <img src={fullIcon} alt="" />
        </span>
        <span onClick={this.props.close} className="stream_tab__close" />
      </div>
    );

    const Instances = () => (
      <div className="stream_tab__container">
        {activeSchema &&
          instances.map(item => (
            <Instance
              data={item}
              key={item.url}
              showInstance={this.showInstance}
              schema={activeSchema.name}
            />
          ))}
      </div>
    );

    return (
      <div className="stream_tab__bg">
        <div className="stream_tab__header">
          {this.props.isOpen && <ControlButtons />}
          <div className="stream_tab__select">
            <FormSelect
              name="activeSchema"
              label={<FormattedMessage {...messages.schema} />}
              action={this.changeSchema}
              value={activeSchema}
            >
              {schemas.map(item => (
                <option value={item.url} key={item.url}>
                  {item.name}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
        <div className="stream_tab__scrollable">
          {instances ? <Instances /> : <Loading />}
          <TabDataField />
        </div>
        {activeSchema && (
          <InstanceModal
            data={instanceData}
            show={!!instanceData}
            schema={activeSchema.name}
            onHide={this.closeInstance}
          />
        )}
      </div>
    );
  }
}
