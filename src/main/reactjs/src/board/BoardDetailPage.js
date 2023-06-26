import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function BoardDetailPage(props) {
    const {num,currentPage} = useParams();
    const [data,setData] = useState({});
    const [myid,setMyid]= useState('');
    const navi=useNavigate();
    const photoUrl = process.env.REACT_APP_BOARDURL;
    const [isWriter,setIswriter] = useState(false);

    useEffect(()=>{
        const getDetail=()=>{
            axios.get(`/board/detail?num=${num}`)
                .then(res=>{
                    setData(res.data);
                    if(res.data.myid === sessionStorage.myid) {
                        setIswriter(true);
                    }
                })
        };
      getDetail();
    },[])

    useEffect(()=>{
        if(data.myid) {
            setMyid(data.myid.slice(0,Math.floor(Math.random()*3)+3) + ("*".repeat(Math.floor(Math.random()*3)+3)))
        }
    },[data, data.myid]) // 의존성 배열에 data.myid 추가


    return (
        <div style={{width:'500px', marginLeft:'200px', marginTop:'100px', textAlign:'center', border:'3px solid black'}}>
            <h1>{data.subject}</h1>
            <h2>{myid}</h2>
            <h2>{data.writeday}</h2>
            <h4>{data.readcount}</h4>
            <h5>{data.content}</h5>
            <img style={{width:'400px'}} alt={''} src={`${photoUrl}${data.photo}`}/>
            <div style={{marginTop: '10px'}}>
                <button type={'button'} className={'btn btn-outline-success'}
                        onClick={()=>{
                            navi(`/board/list/${currentPage}`);
                        }}>
                    목록
                </button>
                &nbsp;&nbsp;
                {
                    isWriter && (
                        <>
                            <button type={'button'} className={'btn btn-outline-warning'} onClick={()=>{navi('/board/form/'+num);}}>수정</button>
                            &nbsp;&nbsp;
                            <button type={'button'} className={'btn btn-outline-danger'} onClick={()=>{
                                if(window.confirm("정말 삭제하시겠습니까?")) {
                                    axios.delete('/board/delete?num='+num)
                                        .then(res=>{
                                            alert("삭제되었습니다.")
                                            navi(`/board/list/${currentPage}`);
                                        })
                                }
                            }}>
                                삭제
                            </button>
                            <br/><br/>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default BoardDetailPage;