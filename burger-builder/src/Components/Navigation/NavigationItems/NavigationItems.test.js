import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });
describe(
    '<NavigationItems />',
    () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<NavigationItems />);
        });

        it('should render 2 <NavigationItem/> elements if NOT authenticated!', () => {
            expect(wrapper.find(NavigationItem)).toHaveLength(2);
        });

        it('should render 3 <NavigationItem/> elements if authenticated!', () => {
            //wrapper = shallow(<NavigationItems isAuthenticated />);
            wrapper.setProps({ isAuthenticated: true });
            expect(wrapper.find(NavigationItem)).toHaveLength(3);
        });

        it('should contain the logout element if authenticated', () => {
            wrapper.setProps({ isAuthenticated: true });
            expect(wrapper.contains(<NavigationItem>Logout</NavigationItem>));
        });
    }
);