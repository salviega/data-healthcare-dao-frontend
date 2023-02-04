import './PanelProposal.scss'
import React from 'react'
import { setLoading } from '../../../../store/actions/uiActions'
import { ethers } from 'ethers'

export function PanelProposal(props) {
	const { proposal, user, contracts, dispatch } = props

	const onCastVoteWithReason = async () => {
		// dispatch(setLoading(true))

		// let myVoteTokens = await contracts.healthcareTokenContract.balanceOf(
		// 	user.address
		// )
		// myVoteTokens = ethers.BigNumber.from(myVoteTokens).toNumber()
		// if (myVoteTokens < 0) {
		// 	window.alert('Cannot vote')
		// 	dispatch(setLoading(false))
		// 	return
		// }

		const voteWay = 1
		const reason = 'I like the propol because...'

		const tx = await contracts.healthcareDaoContract.castVoteWithReason(
			proposal.id,
			voteWay,
			reason,
			{ gasLimit: 250000 }
		)
		user.provider.waitForTransaction(tx.hash).then(async response => {
			console.log(response)
			setTimeout(() => {
				window.alert('Voting sucessful')
				dispatch(setLoading(false))
			}, 3000)
		})
	}

	const onQueueAndExecute = async () => {
		const encodedFunctionCall =
			contracts.fundsContract.interface.encodeFunctionData('transferFunds', [
				proposal.wallet,
				ethers.utils.parseEther(proposal.required)
			])

		const currentProposal = `${proposal.title}: ${proposal.description}. Cost: ${proposal.required} FIl`
		const descriptionHash = ethers.utils.keccak256(
			ethers.utils.toUtf8Bytes(currentProposal)
		)

		const tx = await contracts.healthcareDaoContract.queue(
			[contracts.fundsContract.address],
			[0],
			[encodedFunctionCall],
			descriptionHash
		)

		user.provider
			.waitForTransaction(tx.hash)
			.then(async _response => {
				const tx2 = await contracts.healthcareDaoContract.execute(
					[contracts.fundsContract.address],
					[0],
					[encodedFunctionCall],
					descriptionHash,
					{ gasLimit: 250000 }
				)
				user.provider
					.waitForTransaction(tx2.hash)
					.then(_response2 => {
						setTimeout(() => {
							window.alert('Th proposal was executed')
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
	}

	const onExecute = async () => {
		const encodedFunctionCall =
			contracts.fundsContract.interface.encodeFunctionData('transferFunds', [
				proposal.wallet,
				ethers.utils.parseEther(proposal.required)
			])

		const currentProposal = `${proposal.title}: ${proposal.description}. Cost: ${proposal.required} FIl`
		const descriptionHash = ethers.utils.keccak256(
			ethers.utils.toUtf8Bytes(currentProposal)
		)

		const tx = await contracts.healthcareDaoContract.execute(
			[contracts.fundsContract.address],
			[0],
			[encodedFunctionCall],
			descriptionHash,
			{ gasLimit: 250000 }
		)

		user.provider
			.waitForTransaction(tx.hash)
			.then(_response => {
				setTimeout(() => {
					window.alert('Proposal executed')
					dispatch(setLoading(false))
				}, 3000)
			})
			.catch(error => {
				console.log('error: ', error)
				window.alert('There war an error, look the console')
				dispatch(setLoading(false))
			})
	}

	return (
		<div className='proposal'>
			<div className='proosal-state'>
				<p className='proposal-state__text'>{proposal.state}</p>
				<button className='proposal-state__queue' onClick={onQueueAndExecute}>
					QUEUE
				</button>
				<button className='proposal-state__queue' onClick={onExecute}>
					EXECUTE
				</button>
			</div>
			<p className='proposal__title'>{proposal.title}</p>
			<p className='proposal__description'>{proposal.description}</p>
			<div className='proposal-vote'>
				<p className='proposal-vote__deadline'>
					Votes: {proposal.votes.forVotes}
				</p>
				<p className='proposal-vote__deadline'>Time remaining: 0days // TODO</p>
				<button
					className='proposal-vote__approve'
					onClick={onCastVoteWithReason}
				>
					VOTE
				</button>
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
			<div className='proposal__status' style={{ color: 'green' }}>
				Succeeded
			</div>
		)
	//  4 Succeeded
	else if (state === 5)
		return (
			<div className='proposal__status' style={{ color: 'yellow' }}>
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
