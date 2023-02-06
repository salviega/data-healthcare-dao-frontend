import './DHDDashboard.scss'
import React, { useEffect } from 'react'
import { Plot } from './Collection/Plot'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { setLoading } from '../../../store/actions/uiActions'
import harcored from '../../../assets/json/examples/getData.json'
import { Collection } from './Collection'
const QUERY_PROPOSAL =
	'http://ec2-100-24-74-70.compute-1.amazonaws.com:8088/query_proposal/'

export function DHDDashboard() {
	const user = useSelector(store => store.auth)
	const dispatch = useDispatch()
	const [data, setData] = React.useState([])

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setLoading(true))
			// setData(harcored)
			const response = await axios.get(QUERY_PROPOSAL, {
				params: { wallet: user.address }
			})

			console.log('response: ', response)
			dispatch(setLoading(false))
		}

		fetchData()
	}, [])

	if (user.address === 'Connect wallet') {
		return <Navigate to='/' />
	}

	return (
		<div className='dashboard'>
			<div className='dashboard-spacer' />
			{data.map((collection, index) => (
				<Collection key={index} collection={collection} />
			))}
		</div>
	)
}
