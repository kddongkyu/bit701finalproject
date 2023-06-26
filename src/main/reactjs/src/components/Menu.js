import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";

function Menu(props) {

    const navi = useNavigate();

    const logoutEvent =()=>{
        sessionStorage.loginok = 'no';
        sessionStorage.myid = '';
        sessionStorage.myname = '';
    }

    return (
        <ul className={'menu'}>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/member/form"}>회원가입</NavLink>
            </li>
            <li>
                <NavLink to={"/member/list"}>회원목록</NavLink>
            </li>
            <li>
                <NavLink to={"/board/list"}>게시판</NavLink>
            </li>
            <li style={{width:'200px'}}>
                {
                    sessionStorage.loginok==='yes'?<NavLink to={"/login"} onClick={logoutEvent}>로그아웃 {sessionStorage.myname}({sessionStorage.myid})님</NavLink>:<NavLink to={"/login"}>로그인</NavLink>
                }
            </li>
        </ul>
    );
}

export default Menu;