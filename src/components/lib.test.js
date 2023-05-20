import { Box, CircularProgress, Typography } from '@material-ui/core';
import { ReactComponent as BugFixingSvg } from 'images/bug-fixing.svg';
import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';
import { ErrorFallback, FullPageSpinner, FullPageErrorFallback } from './lib';

describe('ErrorFallback', () => {
  test('renders error message', () => {
    render(<ErrorFallback error={{ message: 'Test error message' }} />);
    expect(screen.getByText('There was an error')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });
});

describe('FullPageSpinner', () => {
  test('renders circular progress', () => {
    render(<FullPageSpinner />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});

describe('FullPageErrorFallback', () => {
  test('renders error message and icon', () => {
    render(<FullPageErrorFallback error={{ message: 'Test error message' }} />);
    expect(screen.getByText('Uh oh... There\'s a problem. Try refreshing the app.')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    // expect(screen.getByRole('img')).toBeInTheDocument();
  });
});

FullPageErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
};
