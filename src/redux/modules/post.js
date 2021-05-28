import React from "react";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore,storage } from "../../shared/Firebase";
import moment from "moment";

import { actionCreators as imageActions } from "./image";
import { actionCreators as commentActions } from "./comment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list, paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}));
const deletePost = createAction(DELETE_POST, (post_id) => ({post_id}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));


const initialState = {
    list: [],
    paging: {start: null, next: null, size: 3},
    is_loading: false,
}

const initialPost = {
    // id: 0,
    // user_info : {
    //     user_name: "frankie",
    //     user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    // },
    image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    contents: "프랭키애오",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
}

// 게시글 수정(이미지 혹은 게시글 수정)
const editPostFB = (post_id = null, post = {}) => {
    return function (dispatch, getState, {history}) {

        if(!post_id) {
            window.alert("게시물 정보 없음");
            return;
        }

        const _image = getState().image.preview;

        const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
        const _post = getState().post.list[_post_idx];
        console.log(_post);

        const postDB = firestore.collection("post");
        
        if(_image === _post.image_url) {
            postDB.doc(post_id).update(post).then(doc => {
                window.alert("게시글 내용이 수정되었습니다.")
                dispatch(editPost(post_id, {...post}));
                history.replace("/");
            });

            return;
        }else{

            const user_id = getState().user.user.uid;
            const _upload = storage
                .ref(`images/${user_id.user_id}_${new Date().getTime()}`)
                .putString(_image, "data_url");

            _upload.then((snapshot) => {
                snapshot.ref
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);

                        return url;
                    })
                    .then((url) => {
                    postDB
                        .doc(post_id)
                        .update({...post, image_url: url})
                        .then(doc => {
                            window.alert(`게시글 이미지가 수정되었습니다. (수정일 : ${initialPost.insert_dt})`)
                            dispatch(editPost(post_id, {...post, image_url: url}));
                            history.replace("/");
                    });
                    })
                    .catch((err) => {
                        window.alert("앗, 포스트 작성에 문제가 있어요!")
                        console.log("post 작성에 실패했어요!", err);
                    });
            })
            .catch((err) => {
                window.alert("앗, 이미지 업로드에 문제가 있어요!");
                console.log("앗, 이미지 업로드에 문제가 있어요!", err);
            })
        };
    };
};

// getState: 스토어의 정보에 접근 가능하게 함
const addPostFB = (contents="") => {
    return function (dispatch, getState, {history}) {
        const postDB = firestore.collection("post");
        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        };

        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        };

        const _image = getState().image.preview;
        console.log(_image);
        console.log(typeof _image);

        // 고유 파일명 생성
        const _upload = storage.ref(`images/${user_info.user_id}_${new Date().getTime()}`).putString(_image, "data_url");

        _upload.then((snapshot) => {
            snapshot.ref.getDownloadURL().then(url => {
                console.log(url);
                return url;
            }).then((url) => {
                postDB.add({ ...user_info, ..._post, image_url: url }).then((doc) => {
                    let post = { user_info, ..._post, id: doc.id, image_url: url };
                    dispatch(addPost(post));
                    window.alert("게시글 작성 완료!");
                    history.push("/");

                    dispatch(imageActions.setPreview(null));
                }).catch((err) => {
                    window.alert("앗, 포스트 작성에 문제가 있어요!")
                    console.log("post 작성에 실패했어요!", err);
                });
            }).catch((err) => {
                window.alert("앗, 이미지 업로드에 문제가 있어요!");
                console.log("앗, 이미지 업로드에 문제가 있어요!", err);
            })
        });
    }
}

const getPostFB = (start = null, size = 3) => {
    return function (dispatch, getState, {history}) {

        let _paging = getState().post.paging;
        // console.log(_paging);
        if(_paging.start && !_paging.next){
            return;
        };

        dispatch(loading(true));
        const postDB = firestore.collection("post");

        let query = postDB.orderBy("insert_dt", "desc");

        if(start){
            query = query.startAt(start);
        };

        query.limit(size + 1).get().then(docs => {
            let post_list = [];

            let paging = {
                start: docs.docs[0],
                next: docs.docs.length === size + 1 ? docs.docs[docs.docs.length -1] : null,
                size: size,
            };

            docs.forEach((doc) => {
                let _post = doc.data();
                
                // ['comment_cnt', 'contents', ..]
                let post = Object.keys(_post).reduce(
                    (acc, cur) => {
                        if(cur.indexOf("user_") !== -1) {
                            return {
                                ...acc, 
                                user_info: {...acc.user_info, [cur]: _post[cur] },
                            };
                        } 
                        return { ...acc, [cur]: _post[cur] };

                    }, { id: doc.id, user_info: {} }
                );

                post_list.push(post);
            });

            post_list.pop();

            console.log(post_list)

            dispatch(setPost(post_list, paging));
        });
    }
}

const getOnePostFB = (id) => {
    return function(dispatch, getState, {history}){
        const postDB = firestore.collection("post")
        postDB.doc(id).get().then(doc => {
            // console.log(doc);
            // console.log(doc.data);
            
            let _post = doc.data();
            let post = Object.keys(_post).reduce(
                (acc,cur) => {
                    if(cur.indexOf("user_") !== -1) {
                        return { ...acc, user_info: {...acc.user_info, [cur]: _post[cur] },
                        };
                    } 
                    return { ...acc, [cur]: _post[cur] };

                }, { id: doc.id, user_info: {} }
            );
            // []로 배열안에 넣어주기
            dispatch(setPost([post]));
        })
    }
}

const deletePostFB = (post_id) => {
    return function (dispatch, getState, {history}) {
        const postDB = firestore.collection("post");
        const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
        const _post = getState().post.list[_post_idx];

        postDB.doc(post_id).delete().then(() => {
            // console.log("Document successfully deleted!");
            dispatch(deletePost(post_id));
            window.alert("게시글 삭제가 완료되었습니다.")
            history.replace("/");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    };
};

// Reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            draft.list.push(...action.payload.post_list);
            // list 중복제거
            draft.list = draft.list.reduce((acc, cur) => {
                if(acc.findIndex(a => a.id === cur.id) === -1){
                    return [...acc, cur];
                }else{
                    acc[acc.findIndex(a => a.id === cur.id)] = cur;
                    return acc;
                }
            }, []);

            if(action.payload.paging){
                draft.paging = action.payload.paging;
            }

            draft.is_loading = false;
        }),
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post);
        }),
        [EDIT_POST]: (state, action) => produce(state, (draft) => {
            let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

            draft.list[idx] = {...draft.list[idx], ...action.payload.post};
        }),
        [LOADING]: (state, action) => produce(state, (draft) => {
            draft.is_loading = action.payload.is_loading;
        }),
        [DELETE_POST]: (state, action) => produce(state, (draft) => {
            const _post_idx = draft.list.findIndex((p) => p.id === action.payload.post_id);
            // const _post = draft.list[_post_idx];

            draft.list.splice(_post_idx, 1);
        })
    }, initialState
);

const actionCreators = {
    addPost,
    setPost,
    editPost,
    getPostFB,
    addPostFB,
    editPostFB,
    getOnePostFB,
    deletePostFB,
}

export {actionCreators};