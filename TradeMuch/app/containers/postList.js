'use strict';

import React, { Component, NavigatorIOS, View, Text, Image } from 'react-native';
import PostListItem from '../components/postListItem';
import SearchPost from '../components/searchPost';
import {Actions} from 'react-native-router-flux';

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

let styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
  }
});
