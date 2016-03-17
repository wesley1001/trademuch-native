import React from 'react-native';
import SearchBar from 'react-native-search-bar';

export default class SearchPost extends SearchBar {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <SearchBar
        placeholder='搜尋'
      />
    );
  }
}
