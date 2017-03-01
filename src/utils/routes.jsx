import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/*
Configure all your app's routes here.

The first route will be aliased to '/' (index route)

Each route contains the following keys:
  - path:
    * URL path of route.
  - name:
    * Name of route as displayed in header.
    * Used as i18n id, remember to add translations to translations/*.js
  - component:
    * Which component to render when route is active.
    * Remember to import it below.
  - icon:
    * Which icon to use in NavigationDrawer for route.
    * Takes icon font string as found on: https://material.io/icons
  - requiresLogin:
    * Does the route require user to be authenticated?
    * Redirects to login screen for unauthenticated users.

Routes may optionally contain the following keys:
  - separator:
    * Whether to show a separator in NavigationDrawer below route
  - hideWhenScope:
    * Array of scopes, if user scope found in array hide route from NavigationDrawer.
    * null scope in array means unauthenticated.
*/

// Components
import Home from '../modules/Home';
import Users from '../modules/Users';
import Preferences from '../modules/Preferences';
import Login from '../modules/Login';
import Logout from '../modules/Logout';

// Routes
const routeConfigs = [{
  path: '/home',
  name: 'Home',
  component: Home,
  icon: 'home',
  requiresLogin: false,
}, {
  path: '/users',
  name: 'Users',
  component: Users,
  icon: 'supervisor_account',
  separator: true,
  requiresLogin: true,
}, {
  path: '/preferences',
  name: 'Preferences',
  component: Preferences,
  icon: 'settings',
  requiresLogin: true,
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  icon: 'account_circle',
  requiresLogin: false,
  hideWhenScope: ['user', 'admin'],
}, {
  path: '/logout',
  name: 'Logout',
  component: Logout,
  icon: 'exit_to_app',
  requiresLogin: false,
  hideWhenScope: [null],
}];

export default routeConfigs;

/*
Code below this line configures the routes as given by routeConfigs
*/

// PropTypes "schema" for routeConfig
export const RouteConfigShape = PropTypes.shape({
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
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
        { React.createElement(routeConfig.component, props) }
      </div>
    )
  )}
  />
);

AuthRedirectRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  routeConfig: RouteConfigShape.isRequired,
  location: PropTypes.string,
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
