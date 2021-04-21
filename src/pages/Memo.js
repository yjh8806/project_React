// 구상연습용
import React from "react";

import {Grid, Text, Input, Button} from "../elements"

const Memo = (props) => {

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="32px" bold>
                    아무거나 메모하기 ' ^'/
                </Text>

                <Grid padding="16px 0px">
                    <Input
                        label="메모"
                        placeholder="메모를 입력해보세요."
                        _onChange={()=>{
                            console.log("!!");
                        }}/>
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        label="메모"
                        placeholder="메모를 입력해보세요."
                        _onChange={()=>{
                            console.log("!!");
                        }}/>
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        label="메모"
                        placeholder="메모를 입력해보세요."
                        _onChange={()=>{
                            console.log("!!");
                        }}/>
                </Grid>

                <Button text="저장하기" _onClick=
                {() => {console.log("!!");}}></Button>
            </Grid>
        </React.Fragment>
    )
}

Memo.defaultProps = {

}

export default Memo;