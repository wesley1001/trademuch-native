import React from 'react-native';
import SearchBar from 'react-native-search-bar';
import { connect } from 'react-redux';
import {
  requestSearchPost,
} from '../actions/SearchPostActions';

export default function SearchPostBar(props) {
  function _onChangeText(e) {
    if (e.length > 0) {
      props.requestSearchPost(e, '20km', null);
    }
  }

  return (
    <SearchBar placeholder={'搜尋'}
      onChangeText={ _onChangeText }
      onSearchButtonPress={ _onChangeText }
      onCancelButtonPress={ _onChangeText }
    />
  );
}

function _injectPropsFromStore(state) {
  return {
    state: state.postList,
  };
}

const _injectPropsFormActions = {
  requestSearchPost,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(SearchPostBar);
