// Core
import { Map } from 'immutable';
import { stateReducer } from '../reducer';

const initialState = Map({
    searchTaskName: "",
    newTaskName:    "",
    editTaskName:   "",
    editorID:       "",
    isAllCompleted: false,
    isSpinning:     false,
});

describe('tasks reducer:', () => {
    test('should return initial state', () => {
        expect(stateReducer(undefined, { type: 'FAKE' })).toEqual(initialState);
    });
});