import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

export default () => {
	const [ email, setEmail ] = useState<string>('');
	const [ password, setPassword ] = useState<string>('');
	const [ name, setName ] = useState<string>('');
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
			fetch('http://api.li-lim.net/test/login',{
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
					email,
					password,
					name,
				}),
			}).then(res => {
				if(res.status === 201) {
					alert('確認メールが送られました。メールボックスをご確認し、登録を完了してください。');
					setEmail('');
					setIsLoginPage(true);
				}
				if(res.status === 202) {
					alert('すでに登録済のメールです。パスワードを忘れた場合はパスワードを探すメニューをご利用ください。');
				}
				if(res.status === 204) {
					alert("予期せぬエラーがありました。管理者にご連絡ください。");
				}
			}).catch(() => {
				alert('メールアドレスをご確認ください');
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
						<a href='javascript:void(0)' onClick={()=>{setIsLoginPage(!isLoginPage)}}>新規登録へ</a>
					</div>
					<input type='submit' value="ログイン"/>
				</form>
				
				{/* 会員登録フォーム */}
				<form onSubmit={fetchSignup} className={siginupclass}>
					<h2>新規登録</h2>
					<div className='inputBox'>
						<input type='text' onChange={(e)=>{setEmail(e.target.value)}} value={email} required />
						<input type='text' onChange={(e)=>{setPassword(e.target.value)}} value={password} required />
						<input type='text' onChange={(e)=>{setName(e.target.value)}} value={name} required />
						<span>メールアドレス</span>
						<i></i>
					</div>
					<div className='links'>
						<a href='javascript:void(0)'></a>
						<a href='javascript:void(0)' onClick={()=>{setIsLoginPage(!isLoginPage)}}>ログインへ</a>
					</div>
					<input type='submit' value="確認メール"/>
				</form>
			</div>
		</div>
	)
}

