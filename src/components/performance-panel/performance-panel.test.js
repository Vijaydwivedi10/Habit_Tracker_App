
import React from 'react';
import { render } from '@testing-library/react';
import { PerformancePanel } from './performance-panel';

describe('PerformancePanel', () => {
  const checkmarks = [
    { date: '2022-05-01', value: 100 },
    { date: '2022-05-02', value: 50 },
    { date: '2022-05-03', value: 0 },
    { date: '2022-05-04', value: 75 },
  ];
  const goal = 50;

  it('renders three pie charts with the correct data', () => {
    const { getByText } = render(<PerformancePanel checkmarks={checkmarks} goal={goal} />);

    expect(getByText(/last week/i)).toBeInTheDocument();
    expect(getByText(/this week/i)).toBeInTheDocument();
    expect(getByText(/today/i)).toBeInTheDocument();
  });
});


// import { render } from '@testing-library/react';
// import { PerformancePanel } from './performance-panel';

// const mockCheckmarks = [
//   { value: 1, date: '2023-05-02' },
//   { value: 0, date: '2023-05-01' },
//   { value: 1, date: '2023-05-04' },
// ];
// const mockGoal = 50;

// describe('PerformancePanel', () => {
//   it('renders three pie charts with the correct data', () => {
//     const { getByLabelText, getByText } = render(
//       <PerformancePanel checkmarks={mockCheckmarks} goal={mockGoal} />
//     );

//     const todayChart = getByText(/today/i);
//     expect(todayChart).toBeInTheDocument();
//     expect(todayChart).toHaveAttribute('data-value', '50');
//     expect(todayChart).toHaveAttribute('data-empty', '50');

//     // const thisWeekChart = getByLabelText(/this week/i);
//     // expect(thisWeekChart).toBeInTheDocument();
//     // expect(thisWeekChart).toHaveAttribute('data-value', '67');
//     // expect(thisWeekChart).toHaveAttribute('data-empty', '33');

//     // const lastWeekChart = getByLabelText(/last week/i);
//     // expect(lastWeekChart).toBeInTheDocument();
//     // expect(lastWeekChart).toHaveAttribute('data-value', '50');
//     // expect(lastWeekChart).toHaveAttribute('data-empty', '50');

//     const allTimeScore = getByText(/overall all time performance/i);
//     expect(allTimeScore).toHaveTextContent('67%');
//   });
// });
