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
					21383020639492311149394301276465254157629850544130909403502485081624090664247n

				const state = await healthcareDaoContract.state(id)

				// 0 abstainVotes, 1 againsVoutes, 2 forVoutes
				const votes = await healthcareDaoContract.proposalVotes(id)
				let abstainVotes = votes[0]
				abstainVotes = ethers.BigNumber.from(abstainVotes).toNumber()
				let againsVoutes = votes[1]
				againsVoutes = ethers.BigNumber.from(againsVoutes).toNumber()
				let forVoutes = votes[2]
				forVoutes = ethers.BigNumber.from(forVoutes).toNumber()

				return {
					description: proposal.description,
					required: proposal.required,
					state,
					title: proposal.title,
					votes: {
						abstainVotes,
						againsVoutes,
						forVoutes
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
