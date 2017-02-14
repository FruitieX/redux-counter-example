import React from 'react';
import { FormattedMessage } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';

import {
  createAction,
  createReducer,
} from 'redux-act';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import routes from '../utils/routes';
import theme from '../utils/theme';

const MenuDrawer = ({ closeDrawer, changeView, drawerOpened, path }) => (
  <Drawer
    open={drawerOpened}
    docked={false}
    onRequestChange={() => closeDrawer()}
  >

    <AppBar
      title={<FormattedMessage id="navigation" />}
      onLeftIconButtonTouchTap={() => closeDrawer()}
    />

    {
      routes.map((route) => {
        let active = (path === route.path);
        if (route.path === routes[0].path && path === '/') {
          active = true;
        }

        return (
          <div key={route.path}>
            {route.separator ? <Divider /> : null}
            <MenuItem
              leftIcon={React.createElement(route.icon)}
              style={{ color: active ? theme.palette.primary1Color : null }}
              onTouchTap={() => { changeView(route.path); }}
            >

              <FormattedMessage id={route.name} />
            </MenuItem>
          </div>
        );
      })
    }
  </Drawer>
);

MenuDrawer.propTypes = {
  closeDrawer: React.PropTypes.func.isRequired,
  changeView: React.PropTypes.func.isRequired,
  drawerOpened: React.PropTypes.bool.isRequired,
  path: React.PropTypes.string.isRequired,
};

// Action creators
export const closeDrawer = createAction('Close menu drawer');
export const openDrawer = createAction('Open menu drawer');
export const toggleDrawer = createAction('Toggle menu drawer');

export default withRouter(connect(
  (state, ownProps) => ({
    drawerOpened: state.drawer.drawerOpened,
    path: ownProps.location.pathname,
  }),
  (dispatch, ownProps) => ({
    changeView(view) {
      dispatch(closeDrawer());
      ownProps.push(view.toLowerCase());
    },
    closeDrawer() {
      dispatch(toggleDrawer());
    },
  }),
)(MenuDrawer));

// Initial state
const initialState = {
  drawerOpened: false,
};

// Reducer
export const reducer = createReducer({
  [closeDrawer]: state => ({
    ...state,
    drawerOpened: false,
  }),
  [openDrawer]: state => ({
    ...state,
    drawerOpened: true,
  }),
  [toggleDrawer]: state => ({
    ...state,
    drawerOpened: !state.drawerOpened,
  }),
}, initialState);
