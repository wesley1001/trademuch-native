import React, {
  StyleSheet,
  Component,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ListView
} from 'react-native';

let simpleAuthClient = require('react-native-simple-auth');
import {Actions} from 'react-native-router-flux';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
var partners = [{title: 'President', name: 'chris'}, {title: 'Manager', name: 'Melissa'}, {title: 'CEO', name: 'Amanda'}]

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(this._partners()),
    }
  }

  componentWillMount() {
  }

  _partners(){
    var dataBlob = []
    for (var i = 0; i < partners.length; i++) {
      dataBlob.push(partners[i].title);
    }
    return dataBlob;
  }

  _renderRow(rowData) {
  	return <TouchableHighlight underlayColor="ededed" style={{ height:60, backgroundColor: '#efefef', borderBottomWidth:1, borderBottomColor: '#ddd', flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
      	<Text style={{ fontSize:18 }}>{rowData}</Text>
      </TouchableHighlight>
  }

  render() {
    console.log('partners', this._partners());
    return (
      <View>
        {/*
          <TouchableOpacity onPress={Actions.Login} style={{height: 40, justifyContent: 'center' }}>
            <Text>Back to Login</Text>
          </TouchableOpacity>

        */}

        <ListView
      	 dataSource={this.state.dataSource}
      	 renderRow={ this._renderRow }
        />
      </View>
    );
  }
}
