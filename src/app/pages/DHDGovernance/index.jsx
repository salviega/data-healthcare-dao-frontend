import './DHDGovernance.scss'
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../../store/actions/uiActions'
import { FormProposal } from './FormProposal'
import { firebaseApi } from '../../../services/firebaseApi'
import { PanelProposal } from './PanelProposal'
import { Navigate } from 'react-router-dom'
import {
	GelatoRelay,
	SponsoredCallERC2771Request
} from '@gelatonetwork/relay-sdk'
import { NETWORK } from '../../../config/helper.config'
const relay = new GelatoRelay()

export function DHDGovernance() {
	const dispatch = useDispatch()
	const user = useSelector(store => store.auth)
	const contracts = useSelector(store => store.contracts)
	const proposals = useSelector(store => store.proposals)
	const [sincronized, setSincronized] = useState(false)
	const [doProposal, setDoProposal] = useState(false)
	const [totalAsserts, setTotalAsserts] = useState(0)
	const { createItem } = firebaseApi()

	const onSafeMint = async () => {
		try {
			dispatch(setLoading(true))
			contracts.healthcareTokenContract.once('tokenMinted', async response => {
				const { data } =
					await contracts.healthcareTokenContract.populateTransaction.relayDelegate(
						user.address
					)
				await executeFunctionWithGelato(
					data,
					user,
					contracts.healthcareTokenContract.address
				)
			})

			contracts.healthcareTokenContract.once('tokenDelegated', response => {
				window.alert('1 DHD vote token was minted')
				setSincronized(false)
				dispatch(setLoading(false))
			})

			const { data } =
				await contracts.healthcareTokenContract.populateTransaction.relayMint(
					user.address,
					'1' // mint one token
				)
			await executeFunctionWithGelato(
				data,
				user,
				contracts.healthcareTokenContract.address
			)
		} catch (error) {
			onError(error)
		}
	}

	const showProposalForm = () => {
		!doProposal ? setDoProposal(true) : setDoProposal(false)
	}

	const onError = error => {
		console.error('❌ error: ', error)
		window.alert('There war an error, look the console')
		dispatch(setLoading(false))
	}

	useEffect(() => {
		const fetch = async () => {
			const funds = await contracts.healthcareTokenContract.balanceOf(
				user.address
			)
			setTotalAsserts(ethers.utils.formatEther(funds))
			setSincronized(true)
		}

		fetch()
	}, [sincronized])

	if (user.address === 'Login') {
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
				<p className='governance-resume__description' />
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
					totalAsserts={totalAsserts}
					createItem={createItem}
					dispatch={dispatch}
					showProposalForm={showProposalForm}
					setSincronized={setSincronized}
					onError={onError}
				/>
			)}
			{proposals?.map((proposal, index) => (
				// proposal.state !== 3 &&
				<PanelProposal
					key={index}
					proposal={proposal}
					user={user}
					contracts={contracts}
					dispatch={dispatch}
					setSincronized={setSincronized}
					onError={onError}
				/>
			))}
		</div>
	)
}

async function executeFunctionWithGelato(data, user, contractAddress) {
	const request = {
		chainId: NETWORK.chainId,
		target: contractAddress,
		data: data,
		user: user.address
	}

	const relayResponse = await relay.sponsoredCallERC2771(
		request,
		user.provider,
		process.env.REACT_APP_GELATO_API_KEY
	)

	console.log('relayResponse: ', relayResponse)
	return relayResponse
}
