import React from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";
import Permit from "../shared/Permit";

// store값 가져와 쓰는 hook
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/Firebase";

import NotiBadge from "./NotiBadge";

const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login)? true : false;

    const _session_key =`firebase:authUser:${apiKey}:[DEFAULT]`;

    const is_session = sessionStorage.getItem(_session_key)? true : false;

    // console.log(is_session);
    // console.log(is_login);

    if(is_login && is_session) {
        return (
            <Permit>
                <React.Fragment>
                    <Grid is_flex padding="4px 16px">
                        <Grid is_flex>
                            <Text margin="5px 0px 0px 0px" size="26px" bold _onClick={() => {history.push('/')}}>⋰</Text>
                            <Text margin="3px 50px 0px 0px" size="26px" bold _onClick={() => {history.push('/')}}>SURGO</Text>
                        </Grid>

                        <Grid is_flex>
                            <Button bg="#D5D5D5"
                                    color="#212121"
                            >
                                <NotiBadge _onClick={() => {
                                    history.push("/noti");
                                }}
                                />
                            </Button>
                            <Button text="내 정보"
                                    bg="#8C8C8C"
                                    color="#212121">
                            </Button>
                            <Button text="로그아웃"
                                _onClick={() => {
                                    dispatch(userActions.logoutFB());
                                }}
                                ></Button>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Permit>
        )              
    }
    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid is_flex>
                    <Text margin="5px 0px 0px 0px" size="26px" bold _onClick={() => {history.push('/')}}>⋰</Text>
                    <Text margin="3px 50px 0px 0px" size="26px" bold _onClick={() => {history.push('/')}}>SURGO</Text>
                </Grid>

                <Grid is_flex>
                    <Button text="로그인" bg="#8C8C8C" color="#212121"
                    _onClick={() => {
                        history.push("/login");
                    }}></Button>
                    <Button text="회원가입" _onClick={() => {
                        history.push("/signup");
                    }}></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Header.defaultProps = {};

export default Header;