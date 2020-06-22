import * as actionTypes from '../actions/actionTypes'

const initialState ={
	firstName:null,
	secondName:null,
	address:null,
	firstPhone:null,
	secondPhone:null,
	city:null,
  state:null,
  zipCode:null,
  country:null

}

const reducer = (state=initialState , action )=>{
	switch(action.type)
	{

		case actionTypes.FORM_FILL:
    console.log(action);
		return{
			...state,
      firstName:action.firstName,
    	secondName:action.secondName,
    	address:action.address,
    	firstPhone:action.firstPhone,
    	secondPhone:action.secondPhone,
    	city:action.city,
      state:action.state,
      zipCode:action.zipCode,
      country:action.country
		}
		default:
		return state
	}
}

export default reducer
