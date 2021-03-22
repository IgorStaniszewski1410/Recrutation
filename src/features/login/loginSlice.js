import { createSlice } from '@reduxjs/toolkit'

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const slice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
    isLogged: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logoutSuccess: (state, action) =>  {
      state.user = null;
      state.isLogged = false;
      localStorage.removeItem('user')
    },
  },
});

export default slice.reducer
