import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

export default () => {
	const [ email, setEmail ] = useState<string>('');
	const [ password, setPassword ] = useState<string>('');
	const [ isLoginPage, setIsLoginPage ] = useState<boolean>(true);
	const [ sigininclass, setSigninclass ] = useState<string>('');
	const [ siginupclass, setSignupclass ] = useState<string>('');
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
				} else {
					alert('IDまたはPWが違います');
				};
			})
		} catch(err) {
			console.error(err);
		};
	};
	const fetchSignup = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			fetch('http://api.li-lim.net/test/signup',{
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email
				}),
			})
		} catch(err) {
			console.error(err);
		}
	}
	useEffect(()=>{
		if(sigininclass === '') {
				setSigninclass('form signinForm');
				setSignupclass('form signupForm');
		} else {
			if(isLoginPage) {
				setSigninclass('form signinForm fadeIn');
				setSignupclass('form signupForm fadeOut');
				console.log(isLoginPage)
			} else {
				setSigninclass('form signinForm fadeOut');
				setSignupclass('form signupForm fadeIn');
			}
		}
	},[isLoginPage])
	
	return (
		<div className='container'>
			<div className='box'>
				<div className='form'></div>
				{/* ログインフォーム */}
				<form onSubmit={fetchLogin} className={sigininclass}>
					<h2>ログイン</h2>
					<div className='inputBox'>
						<input type='text' onChange={(e)=>{setEmail(e.target.value)}} required />
						<span>メールアドレス</span>
						<i></i>
					</div>
					<div className='inputBox'>
						<input type='password' onChange={(e)=>{setPassword(e.target.value)}} required />
						<span>パスワード</span>
						<i></i>
					</div>
					<div className='links'>
						<a href='javascript:void(0)'>パスワードをお忘れの方</a>
						<a href='javascript:void(0)' onClick={()=>{setIsLoginPage(!isLoginPage)}}>新規登録</a>
					</div>
					<input type='submit' value="ログイン"/>
				</form>
				
				{/* 会員登録フォーム */}
				<form onSubmit={fetchSignup} className={siginupclass}>
					<h2>新規登録</h2>
					<div className='inputBox'>
						<input type='text' onChange={(e)=>{setEmail(e.target.value)}} required />
						<span>メールアドレス</span>
						<i></i>
					</div>
					<div className='links'>
						<a href='javascript:void(0)'></a>
						<a className='loginLink' href='javascript:void(0)' onClick={()=>{setIsLoginPage(!isLoginPage)}}>ログイン</a>
					</div>
					<input type='submit' value="確認メール"/>
				</form>
			</div>
		</div>
	)
}

