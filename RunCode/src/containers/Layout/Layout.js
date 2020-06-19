import React , { Component , Fragment } from 'react'
import classes from './Layout.module.css'



class Layout extends Component {
  state={
    sideDrawer:false
  }

toggleDrawer = () => {
    this.set.setState(prevState=>{
      return{sideDrawer:!prevState.sideDrawer}
    });
  };
  render(){
    return(
    <Fragment>
        <div className={classes.Layout}>
          {this.props.children}
        </div>

    </Fragment>
    )
  }
}

export default Layout
