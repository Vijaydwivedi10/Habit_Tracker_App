import React from 'react';
import { shallow } from 'enzyme';
import SwipeableViews from 'react-swipeable-views';
import { Box, Paper, Tabs } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon, Equalizer as EqualizerIcon } from '@material-ui/icons';
import { UserSettingsScreen } from './user-settings';
import { AccountTab } from 'components/account-tab';
import { PerformanceTab } from 'components/performance-tab';

describe('UserSettingsScreen', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserSettingsScreen />);
  });


  it('renders Tabs with the correct props', () => {
    const tabsComponent = wrapper.find(Tabs);
    expect(tabsComponent).toHaveLength(1);
    expect(tabsComponent.prop('value')).toBe(0);
    expect(tabsComponent.prop('indicatorColor')).toBe('primary');
    expect(tabsComponent.prop('textColor')).toBe('primary');
  });

  it('renders two Tab components with the correct props', () => {
    const tabsComponent = wrapper.find(Tabs);
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
      
    expect(tabs).toHaveLength(2);

    // tabs.forEach((tab, index) => {
    //   expect(tab.prop('key')).toBe(tabs[index].key);
    //   expect(tab.prop('icon')).toEqual(tabs[index].icon);
    //   expect(tab.prop('label')).toBe(tabs[index].key);
    //   expect(tab.prop('value')).toBe(index);
    // });
  });

  it('renders a SwipeableViews component with the correct props', () => {
    const swipeableViewsComponent = wrapper.find(SwipeableViews);
    expect(swipeableViewsComponent).toHaveLength(1);
    expect(swipeableViewsComponent.prop('index')).toBe(0);
    expect(swipeableViewsComponent.prop('onChangeIndex')).toEqual(expect.any(Function));
  });

  it('renders two children components in SwipeableViews', () => {
    const swipeableViewsComponent = wrapper.find(SwipeableViews);
    const children = swipeableViewsComponent.children();
    expect(children).toHaveLength(2);
    expect(children.at(0).type()).toEqual(AccountTab);
    expect(children.at(1).type()).toEqual(PerformanceTab);
  });

  it('handles changing Tabs and SwipeableViews correctly', () => {
    const tabsComponent = wrapper.find(Tabs);
    const swipeableViewsComponent = wrapper.find(SwipeableViews);
    const accountTab = wrapper.find(AccountTab);
    const performanceTab = wrapper.find(PerformanceTab);

    expect(tabsComponent.prop('value')).toBe(0);
    expect(swipeableViewsComponent.prop('index')).toBe(0);
    expect(accountTab).toHaveLength(1);

    tabsComponent.simulate('change', null, 1);
    expect(wrapper.find(Tabs).prop('value')).toBe(1);
    expect(wrapper.find(SwipeableViews).prop('index')).toBe(1);
    expect(wrapper.find(AccountTab)).toHaveLength(1);
    expect(wrapper.find(PerformanceTab)).toHaveLength(1);

    swipeableViewsComponent.simulate('changeIndex', 0);
    expect(wrapper.find(Tabs).prop('value')).toBe(0);
    expect(wrapper.find(SwipeableViews).prop('index')).toBe(0);
  })
});
