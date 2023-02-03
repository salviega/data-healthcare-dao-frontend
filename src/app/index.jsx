import './App.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DHDHome } from './pages/DHDHome'
import { Menu } from './shared/Menu'
import { DHDAcquireData } from './pages/DHDAcquireData'
import { DHDDashboard } from './pages/DHDDashboard'
import { DHDGovernance } from './pages/DHDGovernance'
import { useSelector } from 'react-redux'

function App() {
	const user = useSelector(state => state.auth)
	const contracts = useSelector(state => state.contracts)
	const loading = useSelector(state => state.ui.loading)

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
						<Route
							path='/governance'
							element={
								<DHDGovernance
									user={user}
									contracts={contracts}
									loading={loading}
								/>
							}
						/>
						<Route path='*' element={<Navigate replace to='/' />} />
					</Routes>
				</main>
			</>
		</>
	)
}

export default App
