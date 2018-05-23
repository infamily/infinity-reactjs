import React, { Component } from 'react';
import serverService from 'services/server.service';
import MenuBar from 'scenes/MenuBar';
import Loading from 'components/Loading';
import { makeHtml } from 'services/common.services';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class Terms extends Component {
  constructor() {
    super();
    this.state = {
      terms: ''
    };
  }

  async componentWillMount() {
    const constance = await serverService.get('/constance/');
    const { terms } = constance.data;
    this.setState({ terms: terms || '...' });
  }

  render() {
    const { terms } = this.state;
    const Content = () => (
      <div>
        {terms === '...' && (
          <h1>
            <FormattedMessage {...messages.tos} />
          </h1>
        )}
        <p>{makeHtml(terms)}</p>
      </div>
    );
    return (
      <div className="main">
        {terms ? <Content /> : <Loading />}
        <MenuBar />
      </div>
    );
  }
}

export default Terms;
