import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function BoardForm(props) {
    const [subject,setSubject] = useState('');
    const [photo,setPhoto]= useState('');
    const [content,setContent] = useState('');
    const [fileName, setFileName] = useState('');
    const {num} = useParams();

    const navi = useNavigate();
    //이미지 경로.
    const photoUrl = process.env.REACT_APP_BOARDURL;
    //SessionStorage에 저장된 아이디와 이름 가져오기.
    const myid = sessionStorage.myid;
    const myname = sessionStorage.myname;
    
    const onSubmitEvent = (e)=>{
        e.preventDefault();
        axios.post("/board/insert",{myid,myname,subject,content})
            .then(res=>{
                navi("/board/list");
            })
    }

    const onUploadEvent=(e)=>{
        const uploadFile = new FormData();
        uploadFile.append("upload",e.target.files[0]);
        axios({
            method:'post',
            url :'/board/upload',
            data : uploadFile,
            headers : {'Content-Type' : 'multipart/form-data'}
        }).then(res=>{
            setPhoto(res.data);
        })
    }



    const updateFormMakeEvent=()=>{
        if(num != null) {
            axios.get('/board/detail?num='+num)
                .then(res=>{
                    setSubject(res.data.subject);
                    setContent(res.data.content);
                    setPhoto(res.data.photo);
                })
        }
    }

    useEffect(()=>{
       updateFormMakeEvent();
    },[])


    return (
        <div style={{marginLeft:"100px", width:'400px'}}>
            <form onSubmit={onSubmitEvent}>
                <table className={'table'}>
                    <tbody>
                        <tr>
                            <th style={{backgroundColor:"#ddd", width : "100px"}}>제목</th>
                            <td>
                                <input type={'text'} className={'form-control'} required onChange={(e)=>{
                                    setSubject(e.target.value)
                                }} value={subject}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{backgroundColor:"#ddd", width : "100px"}}>사진</th>
                            <td>
                                <input type={'file'} className={'form-control'} onChange={onUploadEvent}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{backgroundColor:"#ddd", width : "100px"}}>내용</th>
                            <td>
                                <textarea style={{width:"100%", height:'100px'}} required value={content} onChange={(e)=>{
                                    setContent(e.target.value)
                                }}></textarea>
                            </td>
                        </tr>
                    <tr>
                        <td colSpan={2} align={'center'}>
                            <button type={'submit'} className={'btn btn-outline-danger'} style={{width:'100px'}}>
                                저장
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
            <img alt={''} src={`${photoUrl}${photo}`} style={{width:'200px',position:'absolute',left:'550px',top:'130px'}}/>
        </div>
    );
}

export default BoardForm;