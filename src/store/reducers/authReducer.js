import { authAction } from '../actionsTypes'

const initialState = {
	address:
		JSON.parse(window.localStorage.getItem('wallet')) || 'Connect wallet',
	provider: null,
	signer: null,
	chainId: 0
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case authAction.LOGIN:
			console.log('action.payload: ', action.payload)
			const { address, provider, signer, chainId } = action.payload

			const stringifiedUser = JSON.stringify(address)
			window.localStorage.setItem('wallet', stringifiedUser)
			return { address, provider, signer, chainId }

		case authAction.LOGOUT:
			window.localStorage.clear()
			return initialState
		default:
			return state
	}
}
