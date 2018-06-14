//Core
import { List, fromJS } from "immutable";

// Instruments
import { types } from "./types";

const initialState = List();

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_TASK:
            return state.unshift(fromJS(action.payload));

        case types.UPDATE_TASK:
            return state.update(
                state.findIndex(
                    (task) => task.get("id") === action.payload[0].id
                ),
                () => fromJS(action.payload[0])
            );

        case types.DELETE_TASK:
            return state.filter((task) => task.get("id") !== action.payload);

        default:
            return state;
    }
};
