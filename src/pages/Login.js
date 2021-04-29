import React from 'react';
import {Text, Input, Grid, Button} from "../elements";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { emailCheck } from "../shared/common";

import {realtime} from "../shared/Firebase";

// Action 불러와 쓰기!
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";
import {actionCreators as postActions} from "../redux/modules/post";


const Login = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const login = () => {

        console.log(id);

        if(id === "" || pwd === "") {
            window.alert("아이디 혹은 비밀번호가 없습니다. 다시 입력해주세요.");
            return;
        }
        if(!emailCheck(id)) {
            window.alert("이메일 형식이 맞지 않습니다. 다시 입력해주세요.")
            return;
        }
        
        dispatch(userActions.loginFB(id, pwd));
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="32px" bold>로그인</Text>
                <Grid padding="16px 0px">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력하세요."
                        _onChange = {(e) => {
                            setId(e.target.value);
                        }}
                    />
                </Grid>
                <Grid padding="16px 0px">
                    <Input 
                        type="password"
                        label="패스워드"
                        placeholder="패스워드를 입력하세요."
                        _onChange = {(e) => {
                            setPwd(e.target.value);
                        }}
                        value={pwd}
                        is_submit
                        onSubmit={login}
                    />
                </Grid>
                <Button setCookie
                    text="로그인"
                    _onClick={() => {
                        console.log("로그인 했어");
                        login();
                        // deleteCookie("user_id");
                    }}
                >
                </Button>
            </Grid>
        </React.Fragment>
    )
}

export default Login;