// Action, Reducer 편하게 만들기
import { createAction, handleActions, handleAction } from "redux-actions";
import { produce } from "immer";

import { getCookie, setCookie, deleteCookie} from "../../shared/Cookie";

import {auth} from "../../shared/Firebase";
import firebase from "firebase/app"

// Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// Action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
    user: null,
    is_login: false,
};

const user_initial = {
    user_name: 'frankie',
};

// middleware actions
const loginFB = (id, pwd) => {
    return function (dispatch, getState, {history}) {
        
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
            auth
            .signInWithEmailAndPassword(id, pwd)
            .then((user) => {
            console.log(user);

            dispatch(setUser({ user_name: user.user.displayName, 
                               id: id,
                               user_profile: "",
                               uid: user.user.uid,
            }));
            
            history.push("/");
            // Signed in
            // ...
            })
            .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage);
            });
        })
    }
};

const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState, {history}) {

        auth
        .createUserWithEmailAndPassword(id, pwd)
        .then((user) => {
            console.log(user);

            auth.currentUser.updateProfile({
                displayName: user_name,
            })
        .then(() => {
            dispatch(setUser({ user_name: user_name,
                                id: id,
                                user_profile: "",
                                uid: user.user.uid,
            }));
            history.push('/');
        })
        .catch((error) => {
            console.log(error);
        })
        // Signed in
        // ...
        })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        console.log(errorCode, errorMessage);
        // ..
        });   
    }
}

const logoutFB = () => {
    return function (dispatch, getState, {history}) {
        auth.signOut().then(() => {
            dispatch(logOut());
            // push 대신 바꿔치기(replace)
            history.replace("/");
        });
    };
};

const loginCheckFB = () => {
    return function(dispatch, getState, {history}) {
        auth.onAuthStateChanged((user) => {
            if(user) {
                dispatch(
                    setUser({
                        user_name: user.displayName,
                        user_profile: "",
                        id: user.email,
                        uid: user.uid,
                    })
                );
            }else{
                dispatch(logOut());
            }
        })
    }
}

// Reducer
export default handleActions(
    {
    [SET_USER]: (state, action) => produce(state, (draft)=>{
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft)=>{
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
    }),
    [GET_USER]: (state, action) => produce(state, (draft)=>{}),
    },
    initialState
);

// Action creator export
const actionCreators = {
    logOut,
    getUser,
    signupFB,
    loginFB,
    loginCheckFB,
    logoutFB,
};

export { actionCreators };