import { proposalAction } from '../actionsTypes'

const initialState = []

export const proposalReducer = (state = initialState, action) => {
	switch (action.type) {
		case proposalAction.DESTROY_PROPOSALS:
			return []
		case proposalAction.SET_PROPOSALS:
			return action.payload
		default:
			return state
	}
}
