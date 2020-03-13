import * as momentonServerActions from './homePage.actionTypes';

const momentonServerInitialState = [];

export const momentonServer = (state = momentonServerInitialState, action) => {
  switch (action.type) {
    case momentonServerActions.MOMENTON_SERVER_REQUEST_SUCCESS: {
      return Object.assign(
        [],
        momentonServerInitialState,
        action.successPayload
      );
    }

    case momentonServerActions.MOMENTON_SERVER_REQUEST_FAILED: {
      return Object.assign([], momentonServerInitialState, action.errorPayload);
    }
    default: {
      return state;
    }
  }
};
