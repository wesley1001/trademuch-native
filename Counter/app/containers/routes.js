'use strict';

import React, { Component, View } from 'react-native';
import {bindActionCreators} from 'redux';
import Counter from '../components/counter';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';
// import ReactNativeSimpleAuth from './loginApp';
import {Router, routerReducer, Route, Container, Animations, Schema, Actions} from 'react-native-router-flux';


import ReactNativeSimpleAuth from './loginApp';
import CounterApp from './counterApp';

// @connect(state => ({
//   state: state.counter
// }))
export default class AppRoutes extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    // const { state, actions } = this.props;
    return (
      <View>
        <Router>
            <Route name="Login" component={ReactNativeSimpleAuth} initial={true} title="Login"/>
            <Route name="Camera" component={CounterApp} title="Camera"/>
        </Router>
      </View>
    );
  }
}

// export default connect(state => ({
//     state: state.counter
//   }),
//   (dispatch) => ({
//     actions: bindActionCreators(counterActions, dispatch)
//   })
// )(AppRoutes);
