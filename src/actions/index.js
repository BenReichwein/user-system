import {
    WELCOME_MESSAGE,
    LOAD_PROFILE
} from './types';

export const welcomeMessage = () => async (dispatch) => {
  const response = await fetch('/home')
  const message = await response.text();

  dispatch({ type: WELCOME_MESSAGE, payload: message});
};

export const loadProfile = () => async (dispatch) => {
  const response = await fetch('/user/profile')
  const info = await response.json();

  dispatch({ type: LOAD_PROFILE, payload: info});
};

export const updateProfile = () => async (dispatch) => {
  const response = await fetch('/user/profile')
  const info = await response.json();

  dispatch({ type: LOAD_PROFILE, payload: info});
};