import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';

function Login() {
	const style = {
		wrapper: `bg-white h-[100vh] flex flex-col items-center`,
		logo: `my-[20px] object-contain w-[100px] mx-auto`,
		container: `w-[340px] h-fit d-flex flex-col py-6 px-8 rounded-[5px] border-[1px] border-solid border-gray-300`,
		container__header: `font-[500] mb-[20px] text-3xl`,
		container__subHeader: `text-[12px] mb-2`,
		container__input: `h-[30px] w-[98%] mb-[10px] p-3 bg-white border-[1px] rounded-[5px] border-solid border-gray-400 focus:outline-none focus:bg-yellow-100`,
		policy: `mt-[15px] text-[12px]`,
		signInBtn: `bg-[#f0c14b] hover:bg-yellow-400 rounded-[10px] w-full h-[30px] border-[1px] border-solid mt-[10px] border-t-[#a88734] border-x-[#9c7e31] border-b-[#846a29]`,
		registerBtn: `rounded-[2px] w-full h-[30px] border-[1px] border-solid mt-[10px] border-gray-400 bg-gray-100 hover:bg-gray-200`,
	};

	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((auth) => navigate('/'))
			.catch((error) => alert(error.message));
	};
	const register = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((auth) => {
				if (auth) {
					navigate('/');
				}
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className={style.wrapper}>
			<Link to="/">
				<img
					className={style.logo}
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
				/>
			</Link>

			<div className={style.container}>
				<h1 className={style.container__header}>Sign-in</h1>
				<p className={style.container__subHeader}>
					Fill in valid email and password, then choose sign in or create an
					account
				</p>
				<form>
					<h5 className="mb-[5px]">Email</h5>
					<input
						className={style.container__input}
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<h5 className="mb-[5px]">Password</h5>
					<input
						className={style.container__input}
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="submit"
						onClick={signIn}
						className={style.signInBtn}>
						Sign In
					</button>
				</form>
				<p className={style.policy}>
					By continuing, you agree to Amazon's{' '}
					<a
						className="text-blue-600"
						href="https://www.amazon.ca/gp/help/customer/display.html?nodeId=201909000"
						target="_blank">
						Conditions of Use
					</a>{' '}
					and{' '}
					<a
						className="text-blue-600"
						href="https://www.amazon.ca/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ"
						target="_blank">
						Privacy Notice.
					</a>
				</p>

				<button
					onClick={register}
					className={style.registerBtn}>
					Create your Amazon account
				</button>
			</div>
		</div>
	);
}
export default Login;
