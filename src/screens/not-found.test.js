import { shallow } from 'enzyme';
import { Fab, Box, Typography } from '@material-ui/core';
import { Home as HomeIcon } from '@material-ui/icons';
import { NotFoundScreen } from './not-found';

describe('NotFoundScreen', () => {
  it('renders without crashing', () => {
    shallow(<NotFoundScreen />);
  });

  it('renders the heading', () => {
    const wrapper = shallow(<NotFoundScreen />);
    expect(wrapper.find(Typography).text()).toContain('Are you lost?');
  });

  it('renders the "Go Back" button', () => {
    const wrapper = shallow(<NotFoundScreen />);
  });
});
