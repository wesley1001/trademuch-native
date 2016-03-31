import React, {
  Navigator,
	StyleSheet,
	TouchableOpacity,
	Image,
  Component,
 } from 'react-native';
import { connect } from 'react-redux';
import RNRF, {
   Route,
   Schema,
   Actions,
 } from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

// View
import PostList from './containers/PostList';
import PostDetail from './containers/PostDetail';
import EditProfile from './containers/EditProfile';
// import Messenger from './containers/Messenger';
// import Login from './containers/Login';
import SideDrawer from './components/SideDrawer';
// import NHSample from './containers/sampleApp';

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  navTitle: {
    color: 'white',
  },
  routerScene: {
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
  },
  leftButtonContainer: {
    paddingLeft: 15,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export default class AppRoutes extends Component {
  renderMenuButton = () => {
    return (
      <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={() => this.drawer.open()}
      >
        <Image
          source={{ uri: 'https://github.com/efkan/rndrawer-implemented-rnrouter/blob/master/src/ic_menu_white_24dp.png' }}
          style={{ height: 24, width: 24, backgroundColor: '#790c0c' }}
        />
      </TouchableOpacity>
    );
  }

  renderBackButton = () =>  {
    return (
      <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={() => this.drawer.close()}
      >
        <Image
          source={{ url: 'https://github.com/efkan/rndrawer-implemented-rnrouter/blob/master/src/ic_arrow_back_white_24dp.png' }}
          style={{ height: 24, width: 24, backgroundColor: '#c23a3a' }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Router name="root">

        <Schema
          name="boot"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          hideNavBar
          type="replace"
        />

        {/*
        <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight } />
         <Route name="Login" schema="boot" component={Login} title="Login" />*/}

        <Route name="Drawer" hideNavBar type="reset" initial>
          <SideDrawer ref={c => { c ? this.drawer = c.drawer : this.drawer }}>
            <Router
              name="drawerRoot"
              sceneStyle={styles.routerScene}
              navigationBarStyle={styles.navBar}
              titleStyle={styles.navTitle}
            >
              <Schema
                name="home"
                sceneConfig={Navigator.SceneConfigs.FloatFromRight}
                hideNavBar={false}
                renderLeftButton={this.renderMenuButton}
              />
              <Schema
                name="interior"
                sceneConfig={Navigator.SceneConfigs.FloatFromRight}
                hideNavBar={false}
                renderLeftButton={this.renderBackButton}
              />
              <Route name="PostList" component={PostList} schema="home" title="PostList" />
              {/*<Route name="Messenger" component={Messenger} schema="interior" title="Messenger" />*/}
              <Route name="EditProfile" component={EditProfile} schema="interior" title="確認個人資料" />
              <Route name="PostDetail" component={PostDetail} schema="interior" title="發布" />
            </Router>
          </SideDrawer>
        </Route>
      </Router>
    );
  }
}

AppRoutes.propTypes = {
  renderMenuButton: React.PropTypes.func,
  renderBackButton: React.PropTypes.func,
};
