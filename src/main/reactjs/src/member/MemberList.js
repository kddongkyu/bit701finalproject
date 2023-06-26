import React, {useEffect, useState} from 'react';
import {Alert} from "react-bootstrap";
import '../App.css'
import Axios from "axios";
import MemberRowList from "./MemberRowList";
function MemberList(props) {
    const [mlist,setMlist] = useState([]);

    const getList=()=>{
        const url = "/member/list";
        Axios.get(url)
            .then(res=>{
                setMlist(res.data);
            })
    }

    const deleteMember = (num)=>{
        const url = "/member/delete?num="+num;

        Axios.delete(url)
            .then(res=>{
                alert("삭제되었습니다.");
                getList();
            })
    }

    useEffect(()=>{
        getList();
    },[])

    return (
        <div>
            <Alert variant={"primary"}>MemberList</Alert>
            <h4>총 회원수 : {mlist.length}명</h4>
            <table className={"table table-bordered"} style={{width:'600px', textAlign:"center"}}>
                <tr style={{backgroundColor : "gray",color:"white"}}>
                    <th style={{width : "40px"}}>번호</th>
                    <th style={{width : "60px"}}>회원명</th>
                    <th style={{width : "80px"}}>아이디</th>
                    <th style={{width : "150px"}}>주소</th>
                    <th style={{width : "100px"}}>가입일</th>
                    <th style={{width : "50px"}}>삭제</th>
                </tr>
                {
                    mlist.map((item,idx)=><MemberRowList key={idx} item={item} idx={idx} deleteE={deleteMember}/>)
                }
            </table>
        </div>
    );
}

export default MemberList;