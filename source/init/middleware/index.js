//Core
import { createLogger } from "redux-logger";
import createsagaMiddleware from "redux-saga";

//Instruments
import { notification } from "./notification";

const logger = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title:     () => "#139BFE",
        prevState: () => "#1C5FAF",
        action:    () => "#149945",
        nextState: () => "#A47104",
        error:     () => "#ff0005",
    },
});

const sagaMiddleware = createsagaMiddleware();

const middleware = [sagaMiddleware, notification];

const dev = process.env.NODE_ENV === "development";

if (dev) {
    middleware.push(logger);
    middleware.push(notification);
}

export { dev, middleware, sagaMiddleware };
