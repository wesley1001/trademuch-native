'use strict';

import React, { Component, NavigatorIOS, View, Text, Image } from 'react-native';
import {bindActionCreators} from 'redux';
import PostListItem from '../components/postListItem';
import SearchPost from '../components/searchPost';
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
      <View style={styles.content}>
        <SearchPost/>
        <PostListItem/>
      </View>
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

let styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
  }
});
