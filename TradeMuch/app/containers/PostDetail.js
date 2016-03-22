'use strict';

import React, {
  View,
  Image,
  TouchableOpacity,
  PixelRatio,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const styles = React.StyleSheet.create({
  cameraButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 50,
    width: 50,
    position: 'absolute',
    top: 50,
    left: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  itemImg: {
    flex: 6,
  },
  itemTitleContainer: {
    position: 'absolute',
    height: 20 * PixelRatio.get(),
    width: 180 * PixelRatio.get(),
    bottom: 100 * PixelRatio.get(),
    marginLeft: 10,
  },
  title: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 25,
    textAlign: 'left',
  },
  itemPriceContainer: {
    position: 'absolute',
    height: 20 * PixelRatio.get(),
    width: 180 * PixelRatio.get(),
    bottom: 100 * PixelRatio.get(),
  },
  price: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 25,
    textAlign: 'right',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderColor: '#d6d7da',
  },
  button: {
    height: 50,
    width: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
  },
  footContainer: {
    height: 100 * PixelRatio.get(),
    width: 190 * PixelRatio.get(),
    position: 'absolute',
    bottom: 0,
  },
  footBackColor: {
    height: 200 * PixelRatio.get(),
    width: 190 * PixelRatio.get(),
    position: 'absolute',
    bottom: 0,
  },
});

function PostDetail() {
  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: 'https://images.unsplash.com/photo-1453053507108-9f5456eb481f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=e0d75a1d1e2605e4c9f9302de0679508' }} style={styles.itemImg} />
      <TouchableOpacity style={styles.cameraButton} />
      <LinearGradient
        colors={['rgba(100, 100, 100, 0)', 'rgba(0, 0, 0, 1)']}
        style={styles.footBackColor}
      />
      <View style={styles.itemTitleContainer}>
        <Text style={styles.title}>小火車模型</Text>
      </View>
      <View style={styles.itemPriceContainer}>
        <Text style={styles.price}>＄100</Text>
      </View>
      <View style={styles.footContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>發表</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function _injectPropsFromStore(state) {
  return {
    postList: state.search.postList,
  };
}

PostDetail.propTypes = {
  title: React.PropTypes.string,
  itemName: React.PropTypes.string,
};

PostDetail.defaultProps = {
  title: '',
  itemName: '',
};

const _injectPropsFormActions = {
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
