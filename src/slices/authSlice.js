import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userLogin } from './authActions'

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

function createInitialState() {
    return {
        // initialize state from local storage to enable user to stay logged in
        loading: false,
        userInfo: null, // for user object
        userToken: null, // for storing the JWT
        error: null,
        success: false, // for monitoring the registration process.
    }
}

function createReducers() {
    return {
        logout
    };

    function logout(state) {
        localStorage.removeItem('userToken') // deletes token from storage
        state.loading = false
        state.userInfo = null
        state.userToken = null
        state.error = null
    }
}


function createExtraReducers() {
    return (builder) => {
        login();

        function login() {
            var { pending, fulfilled, rejected } = userLogin;
            builder
                .addCase(pending, (state) => {
                    state.loading = true
                    state.error = null
                })
                .addCase(fulfilled, (state, action) => {
                    state.loading = false
                    state.userInfo = action.payload
                    state.userToken = action.payload.userToken

                    // store user details and basic auth data in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('user', JSON.stringify(user));
                    // get return url from location state or default to home page
                    // const { from } = history.location.state || { from: { pathname: '/' } };
                    // history.navigate(from);
                })
                .addCase(rejected, (state, action) => {
                    state.loading = false
                    state.error = action.payload
                });
        }
    };
}

export const { logout} = slice.actions
export default slice.reducer