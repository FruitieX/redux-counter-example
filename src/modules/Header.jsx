import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AvatarIcon from 'material-ui/svg-icons/action/account-circle';
import LogOutIcon from 'material-ui/svg-icons/action/exit-to-app';

import Divider from 'material-ui/Divider';

import { FormattedMessage, injectIntl } from 'react-intl';

import { withRouter } from 'react-router';

import jwtDecode from 'jwt-decode';

import { connect } from 'react-redux';

import { push } from 'connected-react-router';

import { toggleDrawer } from './NavigationDrawer';
import routes from '../utils/routes';
import theme from '../utils/theme';

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

const styles = {
  profileMenuItem: {
    height: 72,
  },
  profilePictureIcon: {
    height: 48,
    width: 48,
  },
};

class Header extends React.Component {
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

    const rightElement = user ? (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          leftIcon={<AvatarIcon style={styles.profilePictureIcon} />}
          primaryText={(
            <div style={{ paddingTop: 12, lineHeight: '24px' }}>
              <div> {user.email} </div>
              <div style={{ color: theme.palette.disabledColor }}> Scope: {user.scope} </div>
            </div>
          )}
          onTouchTap={() => preferences()}
          innerDivStyle={styles.profileMenuItem}
        />
        <Divider />
        <MenuItem
          leftIcon={<LogOutIcon />}
          primaryText={formatMessage({ id: 'Logout' })}
          onTouchTap={() => logout()}
        />
      </IconMenu>
    ) : (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          leftIcon={<AvatarIcon />}
          primaryText={formatMessage({ id: 'Login' })}
          onTouchTap={() => login()}
        />
      </IconMenu>
    );

    return (
      <div>
        <AppBar
          title={<FormattedMessage id={getTitle(path)} />}
          onLeftIconButtonTouchTap={() => doToggleDrawer()}
          iconElementRight={rightElement}
        />
      </div>
    );
  }
}

Header.propTypes = {
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

Header.defaultProps = {
  user: null,
};

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
