import './DHDDashboard.scss'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { setLoading } from '../../../store/actions/uiActions'
import { Collection } from './Collection'

export function DHDDashboard() {
	const user = useSelector(store => store.auth)
	const dispatch = useDispatch()
	const [data, setData] = React.useState([])

	useEffect(() => {
		const fetchData = async () => {
			// dispatch(setLoading(true))
			// const response = await axios.get('https://data-healthcare-dao-node.onrender.com/getData', {
			// 	params: { wallet: user.address }
			// })

			// console.log('response.data: ', response.data)
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
			{data.length === 0 ? (
				<p className='dashboard__nodata'>You have not acquired data yet 😥😥</p>
			) : (
				data.map((collection, index) => (
					<Collection key={index} collection={collection} />
				))
			)}
		</div>
	)
}
