'use strict';

import React, { Component, View, Navigator } from 'react-native';
import { connect } from 'react-redux';
import RNRF, { routerReducer, Route, Container, Animations, Schema, Actions} from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

// View
// import ReactNativeSimpleAuth from './containers/loginApp';
import CounterApp from './containers/counterApp';
import NHSample from './containers/sampleApp';
import PostList from './containers/postList';

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
            <Route name="Login" component={NHSample} initial={true} title="Login" />
            <Route name="Camera" component={CounterApp} title="Camera" />
            <Route name="PostList" component={PostList} title="PostList" />
        </Router>
    );
  }
}
