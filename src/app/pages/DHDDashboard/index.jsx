import './DHDDashboard.scss'
import React from 'react'
import { Footer } from '../../shared/Footer'

export function DHDDashboard() {
	return (
		<div className='dashboard'>
			<div className='info'>
				<div className='info-personal'></div>
				<div className='info-notificaction'></div>
			</div>
			<Footer />
		</div>
	)
}
