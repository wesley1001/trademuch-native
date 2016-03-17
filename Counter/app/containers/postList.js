'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import PostList from '../components/postList';
import * as counterActions from '../actions/counterActions';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import ReactNativeSimpleAuth from './loginApp';
// @connect(state => ({
//   state: state.counter
// }))
class CounterApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (

        <PostList/>

        //  <ReactNativeSimpleAuth />
    );
  }
}

export default connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(CounterApp);
