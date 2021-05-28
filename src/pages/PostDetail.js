import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

import Permit from "../shared/Permit";

import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";

import {Grid} from "../elements";

const PostDetail = (props) => {
    const dispatch = useDispatch();

    const id = props.match.params.id;
    // console.log(id);
    const user_info = useSelector((state) => state.user.user);
    const post_list = useSelector(store => store.post.list)
    const post_idx = post_list.findIndex(p => p.id === id);
    const post = post_list[post_idx];
    // console.log(post)
    

    React.useEffect(() => {

        if(post){
            return;
        }
        
        dispatch(postActions.getOnePostFB(id));
    }, []);

    return (
        <React.Fragment>
            <Grid bg={"#EFF6FF"} padding="2px 0px 8px 0px">
                <Grid margin="6px 0px 1px 0px" bg="#ffffff">
                    {post && (
                        <Post {...post} is_me={post.user_info.user_id === user_info?.uid}/>
                    )}
                    <Permit>
                        <CommentWrite post_id={id}/>
                    </Permit>
                </Grid>
            </Grid>
            <CommentList post_id={id}/>
        </React.Fragment>
    )
}

export default PostDetail;