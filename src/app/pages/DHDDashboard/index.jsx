import './DHDDashboard.scss'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { setLoading } from '../../../store/actions/uiActions'
import { Collection } from './Collection'
import { Spinner } from '../../shared/Spinner'

export function DHDDashboard() {
	const user = useSelector(store => store.auth)
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [active, setActive] = useState(false)

	const fetchData = async () => {
		setLoading(true)
		const response = await axios.get(
			'https://data-healthcare-dao-node.onrender.com/getData',
			{
				params: { wallet: user.address }
			}
		)

		setData(response.data)
		setLoading(false)
		setActive(true)
	}

	if (user.address === 'Login') {
		return <Navigate to='/' />
	}

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<div className='dashboard'>
					<div className='dashboard-spacer' />
					{!active ? (
						<div className='dashboard-container'>
							<p className='dashboard__nodata'>
								You have not acquired data yet 😥😥
							</p>
							<button className='dashboard__fetch' onClick={fetchData}>
								GET data
							</button>
						</div>
					) : (
						data.map((collection, index) => (
							<Collection key={index} collection={collection} />
						))
					)}
				</div>
			)}
		</>
	)
}
