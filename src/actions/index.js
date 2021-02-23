import history from '../history'
import api from './api'
import {
    WELCOME_MESSAGE,
    LOAD_PROFILE,
    GET_POST,
    GET_UID,
    LOAD_ADMIN
} from './types';
//
//-> Messages
//
export const welcomeMessage = () => async (dispatch) => {
  const response = await api.get('home')
  const message = await response.data;

  dispatch({ type: WELCOME_MESSAGE, payload: message});
};
//
//-> Authentications
//
export const register = (formValues) => () => {
  api({
    method: 'post',
    url: 'user/register',
    data: {
      email: formValues.email,
      password: formValues.password
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200) {
      alert('Registered! Put that information in again to login!')
      history.push('/login')
    }
  })
  .catch(err => {
    console.log(err)
    alert('Error, Try again later')
  })
};

export const login = (formValues) => () => {
  api({
    method: 'post',
    url: 'user/login',
    data: {
      email: formValues.email,
      password: formValues.password
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.status === 200)
    history.push('/')
  })
  .catch(err => {
    console.log(err)
    alert('Email or password is incorrect')
  })
};

export const logout = () => async () => {
  const response = await api.get('user/logout')
  if (response.status === 200) {
    alert('Logged Out')
    history.push('/')
  } else {
    alert(`Error: ${response.error}`)
  }
};

export const loadProfile = () => async (dispatch) => {
  const response = await api.get('user/profile')
  const info = await response.data

  dispatch({ type: LOAD_PROFILE, payload: info});
};

export const updateProfile = (formValues) => async () => {
  const response = await api({
    method: 'patch',
    url: 'user/update',
    data: {
      email: formValues.email,
      password: formValues.password
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  alert(response.data)
};
//
//-> Posts
//
export const createPost = (formValues) => async (dispatch) => {
  const response = await api({
    method: 'post',
    url: 'posts',
    data: {
      title: formValues.title,
      description: formValues.description
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.status === 200) {
    const post = await response.data;

    dispatch({ type: GET_POST, payload: post});
  } else {
    alert('Error: you need to be logged in to post')
  }
};

export const getPost = () => async (dispatch) => {
  const response = await api.get('posts')
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
};

export const deletePost = (id) => async (dispatch) => {
  const response = await api.delete(`posts/${id}`)
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
};

export const getUsersPosts = (uid) => async (dispatch) => {
  const response = await api.get(`userPosts/${uid}`)
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
}

export const getUid = () => async (dispatch) => {
  const response = await api.get(`user/getUid`)
  const uid = await response.data;

  dispatch({ type: GET_UID, payload: uid});
}
//
// -> Administrative Control
//
export const loadAdmin = () => async (dispatch) => {
  const response = await api.get('admin/users')
  const users = await response.data;

  dispatch({ type: LOAD_ADMIN, payload: users});
};

export const deleteAdmin = (id) => async (dispatch) => {
  const response = await api.delete(`admin/${id}`)
  const users = await response.data;

  dispatch({ type: LOAD_ADMIN, payload: users});
};