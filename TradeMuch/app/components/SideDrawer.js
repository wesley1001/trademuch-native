import React, { PropTypes, Component } from 'react-native';
import Drawer from 'react-native-drawer';
import SideDrawerContent from './SideDrawerContent';

const styles = {
  drawerStyles: {
    drawer: {
      backgroundColor: '#ffffff',
    },
    main: {
      paddingLeft: 3,
      shadowColor: '#000000',
      shadowOpacity: 0.4,
      shadowRadius: 3,
    },
  },
};

export default class SideDrawer extends Component {

  constructor() {
    super();
    console.log("constructor this=>",this);
  }

  ref(c) {
    this.drawer = c;
    console.log("this=>",this);
  }
  render() {
    return (
      <Drawer
        ref={this.ref()}
        type="static"
        content={<SideDrawerContent />}
        openDrawerOffset={100}
        styles={styles.drawerStyles}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
        {
          React.Children.map(
            this.props.children, c => React.cloneElement(c, { route: this.props.route })
          )
        }
      </Drawer>
    );
  }
}

SideDrawer.propTypes = {
  children: PropTypes.node,
  route: React.PropTypes.object,
};

SideDrawer.defaultProps = {
  title: '',
  description: '',
  uri: 'https://unsplash.it/200 / 300 /? random ',
};
