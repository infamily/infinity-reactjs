import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import EmailView from './index';

configure({ adapter: new Adapter() });

describe('<EmailView />', () => {
  it('should render <EmailView /> components', () => {
    const wrapper = shallow(<EmailView />);
  });
});
