import {configureStore, createSlice} from '@reduxjs/toolkit';

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

const auth = createSlice({
    name: "store",
    initialState: {
        username: getCookie("username")
    },
    reducers: {
        login: (state, inp) => {
            state.username = inp.payload
            setCookie("username", inp.payload)
        },
        exit: (state) =>{
            state.username = undefined
        }
    }
})
const points = createSlice({
    name: "points",
    initialState: {
        msg: undefined,
        points: []
    },
    reducers: {
        error: (state, err) => {
            state.msg = {type: "error", text: err.payload}
        },
        noerr: (state) => {
            state.msg = undefined
        },
        msg: (state, msg) => {
            state.msg = {type: "success", text: msg.payload}
        },
        update_points: (state, points) => {
            state.points = points.payload
        }
    }
})
const store = configureStore({
    reducer: {
        auth: auth.reducer,
        points: points.reducer
    }
})
export const {login,exit} = auth.actions
export const {error, noerr, msg, update_points} = points.actions
export default store