import './FormProposal.scss'
import React, { useRef } from 'react'
import { ethers } from 'ethers'
import { setLoading } from '../../../../store/actions/uiActions'

export function FormProposal(props) {
	const { user, contracts, createItem, dispatch } = props
	const title = useRef()
	const description = useRef()
	const required = useRef()

	const onPropose = async event => {
		event.preventDefault()
		// dispatch(setLoading(true))

		let info = {
			title: title.current.value,
			description: description.current.value,
			required: required.current.value
		}
		// const requiredParsed = parseInt(info.required)

		// let totalAsserts = await contracts.fundsContract.totalAsserts()
		// totalAsserts = ethers.BigNumber.from(totalAsserts).toNumber()

		// if (requiredParsed > totalAsserts) {
		// 	window.alert('Required value is wrong, please change the required value')
		// 	dispatch(setLoading(false))
		// 	return
		// }

		contracts.healthcareDaoContract.on('ProposalCreated', async proposalId => {
			const proposalIdParsed = ethers.BigNumber.from(proposalId).toString()
			await createItem({ ...info, id: proposalIdParsed, wallet: user.address })
			window.alert('Proposal generated')
			dispatch(setLoading(false))
		})

		const proposal = `${info.title}: ${info.description}. Cost: ${info.required} FIl`

		const encodedFunctionCall =
			contracts.fundsContract.interface.encodeFunctionData('transferFunds', [
				user.address,
				ethers.utils.parseEther(info.required)
			])

		await contracts.healthcareDaoContract.propose(
			[contracts.fundsContract.address],
			[0],
			[encodedFunctionCall],
			proposal
		)
	}
	return (
		<form className='form' onSubmit={onPropose}>
			<input
				className='form__input'
				placeholder='form title'
				type='text'
				maxLength='100'
				required
				ref={title}
			></input>
			<input
				className='form__input'
				placeholder='form description'
				type='text'
				maxLength='280'
				required
				ref={description}
			></input>
			<input
				className='form__input'
				placeholder='FIL'
				type='number'
				required
				ref={required}
			></input>
			<button className='form__button'>PROPOSE</button>
		</form>
	)
}