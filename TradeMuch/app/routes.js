import { connect } from 'react-redux';
import { loginValidation } from './actions/AuthActions';
import React, {
  Navigator,
	StyleSheet,
	TouchableOpacity,
	Image,
  Component,
  PropTypes,
  Text,
 } from 'react-native';
import RNRF, {
   Route,
   Schema,
   Actions,
 } from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

// View
import Login from './containers/Login';
import Policies from './containers/Policies';
import EditProfile from './containers/EditProfile';
import SideDrawer from './components/SideDrawer/SideDrawer';
import PostList from './containers/PostList';
import CreatePost from './containers/CreatePost';
import CreateFinish from './components/CreateFinish';
import PostDetail from './containers/PostDetail';
import NearByPosts from './containers/NearByPosts';
import Messenger from './containers/Messenger';

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666',
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
  static propTypes = {
    loginValidation: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.renderMenuButton = this.renderMenuButton.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
    this.renderNoneButton = this.renderNoneButton.bind(this);
  }

  componentWillMount() {
    this.props.loginValidation();
  }

  refSideDrawer = (ref) => {
    if (ref) {
      this.drawer = ref.drawer;
    } else {
      this.drawer = this.drawer;
    }
  }

  renderMenuButton() {
    const switchSideDrawer = () => {
      if (!this.drawer._open) {
        this.drawer.open();
      } else {
        this.drawer.close();
      }
    };
    return (
      <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={switchSideDrawer}
      >
        <Image
          source={{ uri: 'https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-64.png' }}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>
    );
  }

  renderLoginButton() {
    let loginButton = [];
    if (!this.props.isLogin) {
      loginButton = [
        <TouchableOpacity key="loginbutton"
          style={styles.leftButtonContainer}
          onPress={Actions.login}
        >
        <Text>登入</Text>
        </TouchableOpacity>,
      ];
    }
    return loginButton;
  }

  renderBackButton() {
    return (
      <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={Actions.pop}
      >
        <Image
          source={{ uri: 'http://i.stack.imgur.com/rXZga.png' }}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>
    );
  }
  renderNoneButton() {
    return [];
  }


  render() {
    return (
      <Router name="root" hideNavBar>

        {/* ------------------- Schemas ------------------------------------ */}
        <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight } />
        <Schema name="left" sceneConfig={Navigator.SceneConfigs.FloatFromLeft} />
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom} />
        <Schema
          name="boot"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          hideNavBar
          type="replace"
        />
        <Schema
          name="home"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          hideNavBar={false}
          renderLeftButton={this.renderMenuButton}
          renderRightButton={this.renderLoginButton}
        />
        <Schema
          name="interior"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          hideNavBar={false}
          renderLeftButton={this.renderBackButton}
        />
        <Schema
          name="none"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          hideNavBar={false}
          renderLeftButton={this.renderNoneButton}
        />

      {/* ------------------- All Routes ---------------------- */}
        <Route name="login" schema="boot" component={Login} title="登入" />
        <Route name="policies" component={Policies} title="服務條款" />
        <Route name="messenger" component={Messenger} title="Messenger" />
        <Route name="editProfile">
          <Router name="editProfileRouter">
            <Route name="editProfileView" component={EditProfile} title="確認個人資料" />
          </Router>
        </Route>
        <Route name="postList" schema="home" component={PostList} title="TradeMuch" />
        {/* ------------------- SideDrawer Router -------------------------- */}
        <Route name="drawer" hideNavBar type="switch" initial>
          <SideDrawer ref={this.refSideDrawer}>
            <Router
              name="drawerRoot"
              sceneStyle={styles.routerScene}
              navigationBarStyle={styles.navBar}
              titleStyle={styles.navTitle}
            >
              <Route name="postList" schema="home" component={PostList} title="附近的好康物品" />
              <Route name="login" schema="interior" component={Login} title="登入" />
              <Route
                name="createPost"
                component={CreatePost}
                schema="interior"
                title="發布"
                hideNavBar={false}
              />
              <Route
                name="postDetail"
                component={PostDetail}
                schema="interior"
                title="物品檢視"
                hideNavBar={false}
              />
              <Route
                name="createFinish"
                component={CreateFinish}
                schema="none"
                title="完成"
                hideNavBar={false}
              />
              <Route schema="none" name="policies" component={Policies} title="服務條款" />
              <Route schema="none" name="firstEditProfile" component={EditProfile} title="確認個人資料" />
              <Route name="editProfile" component={EditProfile} schema="interior" title="確認個人資料" />
              <Route name="nearByPosts" component={NearByPosts} schema="interior" title="附近好康" />
              <Route name="messenger" component={Messenger} schema="interior" title="Messenger" />
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
  isLogin: React.PropTypes.bool,
};


function _injectPropsFromStore({ auth }) {
  return {
    isLogin: auth.isLogin,
  };
}

const _injectPropsFormActions = {
  loginValidation,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(AppRoutes);
