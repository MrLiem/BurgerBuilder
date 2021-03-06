import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {purchaseInit} from '../../store/actions'
class Checkout extends Component {
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price=0
  //   for (let param of query.entries()) {
  //     //['salad','1']
  //     if(param[0]==='price'){
  //       price=param[1];
  //     }else
  //      ingredients[param[0]] = +param[1];
  //   }
  //   this.setState({ ingredients, price});
  // }
  

 
  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect=this.props.purchased ?<Redirect to="/"/>:null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinued={this.checkoutContinued}
          />
          {/* <Route path={this.props.match.path + "/contact-data"} render={(props)=><ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>}/> */}
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return  summary ;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    purchased: state.orderReducer.purchased
  }
}

// const mapDispatchToProps=dispatch=>{
//   return{
//     onInitPurchase: ()=>dispatch(purchaseInit())
//   }
// }


export default connect(mapStateToProps)(Checkout);
