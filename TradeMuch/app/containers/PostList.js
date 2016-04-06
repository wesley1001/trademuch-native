import React, { View, TouchableOpacity, ScrollView, Component, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import List from '../components/PostList/List';
import SearchBar from '../components/SearchBar';
import { requestSearchPost } from '../actions/SearchPostActions';
import { requestSetLocation } from '../actions/GeoActions';

const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
  },
});


export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onListItemPress = this.onListItemPress.bind(this);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.props.requestSetLocation(position);
        this.props.requestSearchPost(null, '300km', {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onChangeText(value) {
    const { location } = this.props;
    this.props.requestSearchPost(value, '60000km', {
      lat: location.latitude,
      lon: location.longitude,
    });
  }

  onListItemPress(itemDataId) {

  }
  render() {
    const { postList } = this.props;
    return (
      <View style={styles.content}>
        <SearchBar onChangeText={this.onChangeText} />
        <ScrollView>
          <List listData={postList} onItemPress={this.onListItemPress} />
        </ScrollView>
        <TouchableOpacity onPress={Actions.PostDetail} />
      </View>
    );
  }
}

PostList.propTypes = {
  postList: React.PropTypes.array,
  location: React.PropTypes.object,
  requestSearchPost: React.PropTypes.func,
  onListItemPress: React.PropTypes.func,
  requestSetLocation: React.PropTypes.func,
};

PostList.defaultProps = {
  location: {
    latitude: 24.148657699999998,
    longitude: 120.67413979999999,
  },
};

function _injectPropsFromStore(state) {
  return {
    postList: state.search.postList,
    location: state.geo.location,
  };
}

const _injectPropsFormActions = {
  requestSearchPost,
  requestSetLocation,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostList);
