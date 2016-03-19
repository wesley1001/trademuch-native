const React = require('react');
import SearchBar from 'react-native-search-bar';

var SearchPost = React.createClass({
// export default class SearchPost extends SearchBar {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
  },

  _onChangeText(e){
    console.log(e);
  },

  render() {
    return (
      <SearchBar
        placeholder='搜尋'
        onChangeText={this._onChangeText.bind(this)}
        onSearchButtonPress={this._onChangeText.bind(this)}
        onCancelButtonPress={this._onChangeText.bind(this)} />
    );
  }
// }
});
module.exports = SearchPost;
