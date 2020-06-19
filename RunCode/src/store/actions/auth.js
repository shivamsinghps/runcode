import * as actionTypes from './actionTypes'
import axios from 'axios'

export const auth_start = () =>{
	return {
		type:actionTypes.AUTH_START
	}
}

export const auth_success = (authtoken,authid,admin) =>{

	return{
		type:actionTypes.AUTH_SUCCESS,
		token:authtoken,
		userId:authid,
		admin:admin
	}
}

export const auth_google = (idToken,expiresIn,localId,admin) =>{

	return dispatch =>{

		dispatch(auth_success(idToken,localId,admin))
		dispatch(authinvalidate(expiresIn))
	}
}

export const auth_failure = (error) =>{
	return{
		type:actionTypes.AUTH_FAILURE,
		error:error
	}
}

export const authinit = (email,password,isSignup) =>{
	return dispatch => {
		dispatch(auth_start())
		const auth_init_data ={
			email:email,
			password:password
		}

		let url = 'http://localhost:9001/api/login'
		if(isSignup)
		{
		 url = 'http://localhost:9001/api/signup'
		}

		axios.post(url,auth_init_data)
		.then(response=>{
			console.log(response.data);
		const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000))
		localStorage.setItem('token',response.data.idToken)
		localStorage.setItem('expirationDate',expirationDate)
		localStorage.setItem('userId',response.data.localId)
		dispatch(auth_success(response.data.idToken,response.data.localId,response.data.admin))
		dispatch(authinvalidate(response.data.expiresIn))
		})
		.catch(err =>{
			const error_in = isSignup ? 'Signup' : 'SignIn'
			alert(`check your ${error_in} credentials`)
			dispatch(auth_failure(err))
		})
	}

}


export const authinvalidate = (expiretime) =>{

	return dispatch=>{

	setTimeout(()=>{
	dispatch(authlogout())
	},expiretime * 1000)
	}
}

export const authlogout = () =>{
	localStorage.removeItem('token')
	localStorage.removeItem('expirationDate')
	localStorage.removeItem('userId')
	return{
		type:actionTypes.AUTH_LOGOUT
	}
}

export const authredirect = (path) =>{
	return{
		type:actionTypes.AUTH_REDIRECT_PATH,
		path:path
	}
}

//Asked by Nimir to get status from different tabs and devices
// Just pseudo code
export const checkauthstatus = () =>{
	return dispatch=>{
	const token = localStorage.getItem('token')
	if(!token)
	{
		dispatch(authlogout())
	}
	else{
		const expirationDate = new Date(localStorage.getItem('expirationDate'))
				if(expirationDate <= new Date())
		{
			dispatch(authlogout())
		}else{
			const userId = localStorage.getItem('userId')
			dispatch(auth_success(token , userId))

			dispatch(authinvalidate((expirationDate.getTime() - new Date().getTime())/1000))
		}
	}
	}
}
