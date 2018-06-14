//Core
import { Map } from "immutable";

// Instruments
import { types } from "./types";

const initialState = Map({
    searchTaskName: "",
    newTaskName:    "",
    editTaskName:   "",
    editorID:       "",
    isAllCompleted: false,
    isSpinning:     false,
});

export const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_TASK_NAME:
            return state.set("searchTaskName", action.payload);

        case types.NEW_TASK_NAME:
            return state.set("newTaskName", action.payload);

        case types.EDIT_TASK_NAME:
            return state.set("editTaskName", action.payload);

        case types.EDITOR_ID:
            return state.set("editorID", action.payload);

        case types.IS_ALL_COMPLETED:
            return state.set("isAllCompleted", action.payload);

        case types.IS_SPINNING:
            return state.set("isSpinning", action.payload);

        case types.CHECK_IS_ALL_COMPLETED:
            return state.set("isAllCompleted", action.payload);

        default:
            return state;
    }
};
