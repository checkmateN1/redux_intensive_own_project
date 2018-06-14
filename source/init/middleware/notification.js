import { notificationsActions } from "../../bus/notifications/action";

export const notification = (store) => (next) => (action) => {
    if (action.error) {
        store.dispatch(notificationsActions.showNotification(action.payload));
    }

    return next(action);
};