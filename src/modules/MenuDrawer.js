import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { AppBar, Divider, Drawer, MenuItem } from 'material-ui';

import {
  createAction,
  createReducer
} from 'redux-act';

import routes from '../utils/routes';
import theme from '../utils/theme';

export const MenuDrawer = ({ closeDrawer, changeView, drawerOpened, path }) => (
  <Drawer
    open={drawerOpened}
    docked={false}
    onRequestChange={() => closeDrawer()} >

    <AppBar title={<FormattedMessage id='navigation' />}
            onLeftIconButtonTouchTap={() => closeDrawer()} />

    {
      routes.map((route, index) => {
        let active = (path === route.path);
        if (route.path === routes[0].path && path === '/') {
          active = true;
        }

        return(
          <div key={index}>
            {route.separator ? <Divider /> : null}
            <MenuItem
              leftIcon={React.createElement(route.icon)}
              style={{color: active ? theme.palette.primary1Color : null}}
              onTouchTap={() => {changeView(route.path)}}>

              <FormattedMessage id={route.name} />
            </MenuItem>
          </div>
        );
      })
    }
  </Drawer>
)

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export default withRouter(connect(
  (state, ownProps) => ({
    drawerOpened: state.drawer.drawerOpened,
    path: ownProps.location.pathname
  }),
  (dispatch, ownProps) => ({
    changeView(view) {
      dispatch(closeDrawer());
      ownProps.push(view.toLowerCase());
    },
    closeDrawer() {
      dispatch(toggleDrawer());
    }
  })
)(MenuDrawer));

// Action creators
export const closeDrawer = createAction('Close menu drawer');
export const openDrawer = createAction('Open menu drawer');
export const toggleDrawer = createAction('Toggle menu drawer');

// Initial state
const initialState = {
  drawerOpened: false
};

// Reducer
export const reducer = createReducer({
  [closeDrawer]: (state) => ({
    ...state,
    drawerOpened: false
  }),
  [openDrawer]: (state) => ({
    ...state,
    drawerOpened: true
  }),
  [toggleDrawer]: (state) => ({
    ...state,
    drawerOpened: !state.drawerOpened
  })
}, initialState);
