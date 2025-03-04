import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });
describe(
    '<BurgerBuilder />',
    () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<BurgerBuilder onFetchPrices={() => { }} />);
        });

        it('should render <BuildControls /> when receiving ingredients!', () => {
            wrapper.setProps({ ings: { lettuce: 0 } });
            expect(wrapper.find(BuildControls)).toHaveLength(1);
        });
    }
);