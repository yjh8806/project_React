import React from "react";
import styled from "styled-components";

const Text = (props) => {
    
    const {bold, color, size, children, margin, _onClick} = props;
    
    const styles = {
        bold: bold,
        color: color,
        size: size,
        margin: margin,
    }
    return (
        <React.Fragment>
            <P {...styles} onClick={_onClick}>{children}</P>
        </React.Fragment>
    );
}

Text.defaultProps = {
    children: null,
    bold: false,
    color: '#222831',
    size: '14px',
    margin: false,
    _onClick: () => {},
}

const P = styled.div`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => (props.bold ? "600" : "400")};
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
`;

export default Text;