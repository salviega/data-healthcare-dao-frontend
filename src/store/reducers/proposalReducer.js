import { proposalAction } from '../actionsTypes'

const initialState = {}

export const proposalReducer = (state = initialState, action) => {
	switch (action.type) {
		case proposalAction.SET_PROPOSALS:
			return initialState
		default:
			return state
	}
}
