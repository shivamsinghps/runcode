import React, {Component}from 'react'
import InputWiget from '../../components/Home/Widget/Widget'
import Logo from '../../components/UI/Logo/Logo'
import classes from './Home.module.css'
import headerBackground from '../../images/Header.jpg'
import {connect} from 'react-redux'
import * as authactions from '../../store/actions'
import Spinner from '../../components/UI/Spinner/Spinner'


class Header extends Component{

  state={
    email:'',
    password:'',
    loaded:false,
    isValid:false
  }


componentWillMount(){
  this.setState({loaded:true})
if(this.props.location.search!==""){
  let auth = []
  const query = new URLSearchParams( this.props.location.search )
  for ( let param of query.entries() )
    auth.push(param[1])
  console.log(auth[3]);
  this.props.OAuthCheck(auth[0],auth[1],auth[2],auth[3])
}
  // const config = {
  //       method: 'get',
  //       url: 'http://localhost:9000/auth/google/secrets',
  //       headers: { 'Access-Control-Allow-Origin' : '*',
  //                   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //                   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',}
  //   }
  // axios(config).then((response)=>{console.log(response)}).catch(err=>{console.log(err);})
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
   this.props.OnSubmit(this.state.email,this.state.password,true)
 }

googleHandler = () =>{
  // const config = {
  //       method: 'get',
  //       url: 'http://localhost:9000/auth/google',
  //       headers: { 'Access-Control-Allow-Origin' : '*',
  //                   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  //                   'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',}
  //   }
  // axios(config).then((response)=>{console.log(response)}).catch(err=>{console.log(err);})

  window.open("http://localhost:9001/api/auth/google","_self")
}

render(){

let widgets = this.state.loaded? (
<div>
<Logo />
<InputWiget
submitHandler={this.submitHandler}
googleHandler={this.googleHandler}
changeHandler={this.changeHandler}
/>
</div>
):null

let home = this.props.loading?(<Spinner />):(<header className={classes.Header} style={{backgroundImage: `url(${headerBackground}) `,right:this.props.side?'23vw':null}}>
    {!this.props.isAuthenticated?widgets:<h1>Hello</h1>}

</header>)

  return(<React.Fragment>{home}</React.Fragment>)}
}

const mapStateToProps = state =>{
  return{
    loading:state.auth.loading,
		isAuthenticated: state.auth.token !== null,
		authredirect:state.auth.authredirect,
    side:state.ui.side
}}

const mapDispatchToProps = dispatch =>{
    return{
  OnSubmit:(email,password,isSignup)=>dispatch(authactions.authinit(email,password,isSignup)),
  OAuthCheck:(token,expiresIn,id,admin)=>dispatch(authactions.auth_google(token,expiresIn,id,admin))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)
