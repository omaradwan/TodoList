import {useState} from 'react'
import {TodoItem} from '../types/TodoItem'
import axios from 'axios';

type props = {
	todo: TodoItem,
	todos: TodoItem[],
	setTodos: Function
}

export default function Item({todo, todos, setTodos}: props) {
	const [editing,setEditing] = useState(false);
	const [desc,setDesc] = useState(todo.description);
	async function updateTodo(){
		if(!editing)
			return;

		axios.put(`http://localhost:4000/update/${todo._id}`, {
			description: desc
		}, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	async function markAsDone(id: number){
		// setTodos(
		// 	todos.map((todo)=>
		// 		todo._id === id ? {...todo,done : !todo.done}:todo
		// 	)
		// )
		axios.put(`http://localhost:4000/update/${id}`,{
			done: !todo.done
		}, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.catch(function (error) {
			console.log(error);
		});

		setTodos(todos.map((item)=>item._id===id?{...item, done: !item.done}:item))
	}

	async function deleteTodo(){
		axios.delete(`http://localhost:4000/delete/${todo._id}`, {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(() =>
			setTodos(todos.filter((item)=>item._id!== todo._id))
		)
		.catch(function (error) {
			console.log(error);
		});

	}

	const date = new Date(todo.createdAt).toDateString()

	return (
	<div className='flex flex-row gap-4 my-2 items-center justify-between w-full bg-white bg-opacity-75 p-3 rounded-sm shadow-md'>
		{ !editing ?
			<>
				<div>
					<h4 className={`text-xl font-bold ${todo.done && 'line-through'}`} onClick={()=>setEditing(!editing)}>{desc}</h4>
					<span className='text-xs'>{date}</span>
				</div>
			</>
			:
			<input
			type='text'
			value={desc}
			onChange={ (e) => setDesc(e.target.value) }
			onBlur={()=>{updateTodo();setEditing(false)}}
			className='border-2 border-black '/>}

		<div className="flex flex-row gap-3">
			<button className='bg-green-500 shadow-md px-2 py-1 rounded text-white hover:bg-green-600 transition-all duration-75 disabled:opacity-50' onClick={() => markAsDone(todo._id)}>{todo.done?"Unmark As Done":"Mark As Done"}</button>
			<button className='bg-yellow-400 shadow-md px-2 py-1 rounded text-white hover:bg-yellow-600 transition-all duration-75' onClick={()=>{setEditing(!editing);updateTodo()}}> Edit</button>
			<button className='bg-red-500 shadow-md px-2 py-1 rounded text-white hover:bg-red-600 transition-all duration-75' onClick={() => deleteTodo()}> Delete</button>

		</div>
	</div>
	)
}
