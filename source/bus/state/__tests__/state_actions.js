// Core
import { stateActions } from '../actions';
import { types } from '../types';


const taskName = 'New Task 01';

const id = '5b1fbd9f34e4e96e4610991a';
const task = {
    completed: true,
    favorite:  true,
    id:        '5b1fbd9f34e4e96e4610991a',
    message:   'New Task 05',
};

describe('tasks actions:', () => {
    test('SEARCH_TASK_NAME', () => {
        expect(stateActions.searchTaskName(taskName)).toEqual({
            type:    types.SEARCH_TASK_NAME,
            payload: taskName,
        });
    });
    test('NEW_TASK_NAME', () => {
        expect(stateActions.newTaskName(taskName)).toEqual({
            type:    types.NEW_TASK_NAME,
            payload: taskName,
        });
    });
    test('EDIT_TASK_NAME', () => {
        expect(stateActions.editTaskName(taskName)).toEqual({
            type:    types.EDIT_TASK_NAME,
            payload: taskName,
        });
    });
    test('EDITOR_ID', () => {
        expect(stateActions.editorID(id)).toEqual({
            type:    types.EDITOR_ID,
            payload: id,
        });
    });
    test('IS_ALL_COMPLETED', () => {
        expect(stateActions.isAllCompleted(true)).toEqual({
            type:    types.IS_ALL_COMPLETED,
            payload: true,
        });
    });
    test('CHECK_IS_ALL_COMPLETED', () => {
        expect(stateActions.checkIsAllCompleted(true)).toEqual({
            type:    types.CHECK_IS_ALL_COMPLETED,
            payload: true,
        });
    });
    test('IS_SPINNING', () => {
        expect(stateActions.isSpinning(true)).toEqual({
            type:    types.IS_SPINNING,
            payload: true,
        });
    });
});