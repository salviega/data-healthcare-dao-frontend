import './DHDGovernance.scss'
import React from 'react'

export function DHDGovernance() {
	return (
		<div className='governance'>
			<div className='governance-stat'>
				<p className='governance-stat__item'>PROPOSAL: 1</p>
				<p className='governance-stat__item'>FUNDS: 1</p>
			</div>
			<div className='governance-info'>
				<p className='governance-info__title'>
					Welcome to the Governance DAO of DHD
				</p>
				<p className='governance-info__description'></p>
			</div>
			<div className='governance-buttons'>
				<button className='governance-buttons__item'>Make a proposal</button>
				<button className='governance-buttons__item'>Get token</button>
			</div>
			<div className='governance-proposal'>
				<p className='governance-proposal__status'>·PENDING</p>
				<p className='governance-proposal__title'>
					Build a distribution pool for all governance token holders
				</p>

				<p className='governance-proposal__description'>
					In order to make an equitable distribution of resources, a percentage
					of each revenue from data acquisition will be allocated to s holders
					of the governance token.
				</p>
				<div className='governance-proposal-vote'>
					<p className='governance-proposal-vote__deadline'>
						Time remaining: 0days
					</p>
					<button className='governance-proposal-vote__approve'>APPROVE</button>
				</div>
				<div className='governance-proposal-stat'>
					<p className='governance-proposal-stat__item'>
						Proposal made by: 0x5d8B44...
					</p>
					<p className='governance-proposal-stat__item'>Cost: 5 FIL</p>
				</div>
			</div>
		</div>
	)
}
