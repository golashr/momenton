import * as momentonServerActions from './homePage.actionTypes';

export const initiateMomentonServerRequest = () => ({
  type: momentonServerActions.INITIATE_MOMENTON_SERVER_REQUEST
});

export const momentonServerRequestSuccess = successPayload => ({
  type: momentonServerActions.MOMENTON_SERVER_REQUEST_SUCCESS,
  successPayload
});

export const momentonServerRequestFailed = errorPayload => ({
  type: momentonServerActions.MOMENTON_SERVER_REQUEST_FAILED,
  errorPayload
});
