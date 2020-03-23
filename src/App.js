import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { checkAuthState } from "./store/actions";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogIn();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logOut" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token != null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogIn: () => dispatch(checkAuthState())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
