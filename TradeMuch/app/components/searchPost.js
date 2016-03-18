import React from 'react-native';
import SearchBar from 'react-native-search-bar';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
  requestSearchPost
} from '../actions/searchPostActions'

export default class SearchPost extends SearchBar {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  _onChangeText(e){
    console.log(e);
    if(e.length > 0){
      this.props.requestSearchPost(e, '20km', null)
    }
  }

  render() {
    return (
      <SearchBar
        placeholder='搜尋'
        onChangeText={this._onChangeText.bind(this)}
        onSearchButtonPress={this._onChangeText.bind(this)}
        onCancelButtonPress={this._onChangeText.bind(this)} />
    );
  }
}

function _injectPropsFromStore(state) {
  return {state: state.postList};
};

const _injectPropsFormActions = {
  requestSearchPost
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(SearchPost);
