// Core
import { tasksActions } from '../actions';
import { types } from '../types';

const id = '5b1fbd9f34e4e96e4610991a';
const task = {
    completed: true,
    favorite:  true,
    id:        '5b1fbd9f34e4e96e4610991a',
    message:   'New Task 05',
};

describe('tasks actions:', () => {
    test('CREATE_TASK', () => {
        expect(tasksActions.createTask(task)).toEqual({
            type:    types.CREATE_TASK,
            payload: task,
        });
    });
    test('DELETE_TASK', () => {
        expect(tasksActions.removeTask(id)).toEqual({
            type:    types.DELETE_TASK,
            payload: id,
        });
    });
    test('UPDATE_TASK', () => {
        expect(tasksActions.updateTask(task)).toEqual({
            type:    types.UPDATE_TASK,
            payload: task,
        });
    });
});