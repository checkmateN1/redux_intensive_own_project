import { types } from "./types";

export const tasksActions = Object.freeze({
    createTask: (task) => ({
        type:    types.CREATE_TASK,
        payload: task,
    }),
    updateTask: (task) => ({
        type:    types.UPDATE_TASK,
        payload: task,
    }),
    removeTask: (taskID) => ({
        type:    types.DELETE_TASK,
        payload: taskID,
    }),
});
