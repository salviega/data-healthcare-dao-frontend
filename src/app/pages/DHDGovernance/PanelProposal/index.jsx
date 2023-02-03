import './PanelProposal.scss'
import React from 'react'

export function PanelProposal(props) {
	const { proposal } = props

	return (
		<div className='proposal'>
			<p className='proposal__status'>{currentStatus(proposal.state)}</p>
			<p className='proposal__title'>{proposal.title}</p>

			<p className='proposal__description'>{proposal.description}</p>
			<div className='proposal-vote'>
				<p className='proposal-vote__deadline'>Time remaining: 0days</p>
				<button className='proposal-vote__approve'>APPROVE</button>
			</div>
			<div className='proposal-stat'>
				<p className='proposal-stat__item'>
					Proposal made by: {proposal.wallet}
				</p>
				<p className='proposal-stat__item'>Cost: {proposal.required} FIL</p>
			</div>
		</div>
	)
}

function currentStatus(state) {
	if (state === 0)
		return (
			<div className='proposal__status' style={{ color: 'red' }}>
				Pending
			</div>
		)
	//  0 Pending
	else if (state === 1)
		return (
			<div className='proposal__status' style={{ color: 'red' }}>
				Active
			</div>
		)
	//  1 Active
	else if (state === 2)
		return (
			<div className='proposal__status' style={{ color: 'red' }}>
				Canceled
			</div>
		)
	//  2 Canceled
	else if (state === 3)
		return (
			<div className='proposal__status' style={{ color: 'red' }}>
				Defeated
			</div>
		)
	//  3 Defeated
	else if (state === 4)
		return (
			<div className='proposal__status' style={{ color: 'red' }}>
				Succeeded
			</div>
		)
	//  4 Succeeded
	else if (state === 5)
		return (
			<div className='proposal__status' style={{ color: 'red' }}>
				Queued
			</div>
		)
	//  5 Queued
	else if (state === 6)
		return (
			<div className='proposal__status' style={{ color: 'red' }}>
				Expired
			</div>
		)
	//  6 Expired
	else
		return (
			<div className='proposal__status' style={{ color: 'red' }}>
				Executed
			</div>
		) //  7 Executed
}
