import React from 'react-native';

const { StyleSheet,
  Component,
  Dimensions,
  PixelRatio,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Image
} = React;


var styles = StyleSheet.create({
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
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  }
});

export default class PostListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableHighlight underlayColor={"#f3f3f3"}>
          <View>
            <View style={styles.commentContent}>
                <Image source={{uri: 'https://unsplash.it/200/300/?random'}}
                       style={styles.avatar}/>
              <View style={styles.commentBody}>
                <Text style={styles.userName}>
                  {'title'}
                </Text>
                <Text style={styles.commentText}>
                  {'這裡放簡單的描述'}
                </Text>
              </View>
            </View>
            <View style={styles.cellBorder} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#f3f3f3"}>
          <View>
            <View style={styles.commentContent}>
                <Image source={{uri: 'https://unsplash.it/200/300/?random'}}
                       style={styles.avatar}/>
              <View style={styles.commentBody}>
                <Text style={styles.userName}>
                  {'title'}
                </Text>
                <Text style={styles.commentText}>
                  {'這裡放簡單的描述'}
                </Text>
              </View>
            </View>
            <View style={styles.cellBorder} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#f3f3f3"}>
          <View>
            <View style={styles.commentContent}>
                <Image source={{uri: 'https://unsplash.it/200/300/?random'}}
                       style={styles.avatar}/>
              <View style={styles.commentBody}>
                <Text style={styles.userName}>
                  {'title'}
                </Text>
                <Text style={styles.commentText}>
                  {'這裡放簡單的描述'}
                </Text>
              </View>
            </View>
            <View style={styles.cellBorder} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#f3f3f3"}>
          <View>
            <View style={styles.commentContent}>
                <Image source={{uri: 'https://unsplash.it/200/300/?random'}}
                       style={styles.avatar}/>
              <View style={styles.commentBody}>
                <Text style={styles.userName}>
                  {'title'}
                </Text>
                <Text style={styles.commentText}>
                  {'這裡放簡單的描述'}
                </Text>
              </View>
            </View>
            <View style={styles.cellBorder} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#f3f3f3"}>
          <View>
            <View style={styles.commentContent}>
                <Image source={{uri: 'https://unsplash.it/200/300/?random'}}
                       style={styles.avatar}/>
              <View style={styles.commentBody}>
                <Text style={styles.userName}>
                  {'title'}
                </Text>
                <Text style={styles.commentText}>
                  {'這裡放簡單的描述'}
                </Text>
              </View>
            </View>
            <View style={styles.cellBorder} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#f3f3f3"}>
          <View>
            <View style={styles.commentContent}>
                <Image source={{uri: 'https://unsplash.it/200/300/?random'}}
                       style={styles.avatar}/>
              <View style={styles.commentBody}>
                <Text style={styles.userName}>
                  {'title'}
                </Text>
                <Text style={styles.commentText}>
                  {'這裡放簡單的描述'}
                </Text>
              </View>
            </View>
            <View style={styles.cellBorder} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
