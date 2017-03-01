import { reducers as restReducers } from './rest';

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.warn(err);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    const state = JSON.parse(serializedState);

    // Set 'loading' property to false for all REST endpoints.
    // If the 'loading' flag is set even though there is no in flight API request,
    // redux-api will wait forever and never let us issue any further API requests
    // to that endpoint
    Object.keys(restReducers).forEach((endpoint) => {
      const endpointState = state[endpoint];

      if (endpointState) {
        endpointState.loading = false;
      }
    });

    // Don't restore navigation state
    state.router = undefined;

    // Clear any errors from previous app state
    state.err = undefined;

    return state;
  } catch (err) {
    return undefined;
  }
};

export const clearState = (everything) => {
  if (everything) {
    localStorage.clear();
  } else {
    localStorage.setItem('state', undefined);
  }
};
