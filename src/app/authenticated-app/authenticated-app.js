import * as React from 'react';
import { useQueryClient } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { Divider, List, Toolbar, Typography, Box } from '@material-ui/core';
import {
  Add as AddIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitIcon,
  List as ListIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';

import { AddHabitScreen } from 'screens/add-habit';
import { DashboardScreen } from 'screens/dashboard';
import { EditHabitScreen } from 'screens/edit-habit';
import { ManageHabitsScreen } from 'screens/manage-habits';
import { NotFoundScreen } from 'screens/not-found';
import { UserSettingsScreen } from 'screens/user-settings';

import { FullPageErrorFallback, ErrorFallback } from 'components/lib';

import { useAuth } from 'context/auth-context';
import { useDialog } from 'context/dialog-context';
import {
  useDeleteUserData,
} from 'api/user-data';

import { Drawer, DrawerButton, DrawerLink } from './drawer';

const DrawerContext = React.createContext();

function AuthenticatedApp() {
  const { user, signOut } = useAuth();
  const { openDialog } = useDialog();

  const deleteUserData = useDeleteUserData();


  const handleLogoutClick = () => {
    openDialog({
      title: "Sign out?",
      description: "While signed out you are unable to manage your profile and conduct other activities that require you to be signed in.",
      confirmText: "Sign out",
      onConfirm: async () => {
        try {
          if (user.isAnonymous) {
            await deleteUserData();
            await signOut();
          } else {
            await signOut();
          }
        } catch (error) {
          console.log(error, error.message);
        }
      },
      color: 'secondary',
    });
  };

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Box sx={{ height: '100vh', display: 'flex' }}>
      <DrawerContext.Provider>

          <Drawer>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Goal Tracker
              </Typography>
            </Toolbar>
            <Divider />
            <List>
              <DrawerLink to="/dashboard" icon={<DashboardIcon />}>
                Dashboard
              </DrawerLink>

              <DrawerLink to="/add-habit" icon={<AddIcon />}>
                Add Goal
              </DrawerLink>

              <DrawerLink to="/manage-habits" icon={<ListIcon />}>
                Manage Goal
              </DrawerLink>
            </List>
            <Divider />
            <List>
              <DrawerLink to="/settings" icon={<SettingsIcon />}>
                Settings
              </DrawerLink>
              <DrawerButton onClick={handleLogoutClick} icon={<ExitIcon />}>
                Sign Out
              </DrawerButton>
            </List>
          </Drawer>

          <Box
            component="main"
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Routes>
                  <Route path="/dashboard" element={<DashboardScreen />} />
                  <Route path="/add-habit" element={<AddHabitScreen />} />
                  <Route path="/edit-habit/:habitId" element={<EditHabitScreen />} />
                  <Route path="/manage-habits" element={<ManageHabitsScreen />} />
                  
                  <Route path="/settings" element={<UserSettingsScreen />} />
                  <Route path="*" element={<NotFoundScreen />} />
                </Routes>
              </ErrorBoundary>
            </Box>
          </Box>
          </DrawerContext.Provider>
      </Box>
    </ErrorBoundary>
  );
}

export { AuthenticatedApp };
