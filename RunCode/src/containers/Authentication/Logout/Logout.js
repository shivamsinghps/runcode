import React , { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as authaction from '../../../store/actions'

class Logout extends Component {

componentDidMount(){
this.props.Logout()
}

render()
	{
		return <Redirect to = '/' />
	}
}

const mapDispatchToProps = dispatch => {
	return{
	Logout:()=>dispatch(authaction.authlogout())
	}
}

export default connect(null,mapDispatchToProps)(Logout)
