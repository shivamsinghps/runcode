import React, {Component}from 'react'
import Logo from '../../components/UI/Logo/Logo'
import gmailLogo from '../../images/gmailLogo.svg'
import classes from './Login.module.css'
import { Grid,Button,Card,CardContent,Typography,TextField } from '@material-ui/core';
import {connect} from 'react-redux'
import * as authactions from '../../store/actions'
import { Redirect } from 'react-router-dom'
// import axios from '../../axios-base'
import Spinner from '../../components/UI/Spinner/Spinner'

class Header extends Component{

  state={
    email:'',
    password:'',
    isValid:false
  }


// Handling the input of textfield
 changeHandler = (event) => {


    if(event.target.name === 'email')
    this.setState({email:event.target.value})

    if(event.target.name === 'password')
    this.setState({password:event.target.value})


  }

// Handling submit and evaluating the email
 submitHandler = (event) =>{
		event.preventDefault()
		this.props.OnSubmit(this.state.email,this.state.password,false)
	}

googleHandler = () =>{

  window.open("http://localhost:9001/api/auth/google","_self")
}

render(){
  let authredirect = null
 	  if(this.props.isAuthenticated)
 	  {
 		authredirect = <Redirect to = { this.props.authredirect } />
 	  }
let form = this.props.loading?<Spinner / >:(
<div className={classes.Control}>
<Logo />
 <Grid container
  direction="row"
  justify="flex-start"
  alignItems="center"
  style={{height:'90vh'}}>
<Grid item xs={12} sm={4}/>
<Grid item xs={12} sm={4}>
  <Card style={{margin:'40px'}} border={1} variant="outlined">
    <CardContent>
      <Typography variant='h4' >
      Login with Google
      </Typography>  <Button onClick={this.googleHandler}>
      <img className={classes.MailLogo} src={gmailLogo} alt='mail-logo'/>
        </Button>

    <Typography variant='h6' >
    --OR--
    </Typography>
    </CardContent>
    <CardContent>
    <form  onSubmit={this.submitHandler} noValidate>
      <TextField style={{marginBottom:'10px'}}
            label="email"
            name="email"
            rowsMax={4}
            onChange={this.changeHandler}
          />
          <TextField style={{marginBottom:'10px'}}
                name="password"
                label="password"
                type="password"
                onChange={this.changeHandler}
              />
      <Button type='submit' style={{display:'block',width:'50%',margin:'auto',padding:'20px'}}>
      SignIn
      </Button>
    </form>
    </CardContent>
  </Card>
</Grid>
</Grid>
</div>
)

  return(<div>
          {authredirect}
          {form}
        </div>
  )}
}



const mapStateToProps = state =>{
	return {
		loading:state.auth.loading,
		isAuthenticated: state.auth.token !== null,
		authredirect:state.auth.authredirect,
    side:state.ui.side
	}
  }


  const mapDispatchToProps = dispatch =>{
  	  return{
		OnSubmit:(email,password,isSignup)=>dispatch(authactions.authinit(email,password,isSignup))
	  }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Header)
