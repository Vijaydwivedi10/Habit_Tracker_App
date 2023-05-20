import { calculateScore, createPieChartData } from './helpers.js';
import { COMPLETED } from 'data/constants';

describe('calculateScore', () => {
  it('should return 0 if given an empty array', () => {
    const score = calculateScore([]);
    expect(score).toEqual(0);
  });

  it('should return the correct score based on the completed values', () => {
    const values = [COMPLETED, COMPLETED, '', COMPLETED, ''];
    const score = calculateScore(values);
    expect(score).toEqual(60);
  });
});

describe('createPieChartData', () => {
  it('should return the correct data based on the values', () => {
    const values = [COMPLETED, COMPLETED, '', COMPLETED, ''];
    const chartData = createPieChartData(values);
    expect(chartData).toEqual([
      {
        id: 'value',
        value: 60,
      },
      {
        id: 'empty',
        value: 40,
      },
    ]);
  });
});
