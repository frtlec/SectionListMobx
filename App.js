import React, { Component } from 'react';
import { Text, View } from 'react-native';
import data from './data.json'
import store from './store/index';
import { observer, Observer, inject, Provider } from "mobx-react";
import List from './listecomp'

export default class App extends Component {
  render() {

    return (

      <Provider {...store}>
          <List/>
      </Provider>
    );
  }
}
