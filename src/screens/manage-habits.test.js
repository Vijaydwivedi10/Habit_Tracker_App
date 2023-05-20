import { Box } from '@material-ui/core';
import { HabitList } from 'components/habit-list';
import { FullPageSpinner } from 'components/lib';
import { useHabitsQuery } from 'api/habits';
import { NoHabitsScreen } from 'screens/no-habits';
import { shallow } from 'enzyme';
import { ManageHabitsScreen } from './manage-habits';

jest.mock('api/habits', () => ({
  useHabitsQuery: jest.fn(),
}));

describe('ManageHabitsScreen', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render a loading spinner when loading', () => {
    useHabitsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    const wrapper = shallow(<ManageHabitsScreen />);
    expect(wrapper.find(FullPageSpinner)).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(0);
  });

  it('should render a "NoHabitsScreen" when no habits', () => {
    useHabitsQuery.mockReturnValue({
      data: [],
      isLoading: false,
    });

    const wrapper = shallow(<ManageHabitsScreen />);
    expect(wrapper.find(NoHabitsScreen)).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(0);
  });

  it('should render a "HabitList" when habits exist', () => {
    const habits = [{ id: 1, name: 'Drink water' }];

    useHabitsQuery.mockReturnValue({
      data: habits,
      isLoading: false,
    });

    const wrapper = shallow(<ManageHabitsScreen />);
    expect(wrapper.find(HabitList)).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(1);
  });
});
