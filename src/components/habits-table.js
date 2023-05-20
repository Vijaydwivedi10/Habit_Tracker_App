import * as React from 'react';
import PropTypes from 'prop-types';
import { format, isToday, parseISO } from 'date-fns';
import { getComparator } from 'utils/misc';
import { HabitRow } from './habit-row';
import { useLocale } from 'localization';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  positionPadding: {
    padding: '0 0 0 12px',
  },
  highlight: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
}));

function HabitsTable({ habits, checkmarks, dates }) {
  const locale = useLocale();
  const classes = useStyles();

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('position');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortableCells = [
    { id: 'name', label: "Habit", align: 'left' },
  ];

  const datesCells = dates.map((d) => {
    const date = parseISO(d);

    return {
      date,
      label: format(date, 'd-MMM', { locale }),
    };
  });

  const sortedHabits = habits.slice().sort(getComparator(order, orderBy));

  return (
    <TableContainer data-testid="table">
      <Table size="small">
        <TableHead>
          <TableRow>
            {sortableCells.map(({ id, label, align }) => (
              <TableCell
                key={id}
                align={align}
                size="medium"
                sortDirection={orderBy === id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === id}
                  direction={orderBy === id ? order : 'asc'}
                  onClick={() => handleRequestSort(id)}
                  className={classes.noWrap}
                >
                  {label}
                  {orderBy === id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}

            {datesCells.map(({ date, label }) => (
              <TableCell key={date} align="center">
                {isToday(date) ? (
                  <Typography color="primary" noWrap>{label}</Typography>
                ) : (
                  label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedHabits.map((habit) => {
            const habitCheckmarks = checkmarks.filter(
              (d) => d.habitId === habit.id
            );

            return (
              <HabitRow
                key={habit.id}
                habit={habit}
                dates={dates}
                checkmarks={habitCheckmarks}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

HabitsTable.propTypes = {
  habits: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired,
};

export { HabitsTable };
