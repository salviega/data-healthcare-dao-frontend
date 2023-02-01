import './App.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DHDHome } from './pages/DHDHome'
import { Menu } from './shared/Menu'
import { DHDAcquireData } from './pages/DHDAcquireData'
import { DHDDashboard } from './pages/DHDDashboard'

function App() {
	return (
		<>
			{/* {loading ? (
				<div className='main__loading'>
					<CyclimateLoading />
				</div>
			) : ( */}
			<>
				<Menu />
				<main>
					<Routes>
						<Route path='/' element={<DHDHome />} />
						<Route path='/acquire-data' element={<DHDAcquireData />} />
						<Route path='/dashboard' element={<DHDDashboard />} />
						<Route path='*' element={<Navigate replace to='/' />} />
					</Routes>
				</main>
				{/* <CyclimateFooter /> */}
			</>
			{/* )} */}
		</>
	)
}

export default App
