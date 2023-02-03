import './App.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DHDHome } from './pages/DHDHome'
import { Menu } from './shared/Menu'
import { DHDAcquireData } from './pages/DHDAcquireData'
import { DHDDashboard } from './pages/DHDDashboard'
import { DHDGovernance } from './pages/DHDGovernance'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProposalsDetails } from '../store/actions/proposalActions'

function App() {
	const user = useSelector(state => state.auth)
	const contracts = useSelector(state => state.contracts)
	const proposals = useSelector(state => state.proposals)
	const loading = useSelector(state => state.ui.loading)
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchProposals = async () => {
			dispatch(getProposalsDetails())
		}

		fetchProposals()
	}, [])

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
