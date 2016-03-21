import React, {
  StyleSheet,
  Component,
  Dimensions,
  PixelRatio,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Image
} from 'react-native';

export default class PostListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      uri: this.props.uri,
    }
  }

  componentWillMount() {
  }

  render() {
    return (
      <View>
        <TouchableOpacity underlayColor={"#f3f3f3"}>
          <View>
            <View style={styles.commentContent}>
                <Image source={{uri: this.state.uri}}
                       style={styles.avatar}/>
              <View style={styles.commentBody}>
                <Text style={styles.userName}>
                  {this.state.title}
                </Text>
                <Text style={styles.commentText}>
                  {this.state.description}
                </Text>
              </View>
            </View>
            <View style={styles.cellBorder} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

PostListItem.defaultProps = {
  title: '',
  description: '',
  uri: 'https://unsplash.it/200/300/?random',
};

const styles = StyleSheet.create({
  commentContent: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  userName: {
    fontWeight: "700"
  },
  commentBody: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  commentText: {
    flex: 1,
    flexDirection: "row"
  },
  cellBorder: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
  avatar: {
    borderRadius: 3,
    width: 40,
    height: 40,
    marginRight: 10
  }
});
