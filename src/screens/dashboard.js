import * as React from 'react';
import { useCheckmarksQuery } from 'api/checkmarks';
import { useHabitsQuery } from 'api/habits';
import { NoHabitsScreen } from 'screens/no-habits';
import { useUser } from 'context/user-context';
import { useLocale } from 'localization';
import { WeekBarChart } from 'components/week-bar-chart';
import { HabitsTable } from 'components/habits-table';
import { FullPageErrorFallback, FullPageSpinner } from 'components/lib';
import { PerformancePanel } from 'components/performance-panel';
import { WeekPicker } from 'components/week-picker';
import { Box, Container, Grid, Hidden, Paper } from '@material-ui/core';
import {
  eachDayOfInterval,
  endOfWeek,
  lightFormat,
  startOfWeek,
} from 'date-fns';

function DashboardScreen() {
  const locale = useLocale();

  // Habits data
  const {
    data: habits,
    error: habitsError,
    isLoading: isLoadingHabits,
  } = useHabitsQuery();

  const { data: checkmarks, error: checkmarksError } = useCheckmarksQuery();
  const { performanceGoal } = useUser();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const start = startOfWeek(selectedDate, { locale });
  const end = endOfWeek(selectedDate, { locale });

  const selectedDates = eachDayOfInterval({ start, end }).map((date) =>
    lightFormat(date, 'yyyy-MM-dd')
  );

  const selectedDatesCheckmarks = checkmarks.filter((checkmark) =>
    selectedDates.includes(checkmark.date)
  );

  if (isLoadingHabits) {
    return <FullPageSpinner />;
  }

  const error = habitsError || checkmarksError;

  const isCancelledError =
    checkmarksError && checkmarksError.hasOwnProperty('silent');

  if (error && !isCancelledError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (!habits.length) {
    return <NoHabitsScreen />;
  }

  const barChart = (
    <SmallPaper>
      <WeekBarChart
        goal={performanceGoal}
        dates={selectedDates}
        checkmarks={selectedDatesCheckmarks}
        habitsCount={habits.length}
      />
    </SmallPaper>
  );

  const weekPicker = (
    <SmallPaper>
      <WeekPicker
        selectedDate={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
      />
    </SmallPaper>
  );

  const habitsTable = (
    <LargePaper>
      <HabitsTable
        checkmarks={checkmarks}
        habits={habits}
        dates={selectedDates}
      />
    </LargePaper>
  );

  const performancePanel = (
    <SmallPaper>
      <PerformancePanel checkmarks={checkmarks} goal={performanceGoal} />
    </SmallPaper>
  );

  return (
    <Box sx={{ height: '100%' }} clone>
      <Container disableGutters>      
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                {barChart}
              </Grid>
              <Grid item md={6}>
                {weekPicker}
              </Grid>
              <Grid item md={12}>
                {performancePanel}
              </Grid>
              
              <Grid item md={12}>
                {habitsTable}
              </Grid>
            </Grid>
          </Box>
      </Container>
    </Box>
  );
}

function LargePaper({ children }) {
  return (
    <Box
      component={Paper}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  );
}

function SmallPaper({ children }) {
  return (
    <Box
      component={Paper}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 330,
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  );
}

export { DashboardScreen };
