import { shallow } from 'enzyme';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Typography } from '@material-ui/core';
import { List as ListIcon } from '@material-ui/icons';
import { NotFoundHabitScreen } from './not-found-habit';

describe('NotFoundHabitScreen', () => {
  it('renders the correct message and link', () => {
    const wrapper = shallow(<NotFoundHabitScreen />);
    expect(wrapper.find(Typography).text()).toEqual("This goal doesn't exist!");
    expect(wrapper.find(Fab).prop('component')).toEqual(RouterLink);
    expect(wrapper.find(Fab).prop('to')).toEqual('/manage-habits');
  });
});
