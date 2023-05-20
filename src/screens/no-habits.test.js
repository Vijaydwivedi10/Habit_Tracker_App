import { shallow } from 'enzyme';
import { Fab, Box, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { ReactComponent as EmptyBox } from 'images/empty-box.svg';
import { Link as RouterLink } from 'react-router-dom';
import { NoHabitsScreen } from './no-habits';

describe('NoHabitsScreen', () => {
  it('renders the expected components', () => {
    const wrapper = shallow(<NoHabitsScreen />);
    expect(wrapper.find(Box)).toHaveLength(4);
    expect(wrapper.find(EmptyBox)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(Fab)).toHaveLength(1);
    expect(wrapper.find(AddIcon)).toHaveLength(1);
  });

  it('renders the expected text', () => {
    const wrapper = shallow(<NoHabitsScreen />);
    expect(wrapper.find(Typography).at(0).text()).toBe('There are no goals');
    expect(wrapper.find(Typography).at(1).text()).toBe(
      "Looks like you don't have any goals yet, want to add one?"
    );
    expect(wrapper.find(Fab).text()).toBe('Add Goal');
  });

  it('passes the expected props', () => {
    const wrapper = shallow(<NoHabitsScreen />);
    expect(wrapper.find(Fab).prop('color')).toBe('primary');
    expect(wrapper.find(Fab).prop('variant')).toBe('extended');
    expect(wrapper.find(Fab).prop('to')).toBe('/add-habit');
  });
});
