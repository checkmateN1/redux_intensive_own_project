import { asyncTypes } from "./asyncTypes";

export const tasksActionsAsync = Object.freeze({
    createTaskAsync: (taskName) => ({
        type:    asyncTypes.CREATE_TASK_ASYNC,
        payload: taskName,
    }),
    updateTaskAsync: (taskID, newTaskName, completed, favorite) => ({
        type:    asyncTypes.UPDATE_TASK_ASYNC,
        payload: {
            taskID,
            newTaskName,
            completed,
            favorite,
        },
    }),
    deleteTaskAsync: (taskID) => ({
        type:    asyncTypes.DELETE_TASK_ASYNC,
        payload: taskID,
    }),
});
