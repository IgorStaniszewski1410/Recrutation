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

const { loginSuccess } = slice.actions;

export const login = ({ username }) => async dispatch => {
  try {
    dispatch(loginSuccess({username}));
  } catch (e) {
    return console.error(e.message);
  }
};
