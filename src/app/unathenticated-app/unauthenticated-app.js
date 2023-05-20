import * as React from 'react';
import { Link as RouterLink, Navigate, Route, Routes } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Hidden,
  Toolbar,
} from '@material-ui/core';

import { ResetPasswordScreen } from 'screens/reset-password';
import { SignInScreen } from 'screens/sign-in';
import { SignUpScreen } from 'screens/sign-up';
import { Navbar, NavbarStartItem } from './navbar';
import { Box, Typography } from '@material-ui/core';

function UnathenticatedApp() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Navbar>
        <NavbarStartItem>
          <Box
            clone
            sx={{
              textTransform: 'none',
            }}
          >
            <Button color="inherit" component={RouterLink} to="/" disableRipple>
              <Typography variant="h6">GOAL TRACKER</Typography>
            </Button>
          </Box>
        </NavbarStartItem>

        <ButtonGroup variant="outlined" color="inherit">
          <Button component={RouterLink} to="/signin">
            SIGN IN
          </Button>
          <Button component={RouterLink} to="/signup">
            SIGN UP
          </Button>
        </ButtonGroup>
      </Navbar>

      <Box
        component="main"
        sx={{
          height: '100%',
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<SignInScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
}

export { UnathenticatedApp };
