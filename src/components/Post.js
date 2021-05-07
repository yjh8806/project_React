import React from "react";
import {Grid, Image, Text, Button} from "../elements";

import {history} from "../redux/configureStore";

const Post = React.memo((props) => {

    // console.log('hi! im post component!');
    return (
        <React.Fragment>
            <Grid is_flex padding="16px">
                <Grid is_flex width="auto">
                    <Image shape="circle" src={props.src}/>
                    <Text bold>{props.user_info.user_name}</Text>
                </Grid>
                <Grid is_flex width="auto">
                    <Text>{props.insert_dt}</Text>
                    {props.is_me && <Button width="auto" height= "30px" padding="4px" margin="0px 0px 0px 0px" _onClick={() => {
                        history.push(`/write/${props.id}`);
                    }}>수정</Button>}
                </Grid>
            </Grid>    
            <Grid padding="16px">
                <Text>{props.contents}</Text>
            </Grid>
            <Grid>
                <Image shape="rectangle" src={props.image_url}/>
            </Grid>
            <Grid padding="16px">
                <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
            </Grid>
        </React.Fragment>
    )
});
// 필요한 props들을 미리 옮겨놓는 방식
Post.defaultProps = {
    user_info : {
        user_name: "frankie",
        user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    },
    image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    contents: "프랭키애오",
    comment_cnt: 10,
    insert_dt: "2021-03-29 22:54:28",
    is_me: false,
    loading: true,
};

export default Post;