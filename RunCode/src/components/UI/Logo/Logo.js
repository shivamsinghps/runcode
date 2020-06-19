import React from 'react'
import classes from './Logo.module.css'
import { Container,Slide} from '@material-ui/core';

const Logo = (props)=> {
  return(

    <Slide direction='right' in={true} timeout={500}>
    <Container className={classes.Logo}>

      <h2>LOGO</h2>
    </Container>
    </Slide>
  )
}
export default Logo
