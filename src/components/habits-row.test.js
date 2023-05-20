import React from 'react';
import { shallow } from 'enzyme';
import { HabitRow } from './habit-row';

describe('HabitRow', () => {
  const habit = {
    id: '1',
    name: 'Drink water',
    frequency: [1, 3, 5],
  };
  const dates = ['2023-05-01', '2023-05-02', '2023-05-03'];
  const checkmarks = [
    { habitId: '1', date: '2023-05-01', id: '1', value: true },
    { habitId: '1', date: '2023-05-03', id: '2', value: false },
  ];

  it('should render a table row', () => {
    const wrapper = shallow(
      <HabitRow habit={habit} dates={dates} checkmarks={checkmarks} />
    );
    expect(wrapper.find('tr')).toBeDefined;
  });

  it('should render the habit name in the first cell', () => {
    const wrapper = shallow(
      <HabitRow habit={habit} dates={dates} checkmarks={checkmarks} />
    );
    expect(wrapper.find).toBeDefined;
  });

  it('should render a Checkmark for each date', () => {
    const wrapper = shallow(
      <HabitRow habit={habit} dates={dates} checkmarks={checkmarks} />
    );
    expect(wrapper.find('Checkmark')).toHaveLength(dates.length);
  });
});
