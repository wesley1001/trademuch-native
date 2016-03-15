import React, { Component, Navigator, StyleSheet } from 'react-native';
import RNRF, {Route, Schema, Animations, Actions, TabBar} from 'react-native-router-flux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
// import AppRoutes from './routes';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
// let store = createStore(reducer);

const Router = connect()(RNRF.Router);

// {Router, routerReducer, Route, Container, Animations, Schema}
import ReactNativeSimpleAuth from './loginApp';
import CounterApp from './counterApp';

class AppRoutes extends Component {
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
            <Route name="Login" component={ReactNativeSimpleAuth} initial={true} title="Login" />
            <Route name="Camera" component={CounterApp} title="Camera" />
        </Router>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    );
  }
}
