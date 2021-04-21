import React from "react";
import { useSelector } from "react-redux";
import { apiKey } from "./Firebase";

const Permit = (props) => {
    const is_login = useSelector(state => state.user.is_login) ? true : false;
    
    const _session_key =`firebase:authUser:${apiKey}:[DEFAULT]`;

    const is_session = sessionStorage.getItem(_session_key) ? true : false;

    if (is_session && is_login) {
        return <React.Fragment>{props.children}</React.Fragment>
    }
    return null;
};

export default Permit;