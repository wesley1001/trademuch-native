import React, { Navigator } from 'react-native';
import { connect } from 'react-redux';
import RNRF, {
  Route, Schema,
} from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

// View
import PostList from './containers/PostList';
import PostDetail from './containers/PostDetail';
import EditProfile from './containers/EditProfile';
import Messenger from './containers/Messenger';
import Login from './containers/Login';
import Policies from './containers/Policies';

export default function AppRoutes() {
  return (
    <Router name="root" hideNavBar>
      <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} />
      <Schema name="left" sceneConfig={Navigator.SceneConfigs.FloatFromLeft} />
      <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom} />
      <Route name="login" component={Login} schema="left" title="登入" />
      <Route name="Messenger" component={Messenger} title="Messenger" />
      <Route name="postList" >
        <Router name="listRouter">
          <Route name="list" component={PostList} title="TradeMuch" />
        </Router>
      </Route>
      <Route name="postDetail" component={PostDetail} title="發布" />
      <Route name="editProfile" component={EditProfile} title="確認個人資料" />
      <Route name="policies" component={Policies} title="服務條款" initial />
    </Router>
  );
}
