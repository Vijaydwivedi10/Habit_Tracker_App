import { Box } from '@material-ui/core';
import { HabitList } from 'components/habit-list';
import { FullPageSpinner } from 'components/lib';
import { useHabitsQuery } from 'api/habits';
import { NoHabitsScreen } from 'screens/no-habits';

function ManageHabitsScreen() {
  const { data: habits, isLoading } = useHabitsQuery();

  if (isLoading) return <FullPageSpinner />;

  if (!habits.length) return <NoHabitsScreen />;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <HabitList habits={habits} />
    </Box>
  );
}

export { ManageHabitsScreen };
