import React, { Component } from "react";
import SearchLocal from "./components/SearchLocal";
import { Provider } from "react-redux";
import store from "./redurces/store";


class SearchScreen extends Component {
  render() {
    return (
        <Provider store={store}>
            <SearchLocal />
        </Provider>
    );
  }
}

export default SearchScreen;

