import history from '../history'
import axios from 'axios'
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
  const response = await axios.get('http://localhost:8080/home')
  const message = await response.data;

  dispatch({ type: WELCOME_MESSAGE, payload: message});
};
//
//-> Authentications
//
export const register = (formValues) => async () => {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:8080/user/register',
    data: {
      email: formValues.email,
      password: formValues.password
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.status === 200) {
    alert('Registered! Put that information in again to login!')
  } else {
    alert('Error registering, please try again');
  }
};

export const login = (formValues) => async () => {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:8080/user/login',
    data: {
      email: formValues.email,
      password: formValues.password
    },
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
  const response = await axios.get('http://localhost:8080/user/logout')
  if (response.status === 200) {
    alert('Logged Out')
    history.push('/')
  } else {
    alert(`Error: ${response.error}`)
  }
};

export const loadProfile = () => async (dispatch) => {
  const response = await axios.get('http://localhost:8080/user/profile', {withCredentials: true})
  const info = await response.data

  dispatch({ type: LOAD_PROFILE, payload: info});
};

export const updateProfile = (formValues) => async () => {
  const response = await axios({
    method: 'patch',
    url: 'http://localhost:8080/user/update',
    data: {
      email: formValues.email,
      password: formValues.password
    },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  alert(response.data)
};
//
//-> Posts
//
export const createPost = (formValues) => async (dispatch) => {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:8080/posts',
    data: {
      title: formValues.title,
      description: formValues.description
    },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
  if (response.status === 200) {
    const post = await response.data;

    dispatch({ type: GET_POST, payload: post});
  } else {
    alert('Error: you need to be logged in to post')
  }
};

export const getPost = () => async (dispatch) => {
  const response = await axios.get('http://localhost:8080/posts')
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
};

export const deletePost = (id) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:8080/posts/${id}`)
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
};

export const getUsersPosts = (uid) => async (dispatch) => {
  const response = await axios.get(`http://localhost:8080/userPosts/${uid}`)
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
}

export const getUid = () => async (dispatch) => {
  const response = await axios.get(`http://localhost:8080/user/getUid`, {withCredentials: true})
  const uid = await response.data;

  dispatch({ type: GET_UID, payload: uid});
}