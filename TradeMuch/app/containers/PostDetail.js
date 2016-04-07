'use strict';

import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
  Component,
  Linking,
  PixelRatio,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import {
  requestAddItemToFavList,
  requestDeleteItemToFavList,
} from '../actions/PostDetailActions';
import { Actions } from 'react-native-router-flux';

const windowSize = Dimensions.get('window');
const PIXEL_RATIO = PixelRatio.get();

const styles = React.StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  itemImg: {
    position: 'absolute',
    left: 0 * PIXEL_RATIO,
    top: 0 * PIXEL_RATIO,
    width: windowSize.width,
    height: windowSize.height,
  },
  noneImg: {
    position: 'absolute',
    left: windowSize.width / 2 - 50 * PIXEL_RATIO,
    top: windowSize.width / 2,
    width: 100 * PIXEL_RATIO,
    height: 100 * PIXEL_RATIO,
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  titleContainer: {
    top: 15 * PIXEL_RATIO,
    position: 'absolute',
    flex: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 10 * PIXEL_RATIO,
  },
  title: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 11 * PIXEL_RATIO,
    textAlign: 'left',
  },
  descriptionContainer: {
    justifyContent: 'flex-end',
    height: 150 * PIXEL_RATIO,
  },
  description: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 9 * PIXEL_RATIO,
    marginBottom: 5 * PIXEL_RATIO,
    textAlign: 'left',
    height: 30 * PIXEL_RATIO,
  },
  buttonContainer: {
    width: windowSize.width,
    bottom: 10 * PIXEL_RATIO,
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 5 * PIXEL_RATIO,
    paddingRight: 5 * PIXEL_RATIO,
    paddingTop: 50 * PIXEL_RATIO,
  },
  button: {
    flex: 1,
    margin: 5 * PIXEL_RATIO,
    height: 15 * PIXEL_RATIO,
    width: 100 * PIXEL_RATIO,
    borderRadius: 3 * PIXEL_RATIO,
    borderWidth: 0.5 * PIXEL_RATIO,
    backgroundColor: 'rgba(74, 74, 74, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 5 * PIXEL_RATIO,
  },
  footContainer: {
    flex: 1,
  },
  footBackColor: {
    height: windowSize.height,
    width: windowSize.width,
    position: 'absolute',
    bottom: 0,
  },
  buttonChatContainer: {
    flex: 0.5,
    flexDirection: 'row',
  },
  openChatRoomText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 5 * PIXEL_RATIO,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3 * PIXEL_RATIO,
  },
  openChatRoomButton: {
    backgroundColor: 'rgba(102, 102, 102, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15 * PIXEL_RATIO,
    borderWidth: 1 * PIXEL_RATIO,
    width: 30 * PIXEL_RATIO,
    height: 30 * PIXEL_RATIO,
    top: 15 * PIXEL_RATIO,
    right: 5 * PIXEL_RATIO,
    position: 'absolute',
  },
});


export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.AddItemToFavoriteButtonHandle = this.AddItemToFavoriteButtonHandle.bind(this);
    this.DeleteFavoriteItemButtonHandle = this.DeleteFavoriteItemButtonHandle.bind(this);
    this.OpenChatRoomButtonHandle = this.OpenChatRoomButtonHandle.bind(this);
    this.OpenMapButtonHandle = this.OpenMapButtonHandle.bind(this);
    this.GetItNowButtonHandle = this.GetItNowButtonHandle.bind(this);
    this.state = {
      postItem: {},
    };
  }

  componentWillMount() {
    // const postList = this.props.postList;
    // for (let i = 0; i < postList.length; i++) {
    //   if (postList[i].id === this.props.id) {
    //     console.log('postList[i]=>',postList[i]);
    //     this.setState({
    //       postItem: postList[i],
    //     });
    //   }
    // }

  }

  OpenChatRoomButtonHandle() {
    Actions.Messenger.call();
  }

  AddItemToFavoriteButtonHandle() {
    this.props.requestAddItemToFavList({
      id: this.props.id,
      postList: this.props.postList,
    });
  }

  DeleteFavoriteItemButtonHandle() {
    this.props.requestDeleteItemToFavList({
      id: this.props.id,
      postList: this.props.postList,
    });
  }

  GetItNowButtonHandle() {
    Actions.Messenger({});
  }

  OpenMapButtonHandle() {
    const { location } = this.state.postItem;
    const lon = location.lon;
    const lat = location.lat;
    const url = `https://www.google.com.tw/maps/@${lat},${lon},13z`;
    // console.log(`OpenMapButtonHandle url=>${url}`);
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        // console.log(`Don\'t know how to open URI: ${url}`);
      }
    });
  }

  render() {
    const postList = this.props.postList;
    let postItem = {};
    for (let i = 0; i < postList.length; i++) {
      if (postList[i].id === this.props.id) {
        // console.log('postList[i]=>',postList[i]);
        // this.setState({
        //   postItem: postList[i],
        // });
        postItem = postList[i];
      }
    }
    const { title, description, pic, isFav } = postItem;
    // console.log(`[title,description]=>[${title},${description}]`);
    if (title === null) {
      Actions.postList.call();
    }

    console.log('isFav=>',isFav);

    let favButton = '';
    if (isFav !== null) {
      if (isFav === false) {
        favButton = [
          <TouchableOpacity
            key="favButton"
            style={styles.button}
            onPress={ this.AddItemToFavoriteButtonHandle }
          >
            <Text style={styles.buttonText} >追蹤</Text>
          </TouchableOpacity>,
        ];
      } else if (isFav === true) {
        favButton = [
          <TouchableOpacity
            key="favButton"
            style={styles.button}
            onPress={ this.DeleteFavoriteItemButtonHandle }
          >
            <Text style={styles.buttonText} >取消追蹤</Text>
          </TouchableOpacity>,
        ];
      }
    }

    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: pic }} style={styles.itemImg} />
        <LinearGradient
          key="backGround"
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.footBackColor}
        />
        <View style={styles.buttonChatContainer}>
          <TouchableOpacity
            style={styles.openChatRoomButton}
            onPress={ this.OpenChatRoomButtonHandle }
          >
            <Text style={styles.openChatRoomText} >對話</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
        <View style={styles.footContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={ this.GetItNowButtonHandle }
            >
              <Text style={styles.buttonText} >立即交易</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={ this.OpenMapButtonHandle }
            >
              <Text style={styles.buttonText} >地圖</Text>
            </TouchableOpacity>
            {favButton}
          </View>
        </View>
      </View>
    );
  }
}

PostDetail.propTypes = {
  id: React.PropTypes.number,
  postList: React.PropTypes.array,
  requestAddItemToFavList: React.PropTypes.func,
  requestDeleteItemToFavList: React.PropTypes.func,
};

PostDetail.defaultProps = {
  id: 0,
  // postList: [],
  postList: [
    {
      score: 0.70273256,
      id: 1,
      isFav: false,
      title: '二手iphone',
      description: '描述',
      pic: '/url/test',
      location: { lat: 23.9, lon: 120.1 },
      distance: 1.3,
    }, {
      score: 0.70273256,
      id: 2,
      isFav: false,
      title: '二手iphone',
      description: '描述',
      pic: '/url/test',
      location: { lat: 23.9, lon: 120.1 },
      distance: 100,
    },
  ],
};

function _injectPropsFromStore(state) {
  return {
    postList: state.search.postList,
  };
}

const _injectPropsFormActions = {
  requestAddItemToFavList,
  requestDeleteItemToFavList,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
