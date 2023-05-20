import * as React from 'react';
import { Link as RouterLink, useMatch } from 'react-router-dom';
import {
  Drawer as MuiDrawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerItem: {
    paddingLeft: theme.spacing(3),
  },
}));

function Drawer({ children }) {
  const classes = useStyles();

  return (
    <>
        <MuiDrawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {children}
        </MuiDrawer>
    </>
  );
}

function DrawerLink({ icon, children, ...rest }) {
  const classes = useStyles();
  const match = useMatch(rest.to);

  return (
    <ListItem
      button
      selected={Boolean(match)}
      component={RouterLink}
      className={classes.drawerItem}
      {...rest}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </ListItem>
  );
}

function DrawerButton({ icon, children, ...rest }) {
  const classes = useStyles();

  return (
    <ListItem button className={classes.drawerItem} {...rest}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </ListItem>
  );
}

export { Drawer, DrawerLink, DrawerButton };
