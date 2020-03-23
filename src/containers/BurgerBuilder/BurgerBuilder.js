import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios_orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { addIngredient, removeIngredient,initIngredients,purchaseInit,setAuthRedirectPath} from "../../store/actions";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    // loading: false,
    
  };

  componentDidMount() {
    this.props.onIngredientsInit()
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    }else{
      this.props.history.push('/auth')
      this.props.onSetAuthRedirectPath('/checkout')
    }
    
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const queryParams=[];
    // for(let i in this.state.ingredients){
    //   queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price='+this.state.totalPrice)
    // const queryString= queryParams.join('&');
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: "?"+queryString,
    // })
    this.props.history.push("/checkout");
    this.props.onInitPurchase();
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p> Ingredients can 't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

 

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    totalPrice: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error,
    isAuthenticated: state.authReducer.token!=null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch(addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName =>
      dispatch(removeIngredient(ingredientName)),
    onIngredientsInit: ()=>dispatch(initIngredients()),
    onInitPurchase: ()=>dispatch(purchaseInit()),
    onSetAuthRedirectPath: (path)=>dispatch(setAuthRedirectPath(path))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
