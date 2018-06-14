// Core
import { combineReducers } from "redux";

// Instruments
import { notificationsReducer as notifications } from "../bus/notifications/reducer";
import { tasksReducer as tasks } from "../bus/tasks/reducer";
import { stateReducer as state } from "../bus/state/reducer";

export const rootReducer = combineReducers({
    notifications,
    tasks,
    state,
});
