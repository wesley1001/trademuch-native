import React from 'react-native';
import SearchBar from 'react-native-search-bar';

export default class SearchPost extends SearchBar {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  _onChangeText(e){
    console.log(e);
  }

  render() {
    return (
      <SearchBar
        placeholder='搜尋'
        onChangeText={this._onChangeText.bind(this)}
        onSearchButtonPress={this._onChangeText.bind(this)}
        onCancelButtonPress={this._onChangeText.bind(this)}
      />
    );
  }
}
