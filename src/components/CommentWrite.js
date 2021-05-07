import React from "react";
import { Grid, Input, Button } from "../elements";

import {actionCreators as commentActions} from "../redux/modules/comment";
import {useDispatch, useSelector} from "react-redux";
import {firestore} from "../shared/Firebase";

const CommentWrite = (props) => {
    const dispatch = useDispatch();
    const [comment_text, setCommentText] = React.useState();

    const {post_id} = props;

    const onChange = (e) => {
        setCommentText(e.target.value);
    }

    const write = () => {
        if(!comment_text) {
            window.alert("댓글 내용이 없습니다. 다시 확인해주세요!")
            return;
        }
        dispatch(commentActions.addCommentFB(post_id, comment_text));
        setCommentText("");
        // console.log(comment_text);
        // console.log(firestore.collection("comment").id);
    }

    return (
        <React.Fragment>
            <Grid padding="0px 16px 16px 16px" is_flex>
                <Input placeholder="댓글 내용을 입력해주세요 >_<"
                       _onChange={onChange}
                       value={comment_text}
                       onSubmit={write}
                       is_submit
                />
                <Button width="55px"
                        height="41px" 
                        margin="0px"
                        padding="0px 0px 0px 0px"
                        _onClick={write}
                >작성
                </Button>
            </Grid>
        </React.Fragment>
    )
}

export default CommentWrite;