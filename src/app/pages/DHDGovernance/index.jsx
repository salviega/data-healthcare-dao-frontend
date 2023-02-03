import './DHDGovernance.scss'
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../store/actions/uiActions'
import { FormProposal } from './FormProposal'
import { firebaseApi } from '../../../services/firebaseApi'
import { PanelProposal } from './PanelProposal'

export function DHDGovernance() {
	const dispatch = useDispatch()
	const user = useSelector(store => store.auth)
	const contracts = useSelector(store => store.contracts)
	const proposals = useSelector(store => store.proposals)
	const [doProposal, setDoProposal] = useState(false)
	const [totalAsserts, setTotalAsserts] = useState(0)
	const { createItem } = firebaseApi()

	const onSafeMint = async placement => {
		try {
			dispatch(setLoading(true))
			const tx = await contracts.healthcareTokenContract.safeMint(
				user.address,
				ethers.utils.parseEther('1')
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
							console.log('error: ', error)
							window.alert('There war an error, look the console')
							dispatch(setLoading(false))
						})
				})
				.catch(error => {
					console.log('error: ', error)
					window.alert('There war an error, look the console')
					dispatch(setLoading(false))
				})
		} catch (error) {
			console.log('error: ', error)
			window.alert('There war an error, look the console')
			dispatch(setLoading(false))
		}
	}

	useEffect(() => {
		const fetch = async () => {
			const funds = await contracts.fundsContract.totalAsserts()
			setTotalAsserts(ethers.BigNumber.from(funds).toNumber())
		}

		fetch()
	}, [])

	return (
		<div className='governance'>
			<div className='governance-stat'>
				<p className='governance-stat__item'>PROPOSALS: {proposals.length}</p>
				<p className='governance-stat__item'>FUNDS: {totalAsserts} FIL</p>
			</div>
			<div className='governance-info'>
				<p className='governance-info__title'>
					Welcome to the Governance DAO of DHD
				</p>
				<p className='governance-info__description'></p>
			</div>
			<div className='governance-buttons'>
				<button
					className='governance-buttons__item'
					onClick={() => {
						!doProposal ? setDoProposal(true) : setDoProposal(false)
					}}
				>
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
				<PanelProposal key={index} proposal={proposal} />
			))}
		</div>
	)
}
