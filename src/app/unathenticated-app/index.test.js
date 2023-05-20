import React from 'react';
import { shallow } from 'enzyme';
import { UnathenticatedApp } from './unauthenticated-app';

describe('UnauthenticatedApp component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<UnathenticatedApp />);
    expect(wrapper.exists()).toBe(true);
  });
});
