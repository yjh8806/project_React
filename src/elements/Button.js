import React from "react";
import styled from "styled-components";

const Button = (props) => {
    
    const {text, _onClick, is_float, bg, color, children, margin, width, height, padding} = props;
    const styles = {
        bg : bg, 
        color : color,
        margin: margin,
        width: width,
        height: height,
        padding: padding,
    };

    if(is_float) {
        return (
            <React.Fragment>
                <FloatButton onClick={_onClick}>{text? text : children}</FloatButton>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <ElButton {...styles} onClick={_onClick}>{text? text : children}</ElButton>
        </React.Fragment>
    )
}

Button.defaultProps = {
    text: false,
    children: null,
    _onClick: () => {},
    is_float: false,
    bg: false,
    color: null,
    margin: false,
    width: '100%',
    height: '50px',
    padding: '16px 0px',
}

const ElButton = styled.button`
    width: ${(props) => (props.width)};
    // height: 50px;
    background-color: #212121;
    color: #ffffff;
    padding: ${(props) => (props.padding)};
    box-sizing: border-box;
    border: none;
    // border-radius: 50px;
    ${(props) => (props.bg ? `background-color: ${props.bg};` : "")};
    ${(props) => (props.color ? `color: ${props.color};` : "")};
    ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
    ${(props) => (props.height ? `height: ${props.height};` : "")};
`;

const FloatButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: #212121;
    color: #ffffff;
    // padding: 16px;
    box-sizing: border-box;
    font-size: 36px;
    font-weight: 800;
    position: fixed;
    bottom: 50px;
    right: 16px;
    text-align: center;
    vertical-align: middle;
    border: none;
    display: flex;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
`;

// const SignButton = styled.button`
//     width: 100%;
//     background-color: #212121;
//     color: #ffffff;
//     padding: 16px 0px;
//     box-sizing: border-box;
//     border: none;
// `;

export default Button;