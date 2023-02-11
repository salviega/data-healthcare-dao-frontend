import { authAction } from '../actionsTypes'

const initialState = {
	web3auth: null,
	address: 'Login',
	provider: null,
	signer: null,
	chainId: 0
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case authAction.LOGIN:
			const { web3auth, address, provider, signer, chainId } = action.payload

			return { web3auth, address, provider, signer, chainId }

		case authAction.LOGOUT:
			return initialState
		default:
			return state
	}
}
