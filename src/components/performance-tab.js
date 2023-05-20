import * as React from 'react';
import { useUser } from 'context/user-context';
import {
  Box,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { TrackChanges as TrackChangesIcon } from '@material-ui/icons';
import { useUpdatePerformanceGoal } from 'api/user-data';

const performanceGoalValues = Array.from(Array(20)).map((_, i) => {
  const value = i * 5 + 5;
  return {
    value,
    label: `${value}%`,
  };
});


function PerformanceTab() {
  const { performanceGoal } = useUser();

  const updatePerformanceGoal = useUpdatePerformanceGoal();

  const handlePerformanceGoalChange = (event) => {
    updatePerformanceGoal(event.target.value);
  };

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <List disablePadding>
      <Box sx={{ my: 1 }}>
        <ListItem>
          {!isXs && (
            <ListItemIcon>
              <TrackChangesIcon color="primary" />
            </ListItemIcon>
          )}

          <FormControl fullWidth variant="outlined">
            <InputLabel id="select-performance-goal-label">
              Daily Goal
            </InputLabel>

            {isXs && (
              <Select
                id="mobile"
                native
                label="Daily Goal"
                labelId="select-performance-goal-label"
                value={performanceGoal}
                onChange={handlePerformanceGoalChange}
              >
                {performanceGoalValues.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            )}

            {!isXs && (
              <Select
                id="mobile up"
                label="Daily Goal"
                labelId="select-performance-goal-label"
                value={performanceGoal}
                onChange={handlePerformanceGoalChange}
              >
                {performanceGoalValues.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </ListItem>
      </Box>
    </List>
  );
}

export { PerformanceTab };
