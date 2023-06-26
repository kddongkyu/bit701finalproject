import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import BoardRowList from "./BoardRowList";

function BoardList(props) {
    const navi = useNavigate();

    const [data, setData] = useState({
        no: 0,
        startPage: 1,
        parr: [],
        totalPage: 0,
        endPage: 0,
        totalCount: 0,
        list: []
    });

    const {currentPage} = useParams();

    const list=()=>{
        axios.get("/board/list?currentPage="+(currentPage==null?1:currentPage))
            .then(res=>{
                setData(res.data);
            })
    }

    useEffect(()=>{
        list();
    },[currentPage])
    const onWriteButtonEvent =()=>{
        if(sessionStorage.loginok === null || sessionStorage.loginok === "no") {
            alert("로그인후 게시글 작성이 가능합니다.");
            navi("/login");
        } else {
            navi("/board/form");
        }
    }
    return (
        <div>
            <button type={'button'} className={"btn btn-outline-success"} style={{width:"100px",marginLeft:"100px"}} onClick={onWriteButtonEvent}>글쓰기</button>
            <br/><br/>
            <h5><b>총 {data.totalCount}개의 게시글이 있습니다</b></h5>
            <table className={'table table-bordered'} style={{width:'700px',textAlign:'center'}}>
                <thead>
                <tr style={{backgroundColor:'#ddd'}}>
                    <th style={{width:'40px'}}>번호</th>
                    <th style={{width:'200px'}}>제목</th>
                    <th style={{width:'70px'}}>작성자</th>
                    <th style={{width:'100px'}}>작성일</th>
                    <th style={{width:'50px'}}>조회</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.list.map((item,idx)=><BoardRowList key={idx} item={item} idx={idx} no={data.no} currentPage={currentPage}/>)
                }
                </tbody>
            </table>
            <div style={{width:"800px",textAlign:'center'}}>
                {
                    data.startPage>1?<NavLink to={`/board/list/${data.startPage-1}`}>이전</NavLink>:''
                }
                {
                    data.parr.map((pno,i)=>
                        <NavLink to={`/board/list/${pno}`}>
                            <b>{pno}</b>
                        </NavLink>
                    )
                }
                {
                    data.endPage<data.totalPage?<NavLink to={`/board/list/${data.endPage+1}`}>다음</NavLink>:''
                }
            </div>
        </div>
    );
}

export default BoardList;