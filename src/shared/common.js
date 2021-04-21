export const emailCheck = (id) => {
    // aa_-.123Aaa@aa.com(email 체크)
    let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
        
    console.log(_reg.test(id));
    // _reg.test(id);
    return _reg.test(id);
}