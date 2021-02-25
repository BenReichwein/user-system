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

  dispatch({ type: WELCOME_MESSAGE, payload: response.data});
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
  await api.get('user/logout')
  .then(res => {
    if (res.status === 200) {
      alert('Logged out')
      history.push('/')
    }
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// Loading profile information
export const loadProfile = () => async (dispatch) => {
  const response = await api.get('user/profile')

  dispatch({ type: LOAD_PROFILE, payload: response.data});
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

  dispatch({ type: GET_UID, payload: response.data});
}
//
//-> Posts
//
// Creating a post
export const createPost = (formValues) => async (dispatch) => {
  await api.post('posts', {
    title: formValues.title,
    description: formValues.description
  })
  .then(res => {
    dispatch({ type: GET_POST, payload: res.data});
  })
  .catch(err=> {
    alert(err.response.data)
  })
};
// Get all the posts
export const getPost = () => async (dispatch) => {
  const response = await api.get('posts')

  dispatch({ type: GET_POST, payload: response.data});
};
// Delete a single post
export const deletePost = (id) => async (dispatch) => {
  await api.delete(`posts/${id}`)
  .then(res => {
    dispatch({ type: GET_POST, payload: res.data});
  })
  .catch(err => {
    alert(err.response.data)
  })
};
// Comment on a post
export const createComment = (comment, postUid, id) => async (dispatch) => {
  await api.post(`posts/comment/${id}`, {
    postUid,
    postId: id,
    comment
  })
  .then(async (res) => {
    dispatch({ type: GET_POST, payload: res.data});
  })
  .catch(err => {
    alert(err.response.data)
  })
}
// Delete a comment (could be from owner of post or commenter)
export const deleteComment = (comment, commentUid, id) => async (dispatch) => {
  await api({
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
  .then(res => {
    dispatch({ type: GET_POST, payload: res.data});
  })
  .catch(err=> {
    alert(err.response.data)
  })
};
// Add post to users saved collection
export const addSaved = (id) => async () => {
  await api.post(`saved`, {
    postId: id
  })
  .then(res => {
    alert(res.data)
  })
  .catch(err=> {
    alert(err.response.data)
  })
}
// Get all saved post from user
export const getSaved = () => async (dispatch) => {
  const response = await api.get('saved')

  dispatch({ type: GET_POST, payload: response.data});
};
// Remove a saved post from users collection
export const deleteSaved = (id) => async (dispatch) => {
  await api.delete(`saved/${id}`)
  .then(res => {
    dispatch({ type: GET_POST, payload: res.data});
  })
  .catch(err => {
    alert(err.response.data)
  })
}
// Get all users posts that they've posted
export const getUsersPosts = (uid) => async (dispatch) => {
  const response = await api.get(`userPosts/${uid}`)

  dispatch({ type: GET_POST, payload: response.data});
}
//
// -> Administrative Control
//
// Get all the accounts and their information
export const loadAdmin = () => async (dispatch) => {
  const response = await api.get('admin/users')

  dispatch({ type: LOAD_ADMIN, payload: response.data});
};
// Delete single account
export const deleteAdmin = (id) => async (dispatch) => {
  const response = await api.delete(`admin/${id}`)

  dispatch({ type: LOAD_ADMIN, payload: response.data});
};