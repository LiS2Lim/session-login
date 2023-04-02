import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

export default () => {
	const [ email, setEmail ] = useState<string>('');
	const [ password, setPassword ] = useState<string>('');
	const Navigate = useNavigate();
	const fetchLogin = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(sessionStorage.getItem('login')){
			Navigate("/");
		};
		try {
			fetch('http://erp.li-lim.net/login',{
				method: "POST",
				headers: {
					'Content-Type': 'application/json' 
				},
				body: JSON.stringify({
					email,
					password
				}),
			}).then(res => {
				if(res.status === 200) {
					sessionStorage.setItem('login','true')
					Navigate("/");
				};
			})
		} catch(err) {
			console.error(err);
		};
	};
	return (
		<div className='container'>
			<div className='box'>
				<form onSubmit={fetchLogin} className='form'>
					<h2>Sign in</h2>
					<div className='inputBox'>
						<input type='text' onChange={(e)=>{setEmail(e.target.value)}} required />
						<span>Username</span>
						<i></i>
					</div>
					<div className='inputBox'>
						<input type='password' onChange={(e)=>{setPassword(e.target.value)}} required />
						<span>password</span>
						<i></i>
					</div>
					<div className='links'>
						<a href='javascript:void(0)'>Forgot Password</a>
						<a href='javascript:void(0)'>sign-up</a>
					</div>
					<input type='submit' value="Login"/>
				</form>
			</div>
		</div>
	)
}
