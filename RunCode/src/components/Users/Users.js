import React , { Fragment,useState,useEffect } from 'react'
import classes from './Users.module.css'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import userimg from '../../images/shivam.jpg'
import ProfileCard from './Card/Card'
import { Grid } from '@material-ui/core';
import axios from 'axios'




const Users = (props)=>{

const [posts, setPosts] = useState([]);

useEffect(() => {
  if(props.isAuthenticated!==null){
    axios.get('http://localhost:9001/api/users',{
  headers: {
    'Authorization': `Bearer ${props.isAuthenticated}`
  }}).then((res) => {
        setPosts(res.data.data);
    })
}
},[props.isAuthenticated]);

let users = null


users = posts.map(post=>{
    return(
      <Grid key={post._id} item xs={4} sm={2} >
      <Link to={`/user/${post.email}`}><ProfileCard imageUrl={userimg}
    imageTitle={userimg}
    Name={post._id}
    Description={post.email}/></Link>
    </Grid>
  )
  })

//Use Map to populate data current structure is for test case only
console.log(users);
  return(
    <Fragment>
    <header className={classes.Users} >
    <h1 className={classes.Reveal}>Users</h1>

    <Grid container spacing={2} justify='center'>
    {users}
    </Grid>

    </header>

    </Fragment>
  )
}

const mapStateToProps = state =>{
  return{
		isAuthenticated: state.auth.token,

}}

export default connect(mapStateToProps)(Users)
