import React from "react";
import Header from "./component/header/header";
import "./App.css";
import Tile from "./component/tile/tile";
import Footer from "./component/footer/footer";
import OrderTable from "./component/orderTable/OrderTable";
import UserTable from "./component/userTable/UserTable";
import DetailTable from "./component/detailTable/DetailTable";
import Chart from "./component/chart/Charts";

import firebase from "./firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalOrders: [],
      topFiveOrder: [],
      bottomFiveOrder: [],
      topFiveUsers: [],
      bottomFiveUsers: [],
      dateData: [],
      amountData: [],
      currentDayOrderCount: 0,
      currentDayOrderAmount: 0,
      currentWeekOrderAmount: 0,
      currentWeekOrderCount: 0,
      currentMonthOrderAmount: 0,
      curentMonthOrderCount: 0,
      lastMonthOrderAmount: 0,
      lastMonthOrderCount: 0,
    };
  }

  componentDidMount() {
    const totalOrdersRef = firebase.database().ref("orders");
    totalOrdersRef.on("value", (snapshot) => {
      let totalOrders = snapshot.val();
      let newState = [];

      for (var i = 0; i < totalOrders.length; i++) {
        newState.push({
          orderNum: totalOrders[i].orderNum,
          userName: totalOrders[i].userName,
          createdDate: totalOrders[i].createdDate,
          status: totalOrders[i].status,
          amount: totalOrders[i].amount,
          quantity: totalOrders[i].quantity,
          region: totalOrders[i].region,
        });
      }

      // for getting top 5 order based on order number
      let topFiveOrder = [...newState];
      topFiveOrder = topFiveOrder.sort((a, b) => {
        return b.orderNum - a.orderNum;
      });

      // for getting bottom 5 order based on order number
      let bottomFiveOrder = [...newState];
      bottomFiveOrder = bottomFiveOrder.sort((a, b) => {
        return a.orderNum - b.orderNum;
      });

      // for getting top 5 users based on order amount
      let topFiveUsers = [...newState];
      topFiveUsers = topFiveUsers.sort((a, b) => {
        return b.amount - a.amount;
      });

      // for getting bottom 5 users based on order amount
      let bottomFiveUsers = [...newState];
      bottomFiveUsers = bottomFiveUsers.sort((a, b) => {
        return a.amount - b.amount;
      });

      // for getting date data array for plotting on chart
      let dateData = [...newState];
      dateData = dateData.map((data) => {
        return data.createdDate;
      });

      // for getting amount data array for plotting on chart
      let amountData = [...newState];
      amountData = amountData.map((data) => {
        return data.amount;
      });

      // for getting today's order amount and quantity
      let todayDate = new Date();
      //  todayDate.setDate(4)
      todayDate = todayDate.toISOString().slice(0, 10);
      let todayTotalOrderQuantity = 0;
      let todayTotalOrderAmount = 0;
      for (let i = 0; i < newState.length; i++) {
        if (todayDate === newState[i].createdDate) {
          todayTotalOrderQuantity += newState[i].quantity;
          todayTotalOrderAmount += newState[i].amount;
        }
      }

      // for getting current week amount and quantity
      let weekData = [...newState];
      let currentWeekOrderAmount = 0;
      let currentWeekOrderCount = 0;

      var today = new Date();
      //  today.setDate(4);

      for (let i = today.getDay(), j = 0; i >= 0; i--, j++) {
        let checkDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - j + 1
        )
          .toISOString()
          .slice(0, 10);

        for (let k = 0; k < newState.length; k++) {
          if (checkDate === newState[k].createdDate) {
            currentWeekOrderAmount += newState[k].amount;
            currentWeekOrderCount += newState[k].quantity;
          }
        }
      }

      // for getting current month data
      let currentMonthOrderAmount = 0;
      let currentMonthOrderCount = 0;
      for (let i = today.getDate(), j = 0; i >= 1; i--, j++) {
        let checkDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - j + 1
        )
          .toISOString()
          .slice(0, 10);

        for (let k = 0; k < weekData.length; k++) {
          if (checkDate === weekData[k].createdDate) {
            currentMonthOrderAmount += weekData[k].amount;
            currentMonthOrderCount += weekData[k].quantity;
          }
        }
      }

      // for getting last month data
      let lastMonthOrderAmount = 0;
      let lastMonthOrderCount = 0;

      for (let i = 1; i <= 31; i++) {
        let date = new Date();
        let d = new Date(date.getFullYear(), date.getMonth() - 1, 1 + i)
          .toISOString()
          .slice(0, 10);

        for (let k = 0; k < weekData.length; k++) {
          if (d === weekData[k].createdDate) {
            lastMonthOrderAmount += weekData[k].amount;
            lastMonthOrderCount += weekData[k].quantity;
          }
        }
      }

      this.setState({
        totalOrders: newState,
        topFiveOrder: topFiveOrder.slice(0, 5),
        bottomFiveOrder: bottomFiveOrder.slice(0, 5),
        topFiveUsers: topFiveUsers.slice(0, 5),
        bottomFiveUsers: bottomFiveUsers.slice(0, 5),
        dateData: dateData,
        amountData: amountData,
        currentDayOrderCount: todayTotalOrderQuantity,
        currentDayOrderAmount: todayTotalOrderAmount,
        currentWeekOrderCount: currentWeekOrderCount,
        currentWeekOrderAmount: currentWeekOrderAmount,
        currentMonthOrderAmount: currentMonthOrderAmount,
        currentMonthOrderCount: currentMonthOrderCount,
        lastMonthOrderAmount: lastMonthOrderAmount,
        lastMonthOrderCount: lastMonthOrderCount,
      });
    });
  }

  render() {
    return (
      <div className="conatiner">
        <Header />

        <div className="box-outer">
          <Tile
            Text1={"Today’s total  number of Orders - "}
            Text2={"Current week total order’s count - "}
            TodayOrderCount={this.state.currentDayOrderCount}
            WeekOrderCount={this.state.currentWeekOrderCount}
          />
          <Tile
            Text1={"Today’s total  Order’s amount - "}
            Text2={"Current week total order’s amount - "}
            TodayOrderCount={this.state.currentDayOrderAmount}
            WeekOrderCount={this.state.currentWeekOrderAmount}
          />
          <Tile
            Text1={"Current month total order’s count - "}
            Text2={"Last month total order’s count - "}
            TodayOrderCount={this.state.currentMonthOrderCount}
            WeekOrderCount={this.state.lastMonthOrderCount}
          />
          <Tile
            Text1={"Current month total order’s amount -"}
            Text2={"Last month total order’s amount-"}
            TodayOrderCount={this.state.currentMonthOrderAmount}
            WeekOrderCount={this.state.lastMonthOrderAmount}
          />
        </div>

        <Chart
          dateData={this.state.dateData}
          amountData={this.state.amountData}
        />

        <h2>Top five Order </h2>
        <OrderTable orderTableData={this.state.topFiveOrder} />

        <h2>Bottom five Order </h2>
        <OrderTable orderTableData={this.state.bottomFiveOrder} />

        <h2>Top five Users </h2>
        <UserTable userTableData={this.state.topFiveUsers} />

        <h2>Bottom five Users </h2>
        <UserTable userTableData={this.state.bottomFiveUsers} />

        <h2>Detail Order Report </h2>
        <DetailTable detailTableData={this.state.totalOrders} />

        <Footer />
      </div>
    );
  }
}

export default App;
