import { createSlice } from '@reduxjs/toolkit'

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const slice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    isLogged: true,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logoutSuccess: (state, action) =>  {
      state.user = null;
      state.isLogged = true;
      localStorage.removeItem('user')
    },
  },
});

export default slice.reducer

// Actions

const { loginSuccess, logoutSuccess } = slice.actions;

export const login = ({ username }) => async dispatch => {
  console.log(username, 'dkajhwdk');
  try {
    // await api.post('/api/auth/login/', { username, password })
    dispatch(loginSuccess({username}));
  } catch (e) {
    return console.error(e.message);
  }
};

export const logout = () => async dispatch => {
  try {
    // await api.post('/api/auth/logout/')
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message);
  }
};
