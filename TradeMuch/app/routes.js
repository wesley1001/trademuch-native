'use strict';

import React, { Component, View, Navigator } from 'react-native';
import { connect } from 'react-redux';
import RNRF, { routerReducer, Route, Container, Animations, Schema, Actions} from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

// View
import Login from './containers/loginApp';
import CounterApp from './containers/counterApp';

export default class AppRoutes extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    // const { state, actions } = this.props;
    return (
        <Router hideNavBar={true} name="root">
            <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} />
            <Route name="Login" component={Login} initial={true} title="Login" />
            <Route name="Counter" component={CounterApp} title="Counter" />
        </Router>
    );
  }
}
