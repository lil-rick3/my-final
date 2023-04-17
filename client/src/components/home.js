import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeData: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:80/homeData", {
      method: "POST",
      crossDomain: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data === "token expired") {
          this.setState({ homeData: data.data });
        } else {
          this.setState({ homeData: data.data });
        }
        console.log(data, "homeData");
      });
  }

  logOut() {
    window.localStorage.clear();
    window.location.href = "./login";
  }

  render() {
    if (this.state.homeData === "token expired") {
      setTimeout(() => {
        this.logOut();
      }, 30000);
      return (
        <div>
          <h1>No data</h1>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <h1>{this.state.homeData.username}</h1>
            <h1>{this.state.homeData.email}</h1>
            <br />
            <button onClick={this.logOut}>Log Out</button>
          </div>
        </div>
      );
    }
  }
}
