import { contractAction } from '../actionsTypes'
import fundsJson from '../../assets/json/deployments/goerli/Funds.json'
import healthcareDaoJson from '../../assets/json/deployments/goerli/HealthcareDAO.json'
import healthcareTokenJson from '../../assets/json/deployments/goerli/HealthcareToken.json'
import timeLockJson from '../../assets/json/deployments/goerli/TimeLock.json'
import { ethers } from 'ethers'

const initialState = {
	fundsContract: null,
	healthcareDaoContract: null,
	HealthcareTokeContract: null,
	timeLockContract: null
}

export const contractReducer = (state = initialState, action) => {
	switch (action.type) {
		case contractAction.MAKE_CONTRACTS:
			const signer = action.payload
			const fundsContract = generateContract(
				fundsJson.address,
				fundsJson.abi,
				signer
			)
			const healthcareDaoContract = generateContract(
				healthcareDaoJson.address,
				healthcareDaoJson.abi,
				signer
			)
			const healthcareTokenContract = generateContract(
				healthcareTokenJson.address,
				healthcareTokenJson.abi,
				signer
			)
			const timeLockContract = generateContract(
				timeLockJson.address,
				timeLockJson.abi,
				signer
			)
			return {
				fundsContract,
				healthcareDaoContract,
				healthcareTokenContract,
				timeLockContract
			}

		case contractAction.DESTROY_CONTRACT:
			return {
				fundsContract: null,
				healthcareDaoContract: null,
				HealthcareTokeContract: null,
				timeLockContract: null
			}

		default:
			return state
	}
}

function generateContract(address, abi, providerOrSigner) {
	const contract = new ethers.Contract(address, abi, providerOrSigner)
	return contract
}
