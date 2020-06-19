import React , { Fragment , Suspense , lazy ,Component }from 'react';
import classes from './App.module.css';
import { Route , Switch , Redirect ,withRouter} from 'react-router-dom'
import SideDrawer from './components/UI/SideDrawer/SideDrawer'
import Spinner from './components/UI/Spinner/Spinner'
import Layout from './containers/Layout/Layout'
import { connect } from 'react-redux'
import * as actions from './store/actions'

const Home = lazy(() => import ('./containers/Home/Home'))
const Login = lazy(() => import ('./containers/Authentication/Login'))
const Logout = lazy(() => import ('./containers/Authentication/Logout/Logout'))
const Users = lazy(() => import ('./components/Users/Users'))




class App extends Component {

componentDidMount(){
  this.props.AutoAuthValidate()
}
render(){
  return (
  <Fragment>

      <div className={classes.App}>
        <Layout>
            <SideDrawer />
              <Suspense fallback={<Spinner/>}>
                <Switch>
                  <Route path='/Users' exact component={Users} />
                  <Route path='/Login' exact component={Login} />
                  <Route path='/Logout' exact component={Logout} />
                  <Route path='/Home' exact component={Home} />
                  <Route path='/' exact component={Home} />
                  <Redirect to='/' />
                </Switch>
               </Suspense>
        </Layout>
      </div>
  </Fragment>
)}
}

const mapStateToProps = state =>{
	return{
	      isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch =>{
	return{
		AutoAuthValidate:()=>dispatch(actions.checkauthstatus())
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
