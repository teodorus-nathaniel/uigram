import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './root-reducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: [ 'user', 'colorMode' ]
  },
  rootReducer
);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ logger, sagaMiddleware ];

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export const persistedStore = persistStore(store);
export default store;
