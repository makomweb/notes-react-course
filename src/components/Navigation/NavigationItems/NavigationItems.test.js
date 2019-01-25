import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render 2 <NavigationItem/> elemets if NOT authenticated!', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 <NavigationItem/> elemets if authenticated!', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contain the logout button when authenticated!', () => {
        wrapper.setProps({ isAuthenticated: true });
        const contains = wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>);
        expect(contains).toBe(true);
    });
});