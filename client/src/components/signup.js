import React, { Component } from "react";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, firstName, lastName, phoneNumber, email, password } =
      this.state;
    console.log(username, firstName, lastName, phoneNumber, email, password);
    console.log("Submit has been called");

    fetch("http://localhost:80/createAccount", {
      method: "POST",
      crossDomain: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  goToLogin() {
    window.location.href = "./login";
  }

  render() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-400">
        <form
          onSubmit={this.handleSubmit}
          className="flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-2xl
          w-100
          max-w-xl"
        >
          <h2 className="font-medium self-center text-4xl text-gray-600 ">
            Sign Up
          </h2>
          <div className="my-4">
            <p className="font-medium self-center text-gray-600">
              Please provide your information to create an account.
            </p>
          </div>
          <div className="my-1 flex flex-col mb-2">
            <label className="font-bold my-1 text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              onChange={(e) => this.setState({ username: e.target.value })}
              className="border border-gray-300 p-1 pl-4"
              required
            />
          </div>
          <div className="my-1 flex flex-col mb-2">
            <label className="font-bold my-1 text-sm">First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              onChange={(e) => this.setState({ firstName: e.target.value })}
              className="border border-gray-300 p-1 pl-4"
              required
            />
          </div>
          <div className="my-1 flex flex-col mb-2">
            <label className="font-bold my-1 text-sm">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              onChange={(e) => this.setState({ lastName: e.target.value })}
              className="border border-gray-300 p-1 pl-4"
              required
            />
          </div>
          <div className="my-1 flex flex-col mb-2">
            <label className="font-bold my-1 text-sm">Phone Number</label>
            <input
              type="text"
              placeholder="Enter phone number"
              onChange={(e) => this.setState({ phoneNumber: e.target.value })}
              className="border border-gray-300 p-1 pl-4"
              required
            />
          </div>
          <div className="my-1 flex flex-col mb-2">
            <label className="font-bold my-1 text-sm">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => this.setState({ email: e.target.value })}
              className="border border-gray-300 p-1 pl-4"
              required
            />
          </div>
          <div className="my-1 flex flex-col mb-2">
            <label className="font-bold my-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => this.setState({ password: e.target.value })}
              className="border border-gray-300 p-1 pl-4"
              required
            />
          </div>
          <div className="my-1 flex flex-col mb-2">
            <button
              type="submit"
              className="border rounded-md mt-3 px-6 py-2 bg-blue-600 text-white font-medium transition duration-300 ease-in-out hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>
          <div>
            <button
              onClick={this.goToLogin}
              className="font-bold my-1 text-sm text-gray-600"
            >
              Already have an account? Log in here
            </button>
          </div>
        </form>
      </div>
    );
  }
}
