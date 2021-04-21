import React from "react";
// Debounce, Throttle -> _
import _ from "lodash";

const Search = () => {

    const [text, setText] = React.useState();
    // 3가지 예시 사용해보기(onChange 교체)
    const onChange = (e) => {
        setText(e.target.value);
        keyPress(e);
    }
    
    const debounce = _.debounce((e) => {
        console.log("debounce ::: ", e.target.value);
    }, 1000)
    
    const throttle = _.throttle((e) => {
        console.log("throttle ::: ", e.target.value);
    }, 1000)

    // Search 컴포넌트 = 함수형 컴포넌트(리렌더링 시 함수 초기화)
    // React.useCallback: 리렌더링 시 함수 초기화 X
    // ([]: 함수 초기화 조건 입력 - ex)Text, etc)
    const keyPress = React.useCallback(throttle, []);

    return (
        <div>
            <label>Search : </label>
            <input type="text" onChange={onChange} value={text}/>
        </div>
    )
}

export default Search;