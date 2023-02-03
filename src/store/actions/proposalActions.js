import { firebaseApi } from '../../services/firebaseApi'
import { proposalAction } from '../actionsTypes'
import healthcareDaoJson from '../../assets/json/contracts/HealthcareDAO.json'
import { ethers } from 'ethers'

const { getAllItems } = firebaseApi()

export const setProposals = payload => ({
	type: proposalAction.SET_PROPOSALS,
	payload
})

export const getProposalsDetails =
	(proposals = []) =>
	async dispatch => {
		const provider = new ethers.providers.JsonRpcProvider(
			'https://rpc.ankr.com/polygon_mumbai'
		)

		const healthcareDaoContract = new ethers.Contract(
			healthcareDaoJson.address,
			healthcareDaoJson.abi,
			provider
		)
		const currentProposals = await getAllItems()
		currentProposals.map(async proposal => {
			let id = parseInt(proposal.id)
			const deadline = await healthcareDaoContract.proposalDeadline(id)
			const votes = await healthcareDaoContract.proposalVotes(id)
			const state = await healthcareDaoContract.state(id)
			console.log('deadline: ', deadline)
			console.log('state: ', state)
			console.log('deadline: ', votes)
			return {
				state,
				votes,
				deadline
			}
		})

		// proposalDeadline proposalVotes state
		dispatch(setProposals(currentProposals))
	}
