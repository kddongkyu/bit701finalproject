import React from 'react';
import {Home, Menu} from "./components";
import {LoginForm, MemberForm, MemberList} from "./member";
import {BoardForm, BoardList} from "./board";
import {Routes, Route} from 'react-router-dom';
import {Alert} from "react-bootstrap";
import './App.css'
import BoardDetailPage from "./board/BoardDetailPage";
function RouteMain(props) {
    return (
        <div>
            <Menu/>
            <br style={{clear:"both"}}/>
            <br/><br/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/login"} element={<LoginForm/>}/>

                <Route path={"/member"}>
                    <Route path={'form'} element={<MemberForm/>}/>
                    <Route path={'list'} element={<MemberList/>}/>
                </Route>
                <Route path={"/board"}>
                    <Route path={'form'} element={<BoardForm/>}/>
                    <Route path={'form/:num'} element={<BoardForm/>}/>
                    <Route path={'list'} element={<BoardList/>}/>
                    <Route path={'list/:currentPage'} element={<BoardList/>}/>
                    <Route path={"detail/:num/:currentPage"} element={<BoardDetailPage/>}/>
                </Route>
                <Route path={"*"} element={
                    <div>
                        <Alert variant={"warning"}>잘못된 URL 주소입니다.</Alert>
                    </div>
                }/>
            </Routes>
        </div>
    );
}

export default RouteMain;