// Core
import { List } from 'immutable';
import { tasksReducer } from '../reducer';

const initialState = List();

describe('tasks reducer:', () => {
    test('should return initial state', () => {
        expect(tasksReducer(undefined, { type: 'FAKE' })).toEqual(initialState);
    });
});