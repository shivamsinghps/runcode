import Typography from '@material-ui/core/Typography';
import React ,{useState}from 'react';
import {Button,Grid} from '@material-ui/core';
import {useForm} from 'react-hook-form'
import classes from './SignUpDetails.module.css'
import {connect} from 'react-redux'
import * as profileactions from '../../store/actions'
import { Redirect } from 'react-router-dom'


const SignUpDetails = (props)=> {
  const [submit,setSubmit]=useState(false)

  const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {

      props.FillForm(data,props.token)

      props.clearCust()
      setSubmit(true)
    }

    let direction = submit ? <Redirect to='/' />:null

  return (
    <React.Fragment>
    {direction}
      <Typography variant="h3" gutterBottom>
        Profile Details
      </Typography>
      <form  onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}
      className={classes.Grid}
      style={{padding:'20px'}}
      direction="row"
      justify="space-around"
      alignItems="center" >
        <Grid item xs={12} sm={5}>
        <input placeholder='First Name*' name="firstName" ref={register({ required: true, maxLength: 20 })} />
        </Grid>
        <Grid item xs={12} sm={5}>
        <input placeholder="Second Name*" name="secondName" ref={register({ required: true, maxLength: 20 })} />
        </Grid>
        <Grid item xs={11}>
          <input placeholder="Address*" name="address" ref={register({ required: true, maxLength: 30 })} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <input placeholder="First Phone*" name="firstPhone" ref={register({ required: true, maxLength: 10 })} />
        </Grid>
        <Grid item xs={12} sm={5}>
        <input placeholder="Second Phone" name="secondPhone" ref={register({ maxLength: 10 })} />
        </Grid>

        <Grid item xs={12} sm={5}>
        <input placeholder="City*" name="city" ref={register({ required: true, maxLength: 20 })} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <input placeholder="State*" name="state" ref={register({ required: true, maxLength: 20 })} />
        </Grid>
        <Grid item xs={12} sm={5}>
        <input placeholder="ZipCode*" name="zipCode" ref={register({ required: true, maxLength: 8 })} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <input placeholder="Country*" name="country" ref={register({ required: true, maxLength: 20 })} />
        </Grid>
        <Grid item xs={12}>
        <Button className={classes.Submit} type="submit"variant="contained" color="primary">
          SUBMIT
        </Button>
        </Grid>
      </Grid>
      </form>
    </React.Fragment>
  );
}


const mapStateToProps = state =>{
  return{
		token: state.auth.token
}}

const mapDispatchToProps  = dispatch =>{
  return {
    FillForm:(data,token)=>dispatch(profileactions.profile_fill(data,token)),
    clearCust:()=>dispatch(profileactions.cust_status())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpDetails)
