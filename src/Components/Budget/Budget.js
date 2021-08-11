import React, { Component } from "react";
import Background from "./../shared/Background/Background";
import Chart1 from "./../shared/Chart1";
import Chart2 from "./../shared/Chart2";
import AddPurchase from "./../shared/AddPurchase";
import DisplayPurchases from "./../shared/DisplayPurchases";
import Loading from "./../shared/Loading/Loading";
import Nav from "./../shared/Nav";
import "./Budget.css";
import { connect } from "react-redux";
// IMPORT THE ACTION CREATOR FROM THE REDUCER FILE FOR USE BY THE CONNECT METHOD, WHICH THEN ADDS THE FUNCTION TO THE PROPS // OBJECT OF THIS COMPONENT
import { requestUserData } from "../../redux/userReducer";
//IMPORT THE addPurchase AND removePurchase ACTION CREATORS
import {
  requestBudgetData,
  addPurchase,
  removePurchase,
} from "../../redux/budgetReducer";

class Budget extends Component {
  componentDidMount() {
    // WHEN THE COMPONENT MOUNTS, THE ACTION CREATOR IS INVOKED, THE REDUCER FUNCTION FIRES, AND STATE IS UPDATED ACCORDINGLY   // IN THE REDUX STORE
    this.props.requestUserData();
    this.props.requestBudgetData();
  }

  render() {
    // DESTRUCTURING VALUES HERE IS OPTIONAL BUT RECOMMENDED FOR CLEANER JSX
    const { loading, purchases, budgetLimit } = this.props.budget;
    const { firstName, lastName } = this.props.user;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className="budget-container">
          <Nav firstName={firstName} lastName={lastName} />
          <div className="content-container">
            <div className="purchases-container">
              {
                // USE PROPS TO PASS DOWN addPurchase AND removePurchase FUNCTIONS
              }
              <AddPurchase addPurchase={this.props.addPurchase} />
              <DisplayPurchases
                purchases={purchases}
                removePurchase={this.props.removePurchase}
              />
            </div>
            <div className="chart-container">
              <Chart1 purchases={purchases} budgetLimit={budgetLimit} />
              <Chart2 purchases={purchases} />
            </div>
          </div>
        </div>
      </Background>
    );
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget,
    user: state.user,
  };
}


export default connect(mapStateToProps, {
  requestUserData,
  requestBudgetData,
  addPurchase,
  removePurchase,
})(Budget);
