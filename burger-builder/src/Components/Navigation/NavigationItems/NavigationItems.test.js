import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });
describe(
    '<NavigationItems />',
    () => {
        it('should render 2 <NavigationItem/> elements if NOT authenticated!',
            () => {
                const wrapper = shallow(<NavigationItems />);
                expect(wrapper.find(NavigationItem)).toHaveLength(2);
            });

        it('should render 3 <NavigationItem/> elements if authenticated!',
            () => {
                const wrapper = shallow(<NavigationItems isAuthenticated />);
                expect(wrapper.find(NavigationItem)).toHaveLength(3);
            });
    }
);