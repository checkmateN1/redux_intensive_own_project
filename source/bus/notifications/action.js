import { types } from './types';
import { v4 } from 'uuid'; //для генерации случайных id

export const notificationsActions = Object.freeze({
    showNotification: (error) => ({
        type: types.SHOW_NOTIFICATION,
        payload: {
            id: v4(),
            error,
        },
    }),
    hideNotification: (id) => ({
        type: types.HIDE_NOTIFICATION,
        payload: id,
    }),
});