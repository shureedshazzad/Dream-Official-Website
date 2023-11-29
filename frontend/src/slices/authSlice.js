import { createSlice } from '@reduxjs/toolkit';
// here info are stored in local storage
const initialState = {
    donorInfo: localStorage.getItem('donorInfo') ? JSON.parse(localStorage.getItem('donorInfo')): null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state,action) =>{
            state.donorInfo = action.payload;
            localStorage.setItem('donorInfo',JSON.stringify(action.payload));
        },
        logout : (state, action) => {
            state.donorInfo = null ;
            localStorage.removeItem('donorInfo');
        },    
    }
});







export const { setCredentials , logout } = authSlice.actions;

export default authSlice.reducer;

