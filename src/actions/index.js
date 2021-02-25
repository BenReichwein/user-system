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
  api.post('user/register', {
    email: formValues.email,
    password: formValues.password
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
  api.post('user/login', {
    email: formValues.email,
    password: formValues.password
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
  const response = await api.post('user/register', {
    email: formValues.email,
    password: formValues.password
  })
  if (response.status === 200) {
    alert(response.data)
  } else {
    alert(`Error: Could not update profile`)
  }
};
//
//-> Posts
//
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

export const createComment = (comment, postUid, id) => async (dispatch) => {
  const response = await api.post(`posts/comment/${id}`, {
    postUid,
    postId: id,
    comment
  })
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
}

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

export const addSaved = (id) => async () => {
  const response = await api.post(`saved`, {
    postId: id
  })
  alert(response.data)
}

export const getSaved = () => async (dispatch) => {
  const response = await api.get('saved')
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
};

export const deleteSaved = (id) => async (dispatch) => {
  const response = await api.delete(`saved/${id}`)
  const post = await response.data;

  dispatch({ type: GET_POST, payload: post});
}

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