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
	(proposalsDetails = []) =>
	async dispatch => {
		const provider = new ethers.providers.JsonRpcProvider(
			'https://rpc.ankr.com/polygon_mumbai'
		)

		const healthcareDaoContract = new ethers.Contract(
			healthcareDaoJson.address,
			healthcareDaoJson.abi,
			provider
		)
		const proposals = await getAllItems()
		const proposalsDetails = await Promise.all(
			proposals.map(async proposal => {
				let id =
					83442337736768526237678248707999845213985335799563169861116663294765881240998n

				const state = await healthcareDaoContract.state(id)
				console.log('state: ', state)

				// 0 abstainVotes, 1 againsVoutes, 2 forVoutes
				// const votes = await healthcareDaoContract.proposalVotes(id)
				// let abstainVotes = votes[0]
				// abstainVotes = ethers.BigNumber.from(abstainVotes).toNumber()
				// let againsVotes = votes[1]
				// againsVotes = ethers.BigNumber.from(againsVotes).toNumber()
				// let forVotes = votes[2]
				// forVotes = ethers.BigNumber.from(forVotes).toNumber()

				return {
					description: proposal.description,
					id,
					required: proposal.required,
					state,
					title: proposal.title,
					votes: {
						abstainVotes: 0,
						againsVotes: 0,
						forVotes: 3
					},
					wallet: proposal.wallet
				}
			})
		)

		dispatch(setProposals(proposalsDetails))
	}

function timestampToHumanDateFormat(time) {
	const timestamp = ethers.BigNumber.from(time).toNumber()
	const milliseconds = timestamp * 1000
	const dateObject = new Date(milliseconds)
	const humanDateFormat = dateObject.toLocaleString([], {
		hour12: false
	})
	return humanDateFormat
}
