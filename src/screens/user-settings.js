import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Box, Paper, Tab, Tabs } from '@material-ui/core';
import { AccountTab } from 'components/account-tab';
import { PerformanceTab } from 'components/performance-tab';
import {
  AccountCircle as AccountCircleIcon,
  Equalizer as EqualizerIcon,
  Palette as PaletteIcon,
} from '@material-ui/icons';

const tabs = [
  {
    key: 'Account',
    icon: <AccountCircleIcon />,
  },

  {
    key: 'Performance',
    icon: <EqualizerIcon />,
  },

];

export default function UserSettingsScreen() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleIndexChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 600,
      }}
    >
      <Box
        component={Paper}
        sx={{ width: '100%', height: { xs: '100%', sm: 'auto' } }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map(({ key, icon }, index) => {
            return <Tab key={key} icon={icon} label={key} value={index} />;
          })}
        </Tabs>

        <Box sx={{ m: { xs: 0, sm: 2 } }}>
          <SwipeableViews
            containerStyle={{
              transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
            }}
            index={selectedTab}
            onChangeIndex={handleIndexChange}
          >
            <AccountTab />
            <PerformanceTab />

          </SwipeableViews>
        </Box>
      </Box>
    </Box>
  );
}

export { UserSettingsScreen };
