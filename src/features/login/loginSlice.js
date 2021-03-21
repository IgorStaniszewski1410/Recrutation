import { createSlice } from '@reduxjs/toolkit'

const initialUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const slice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      console.log(state, 'state', action.payload, 'PAYLOAD2222');
      debugger;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logoutSuccess: (state, action) =>  {
      state.user = null;
      localStorage.removeItem('user')
    },
  },
});

export default slice.reducer
