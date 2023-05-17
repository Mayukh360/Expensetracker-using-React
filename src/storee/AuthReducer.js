import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={isAuthenticated : false}

const authSlice=createSlice({
  name :'authentication',
  initialState:initialAuthState,
  reducers:{
    islogin(state,action){
      state.isAuthenticated=true;
      localStorage.setItem('token',action.payload)
    },
    islogout(state){
      state.isAuthenticated=false;
      localStorage.removeItem('token');
    },
  }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;
// export default authSlice;

