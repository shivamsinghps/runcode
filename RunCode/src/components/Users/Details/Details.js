import React , { useState,useEffect }from 'react'
import axios from 'axios'
import classes from './Details.module.css'
import { Grid,Card,CardContent,Typography } from '@material-ui/core';
import {connect} from 'react-redux'

const Details = (props) => {

  const userid = props.match.params.id
  const [user,setUser] = useState({
    firstName: '',
    secondName:'',
    address: '',
    email: '',
    firstPhone: '',
    secondPhone: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  })

  useEffect(() => {
    if(props.isAuthenticated!==null){
      axios.get(`http://localhost:9001/api/user/${userid}`,{
    headers: {
      'Authorization': `Bearer ${props.isAuthenticated}`
    }}).then((res) => {
      console.log(res.data.data);
          setUser(res.data.data);
      })
  }
  },[props.isAuthenticated]);
console.log(user);
  return(
    <div className={classes.Control}>
     <Grid container
      direction="row"
      justify="flex-start"
      alignItems="center"
      style={{height:'90vh'}}>
    <Grid item xs={12} sm={4}/>
    <Grid item xs={12} sm={4}>
      <Card style={{margin:'40px'}} border={1} variant="outlined">
        <CardContent>
          <Typography variant='h6' >
          {user.email}
          </Typography>
        <Typography variant='h6' >
        FirstName:{user.firstName}
        </Typography>
        <Typography variant='h6' >
        SecondName:{user.secondName}
        </Typography>
        <Typography variant='h6' >
        Address:{user.address}
        </Typography>
        <Typography variant='h6' >
        firstPhone:{user.firstPhone}
        </Typography>
        <Typography variant='h6' >
        secondPhone:{user.secondPhone}
        </Typography>
        <Typography variant='h6' >
        city:{user.city}
        </Typography>
        <Typography variant='h6' >
        zip:{user.zipCode}
        </Typography>
        <Typography variant='h6' >
        country:{user.country}
        </Typography>
        </CardContent>
      </Card>
    </Grid>
    </Grid>
    </div>
  )
}

const mapStateToProps = state =>{
  return{
		isAuthenticated: state.auth.token,

}}

export default connect(mapStateToProps)(Details)
