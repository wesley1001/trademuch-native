
import React, {
  StyleSheet,
  PixelRatio,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  commentContent: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userName: {
    fontWeight: '700',
  },
  commentBody: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  commentText: {
    flex: 1,
    flexDirection: 'row',
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
  avatar: {
    borderRadius: 3,
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default function PostListItem(props) {
  return (
    <View>
      <TouchableOpacity underlayColor={"#f3f3f3"}>
        <View>
          <View style={styles.commentContent}>
              <Image source={{ uri: props.uri }} style={styles.avatar} />
            <View style={styles.commentBody}>
              <Text style={styles.userName}>
                {props.title}
              </Text>
              <Text style={styles.commentText}>
                {props.description}
              </Text>
            </View>
          </View>
          <View style={styles.cellBorder} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

PostListItem.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  uri: React.PropTypes.string,
};

PostListItem.defaultProps = {
  title: '',
  description: '',
  uri: 'https://unsplash.it/200/300/?random',
};
