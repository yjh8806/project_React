// 키값 기준 쿠키 저장값 가져오기
const getCookie = (name) => {
    // 쿠키값 가져오기
    let value = "; " + document.cookie;
    // 키 값 기준 파싱
    // let parts = value.split("; " + name + "=");
    let parts = value.split(`; ${name}=`); // aa=xx / aaa;
    // value값 return
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};
// 쿠키 저장(exp 기본값 설정)
const setCookie = (name, value, exp = 5) => {

    let date = new Date();
    // 날짜 만들기
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    // 저장
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
}

// 쿠키 지우기(만료일을 오늘보다 예전으로)
const deleteCookie = (name) => {
    let date = new Date("2020-01-01").toUTCString();

    console.log(date);

    document.cookie = name + "=; expires=" + date;
}


export { getCookie, setCookie, deleteCookie };