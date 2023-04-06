import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  withRouter,
  Route,
  Switch,
  Redirect,
  HashRouter,
} from "react-router-dom";
import history from "./history";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Project from "./components/Project";
import Whiteboard from "./components/Whiteboard/Whiteboard";
import Chat from "./components/Chat";
import { me } from "./store/authSlice";
import Footer from "./components/footer/Footer";
import LandingPage from "./components/LandingPage";
import { Lan } from "@mui/icons-material";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <HashRouter>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/projects/:projectId" component={Project} />
              <Route path="/Whiteboard/:projectId" component={Whiteboard} />
              <Route path="/chat" component={Chat} />
              <Redirect to="/home" />
            </Switch>
          </HashRouter>
        ) : (
          <HashRouter>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />

              <Redirect to="/" />
            </Switch>
          </HashRouter>
        )}
        {!history.location.pathname.startsWith("/chat") &&
          !history.location.pathname.startsWith("/home") &&
          !history.location.pathname.startsWith("/projects") && <Footer />}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
