import React from "react";
import { Grid, Image, Text } from "../elements";

const CommentList = () => {

    return (
        <React.Fragment>
            <Grid padding="16px">
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
                <CommentItem/>
            </Grid>
        </React.Fragment>
    )
}

export default CommentList;

const CommentItem = (props) => {

    const {user_profile, user_name, user_id, post_id, contents, insert_dt} = props;
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