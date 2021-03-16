// main App component for Sustainably Yours
// to use Redux in components to get stuff from state, wrap everything in Provider

import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ClothingList from "./components/ClothingList";
import UserClothingList from "./components/UserClothingList";
import { Container } from "reactstrap";
import HomeCarousel from "./components/HomeCarousel";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser);
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <UserClothingList />
            <HomeCarousel />
            <ClothingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
