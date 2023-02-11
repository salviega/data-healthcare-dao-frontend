import './FormProposal.scss'
import React, { useRef } from 'react'
import { ethers } from 'ethers'
import { setLoading } from '../../../../store/actions/uiActions'
import { getProposalsDetails } from '../../../../store/actions/proposalActions'

export function FormProposal(props) {
	const {
		user,
		contracts,
		totalAsserts,
		createItem,
		dispatch,
		showProposalForm,
		setSincronized,
		onError
	} = props

	const title = useRef()
	const description = useRef()
	const required = useRef()

	const onPropose = async event => {
		event.preventDefault()

		const info = {
			title: title.current.value,
			description: description.current.value,
			required: required.current.value
		}
		const requiredParsed = parseInt(info.required)

		if (requiredParsed > totalAsserts || requiredParsed < 0) {
			window.alert(
				'Required value is wrong, it must be less or same than contract funds'
			)
			dispatch(setLoading(false))
			return
		}

		showProposalForm()
		dispatch(setLoading(true))

		try {
			contracts.healthcareDaoContract.once(
				'ProposalCreated',
				async proposalId => {
					const proposalIdParsed = ethers.BigNumber.from(proposalId).toString()
					await createItem({
						...info,
						proposalId: proposalIdParsed,
						wallet: user.address
					})
					window.alert('Proposal generated')
					dispatch(getProposalsDetails())
					dispatch(setLoading(false))
					setSincronized(false)
				}
			)

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
				proposal,
				{ gasLimit: 250000 }
			)
		} catch (error) {
			onError(error)
		}
	}
	return (
		<form className='form' onSubmit={onPropose}>
			<input
				className='form__input'
				placeholder='Proposal title'
				type='text'
				maxLength='100'
				required
				ref={title}
			/>
			<input
				className='form__input'
				placeholder='Proposal description'
				type='text'
				maxLength='280'
				required
				ref={description}
			/>
			<input
				className='form__input'
				placeholder='FIL'
				type='number'
				required
				step='0.01'
				ref={required}
			/>
			<button className='form__button'>PROPOSE</button>
		</form>
	)
}
