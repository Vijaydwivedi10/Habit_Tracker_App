import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';

import { useDialog } from 'context/dialog-context';
import { useSnackbar } from 'context/snackbar-context';
import { useDeleteHabitMutationMutation } from 'api/habits';
import { useLocale } from 'localization';

function HabitListItem({ habit }) {
  const { weekdays } = useLocale();

  const { id, name, description, frequency } = habit;

  const { openSnackbar } = useSnackbar();
  const { openDialog } = useDialog();

  const deleteHabitMutation = useDeleteHabitMutationMutation();

  const handleDeleteClick = () => {
    openDialog({
      title: "Delete" + ` "${name}"?`,
      description: "Deleted goal can't be recovered. All data associated with this habit will be deleted.",
      confirmText: "Delete",
      onConfirm: () => {
        deleteHabitMutation.mutate(id, {
          onSuccess: () => openSnackbar('success', "Habit deleted!"),
          onError: (error) => openSnackbar('error', error.message),
        });
      },
      color: 'secondary',
    });
  };

  const disableActions = deleteHabitMutation.isLoading;

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  const text = <ListItemText primary={name} secondary={description} />;

  // Frequency
  const frequencyChips = (
    <Box
      sx={{
        mr: 1,
        display: 'flex',
      }}
    >
      {weekdays.map((day, i) => (
        <Box
          clone
          key={day}
          sx={{
            minWidth: 32,
          }}
        >
          <Chip
            size={isXs ? 'small' : 'medium'}
            label={day.slice(0, 1)}
            color={frequency.includes(i) ? 'primary' : 'default'}
          />
        </Box>
      ))}
    </Box>
  );

  return (
    <ListItem button>
      {isXs && (
        <Box sx={{ flex: 1 }}>
          {text}
          {frequencyChips}
        </Box>
      )}

      {!isXs && (
        <>
          {text}
          {frequencyChips}
        </>
      )}

      <Tooltip title="Edit Habit">
        <IconButton
          size={isXs ? 'small' : 'medium'}
          component={RouterLink}
          to={`/edit-habit/${id}`}
          aria-label="Habit deleted!"
          disabled={disableActions}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete Goal">
        <IconButton
          size={isXs ? 'small' : 'medium'}
          onClick={handleDeleteClick}
          aria-label="Delete Goal"
          disabled={disableActions}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
}

function HabitList({ habits }) {
  return (
    <List>
      {habits.map((habit) => (
        <HabitListItem key={habit.id} habit={habit} />
      ))}
    </List>
  );
}

export { HabitList };
