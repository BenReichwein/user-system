import history from '../history'
import {
    WELCOME_MESSAGE,
    LOAD_PROFILE,
} from './types';
//
//-> Messages
//
export const welcomeMessage = () => async (dispatch) => {
  const response = await fetch('/home')
  const message = await response.text();

  dispatch({ type: WELCOME_MESSAGE, payload: message});
};
//
//-> Authentications
//
export const login = (formValues) => () => {
  fetch(`/user/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: formValues.email,
      password: formValues.password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200) {
      history.push('/')
    } else {
      const error = new Error(res.error);
      throw error;
    }
  })
  .catch(err => {
    console.error(err);
    alert('Error logging in, please try again');
  });
};

export const register = (formValues) => () => {
  fetch(`/user/register`, {
    method: 'POST',
    body: JSON.stringify({
      email: formValues.email,
      password: formValues.password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200) {
      alert('Registered! Put that information in again to login!')
    } else {
      const error = new Error(res.error);
      throw error;
    }
  })
  .catch(err => {
    console.error(err);
    alert('Error registering, please try again');
  });
};

export const logout = () => async () => {
  const response = await fetch('/user/logout')
  if (response.status === 200) {
    alert('Logged Out')
    history.push('/')
  } else {
    alert(`Error: ${response.error}`)
  }
};

export const loadProfile = () => async (dispatch) => {
  const response = await fetch('/user/profile')
  const info = await response.json();

  dispatch({ type: LOAD_PROFILE, payload: info});
};

export const updateProfile = (formValues) => () => {
  fetch('/user/update', {
    method: 'PATCH',
    body: JSON.stringify({
      email: formValues.email,
      password: formValues.password
    }),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    .then(res => res.text())
    .then(res => alert(res))
};