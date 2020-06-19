import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Menu} from '@material-ui/icons';
import {Button,Drawer} from '@material-ui/core';
import classess from './SideDrawer.module.css'
import SideList from './List/List'
import {connect} from 'react-redux'
import {side_toggle} from '../../../store/actions/ui'

const useStyles = makeStyles((theme) => ({

  list: {
    width: '23vw',
    [theme.breakpoints.down('sm')]: {
      width:'58vw',
    },
  },
  follow:{
    marginLeft:'5vw',
    width:'150px',
    position:'fixed',
    bottom:'50px',
    padding:'10px',
  },
  paper: {
  background: "#d7c79e"
},
  ToggleBtnColor: {
    color: theme.palette.primary.contrastText
  }
}));

const SideDrawer=(props)=> {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let primarylinks=[]
  if(props.isAdmin)
  {
    primarylinks = ['Home','Users','Orders','Purchase','Logout']
  }else{
    primarylinks = props.isAuthenticated ? ['Home','Orders','Purchase','Logout'] : ['Home','Login']
  }
  const toggleDrawer = () => {
    props.OnsideClick()
    setOpen(!open);
  };

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}>
      <SideList links={primarylinks} />
    </div>
  );

  return (
        <React.Fragment>
          <div className={classess.Menu}>
            <Button onClick={toggleDrawer}><Menu className={classes.ToggleBtnColor}/></Button>
          </div>
          <Drawer transitionDuration={600}  classes={{ paper: classes.paper }} anchor='right'  open={open} onClose={toggleDrawer}>
              {list}
          </Drawer>
        </React.Fragment>
  );
}
const mapStateToProps = state =>{
  return{
  isAuthenticated: state.auth.token !== null,
  isAdmin:state.auth.isadmin
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    OnsideClick:()=> dispatch(side_toggle()),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SideDrawer)
