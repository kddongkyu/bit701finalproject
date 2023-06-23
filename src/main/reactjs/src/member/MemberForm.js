import React, {useState} from 'react';
// import DaumPostcode from 'react-daum-postcode';

function MemberForm(props) {
    const [openPostcode, setOpenPostcode] = React.useState(false);
    const [myid,setMyid] = useState('');
    const [mypass,setMypass]=useState('');
    const [myaddress,setMyaddress] = useState('');
    const [myname,setMyname] = useState('');
    const [idcount,setIdcount] = useState(0);

    const onSubmidEvent = (e)=>{
        e.preventDefault(); // 기본 이벤트 무효화
    }

    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
            setOpenPostcode(false);
        },
    }

    return (
        <div>
            <form onSubmit={onSubmidEvent}>
                <table className={'table'} style={{width:'500px'}}>
                    <caption align={'top'}><b>회원가입</b></caption>
                    <tbody>
                        <tr>
                            <th style={{width:"100px",backgroundColor:"lightpink"}}>이름</th>
                            <td>
                                <input type={"text"} className={'form-control'} placeholder={'이름 입력'} required value={myname} onChange={(e)=>setMyname(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{width:"100px",backgroundColor:"lightblue"}}>아이디</th>
                            <td className={'input-group'}>
                                <input type={"text"} className={'form-control'} placeholder={'아이디 입력'} required value={myid} onChange={(e)=>setMyid(e.target.value)}/>
                                <button type={'button'} className={'btn btn-outline-danger btn-sm'}>중복확인</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default MemberForm;