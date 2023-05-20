import React from 'react';
import { shallow } from 'enzyme';
import { AuthenticatedApp } from './authenticated-app';
import { AuthenticatedAppProviders } from 'context';

describe('AuthenticatedApp', () => {
  it('renders without crashing', () => {
    shallow(
      <AuthenticatedAppProviders>
        <AuthenticatedApp />
      </AuthenticatedAppProviders>
    );
  });
});
