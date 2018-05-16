import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import EmailView from './index';

configure({ adapter: new Adapter() });

const updateInput = (wrapper, instance, newValue) => {
  const selector = `[name="${instance}"]`;
  const input = wrapper.find(selector);
  input.simulate('change', {
    target: { name: instance, value: newValue }
  });
  return wrapper.find(selector);
};

describe('<EmailView />', () => {
  const props = {
    view: 'email',
    setPopUp: jest.fn(),
    changeView: jest.fn(),
    changeEmail: jest.fn()
  };

  test('calls componentWillMount', () => {
    jest.spyOn(EmailView.prototype, 'componentWillMount');
    shallow(<EmailView {...props} />);
    expect(EmailView.prototype.componentWillMount.mock.calls.length).toBe(1);
  });

  test('updates terms on Click', () => {
    const wrapper = shallow(<EmailView {...props} />);
    const tosText = wrapper.find('[testId="tosText"]');
    expect(tosText.length).toBe(1);
    tosText.simulate('click');
    expect(wrapper.state().tosAgreement).toBe(true);
  });

  test('allows user to fillout form', () => {
    const wrapper = shallow(<EmailView {...props} />);
    const emailInput = updateInput(wrapper, 'email', 'tony@stark.com');
    const captcha_1Input = updateInput(wrapper, 'captcha_1', 'braaa');
    expect(emailInput.props().value).toBe('tony@stark.com');
    expect(captcha_1Input.props().value).toBe('braaa');
  });

  test('submits the form', () => {
    const wrapper = shallow(<EmailView {...props} />);

    updateInput(wrapper, 'email', 'tony@stark.com');
    updateInput(wrapper, 'captcha_1', 'braaa');
    wrapper.find('[testId="tosText"]').simulate('click');
    wrapper
      .find('[testId="emailSubmitForm"]')
      .simulate('submit', { preventDefault: () => {} });
    expect(props.changeEmail).toHaveBeenCalledWith('tony@stark.com');
  });

  test('matches snapshot', () => {
    const wrapper = shallow(<EmailView {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
