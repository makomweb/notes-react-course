import reducer, { initialState } from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state!', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });
    });
});