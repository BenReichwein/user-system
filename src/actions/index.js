import history from '../history'
import {
    WELCOME_MESSAGE,
    LOAD_PROFILE,
    GET_POST,
    GET_UID
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

export const login = (formValues) => async () => {
  const response = await fetch(`/user/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: formValues.email,
      password: formValues.password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.status === 200) {
    history.push('/')
  } else {
    alert('Error: Email or password is incorrect')
  }
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
//
//-> Posts
//
export const createPost = (formValues) => async (dispatch) => {
  const response = await fetch(`/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title: formValues.title,
      description: formValues.description
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.status === 200) {
    const post = await response.json();

    dispatch({ type: GET_POST, payload: post});
  } else {
    alert('Error: you need to be logged in to post')
  }
};

export const getPost = () => async (dispatch) => {
  const response = await fetch('/posts')
  const post = await response.json();

  dispatch({ type: GET_POST, payload: post});
};

export const deletePost = (id) => async (dispatch) => {
  const response = await fetch(`/posts/${id}`, {
    method: 'DELETE'
  })
  const post = await response.json();

  dispatch({ type: GET_POST, payload: post});
};

export const getUsersPosts = (uid) => async (dispatch) => {
  const response = await fetch(`/userPosts/${uid}`)
  const post = await response.json();

  dispatch({ type: GET_POST, payload: post});
}

export const getUid = () => async (dispatch) => {
  const response = await fetch(`/user/getUid`)
  const uid = await response.text();

  dispatch({ type: GET_UID, payload: uid});
}