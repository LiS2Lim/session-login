import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/home/index'
import Login from './pages/login/index'
import NotFound from './pages/404/index'

export default () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login/>}/>
				<Route path="/" element={<Home/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</BrowserRouter>
	)
}
