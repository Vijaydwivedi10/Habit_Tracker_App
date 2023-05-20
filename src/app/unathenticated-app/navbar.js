import * as React from 'react';
import { AppBar, Box, Button, Toolbar } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

function Navbar({ children }) {
  return (
    <AppBar color="inherit" position="absolute">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}

function NavbarStartItem({ children }) {
  return <Box sx={{ marginRight: 'auto' }}>{children}</Box>;
}

function NavbarRouterLink(props) {
  return (
    <Button
      component={RouterLink}
      color="inherit"
      disableElevation
      {...props}
    />
  );
}

export { Navbar, NavbarStartItem, NavbarRouterLink };
