import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import './home.css';

type user = {
	id: number,
	email: string,
	name: string,
	created_at: Date,
}

export default () => {
	const Navigate = useNavigate();
	const [ users, setUsers ] = useState<[user]>();
	const jpDate = new Intl.DateTimeFormat("ja-JP",{dateStyle:"long"});
	const fetchUser = () => {
		try {
			fetch('http://api.li-lim.net/test/user')
			.then(res => res.json())
			.then(data => setUsers(data))
		} catch(err) {
			console.error(err);
		}
	}
	useEffect(()=>{
		if(!sessionStorage.getItem('login')) {
			Navigate("/login");
		}
		fetchUser();
	},[])
	return (
		<>
			<h3>登録されたユーザー</h3>
			<table border={1}>
				<th>登録番号</th>
				<th>名前</th>
				<th>登録日</th>
				{users && users.map((user, index)=> (
					<tr key={index}>
						<td>{user.id}</td>
						<td>{user.name}</td>
						<td>{jpDate.format(new Date(user.created_at))}</td>
					</tr>
				))}
			</table>
		</>
	)
}
