import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios_orders";
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { fetchOrders } from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token,this.props.userId);
  }

  render() {
    let orders=!this.props.loading?( <div>
      {this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))}
    </div>): <Spinner/>
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token,userId) => dispatch(fetchOrders(token,userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
