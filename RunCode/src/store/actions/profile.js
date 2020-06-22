import * as actionTypes from './actionTypes'
import axios from 'axios'

export const profile_fill = (data,token) =>{
	return dispatch =>{
		console.log(data,'ha',token);
		axios.post('http://localhost:9001/api/profileSetup',data,{
			headers: {
				'Authorization': `Bearer ${token}`
		}}).then((res) => {
				console.log(res);
				dispatch(profile_fill_set(data))
		})
	  .catch(error=>
	  {
	  console.log(error);
	  })
	}
}




export const profile_fill_set = (data) =>{

	return{
		type:actionTypes.FORM_FILL,
    firstName: data.firstName,
    secondName: data.secondName,
    address: data.address,
    firstPhone: data.firstPhone,
    secondPhone: data.secondPhone,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    country: data.country
	}
}
