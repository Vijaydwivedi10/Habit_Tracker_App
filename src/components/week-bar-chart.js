import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@material-ui/core';
import { countBy } from 'lodash';
import { format, parseISO } from 'date-fns';
import { COMPLETED, EMPTY, FAILED } from 'data/constants';
import { useLocale } from 'localization';

function WeekBarChart({ checkmarks, dates, goal }) {
  // Style
  const { palette } = useTheme();
  const { primary, secondary, getContrastText, text } = palette;

  // Data
  const data = dates.map((date) => {
    // Values for the current date
    const values = checkmarks
      .filter((checkmark) => checkmark.date === date)
      .map((checkmark) => checkmark.value);

    // There are no checkmarks for this date
    if (!values.length) {
      return {
        date,
        completed: null,
        failed: null,
        empty: null,
      };
    }

    // Count completed and failed values
    const counts = countBy(values);

    const avg = (value) => Math.round((value / values.length) * 100);

    const completed = avg(counts[COMPLETED]) || null;
    const failed = -avg(counts[FAILED]) || null;
    const empty = -avg(counts[EMPTY]) || null;

    // Return object in the shape accepted by bar chart
    return {
      date,
      completed,
      failed,
      empty,
    };
  });

  const locale = useLocale();

  // Label formats
  const xValueFormat = (date) => format(parseISO(date), 'd-MMM', { locale });

  // Check if value exists to prevent funny outputs like `null%`
  const yValueFormat = (v) => (v ? v + '%' : '');

  return (
    <ResponsiveBar
      data={data}
      keys={['completed', 'failed', 'empty']}
      indexBy="date"
      margin={{ top: 16, right: 16, bottom: 32, left: 64 }}
      padding={0.4}
      colors={[primary.main, secondary.main, '#ccc']}
      theme={{
        textColor: text.secondary,
        tooltip: {
          container: {
            background: text.primary,
          },
        },
      }}
      valueScale={{
        type: 'linear',
        min: -100,
        max: 100,
      }}
      axisLeft={{
        format: yValueFormat,
        tickSize: 0,
        tickPadding: 8,
        legend: 'Completion rate (%)',
        legendPosition: 'middle',
        legendOffset: -48,
      }}
      axisBottom={{
        format: xValueFormat,
        tickSize: 0,
        tickPadding: 12,
      }}
      markers={[
        // Positive and negative bars separator
        {
          axis: 'y',
          value: 0,
          lineStyle: { stroke: secondary.main, strokeWidth: 1 },
        },
        
        
      ]}
      
      labelFormat={yValueFormat}
      enableGridX={false}
      enableGridY={false}
      
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={getContrastText(primary.main)}
      // Animation disabled in development
      // animate={false}
    
      // Interactivity - for the moment disabled. In the future might add some details.
      isInteractive={false}
      motionStiffness={140}
    />
    );
  }
  
  export { WeekBarChart };    