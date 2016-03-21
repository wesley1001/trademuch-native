'use strict';

import React, { Component, View, Text, Image } from 'react-native';
import PostListItem from '../components/PostListItem';
import SearchPost from '../components/SearchPost';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
  }
});

class CounterApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { postList } = this.props;
    let postListContainer = [];
    if(postList.length > 0){
      postList.forEach((post,i) => {
        postListContainer.push(
          <PostListItem key={i} title={post['_source'].title} uri={'http://localhost:1337/'+post['_source'].pic}/>
        )
      })
    }
    return (
      <View style={styles.content}>
          <SearchPost/>
          {postListContainer}
      </View>
    );
  }
}

function _injectPropsFromStore(state) {
  return {
    postList: state.search.postList || [],
  };
};

const _injectPropsFormActions = {
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(CounterApp);
