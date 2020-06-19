import * as actionTypes from '../actions/actionTypes'

const initialState ={
	token:null,
	isadmin:false,
	email:null,
	error:null,
	loading:false,
	authredirect:'/',

}

const reducer = (state=initialState , action )=>{
	switch(action.type)
	{
	  case actionTypes.AUTH_REDIRECT_PATH:
		return{
			...state,
			authredirect:action.path
		}
		case actionTypes.AUTH_LOGOUT:
		return{
		...state,
		token:null,
		email:null,
		isadmin:false
		}
		case actionTypes.AUTH_START:
		return{
			...state,
			error:null,
			loading:true
		}
		case actionTypes.AUTH_SUCCESS:
		return{
			...state,
			token:action.token,
			email:action.userId,
			isadmin:action.admin,
			error:null,
			loading:false
		}
		case actionTypes.AUTH_FAILURE:
		return{
			...state,
			error:action.error,
			loading:false
		}
		default:
		return state
	}
}

export default reducer
