import React from 'react';
import {NavLink} from "react-router-dom";

function BoardRowList(props) {
    const photoUrl1=process.env.REACT_APP_SMALLURL1;
    const photoUrl2=process.env.REACT_APP_SMALLURL2;
    return (
        <tr>
            <td>{props.no-props.idx}</td>
            <td>
                <img alt={''} src={`${photoUrl1}${props.item.photo}${photoUrl2}`}/>
                &nbsp;&nbsp;&nbsp;
                <NavLink to={`/board/detail/${props.item.num}/${props.currentPage}`}>{props.item.subject}</NavLink>
            </td>
            <td>{props.item.myname}</td>
            <td>{(props.item.writeday).slice(0,10)}</td>
            <td>{props.item.readcount}</td>
        </tr>
    );
}

export default BoardRowList;