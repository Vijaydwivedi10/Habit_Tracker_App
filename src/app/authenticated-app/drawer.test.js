import React from 'react';
import { shallow } from 'enzyme';
import { Link as RouterLink } from 'react-router-dom';
import {
    Drawer,
    DrawerLink,
    DrawerButton,
} from './drawer';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { DeleteForever } from '@material-ui/icons';
import { BrowserRouter } from 'react-router-dom';

describe('Drawer', () => {
    it('should render children', () => {
        const wrapper = shallow(
            <Drawer>
                <div>Test</div>
            </Drawer>
        );
        expect(wrapper.contains(<div>Test</div>)).toBe(true);
    });
});

describe('DrawerLink', () => {
    it('should render a RouterLink with the provided props', () => {
        const props = {
            to: '/test',
            icon: <div>test icon</div>,
            children: 'test label',
            'data-testid': 'test-link',
        };

        const { getByTestId } = render(
            <BrowserRouter>
                <DrawerLink {...props} />
            </BrowserRouter>
        );

        const linkElement = getByTestId('test-link');

        expect(linkElement).toHaveAttribute('href', '/test');
        expect(linkElement).toHaveTextContent('test label');
        expect(linkElement).toContainHTML('<div>test icon</div>');
    });
});

// describe('DrawerButton', () => {
//     it('should render a button with the provided props', () => {
//         const onClick = jest.fn();
//         const wrapper = shallow(
//             <DrawerButton onClick={onClick} icon={<div />} >
//                 Test
//             </DrawerButton>
//         );
//         console.log(wrapper.debug());
//         console.log(wrapper.find('button'));
//         console.log(wrapper.find('ListItemText'));
//         console.log(wrapper.debug());
//         console.log(wrapper.find('button'));
//         console.log(wrapper.find('ListItemText'));
//         expect(wrapper.find('button')).toHaveLength(1);
//         expect(wrapper.find('ListItemText').text()).toContain('Test');
//         wrapper.find('button').simulate('click');
//         expect(onClick).toHaveBeenCalled();
//     });
// });

