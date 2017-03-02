import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';

import { Menu } from 'material-ui/Menu';
import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';

import { FormattedMessage, injectIntl } from 'react-intl';

import { withRouter } from 'react-router';

import jwtDecode from 'jwt-decode';

import { connect } from 'react-redux';

import { push } from 'connected-react-router';

import { toggleDrawer } from './NavigationDrawer';
import routes from '../utils/routes';

const getTitle = (path) => {
  if (path === '/') {
    return routes[0].name;
  }

  const foundRoute = routes.find(route => (
    route.path === path ? route.name : null
  ));

  if (foundRoute) {
    return foundRoute.name;
  }
  console.warn(`No title found for path '${path}'`);
  console.warn('Make sure the title name is defined in src/routes.js');
  return `ERROR: Title not found for path: ${path}`;
};

class Header extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    doToggleDrawer: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    preferences: PropTypes.func.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      scope: PropTypes.string.isRequired,
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    user: null,
  };

  state = {
    rightMenuOpen: false,
    rightMenuAnchorEl: null,
  };

  render() {
    const {
      path,
      doToggleDrawer,
      user,
      login,
      preferences,
      logout,
      intl: { formatMessage },
    } = this.props;

    const {
      rightMenuOpen,
      rightMenuAnchorEl,
    } = this.state;

    const hideMenu = () => this.setState({ rightMenuOpen: false });

    const rightMenu = user ? (
      <Menu
        open={rightMenuOpen}
        anchorEl={rightMenuAnchorEl}
        onRequestClose={() => hideMenu()}
      >
        <ListItem
          button
          onClick={() => { hideMenu(); preferences(); }}
        >
          <ListItemIcon>
            <Icon>account_circle</Icon>
          </ListItemIcon>
          <ListItemText primary={user.email} secondary={`Scope: ${user.scope}`} />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => { hideMenu(); logout(); }}
        >
          <ListItemIcon>
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText primary={formatMessage({ id: 'Logout' })} />
        </ListItem>
      </Menu>
    ) : (
      <Menu
        open={rightMenuOpen}
        anchorEl={rightMenuAnchorEl}
        onRequestClose={() => hideMenu()}
      >
        <ListItem
          button
          onClick={() => { hideMenu(); login(); }}
        >
          <ListItemIcon>
            <Icon>account_circle</Icon>
          </ListItemIcon>
          <ListItemText primary={formatMessage({ id: 'Login' })} />
        </ListItem>
      </Menu>
    );

    return (
      <AppBar
        style={{ position: 'relative' }}
      >
        <Toolbar>
          <IconButton
            contrast
            onClick={() => doToggleDrawer()}
          >
            menu
          </IconButton>
          <Text
            style={{ flex: 1 }}
            type="title"
            colorInherit
          >
            <FormattedMessage id={getTitle(path)} />
          </Text>
          <IconButton
            contrast
            onClick={e => this.setState({
              rightMenuAnchorEl: e.currentTarget,
              rightMenuOpen: true,
            })}
          >
            more_vert
          </IconButton>
          { rightMenu }
        </Toolbar>
      </AppBar>
    );
  }
}

export default injectIntl(withRouter(connect(
  (state, ownProps) => ({
    path: ownProps.location.pathname,
    user: state.auth.data.token && jwtDecode(state.auth.data.token),
  }),
  dispatch => ({
    doToggleDrawer() {
      dispatch(toggleDrawer());
    },
    login() {
      dispatch(push('/login'));
    },
    logout() {
      dispatch(push('/logout'));
    },
    preferences() {
      dispatch(push('/preferences'));
    },
  }),
)(Header)));
