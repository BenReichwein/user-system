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
// gets welcome message from api to check if api is running
export const welcomeMessage = () => async (dispatch) => {
  const response = await api.get('home')
  const message = await response.data;

  dispatch({ type: WELCOME_MESSAGE, payload: message});
};
//
//-> Authentications
//
// making an account
export const register = (formValues) => () => {
  api.post('user/register', {
    email: formValues.email,
    password: formValues.password
  })
  .then(res => {
    if (res.status === 200) {
      alert(res.data)
      history.push('/login')
    }
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// logging into existing account
export const login = (formValues) => () => {
  api.post('user/login', {
    email: formValues.email,
    password: formValues.password
  })
  .then(res => {
    if (res.status === 200)
    history.push('/')
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// Logging out of account
export const logout = () => async () => {
  const response = await api.get('user/logout')
  if (response.status === 200) {
    alert('Logged Out')
    history.push('/')
  } else {
    alert(`Error: ${response.error}`)
  }
};
// Loading profile information
export const loadProfile = () => async (dispatch) => {
  const response = await api.get('user/profile')
  const info = await response.data

  dispatch({ type: LOAD_PROFILE, payload: info});
};
// Update profile information
export const updateProfile = (formValues) => async () => {
  await api.patch('user/update', {
    email: formValues.email,
    password: formValues.password
  })
  .then(res => {
    alert(res.data)
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// Get user id from authentication
export const getUid = () => async (dispatch) => {
  const response = await api.get(`user/getUid`)
  const uid = await response.data;

  dispatch({ type: GET_UID, payload: uid});
}
//
//-> Posts
//
// Creating a post
export const createPost = (formValues) => async (dispatch) => {
  const response = await api.post('posts', {
    title: formValues.title,
    description: formValues.description
  })
  if (response.status === 200) {
    const post = await response.data;

    dispatch({ type: GET_POST, payload: post});
  } else {
    alert('Error: you need to be logged in to post')
  }
};
// Get all the posts
export const getPost = () => async (dispatch) => {
  const response = await api.get('posts')
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
};
// Delete a single post
export const deletePost = (id) => async (dispatch) => {
  const response = await api.delete(`posts/${id}`)
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
};
// Comment on a post
export const createComment = (comment, postUid, id) => async (dispatch) => {
  await api.post(`posts/comment/${id}`, {
    postUid,
    postId: id,
    comment
  })
  .then(async (res) => {
    const post = await res.data;

    dispatch({ type: GET_POST, payload: post});
  })
  .catch(err => {
    alert('You are not logged in')
  })
}
// Delete a comment (could be from owner of post or commenter)
export const deleteComment = (comment, commentUid, id) => async (dispatch) => {
  const response = await api({
    method: 'delete',
    url: `posts/comment/${id}`,
    data: {
      commentUid,
      postId: id,
      comment,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
};
// Add post to users saved collection
export const addSaved = (id) => async () => {
  await api.post(`saved`, {
    postId: id
  })
  .then(res => {
    alert(res.data)
  })
  .catch(err => {
    alert('You are not logged in')
  })
}
// Get all saved post from user
export const getSaved = () => async (dispatch) => {
  const response = await api.get('saved')
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
};
// Remove a saved post from users collection
export const deleteSaved = (id) => async (dispatch) => {
  const response = await api.delete(`saved/${id}`)
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
}
// Get all users posts that they've posted
export const getUsersPosts = (uid) => async (dispatch) => {
  const response = await api.get(`userPosts/${uid}`)
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
}
//
// -> Administrative Control
//
// Get all the accounts and their information
export const loadAdmin = () => async (dispatch) => {
  const response = await api.get('admin/users')
  const users = await response.data;

  dispatch({ type: LOAD_ADMIN, payload: users});
};
// Delete single account
export const deleteAdmin = (id) => async (dispatch) => {
  const response = await api.delete(`admin/${id}`)
  const users = await response.data;

  dispatch({ type: LOAD_ADMIN, payload: users});
};