import { applyMiddleware, createStore, compose } from 'redux';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });


export function configureStore(preloadedState) {
  const devTools =
    process.env.NODE_ENV === 'development'
      ? composeEnhancers(applyMiddleware())
      : compose(applyMiddleware());
  const store = createStore(rootReducer(), preloadedState, devTools);

  return store;
}
