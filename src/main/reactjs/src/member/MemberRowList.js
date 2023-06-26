import React from 'react';

function MemberRowList(props) {
    return (
            <tr>
                <td>{props.idx+1}</td>
                <td>{props.item.myname}</td>
                <td>{props.item.myid}</td>
                <td>{props.item.myaddress}</td>
                <td>{props.item.registerday}</td>
                <td style={{backgroundColor:"lightcoral", cursor:"pointer"}} onClick={()=>{
                    if(window.confirm("정말 삭제하시겠습니까?")) {
                        props.deleteE(props.item.num);
                    }
                }}>삭제
                </td>
            </tr>
    );
}

export default MemberRowList;