import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ClothingList from "./components/ClothingList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <ClothingList />
      </div>
    );
  }
}

export default App;
