import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}


export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload?.data || action.payload || null;
      // add user update role
    },
    // add user update avatar 
    updateAvatar: (state, action) => {
      state.user = action.payload?.data || action.payload ;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails ,updateAvatar} = counterSlice.actions

export default counterSlice.reducer