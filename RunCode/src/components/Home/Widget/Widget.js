import React from 'react'
import gmailLogo from '../../../images/gmailLogo.svg'
import { Grid,Slide,Button,Card,CardContent,Typography,TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  MailLogo:{
    position: 'relative',
    marginTop: '10px',
    height: '30px',
    width: '30px',
    padding:'10px'
  }
}));

const HomeWiget = (props)=>{
  const classess = useStyles();
  return(
    <Slide direction='right' in={true} timeout={1000}>
      <Grid container
        direction="row"
        justify="flex-start"
        alignItems="center"
        style={{height:'90vh'}}>
      <Grid item xs={12} sm={3}>
        <Card style={{margin:'40px'}} border={1} variant="outlined">
          <CardContent>
            <Typography variant='h4' >
            Continue with Google
            </Typography>  <Button onClick={props.googleHandler}>
            <img className={classess.MailLogo} src={gmailLogo} alt='mail-logo'/>
              </Button>

          <Typography variant='h6' >
          --OR--
          </Typography>
          </CardContent>
          <CardContent>
          <form  onSubmit={props.submitHandler} noValidate>
            <TextField style={{marginBottom:'10px'}}
                  label="email"
                  name="email"
                  rowsMax={4}
                  onChange={props.changeHandler}
                />
                <TextField style={{marginBottom:'10px'}}
                      name="password"
                      label="password"
                      type="password"
                      onChange={props.changeHandler}
                    />
            <Button type='submit' style={{display:'block',width:'50%',margin:'auto',padding:'20px'}}>
            SignUp
            </Button>
          </form>
          </CardContent>
        </Card>
      </Grid>
</Grid>
</Slide>
  )
}
export default HomeWiget
