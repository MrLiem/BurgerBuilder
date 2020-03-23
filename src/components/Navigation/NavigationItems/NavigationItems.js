import React from "react";
import classes from "./NavigationItems.module.scss";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated &&  <NavigationItem link="/orders">Checkout</NavigationItem>}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Log In/ Sign Up</NavigationItem>
    ) : (
      <NavigationItem link="/logOut">Log Out</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
