import * as actionTypes from '../actions/actionTypes'

const initialState ={
  side:false,
}

const reducer = (state=initialState , action )=>{
	switch(action.type)
	{
	  case actionTypes.SIDE_TOOGLE:
		return{
			...state,
			side:!state.side
		}
		default:
		return state
	}
}

export default reducer
