import React from 'react';
import styled from "styled-components";

import {Text, Grid} from "./index";

const Input = (props) => {
    const {label, placeholder, _onChange, type, multiLine, value, is_submit, onSubmit} = props;
    
    if(multiLine) {
        return (
            <Grid>
                {label && <Text margin="0px">{label}</Text>}
                <ElTextarea 
                value={value}
                rows={10}
                placeholder={placeholder} 
                onChange={_onChange}
                ></ElTextarea>
            </Grid>
        )
    }
    return (
        <React.Fragment>
            <Grid>
                {label && <Text margin="0px">{label}</Text>}
                {is_submit ? (
                    <ElInput type={type}
                             placeholder={placeholder}
                             onChange={_onChange}
                             value={value}
                             onKeyPress={(e) => {
                                 if(e.key === "Enter"){
                                    onSubmit(e);
                                 }
                             }}
                    />
                ) : (
                    <ElInput type={type}
                             placeholder={placeholder}
                             onChange={_onChange}
                    />
                )}
            </Grid>
        </React.Fragment>
    )
}

Input.defaultProps = {
    multiLine: false,
    label: false,
    placeholder: '텍스트를 입력하세요.',
    type: "text",
    value: "",
    is_submit: false,
    _onChange: () => {},
    onSubmit: () => {},
}

const ElTextarea = styled.textarea`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
    height: 48px;
`;

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;