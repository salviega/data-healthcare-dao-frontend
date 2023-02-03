import './DHDDashboard.scss'
import React from 'react'
import { Footer } from '../../shared/Footer'
import { Plot } from './Plot'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export function DHDDashboard() {
	const user = useSelector(store => store.auth)

	if (user.address === 'Connect wallet') {
		return <Navigate to='/' />
	}

	return (
		<div className='dashboard'>
			<div className='dashboard-info'>
				<div className='dashboard-info-personal'>
					<p className='dashboard-info-personal__title'>My information</p>
					<p className='dashboard-info-personal__item'>xxx</p>
					<p className='dashboard-info-personal__item'>xxx</p>
					<p className='dashboard-info-personal__item'>xxx</p>
					<p className='dashboard-info-personal__item'>xxx</p>
					<p className='dashboard-info-personal__item'>xxx</p>
					<p className='dashboard-info-personal__item'>xxx</p>
					<button className='dashboard-info-personal__update'>
						UPDATE INFO
					</button>
				</div>
				<div className='dashboard-info-notification'>
					<p className='dashboard-info-notification__title'>Notifications</p>
				</div>
			</div>
			<div className='dashboard-data'>
				<div className='dashboard-data-owner'>
					<p className='dashboard-data-owner__title'>Your data</p>
					<div className='dashboard-data-owner-graphic'>
						<Plot />
					</div>
				</div>
			</div>
			<div id='data__last' className='dashboard-data'>
				<div className='dashboard-data-owner'>
					<p className='dashboard-data-owner__title'>Data Requested</p>
					<div className='dashboard-data-owner-graphic'>
						<Plot />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
