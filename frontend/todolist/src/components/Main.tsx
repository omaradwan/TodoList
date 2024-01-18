import Todo from './Todo'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Register from './Register'

export default function Main() {
	return (
	<div className='h-screen bg-gradient-to-t from-violet-950 to-indigo-800 flex flex-col justify-center items-center '>
		<BrowserRouter>
			<Routes>
				<Route index element={<Navigate replace to="/login"/>}/>
				<Route path='/login' element={<Register/>}/>
				<Route path='/register' element={<Register/>}/>
				<Route path='/main' element={<Todo/>}/>
			</Routes>
		</BrowserRouter>
	</div>
	)
}
