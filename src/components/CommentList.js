import React from "react";
import { Grid, Image, Text } from "../elements";

import {useDispatch, useSelector} from "react-redux";
import comment, {actionCreators as commentActions} from "../redux/modules/comment";
import post from "../redux/modules/post";

const CommentList = (props) => {
    const dispatch = useDispatch();
    const comment_list = useSelector(state => state.comment.list);    
    const {post_id} = props;
    console.log(comment_list[post_id]);

    React.useEffect(() => {
        if(!comment_list[post_id]){
            dispatch(commentActions.getCommentFB(post_id));
        }
    }, [])

    if(!comment_list[post_id] || !post_id){
        return null;
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                {comment_list[post_id].map(c => {
                    return <CommentItem key={c.id} {...c}/>;
                })}
            </Grid>
        </React.Fragment>
    )
}
CommentList.defaultProps = {
    post_id: null,
};

export default CommentList;

const CommentItem = (props) => {

    const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;
    console.log(props)
    console.log(props.id)
    return (
        <Grid is_flex>
            <Grid is_flex width="auto">
                <Image shape="circle"/>
                <Text bold margin="0px 0px 4px 3px">{user_name}</Text>
            </Grid>
            <Grid is_flex margin="0px 6px">
                <Text margin="0px">{contents}</Text>
                <Text margin="0px">{insert_dt}</Text>
            </Grid>
        </Grid>
    )
}

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "frankie",
    user_id: "",
    post_id: 1,
    contents: "너무 귀엽네요!!",
    insert_dt: '2021-01-01 19:00:00',
}