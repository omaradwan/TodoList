import React, {useEffect, useState} from 'react'
import {TodoItem} from '../types/TodoItem';
import Item from './Item';
import axios from 'axios';
import {IoAddOutline} from 'react-icons/io5';
import {useNavigate} from 'react-router-dom';



export default function Todo() {

	const [todos,setTodos] = useState<TodoItem[]>([]);
	const [newDescription,setNewDescription] = useState("");
	const [show,setShow] = useState(false);
	const [error,setError] = useState(false);

	const navigate = useNavigate();

	async function addTodo(description:string){
		if(description==='')
			return
		try{
			const res = await axios.post("http://localhost:4000/add",{
				description
			}, {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			});
			setTodos([...todos,res.data]);
			setNewDescription("");
			setShow(false);
			setError(false);
		}catch(e: any)
		{
			setError(true);
			console.log(e);
		}

	}

	function signOut(){
		localStorage.removeItem("token");
		navigate("/login");
	}

	useEffect(()=>{
		async function getTodos(){
			try{
				const res = await axios.get("http://localhost:4000/Todo", {
					headers: {
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				});
				setTodos(res.data);
				setError(false);
			}catch(e: any)
			{
				setError(true);
				console.log(e);
			}
		}
		getTodos();
	},[])


	return (
	<div className='bg-stone-200 p-6 overflow-y-scroll  w-2/3 h-3/4 flex flex-col items-center relative z-0'>
		<h1 className='text-3xl font-bold mb-4 text-violet-900'>Todo List</h1>
		{todos.length===0 && <p className='text-xl my-auto'>No todos yet</p>}
		{error && <p className='text-red-700 text-xl'>Authorization Error</p>}

		{todos.map((todo)=>{
			return(
				<Item key={todo._id} todo={todo} setTodos={setTodos} todos={todos} />
			)
		})}
			<div className="absolute right-6 flex flex-row  items-center gap-3 text-stone-800 cursor-pointer bg-stone-50 p-3 rounded-sm" onClick={()=>setShow(!show)}>
				<span className='text-sm'>
					Add new Todo
				</span>
				<span className='rounded-full bg-violet-800'>
					<IoAddOutline size={20} color='white'/>
				</span>
			</div>
			<div className='absolute left-6 text-red-700'>
				<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={signOut}>{error?"Go back":"Sign out"}</button>
			</div>

			<div className={`flex flex-col absolute items-center bg-stone-300 w-1/2 p-6 rounded-md shadow-md ${show?'block':'hidden'}`}>
				<input type="text" className='w-full rounded p-2 mt-6 mb-2' value={newDescription} placeholder='New Todo' onChange={(e)=>setNewDescription(e.target.value)} />
				<button className='bg-violet-700 hover:bg-violet-900 text-white font-bold py-2 px-4 rounded mt-auto' onClick={()=>addTodo(newDescription)}>Add New Todo</button>
			</div>
	</div>
	)
}
