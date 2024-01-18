import axios from 'axios';
import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';

export default function Register() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error,setError] = useState('');
	const navigate = useNavigate();
	const url = window.location.href;
	const login = url.includes('login');

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		const values = {
			email,
			password
		}
		axios.post(`http://localhost:4000/${url.includes('login')?'login':'signup'}` , values)
		.then(data=>{
		  if(data.status === 200){
			navigate('/main');
			localStorage.setItem("token", data.data.user.token);
		  }
		})
		.catch((e)=>{
			if(login)
		  		setError('Wrong email or password');
			else
				setError("Email already exists");
		  console.log(e);
		})
	}

  return (
	<form onSubmit={(e)=>handleSubmit(e)} className='bg-stone-100 px-16 h-3/4 flex flex-col justify-center items-center relative z-0 '>
			<h1 className='text-3xl text-center mb-12 font-bold underline-offset-[16px] underline text-purple-800'>{login ? 'Log in': "Sign up"}</h1>
			<input type="email"
				className='mb-3 py-2 px-4 bg-stone-200 outline-none'
				value={email}
				placeholder="Email"
				onChange={(e)=>setEmail(e.target.value)}
				required
				id="email"
			/>
			<input type="password"
				className='mb-6 py-2 px-4 bg-stone-200 outline-none'
				value={password}
				placeholder='password'
				onChange={(e)=>setPassword(e.target.value)}
				required
				id="password"
			/>
			<div className='flex flex-row justify-center gap-6'>
				<button type="submit" className="bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-6 rounded-full transition-all duration-100">Submit</button>
				<Link to={login ? '/register' : '/login'} className="text-violet-700 hover:text-violet-900 my-auto text-sm hover:underline py-3 px-6  rounded-full bg-stone-200"> {login ? "SIGN UP" : "LOG IN"} </Link>
			</div>
			{error && <p className='text-red-500 mt-3'>{error}</p>}
	</form>
  )
}
