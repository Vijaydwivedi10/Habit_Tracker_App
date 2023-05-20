import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { UnathenticatedApp } from './unauthenticated-app';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

import { NavbarStartItem } from './navbar';

describe('UnathenticatedApp', () => {
    it('renders the Navbar component', () => {
        const wrapper = shallow(<UnathenticatedApp />);
        expect(wrapper.find('Navbar')).toHaveLength(1);
    });

    it('should render correctly', () => {
        const wrapper = shallow(
            <NavbarStartItem>
                <Button color="inherit" component={RouterLink} to="/" disableRipple>
                    <Typography variant="h6">GOAL TRACKER</Typography>
                </Button>
            </NavbarStartItem>
        );
        const buttonWrapper = wrapper.find(Button);
        expect(buttonWrapper.prop('color')).toEqual('inherit');
        expect(buttonWrapper.prop('component')).toEqual(RouterLink);
        expect(buttonWrapper.prop('to')).toEqual('/');
        expect(buttonWrapper.prop('disableRipple')).toEqual(true);
        const typographyWrapper = buttonWrapper.find(Typography);
        expect(typographyWrapper.prop('variant')).toEqual('h6');
        expect(typographyWrapper.text()).toEqual('GOAL TRACKER');
    });

});
