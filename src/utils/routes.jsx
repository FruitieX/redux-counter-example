import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// Icons
import HomeIcon from 'material-ui/svg-icons/action/home';
import UsersIcon from 'material-ui/svg-icons/action/supervisor-account';
import PreferencesIcon from 'material-ui/svg-icons/action/settings';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';

// Components
import Home from '../modules/Home';
import Users from '../modules/Users';
import Preferences from '../modules/Preferences';
import Logout from '../modules/Logout';

import NavigationDrawer from '../modules/NavigationDrawer';
import Header from '../modules/Header';

/*
Configure all your app's routes here.

Each route contains the following keys:
  path: URL path of route
  name: Name of route, displayed in header. Used as i18n id, add translations to translations/*.js
  component: Which component to render when route is active, remember to import it above
  icon: Which icon to use in navigation drawer for route, remember to import it above
  requiresLogin: Does the route require user to be authenticated?
  showHeader: Should the header be visible when route is active?

Routes may optionally contain the following keys:
  separator: Whether to show a separator above route in the navigation drawer

The first route will be aliased to '/' (index route)
*/

const routeConfigs = [{
  path: '/home',
  name: 'Home',
  component: Home,
  icon: HomeIcon,
  requiresLogin: false,
  showHeader: true,
}, {
  path: '/users',
  name: 'Users',
  component: Users,
  icon: UsersIcon,
  requiresLogin: true,
  showHeader: true,
}, {
  path: '/preferences',
  name: 'Preferences',
  component: Preferences,
  icon: PreferencesIcon,
  separator: true,
  requiresLogin: true,
  showHeader: true,
}, {
  path: '/logout',
  name: 'Logout',
  component: Logout,
  icon: LogoutIcon,
  requiresLogin: false,
  showHeader: false,
}];

export default routeConfigs;

// PropTypes "schema" for routeConfig
export const RouteConfigShape = PropTypes.shape({
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  icon: PropTypes.func.isRequired,
  requiresLogin: PropTypes.bool.isRequired,
  showHeader: PropTypes.bool.isRequired,
});

// Takes a routeConfig and wraps it in react-router's <Route> component.
// If requiresLogin is true, redirect to /login if user has not authenticated
let AuthRedirectRoute = ({ loggedIn, routeConfig, ...rest }) => (
  <Route
    {...rest}
    exact path={routeConfig.path}
    render={props => (
    routeConfig.requiresLogin && !loggedIn ? (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    ) : (
      <div>
        {
          routeConfig.showHeader && (
            <div>
              <NavigationDrawer />
              <Header />
            </div>
          )
        }
        { React.createElement(routeConfig.component, props) }
      </div>
    )
  )}
  />
);

AuthRedirectRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  routeConfig: RouteConfigShape.isRequired,
  location: React.PropTypes.string,
};

AuthRedirectRoute.defaultProps = {
  location: null,
};

// Connect AuthRedirectRoute to redux store, get loggedIn status
AuthRedirectRoute = connect(
  state => ({
    loggedIn: !!state.auth.data.token,
  }),
)(AuthRedirectRoute);

// AuthRedirectRoute wrapper which mounts routeConfig at '/' regardless of configured path
export const IndexRoute = ({ routeConfig, ...rest }) => {
  const indexRoute = {
    ...routeConfig,
    path: '/',
  };

  return (
    <AuthRedirectRoute
      {...rest}
      routeConfig={indexRoute}
    />
  );
};

IndexRoute.propTypes = {
  routeConfig: RouteConfigShape.isRequired,
};

// Map all configured routes into AuthRedirectRoute components
export const ConfiguredRoutes = ({ ...rest }) => (
  <div>
    {
      routeConfigs.map(routeConfig => (
        <AuthRedirectRoute
          {...rest}
          key={routeConfig.path}
          routeConfig={routeConfig}
        />
      ))
    }
  </div>
);
