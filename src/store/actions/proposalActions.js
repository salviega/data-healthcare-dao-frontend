import { firebaseApi } from '../../services/firebaseApi'
import { proposalAction } from '../actionsTypes'
import healthcareDaoJson from '../../assets/json/contracts/HealthcareDAO.json'
import { ethers } from 'ethers'

const { getAllItems } = firebaseApi()

export const setProposals = payload => ({
  type: proposalAction.SET_PROPOSALS,
  payload
})

export const destroyProposals = payload => ({
  type: proposalAction.DESTROY_PROPOSALS,
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
	        const state = await healthcareDaoContract.state(proposal.proposalId)

	        // 0 abstainVotes, 1 forVotes, 2 againsVotes
	        const votes = await healthcareDaoContract.proposalVotes(
	          proposal.proposalId
	        )

	        let abstainVotes = votes[0]
	        abstainVotes = ethers.BigNumber.from(abstainVotes).toNumber()
	        let forVotes = votes[1]
	        forVotes = ethers.BigNumber.from(forVotes).toNumber()
	        let againsVotes = votes[2]
	        againsVotes = ethers.BigNumber.from(forVotes).toNumber()

	        return {
	          description: proposal.description,
	          id: proposal.proposalId,
	          required: proposal.required,
	          state,
	          title: proposal.title,
	          votes: {
	            abstainVotes,
	            againsVotes,
	            forVotes
	          },
	          wallet: proposal.wallet
	        }
	      })
	    )

	    dispatch(setProposals(proposalsDetails))
	  }

function timestampToHumanDateFormat (time) {
  const timestamp = ethers.BigNumber.from(time).toNumber()
  const milliseconds = timestamp * 1000
  const dateObject = new Date(milliseconds)
  const humanDateFormat = dateObject.toLocaleString([], {
    hour12: false
  })
  return humanDateFormat
}
