import './login.css';

export default () => {
	return (
		<div className='container'>
			<div className='box'>
				<form className='form'>
					<h2>Sign in</h2>
					<div className='inputBox'>
						<input type='text' required />
						<span>Username</span>
						<i></i>
					</div>
					<div className='inputBox'>
						<input type='password' required />
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
