import './DHDGovernance.scss'
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../store/actions/uiActions'
import { FormProposal } from './FormProposal'
import { firebaseApi } from '../../../services/firebaseApi'
import { PanelProposal } from './PanelProposal'
import { Navigate } from 'react-router-dom'

export function DHDGovernance() {
	const dispatch = useDispatch()
	const user = useSelector(store => store.auth)
	const contracts = useSelector(store => store.contracts)
	const proposals = useSelector(store => store.proposals)
	const [doProposal, setDoProposal] = useState(false)
	const [totalAsserts, setTotalAsserts] = useState(0)
	const { createItem } = firebaseApi()

	const onSafeMint = async () => {
		dispatch(setLoading(true))

		try {
			const tx = await contracts.healthcareTokenContract.safeMint(
				user.address,
				'1' // mint one token
			)

			user.provider
				.waitForTransaction(tx.hash)
				.then(async _response => {
					const tx2 = await contracts.healthcareTokenContract.delegate(
						user.address
					)
					user.provider
						.waitForTransaction(tx2.hash)
						.then(_response2 => {
							setTimeout(() => {
								window.alert('1 DHD vote token was minted')
								dispatch(setLoading(false))
							}, 3000)
						})
						.catch(error => {
							onError(error)
						})
				})
				.catch(error => {
					onError(error)
				})
		} catch (error) {
			onError(error)
		}
	}

	const showProposalForm = () => {
		!doProposal ? setDoProposal(true) : setDoProposal(false)
	}

	const onError = error => {
		console.log('❌ error: ', error)
		window.alert('There war an error, look the console')
		dispatch(setLoading(false))
	}

	useEffect(() => {
		const fetch = async () => {
			const funds = await contracts.fundsContract.totalAsserts()
			setTotalAsserts(ethers.BigNumber.from(funds).toNumber())
		}

		fetch()
	}, [])

	if (user.address === 'Connect wallet') {
		return <Navigate to='/' />
	}

	return (
		<div className='governance'>
			<div className='governance-spacer' />
			<div className='governance-stat'>
				<p className='governance-stat__item'>PROPOSALS: {proposals.length}</p>
				<p className='governance-stat__item'>FUNDS: {totalAsserts} FIL</p>
			</div>
			<div className='governance-resume'>
				<p className='governance-resume__title'>
					Welcome to the Governance DAO of DHD
				</p>
				<p className='governance-resume__description'></p>
			</div>
			<div className='governance-buttons'>
				<button className='governance-buttons__item' onClick={showProposalForm}>
					Make a proposal
				</button>
				<button className='governance-buttons__item' onClick={onSafeMint}>
					Get token
				</button>
			</div>
			{doProposal && (
				<FormProposal
					user={user}
					contracts={contracts}
					createItem={createItem}
					dispatch={dispatch}
				/>
			)}
			{proposals?.map((proposal, index) => (
				<PanelProposal
					key={index}
					proposal={proposal}
					user={user}
					contracts={contracts}
					dispatch={dispatch}
				/>
			))}
		</div>
	)
}
