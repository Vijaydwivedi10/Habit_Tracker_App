import * as React from 'react';
import PropTypes from 'prop-types';
import { Checkmark } from 'components/checkmark';
import { makeStyles, TableCell, TableRow, Typography } from '@material-ui/core';
import { getDay, parseISO } from 'date-fns';
import { EMPTY } from 'data/constants';

const useStyles = makeStyles((theme) => ({
  minWidth: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
}));

function HabitRow({ habit, dates, checkmarks }) {
  const classes = useStyles();
  
  const { id, name, frequency /* position */ } = habit;

  return (
    <TableRow hover>
      <TableCell
        component="th"
        scope="row"
        align="left"
        className={classes.minWidth}
      >
        <Typography variant="body1">{name}</Typography>
      </TableCell>

      {dates.map((date) => {
        const dateObj = parseISO(date);

        const disabled = !frequency.includes((getDay(dateObj)-1)%7);
        console.log(frequency);

        const checkmark = checkmarks.find((d) => d.date === date);

        return (
          <TableCell align="center" key={date} className={classes.minWidth}>
            <Checkmark
              id={checkmark?.id || null}
              initialValue={checkmark?.value || EMPTY}
              habitId={id}
              date={date}
              disabled={disabled}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
}

HabitRow.propTypes = {
  habit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    frequency: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  dates: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export { HabitRow };
