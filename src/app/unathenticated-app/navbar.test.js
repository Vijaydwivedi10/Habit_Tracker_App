import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Navbar, NavbarStartItem, NavbarRouterLink } from './navbar';

describe('Navbar', () => {
  it('renders with children', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar>
          <NavbarStartItem>
            <span>Logo</span>
          </NavbarStartItem>
          <NavbarRouterLink to="/">Home</NavbarRouterLink>
        </Navbar>
      </MemoryRouter>
    );

    expect(getByText('Logo')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
  });
});

describe('NavbarStartItem', () => {
  it('renders with children', () => {
    const { getByText } = render(
      <NavbarStartItem>
        <span>Logo</span>
      </NavbarStartItem>
    );

    expect(getByText('Logo')).toBeInTheDocument();
  });
});

describe('NavbarRouterLink', () => {
  it('renders with text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NavbarRouterLink to="/">Home</NavbarRouterLink>
      </MemoryRouter>
    );

    expect(getByText('Home')).toBeInTheDocument();
  });
});
