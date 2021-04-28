import React from "react";
import {Badge} from "@material-ui/core";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import {realtime} from "../shared/Firebase";
import {useSelector} from "react-redux";

const NotiBadge = (props) => {
    const [is_read, setIsRead] = React.useState(true);
    const user_id = useSelector(state => state.user.user.uid);
    const notiCheck = () => {
        const notiDB = realtime.ref(`noti/${user_id}`)
        notiDB.update({read: true});
        props._onClick();
    }
    
    // EventListener 구독
    React.useEffect(() => {
        const notiDB = realtime.ref(`noti/${user_id}`);
        const pushNotiDB = realtime.ref(`/noti${user_id}`);

        notiDB.on("value", (snapshot) => {
            console.log("스냅샷 콘솔")
            console.log(snapshot.val());
            if(!snapshot.val()){
                pushNotiDB.update({read: false});
            }else{
                setIsRead(snapshot.val().read);
            }
        }
    );

    // EventListener 구독 해제
        return () => notiDB.off();
    }, []);

    return (
        <React.Fragment>
            <Badge color="secondary" variant="dot" invisible={is_read} onClick={notiCheck}>
                <NotificationsActiveIcon/>
            </Badge>
        </React.Fragment>
    );
};

NotiBadge.defaultProps = {
    _onClick: () => {},
}


export default NotiBadge;