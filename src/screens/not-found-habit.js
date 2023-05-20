import { Link as RouterLink } from 'react-router-dom';
import { Fab, Box, Typography } from '@material-ui/core';
import { List as ListIcon } from '@material-ui/icons';
import { ReactComponent as TowingSvg } from 'images/towing.svg';

function NotFoundHabitScreen() {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        clone
        sx={{
          width: '50%',
          height: '30%',
          margin: 2,
        }}
      >
        <TowingSvg />
      </Box>

      <Box
        sx={{
          margin: 2,
        }}
      >
        <Typography variant="h4">This goal doesn't exist!</Typography>
      </Box>
      <Fab
        variant="extended"
        color="primary"
        component={RouterLink}
        to="/manage-habits"
      >
        <Box
          clone
          sx={{
            mr: 1,
          }}
        >
          <ListIcon />
        </Box>
        Goal list
      </Fab>
    </Box>
  );
}

export { NotFoundHabitScreen };
